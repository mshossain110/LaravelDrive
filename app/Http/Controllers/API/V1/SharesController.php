<?php

namespace App\Http\Controllers\API\V1;

use Storage;
use App\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Services\Shares\AttachUsersToEntry;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Shares\GetUsersWithAccessToEntry;

class SharesController extends ApiController
{



    public function sharedWithMe (Request $request) {
        $parent_id = $request->get('parent_id');
        $per_page = 20;

       
        $folder = File::find($parent_id);
        
        $files = Auth::user()->shared_files()->orderBy(DB::raw('type = "folder"'), 'desc')
            ->where('parent_id', $folder ? $folder->id : 0)
            ->paginate($per_page);
        
        
    	return JsonResource::collection($files);
    }


    public function sharedWith (Request $request, $file_id) {
        $users = File::with('sharedWith')->find($file_id)->sharedWith;

        return JsonResource::collection( $users );
    }

        /**
     * Import entry into current user's drive using specified shareable link.
     *
     * @param int $linkId
     * @param AttachUsersToEntry $action
     * @param ShareableLink $linkModel
     * @return \Illuminate\Http\JsonResponse
     */
    // public function addCurrentUser($linkId, AttachUsersToEntry $action, ShareableLink $linkModel)
    // {
    //     /* @var ShareableLink $link */
    //     $link = $linkModel->with('entry')->findOrFail($linkId);

    //     $this->authorize('show', [$link->entry, $link]);

    //     $permissions = [
    //         'view' => true,
    //         'edit' => $link->allow_edit,
    //         'download' => $link->allow_download,
    //     ];

    //     $action->execute(
    //         [$this->request->user()->email],
    //         [$link->entry_id],
    //         $permissions
    //     );

    //     $users = app(GetUsersWithAccessToEntry::class)
    //         ->execute($link->entry_id);

    //     return $this->success(['users' => $users]);
    // }

    /**
     * Share drive entries with specified users.
     *
     * @param AttachUsersToEntry $action
     * @return \Illuminate\Http\Response
     */
    public function addUsers(Request $request, AttachUsersToEntry $action)
    {
        $fileids = $request->get('fileids');

        // $this->authorize('update', [FileEntry::class, $entryIds]);

        // TODO: refactor messages into custom validator, so can reuse elsewhere
        $userIds =  $request->get('userIds', []);

        $request->validate( [
            'userIds' => 'required|min:1',
            'userIds.*' => 'required|integer|exists:users,id',
            'permissions' => 'required|integer',
            'fileids' => 'required|min:1',
            'fileids.*' => 'required|integer',
        ]);

        $action->execute(
            $request->get('userIds'),
            $fileids,
            $request->get('permissions')
        );

        return $this->respondWithMessage("Files successfully shared with users.");
    }

    /**
     * Update permissions that specified users have for entries.
     *
     * @param UpdateEntryUsers $action
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUsers(Request $request, UpdateEntryUsers $action)
    {
        $entryIds = $this->request->get('entries');


        $this->validate($this->request, [
            'entries' => 'required|array|min:1',
            'entries.*' => 'required|integer',
            'users' => 'required|array|min:1',
            'users.*.id' => 'required|exists:users,id',
            'users.*.permissions' => 'required|array',
            'users.*.removed' => 'boolean',
        ]);

        $action->execute(
            $this->request->get('users'),
            $entryIds
        );

        $users = app(GetUsersWithAccessToEntry::class)
            ->execute(head($entryIds));

        return $this->success(['users' => $users]);
    }

    /**
     * Detach user from specified entries.
     *
     * @param int $userId
     * @param DetachUsersFromEntries $action
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeUser(Request $request, DetachUsersFromEntries $action)
    {
        $entryIds = $request->get('entries');
        $userId = $request->get('user_id');

        // there's no need to authorize if user is
        // trying to remove himself from the entry
        if ((int) $userId !== $request->user()->id) {
            $this->authorize('update', [FileEntry::class, $entryIds]);
        }

        $action->execute($entryIds, [$userId]);

        return $this->success();
    }
}
