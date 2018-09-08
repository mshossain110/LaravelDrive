<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    //

    protected $fillable = [
        'name',
        'description',
        'path',
        'user_id',
        'parent',
        'share_id',
        'password',
        'name',
    ];
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(static::class, 'parent_id')->withoutGlobalScope('fsType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(static::class, 'parent_id');
    }
}
