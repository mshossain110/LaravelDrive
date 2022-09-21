<?php

namespace App\Services\Shares;

use Carbon\Carbon;
use App\Models\File;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Services\Shares\Traits\GeneratesSharePermissions;

class AttachUsersToEntry
{
    use GeneratesSharePermissions;

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
    public function execute($userids, $fileids, $permissions)
    {
        $files = collect($fileids);

        // permissions on each user are expected
        $users = $this->user->whereIn('id', $userids)->pluck('id')->map(function ($id) use ($permissions) {
            return ['id' => $id, 'permissions' => $this->generateSharePermissions($permissions)];
        });

        $records = $this->createPivotRecords($users, $files);

        DB::table('file_user')->insert($records->toArray());
    }

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

        $records = $users->map(function ($user) use ($entriesAndChildren, $now) {
            return $entriesAndChildren->map(function ($entry) use ($user, $now) {
                return [
                    'user_id' => $user['id'],
                    'file_id' => is_numeric($entry) ? $entry : $entry->id,
                    'permissions' => json_encode($user['permissions']),
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            });
        })->collapse();

        // remove duplicates. Shared folder might contain files that have
        // different owners which will cause duplicate issues otherwise
        $existing = DB::table('file_user')
            ->whereIn('user_id', $users->pluck('id'))
            ->whereIn('file_id', $records->pluck('file_id'))
            ->get();

        return $records->filter(function ($new) use ($existing) {
            return ! $existing->contains(function ($current) use ($new) {
                return $current->file_id === $new['file_id'];
            });
        });
    }

    /**
     * Fetch all children of specified entries.
     *
     * @param Collection $entries
     * @param bool $withTrashed
     * @return Collection
     */
    protected function loadChildEntries(Collection $entries, $withTrashed = false)
    {
        $builder = File::select('id', 'file_name', 'type');

        // load parent entries, if we got only IDs passed in
        if (is_numeric($entries->first())) {
            $entries = File::whereIn('id', $entries)->get();
        }

        if ($withTrashed) {
            $builder->withTrashed();
        }

        $entries->each(function (File $entry) use ($builder) {
            if ($entry->type === 'folder') {
                $path = $entry->getOriginal('path');
                $builder->orWhere('path', 'LIKE', "$path/%");
            }
        });

        //only fetch children if any "where" constraints were applied
        if (count($builder->getQuery()->wheres)) {
            $children = $builder->get();
            $entries =  $entries->merge($children);
        }

        return $entries;
    }
}
