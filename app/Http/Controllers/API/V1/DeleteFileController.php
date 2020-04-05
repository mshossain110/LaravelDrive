<?php

namespace App\Http\Controllers\API\V1;

use Auth;
use Storage;
use App\File;
use DB;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\JsonResource;

class DeleteFileController extends ApiController
{
    /**
     * @var Request
     */
    private $request;

    /**
     * @var File
     */
    private $file;

    /**
     * CopyEntriesController constructor.
     *
     * @param Request $request
     * @param File $file
     */
    public function __construct(Request $request, File $file)
    {        
        $this->request = $request;
        $this->file = $file;
    }

    /**
     * Make copies of all specified entries and their children.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function delete()
    {
        // TODO: maybe limit to 100 or so entries

        $this->validate($this->request, [
            'ids'=> 'required|array',
            'ids.*' => 'required|integer',
        ]);

        $fileIds = $this->request->get('ids');

        // TODO: use "show" policy method when it supports multiple file IDs
        //$this->authorize('index', [File::class, $fileIds]);

        $this->deleteEntries($fileIds);
        
        return response()->json(['success'=> true, 'message' => "files deleted successfully."]);
    }

    /**
     * @param array|\Illuminate\Support\Collection $fileIds
     * @return Collection
     */
    private function deleteEntries($fileIds)
    {
        foreach ($this->file->withTrashed()->whereIn('id', $fileIds)->cursor() as $file) {
            if ($file->type === 'folder') {
                $this->deleteFolderfile($file);
            } else {
                $this->deleteEntry($file);
            }
        }
    }

    /**
     * @param File $original
     * @return File
     */
    private function deleteEntry(File $original)
    {
        $action = $this->request->get('action');
        if ( $action === 'deleteforever' ) {
            $this->deleteFileStorate($original);
            $this->forceDeleteModel($original);
        } else if ( $action === 'restore') {
            $this->restoreModel($original);
        } else {
            $this->deleteModel($original);
        }
    }

    /**
     * @param File $original
     * @return File
     */
    private function deleteFolderfile(File $original)
    {
        $this->deleteChildEntries($original);
        $this->deleteEntry($original);

    }

    /**
     * @param File $original
     */
    private function deleteChildEntries(File $original)
    {
        $fileIds = $this->file->where('parent_id', $original->id)->pluck('id');
        if ( ! $fileIds->isEmpty()) {
            $this->deleteEntries($fileIds);
        }
    }

    /**
     * @param File $original
     * @return File
     */
    private function deleteModel(File $original)
    {
        return $original->delete();
    }

    /**
     * @param File $original
     * @param int|null $parentId
     * @return File
     */
    private function restoreModel(File $original)
    {
        // $original->history()->restore();
        return $original->restore();
    }

    /**
     * @param File $original
     * @param int|null $parentId
     * @return File
     */
    private function forceDeleteModel(File $original)
    {
        // $original->history()->forceDelete();
        return $original->forceDelete();
    }



    /**
     * @param File $original
     */
    private function deleteFileStorate(File $original)
    {
        Storage::disk($original->disk)->deleteDirectory($original->file_name);
    }

    public function trash (Request $request) {
        $parent_id = $request->get('parent_id');
        $per_page = 20;
            // $folder = $this->file->getFolder($parent_id);

            $files = File::onlyTrashed()->orderBy(DB::raw('type = "folder"'), 'desc')
                // ->where('parent_id', $folder ? $folder->id : 0)
                ->where('uploaded_by', Auth::id())
                ->paginate($per_page);
        
        return JsonResource::collection($files);
    }
}
