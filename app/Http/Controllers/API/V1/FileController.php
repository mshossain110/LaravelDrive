<?php

namespace App\Http\Controllers\API\V1;

use App\File;
use App\Jobs\UploadToCloud;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Http\Requests\FileRequest;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;



class FileController extends ApiController
{
    public function index(Request $request)
    {
        $user = $request->user();
        $perpage = $request->get('per_page') ?: 30;
        $type = $request->get('type');
        $search = $request->get('search');
        $parent_id = $request->get('parent_id');

        if ($parent_id) {
            $parent_id = File::decodeHash($parent_id);
        }

        $files = File::with('uploader')
            ->where('parent_id', $parent_id?:0)
            ->where('uploaded_by', $user->id)
            ->orderBy(DB::raw('type = "folder"'), 'desc');
        

        if ($type) {
            $files = $files->where('type', $type);
        }

        if ($search) {
            $files = $files->where('name', 'like', "%$search%");
        }

        $files = $files->paginate($perpage);

        $resource = JsonResource::collection($files);

        return $resource;
    }



    public function show(Request $request, File $file)
    {
        $with = ['uploader'];

        $file->load($with);

        $resource = New JsonResource($file);

        return $resource;
    }

    public function store(Request $request)
    {
        $request->input('file_name', $request->get('dzuuid'));
        $inputs = $request->all();
        $inputs['meta']['sizes'] = $this->getDefaultSizes();
        $inputs['meta']['permissions'] = $this->getFilePermissions($request);
        $inputs['user_id'] = $request->user()->id;

        $chunkupload = true;
        if ($chunkupload) {
            // create the file receiver
            $receiver = new FileReceiver('file', $request, HandlerFactory::classFromRequest($request));

            // check if the upload is success, throw exception or return response you need
            if ($receiver->isUploaded() === false) {
                throw new UploadMissingFileException();
            }

            // receive the file
            $save = $receiver->receive();

            // check if the upload has finished (in chunk mode it will send smaller files)
            if ($save->isFinished()) {
                // save the file and return any response you need, current example uses `move` function. If you are
                // not using move, you need to manually delete the file by unlink($save->getFile()->getPathname())
                $filedata = $this->getFileData($save->getFile(), $inputs);
                $fileEntry = File::create($filedata);

                $this->storeLocalUpload($fileEntry, $save->getFile());

                // UploadToCloud::dispatch($fileEntry)->delay(now()->addMinutes(10)); // fire resize event and uplad to cloud
                $resource = new JsonResource($fileEntry);

                return $resource;
            }

            // we are in chunk mode, lets send the current progress
            /** @var AbstractHandler $handler */
            $handler = $save->handler();

            return response()->json([
                'done' => $handler->getPercentageDone(),
                'status' => true,
            ]);
        }
    }

    /**
     * Update file.
     *
     * @param  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update ( FileRequest $request, File $file ) {

        $data      = $request->only(['name', 'description']);
        $file->fill($data);
        $file->save();
        $file->refresh();

    	return new JsonResource($file);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy (File $file ) {
        
        $file->delete();
        return response()->json(["file deleted successfully."]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyAll ( Request $request ) {
        $ids = $request->get('ids');
        File::where('id', $ids)->delete();

        return response()->json(["file deleted successfully."]);
    }

    protected function getDefaultSizes() {
        return [
            '120x80' => false
        ];
    }

    protected function getFilePermissions(Request $request)
    {
        return [
            'public' => true,
        ];
    }

    /**
     * @param UploadedFile $file
     * @param array        $extra
     *
     * @return array
     */
    public function getFileData(UploadedFile $file, $extra)
    {
        // TODO: move mime/extension/type guessing into separate class
        $entries = collect();
        if (Arr::get($extra, 'path')) {
            $entries = $entries->merge($this->createPath($extra['path'], $extra['parent_id'], $extra['user_id']));
            $parent = $entries->last();
            if ($parent) $extra['parent_id'] = $parent->id;
        }


        $originalMime = $file->getMimeType();

        if ($originalMime === 'application/octet-stream') {
            $originalMime = $file->getClientMimeType();
        }

        $file_name = Arr::get($extra, 'file_name') ? Arr::get($extra, 'file_name') : Str::random(36);
        $data = [
            'name' => Arr::get($extra, 'name', $file->getClientOriginalName()),
            'file_name' => $file_name,
            'mime' => $originalMime,
            'type' => $this->getTypeFromMime($originalMime),
            'extension' => $this->getExtension($file, $originalMime),
            'path' => Arr::get($extra, 'path'),
            'parent_id' => Arr::get($extra, 'parent_id'),
            'public_path' => Arr::get($extra, 'public_path'),
            'driver' => Arr::get($extra, 'driver', config('filesystems.default')),
            'driver_data' => Arr::get($extra, 'driver_data'),
            'meta' => Arr::get($extra, 'meta'),
        ];

        return $data;
    }

