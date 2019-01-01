<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * Get all of the posts that are assigned this tag.
     */
    public function files()
    {
        return $this->morphedByMany('App\File', 'taggable');
    }

    /**
     * @param array $ids
     * @param null|int $userId
     */
    public function attachFile($ids, $userId = null)
    {
        if ($userId) {
            $ids = collect($ids)->mapWithKeys(function($id) use($userId) {
                return [$id => ['user_id' => $userId]];
            });
        }

        $this->files()->syncWithoutDetaching($ids);
    }

    /**
     * @param array $ids
     * @param null|int $userId
     */
    public function detachFile($ids, $userId = null)
    {
        $query = $this->files();

        if ($userId) {
            $query->wherePivot('user_id', $userId);
        }

        $query->detach($ids);
    }
}
