<?php

namespace App\Http\Controllers\Api\V1;

use DB;
use Auth;
use Storage;
use App\File;
use App\Transformers\FileTransformer;
use App\Repositories\FileRepository;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Services\Shares\AttachUsersToEntry;
use App\Services\Shares\GetUsersWithAccessToEntry;
use App\Transformers\UserTransformer;

class SharesController extends ApiController
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
    public function __construct(Request $request, FileRepository $file)
    {
        parent::__construct();
        
        $this->request = $request;
        $this->file = $file;
    }


    public function sharedWithMe () {
        $parent_id = $this->request->get('parent_id');
        $per_page = 20;

       
        $folder = $this->file->getFolder($parent_id);
        
        $files = Auth::user()->shared_files()->orderBy(DB::raw('type = "folder"'), 'desc')
            ->where('parent_id', $folder ? $folder->id : 0)
            ->paginate($per_page);
        
        
    	return $this->respondWithPaginator($files, new FileTransformer);
    }


    public function sharedWith ($file_id) {
        $users = File::with('sharedWith')->find($file_id)->sharedWith;

        return $this->respondWithCollection( $users, new UserTransformer );
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
    public function addUsers(AttachUsersToEntry $action)
    {
        $fileids = $this->request->get('fileids');

        // $this->authorize('update', [FileEntry::class, $entryIds]);

        // TODO: refactor messages into custom validator, so can reuse elsewhere
        $userIds =  $this->request->get('userIds', []);

        $this->validate($this->request, [
            'userIds' => 'required|min:1',
            'userIds.*' => 'required|integer|exists:users,id',
            'permissions' => 'required|integer',
            'fileids' => 'required|min:1',
            'fileids.*' => 'required|integer',
        ]);

        $action->execute(
            $this->request->get('userIds'),
            $fileids,
            $this->request->get('permissions')
        );

        return $this->respondWithMessage("Files successfully shared with users.");
    }

    /**
     * Update permissions that specified users have for entries.
     *
     * @param UpdateEntryUsers $action
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUsers(UpdateEntryUsers $action)
    {
        $entryIds = $this->request->get('entries');

        $this->authorize('update', [FileEntry::class, $entryIds]);

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
    public function removeUser($userId, DetachUsersFromEntries $action)
    {
        $entryIds = $this->request->get('entries');

        // there's no need to authorize if user is
        // trying to remove himself from the entry
        if ((int) $userId !== $this->request->user()->id) {
            $this->authorize('update', [FileEntry::class, $entryIds]);
        }

        $action->execute($entryIds, [$userId]);

        return $this->success();
    }
}
