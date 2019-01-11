<?php

namespace App\Services\Shares\Traits;

use Carbon\Carbon;
use DB;
use Illuminate\Support\Collection;

trait CreatesUserEntryPivotRecords
{
    /**
     * Create records for inserting into user_entry pivot table.
     *
     * @param Collection $users
     * @param Collection $entries
     * @param bool $loadChildren
     * @return Collection
     */
    protected function createPivotRecords($users, $entries, $loadChildren = true)
    {
        $now = Carbon::now();

        $entriesAndChildren = $loadChildren ?
            $this->loadChildEntries($entries)->pluck('id') :
            $entries;

        $records = $users->map(function($user) use($entriesAndChildren, $now) {
            return $entriesAndChildren->map(function($entry) use($user, $now) {
                return [
                    'user_id' => $user['id'],
                    'file_entry_id' => is_numeric($entry) ? $entry :  $entry->id,
                    'permissions' => json_encode($user['permissions']),
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            });
        })->collapse();

        // remove duplicates. Shared folder might contain files that have
        // different owners which will cause duplicate issues otherwise
        $existing = DB::table('user_file_entry')
            ->whereIn('user_id', $users->pluck('id'))
            ->whereIn('file_entry_id', $records->pluck('file_entry_id'))
            ->get();

        return $records->filter(function($new) use($existing) {
            return ! $existing->contains(function($current) use($new) {
                return $current->file_entry_id === $new['file_entry_id'];
            });
        });
    }
}