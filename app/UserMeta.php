<?php

namespace App;

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

    public function setValueAttribute( $value ) {
        if ( ! empty($value) ) {
            $this->attributes['value'] = maybe_serialize($value);
        }
    }

    public function getValueAttribute( $value ) {
        return maybe_unserialize($value);
    }

    /**
     * Get the user that owns the meta.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
