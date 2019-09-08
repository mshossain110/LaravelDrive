<?php

namespace App\Http\Controllers\Api\V1;

use Auth;
use Storage;
use App\File;
use App\Transformers\FileTransformer;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class MoveFileController extends ApiController
{

    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'files' => 'required|array|min:1|',
            'files.*' => 'required|integer',
            'destination' => 'nullable|integer|exists:files,id'
        ]);
        
        $files = collect($request->get('files'));
        $destination = $request->get('destination');
    
        $entries = $this->getFiles($files);
        $newParent = $this->getNewParent($destination);
        $entries = $this->removeInvalidEntries($entries, $newParent);
        
        //there was an issue with entries or parent, bail
        if ($entries->isEmpty()) {
            return $this->errorWrongArgs();
        }
        
        if ($this->updateParent($destination, $entries)) {
            $entries = $this->getFiles($entries->pluck('id'));
        }


        return $this->respondWithCollection($entries, new FileTransformer);
    }



    /**
     * Make sure entries can't be moved into themselves or their children.
     *
     * @param Collection $entries
     * @param int|'root' $parent
     * @return Collection
     */
    private function removeInvalidEntries(Collection $entries, $parent)
    {
        if ( ! $parent) return $entries;

        return $entries->filter(function($entry) use($parent) {
            return ! Str::contains($parent->path, $entry->id);
        });
    }

    /**
     * @param int|null $destination
     * @return FileEntry|null
     */
    private function getNewParent($destination)
    {
        if ( ! $destination) return null;
        return File::select('path', 'id')->find($destination);
    }

    /**
     * @param Collection $entryIds
     * @return Collection
     */
    private function getFiles($ids)
    {
        return File::whereIn('id', $ids)->get();
    }

    /**
     * @param int|null $destination
     * @param Collection $ids
     */
    private function updateParent($destination, Collection $files)
    {
        if (!$destination) {
            $destination = 0;     
        }
        return File::whereIn('id', $files->pluck('id'))
            ->update(['parent_id' => $destination]);
    }

}