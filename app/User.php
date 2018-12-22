<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'firstname',
        'lastname',
        'status',
        'permissions',
        'avatar',
        'last_loged_in',
        'ip'

    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    static $status = [
        '0' => 'Inactive',
        '1' => 'Active',
        '2' => "Pandding",
        '3' => "Baned"
    ];

    public function getStatusAttribute ( $value ) {
        if ( array_key_exists( $value, self::$status ) ) {
            return self::$status[$value];
        }
    }

    public function setPermissionsAttribute( $value ) {
        if ( ! empty($value) ) {
            $this->attributes['permissions'] = serialize( $value );
        }
    }

    public function getPermissionsAttribute( $value ) {
        $permissions = unserialize( $value );
        
        $roles = self::roles()->get();

        foreach ( $roles as $role ) {
            $permissions = array_merge($permissions, $role->permissions);
        }

        return empty($permissions) ? null : $permissions;
    }

    public function hasPermission( $permission ) {
        if ( in_array($permission, $this->permissions) ){
            return true;
        }

        return false;
    }


    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }

    /**
     * Get the comments for the blog post.
     */
    public function meta()
    {
        return $this->hasMany('App\UserMeta');
    }

    public function myfunc () {
        info('called my func');
    }
    
}
