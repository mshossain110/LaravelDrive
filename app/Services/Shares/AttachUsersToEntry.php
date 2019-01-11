<?php

namespace App\Services\Shares;

use DB;
use App\User;
use Common\Files\Traits\LoadsAllChildEntries;
use App\Services\Shares\Traits\GeneratesSharePermissions;
use App\Services\Shares\Traits\CreatesUserEntryPivotRecords;

class AttachUsersToEntry
{
    use CreatesUserEntryPivotRecords, GeneratesSharePermissions, LoadsAllChildEntries;

    /**
     * @var User
     */
    private $user;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Attach specified users to a file entries.
     *
     * @param array $emails
     * @param array $entries
     * @param array $permissions
     */
    public function execute($emails, $entries, $permissions)
    {
        $entryIds = collect($entries);

        // permissions on each user are expected
        $users = $this->user->whereIn('email', $emails)->pluck('id')->map(function($id) use($permissions) {
            return ['id' => $id, 'permissions' => $this->generateSharePermissions($permissions)];
        });

        $records = $this->createPivotRecords($users, $entryIds);

        DB::table('user_file_entry')->insert($records->toArray());
    }
}