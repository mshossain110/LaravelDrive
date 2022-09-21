<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'user_id',
        'key',
        'value'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'hide'
    ];

    /**
     * Get the user that owns the meta.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
