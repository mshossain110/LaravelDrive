<?php

namespace App\Http\Controllers\API\V1;

use Auth;
use Storage;
use App\File;
use App\Transformers\FileTransformer;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

class CopyFileController extends ApiController
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
        parent::__construct();
        
        $this->request = $request;
        $this->file = $file;
    }

    /**
     * Make copies of all specified entries and their children.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function copy()
    {
        // TODO: maybe limit to 100 or so entries

        $this->validate($this->request, [
            'ids'=> 'required|array',
            'ids.*' => 'required|integer',
        ]);

        $fileIds = $this->request->get('ids');

        // TODO: use "show" policy method when it supports multiple file IDs
        //$this->authorize('index', [File::class, $fileIds]);

        $copies = $this->copyEntries($fileIds);

        return $this->respondWithCollection($copies, new FileTransformer);
    }

    /**
     * @param array|\Illuminate\Support\Collection $fileIds
     * @param int|null $parentId
     * @return Collection
     */
    private function copyEntries($fileIds, $parentId = 0)
    {
        $copies = collect();

        foreach ($this->file->whereIn('id', $fileIds)->cursor() as $file) {
            if ($file->type === 'folder') {
                $copies[] = $this->copyFolderfile($file, $parentId);
            } else {
                $copies[] = $this->copyFile($file, $parentId);
            }
        }

        return $copies;
    }

    /**
     * @param File $original
     * @param int|null $parentId
     * @return File
     */
    private function copyFile(File $original, $parentId = 0)
    {
        $copy = $this->copyModel($original, $parentId);
        $this->copyFileStorate($original, $copy);

        return $copy;
    }

    /**
     * @param File $original
     * @param int|null $parentId
     * @return File
     */
    private function copyFolderfile(File $original, $parentId = 0)
    {
        $copy = $this->copyModel($original, $parentId);
        $this->copyChildEntries($copy, $original);

        return $copy;
    }

    /**
     * @param File $copy
     * @param File $original
     */
    private function copyChildEntries(File $copy, File $original)
    {
        $fileIds = $this->file->where('parent_id', $original->id)->pluck('id');

        if ( ! $fileIds->isEmpty()) {
            $this->copyEntries($fileIds, $copy->id);
        }
    }

    /**
     * @param File $original
     * @param int|null $parentId
     * @return File
     */
    private function copyModel(File $original, $parentId = 0)
    {
        $copy = $original->replicate();
        $copy->file_name = str_random(40);
        $copy->parent_id = $parentId;
        $copy->save();

        $copy->generatePath();
        return $copy;
    }

    /**
     * @param File $original
     * @param File $copy
     */
    private function copyFileStorate(File $original, File $copy)
    {
        Storage::disk('uploads_local')->copy($original->file_name .'/'.$original->file_name, $copy->file_name .'/'. $copy->file_name);
    }

    /**
     * Get user to which file copies should be attached.
     *
     * @return int
     */
    private function getCopyOwnerId()
    {
        return Auth::user()->id;
    }
}
