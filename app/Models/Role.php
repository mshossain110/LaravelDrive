<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    
    protected $fillable = [
        'name',
        'description',
        'permissions',
        'status'
    ];

    public function setPermissionsAttribute( $value ) {
        if ( ! empty($value) ) {
            $this->attributes['permissions'] = serialize( $value );
        }
    }

    public function getPermissionsAttribute( $value ) {
        return unserialize( $value );
    }

    /**
     * The users that belong to the role.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
