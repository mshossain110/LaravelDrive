<?php

namespace App\Services\Shares;

use DB;
use Illuminate\Support\Arr;
use Common\Files\Traits\LoadsAllChildEntries;
use App\Services\Shares\Traits\GeneratesSharePermissions;
use App\Services\Shares\Traits\CreatesUserEntryPivotRecords;

class UpdateEntryUsers
{
    use CreatesUserEntryPivotRecords, GeneratesSharePermissions, LoadsAllChildEntries;

    /**
     * Update users and their permissions for specified entries.
     *
     * @param array $users
     * @param array $entries
     */
    public function execute($users, $entries)
    {
        $users = collect($users);
        $entries = collect($entries);

        $users = $users->map(function($user) {
            $user['permissions'] = $this->generateSharePermissions($user['permissions']);
            return $user;
        });

        $entriesAndChildren = $this->loadChildEntries($entries);

        // detach users (except owner) from entries
        (new DetachUsersFromEntries())->execute(
            $entriesAndChildren->pluck('id'),
            $users->pluck('id')
        );

        // filter out removed users, so they are not re-attached
        $users = $users->filter(function($user) {
            return ! Arr::get($user, 'removed');
        });

        $records = $this->createPivotRecords($users, $entriesAndChildren, false);

        DB::table('user_file_entry')->insert($records->toArray());
    }
}