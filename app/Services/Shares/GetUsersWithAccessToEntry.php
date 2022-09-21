<?php

namespace App\Services\Shares;

use App\Models\User;
use App\Models\File;
use Illuminate\Database\Eloquent\Collection;

class GetUsersWithAccessToEntry
{
    /**
     * @var FileE
     */
    private $entry;

    /**
     * @param File $entry
     */
    public function __construct(File $entry)
    {
        $this->entry = $entry;
    }

    /**
     * @param int $entryId
     * @return Collection|User[]
     */
    public function execute($entryId)
    {
        return $this->entry->with('users')->find($entryId)->users;
    }
}
