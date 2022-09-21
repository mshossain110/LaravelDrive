<?php

namespace App\Services\Shares;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DetachUsersFromEntries
{
    /**
     * Detach (non owner) users from specified entries.
     *
     * @param array|Collection $entryIds
     * @param array|Collection $userIds
     */
    public function execute($entryIds, $userIds)
    {
        DB::table('user_file_entry')
            ->whereIn('file_entry_id', $entryIds)
            ->whereIn('user_id', $userIds)
            ->where('owner', false)
            ->delete();
    }
}
