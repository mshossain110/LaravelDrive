<?php

namespace App\Repositories;

use Auth;
use App\User;
use App\Folder;
use App\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Storage;
//use App\Scopes\StatusScope;

class FileRepository
{
    use BaseRepository;

    /**
     * User Model
     *
     * @var File
     */
    protected $model;

    /**
     * Constructor
     *
     * @param File $user
     */
    public function __construct(File $file)
    {
        $this->model = $file;
    }

    /**
     * Get the list of all the user without myself.
     *
     * @return mixed
     */
    public function getList()
    {
        return $this->model
            ->orderBy('id', 'desc')
            ->get();
    }

    /**
     * Get the user by name.
     * 
     * @param  string $name
     * @return mixed
     */
    public function getByName($name)
    {
        return $this->model
                    ->where('name', $name)
                    ->first();
    }

    /**
     * Get number of the records
     *
     * @param  int $number
     * @param  string $sort
     * @param  string $sortColumn
     * @return Paginate
     */
    public function page($number = 10, $sort = 'desc', $sortColumn = 'created_at')
    {
        return $this->model->orderBy($sortColumn, $sort)->paginate($number);
    }

    /**
     * Get the article record without draft scope.
     * 
     * @param  int $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Store a new record.
     *
     * @param  $input
     * @return User
     */
    public function store($input)
    {   
        return $this->save($this->model, $input);
    }

    /**
     * Update the article record without draft scope.
     * 
     * @param  int $id
     * @param  array $input
     * @return boolean
     */
    public function update($id, $input)
    {
        $this->model = $this->model->withoutGlobalScope(StatusScope::class)->findOrFail($id);

        return $this->save($this->model, $input);
    }

    /**
     * Change the user password.
     * 
     * @param  App\User $user 
     * @param  string $password
     * @return boolean
     */
    public function changePassword($user, $password)
    {
        return $user->update(['password' => bcrypt($password)]);
    }

    /**
     * Save the user avatar path.
     * 
     * @param  int $id
     * @param  string $photo
     * @return boolean
     */
    public function saveAvatar($id, $photo)
    {
        $user = $this->getById($id);

        $user->avatar = $photo;

        return $user->save();
    }

    /**
     * Delete the draft article.
     *
     * @param int $id
     * @return boolean
     */
    public function destroy($id)
    {
        return $this->getById($id)->delete();
    }


    /**
     * Delete multiple users.
     *
     * @param array $ids
     * @return bool|null
     */
    public function deleteMultiple($ids)
    {
        foreach ($ids as $id) {
            $user = $this->user->find($id);
            if (is_null($user)) continue;

            $user->roles()->detach();
            $user->delete();
        }

        return $ids;
    }

        /**
     * @param UploadedFile $file
     * @param $extra
     * @return File
     */
    public function createFile(UploadedFile $file, $extra)
    {
        $data = $this->uploadedFileData($file, $extra);

        $userId = Arr::get($extra, 'user_id', Auth::id());
        $entries = collect();

        if (Arr::get($data, 'path')) {
            $entries = $entries->merge($this->createPath($data['path'], $data['parent_id'], $userId));
            $parent = $entries->last();
            if ($parent) $data['parent_id'] = $parent->id;
        }

        $file = $this->model->create($data);

        if ( ! Arr::get($data, 'public')) {
            $file->generatePath();
        }

        $entries->push($file);

        $entryIds = $entries->mapWithKeys(function($entry) {
            return [$entry->id => ['owner' => 1]];
        })->toArray();

        // User::find($userId)->files()->syncWithoutDetaching($entryIds);

        if (isset($parent) && $parent) {
            $file->setRelation('parent', $parent);
        } else {
            $file->load('parent');
        }

        return $file;
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
            return $name && ! str_contains($name, '.');
        });

        if ($path->isEmpty()) return $path;

        return $path->reduce(function($parents, $name) use($parentId, $userId) {
            if ( ! $parents) $parents = collect();
            $parent = $parents->last();

            $values = [
                'type' => 'folder',
                'name' => $name,
                'file_name' => $name,
                'parent_id' => $parent ? $parent->id : $parentId
            ];

            // check if user already has a folder with that name and parent
            $folder = $this->model->where($values)
                ->first();

            if ( ! $folder) {
                $folder = $this->model->create($values);
                $folder->generatePath();
            }

            return $parents->push($folder);
        });
    }

     /**
     * @param UploadedFile $file
     * @param array $extra
     * @return array
     */
    public function uploadedFileData(UploadedFile $file, $extra)
    {
        // TODO: move mime/extension/type guessing into separate class
        $originalMime = $file->getMimeType();

        if ($originalMime === 'application/octet-stream') {
            $originalMime = $file->getClientMimeType();
        }

        $data = [
            'name' => $file->getClientOriginalName(),
            'file_name' => str_random(40),
            'mime' => $originalMime,
            'type' => $this->getTypeFromMime($originalMime),
            'file_size' => $file->getClientSize(),
            'extension' => $this->getExtension($file, $originalMime),
        ];

        // merge extra data specified by user
        $data = array_merge($data, [
            'path' => Arr::get($extra, 'path'),
            'parent_id' => Arr::get($extra, 'parent_id'),
            'public_path' => Arr::get($extra, 'public_path'),
            'public' => Arr::get($extra, 'public_path') ? 1 : 0
        ]);

        // public files will be stored with extension
        if ($data['public']) {
            $data['file_name'] = $data['file_name'] . '.' . $data['extension'];
        }

        return $data;
    }

    /**
     * Extract file extension from specified file data.
     *
     * @param UploadedFile $file
     * @param string $mime
     * @return string
     */
    private function getExtension(UploadedFile $file, $mime)
    {
        if ($extension = $file->getClientOriginalExtension()) {
            return $extension;
        }

        $pathinfo = pathinfo($file->getClientOriginalName());

        if (isset($pathinfo['extension'])) return $pathinfo['extension'];

        return explode('/', $mime)[1];
    }

    /**
     * Get type of file entry from specified mime.
     *
     * @param string $mime
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
            case str_contains($mime, 'xml');
                return 'spreadsheet';
            default:
                return $default === 'application' ? 'file' : $default;
        }
    }

        /**
     * @param FileEntry $entry
     * @param UploadedFile $contents
     */
    public function storePrivateUpload(File $entry, $contents)
    {
        Storage::disk('uploads_local')->putFileAs($entry->file_name, $contents, $entry->file_name);
    }

        /**
     * @param FileEntry $entry
     * @param UploadedFile $contents
     */
    public function StorePublicUpload(File $entry, $contents)
    {
        Storage::disk('public')->putFileAs($entry->public_path, $contents, $entry->file_name);
    }
}