    /**
     * @param string $path
     * @param integer|null $parentId
     * @param integer $userId
     * @return \Illuminate\Support\Collection
     */
    private function createPath($path, $parentId, $userId)
    {
        $path = collect(explode('/', $path));
        $path = $path->filter(function($name) {
            return $name && ! Str::contains($name, '.');
        });

        if ($path->isEmpty()) return $path;

        return $path->reduce(function($parents, $name) use($parentId, $userId) {
            if ( ! $parents) $parents = collect();
            $parent = $parents->last();
            $values = [
                'type' => 'folder',
                'name' => $name,
                'file_name' => $name,
                'parent_id' => $parent ? $parent->id : $parentId,
                'uploaded_by' => $userId
            ];

            // check if user already has a folder with that name and parent
            $folder = File::where($values)
                ->first();

            if ( ! $folder) {
                $folder = File::create($values);
                // $folder->generatePath();
            }

            return $parents->push($folder);
        });
    }

    /**
     * Extract file extension from specified file data.
     *
     * @param UploadedFile $file
     * @param string       $mime
     *
     * @return string
     */
    private function getExtension(UploadedFile $file, $mime)
    {
        if ($extension = $file->getClientOriginalExtension()) {
            return $extension;
        }

        $pathinfo = pathinfo($file->getClientOriginalName());

        if (isset($pathinfo['extension'])) {
            return $pathinfo['extension'];
        }

        return explode('/', $mime)[1];
    }

    /**
     * Get type of file entry from specified mime.
     *
     * @param string $mime
     *
     * @return string
     */
    protected function getTypeFromMime($mime)
    {
        $default = explode('/', $mime)[0];

        switch ($mime) {
            case 'application/x-zip-compressed':
            case 'application/zip':
                return 'archive';
            case 'application/pdf':
                return 'pdf';
            case 'vnd.android.package-archive':
                return 'android package';
            case Str::contains($mime, 'xml'):
                return 'spreadsheet';
            default:
                return $default === 'application' ? 'file' : $default;
        }
    }

    



    public function createThumbanile (File $entry, UploadedFile $file, $size = '120x80') {
        if ($entry->type !== 'image') return;
        // Image not resized let resize it
        $rs = explode('x', $size); // [150, 50]

        //  create Intervention images
        $image = Image::make($file)->resize($rs[0], $rs[1]);
        $path = storage_path("app/uploads/{$entry->file_name}");

        $localFile = "{$path}/{$size}-{$entry->name}";
        $image->save($localFile);

        return $localFile;
    }

    /**
     * @param FileEntry    $entry
     * @param UploadedFile $contents
     */
    public function moveFile(file $entry, UploadedFile $file, $public = 'public', $disk = null, $file_name = null)
    {
        if (!$disk) {
            $disk = config('filesystems.default');
        }

        if (!$file_name) {
            $file_name = $entry->name;
        }

        Storage::disk($disk)->putFileAs($entry->file_name, $file, $file_name, $public);

        $entry->updatePublicPaths($disk);
    }

    /**
     * @param FileEntry    $entry
     * @param UploadedFile $contents
     */
    public function storePublicUpload(File $entry, UploadedFile $file, $file_name = null)
    {
        $this->moveFile($entry, $file, 'public', 'public', $file_name);
    }

    /**
     * @param FileEntry    $entry
     * @param UploadedFile $contents
     */
    public function storeLocalUpload(File $entry, UploadedFile $file, $file_name = null)
    {
        $this->moveFile($entry, $file, 'public', 'local', $file_name);
    }
}