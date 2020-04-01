<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

//implements MustVerifyEmail  // email varification is diable now

class User extends Authenticatable 
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
        '0' => 'inactive',
        '1' => 'active',
        '2' => "pandding",
        '3' => "baned"
    ];

    public function getStatusAttribute ( $value ) {
        if ( array_key_exists( $value, self::$status ) ) {
            return self::$status[$value];
        }
    }

    public function setStatusAttribute( $value ) {
        $value = strtolower( $value );
        $key   = array_search( $value, self::$status );

        if ( array_key_exists( $value, self::$status ) ) {
            $this->attributes['status'] = $value;
        } else {
            $this->attributes['status'] = $key;
        }
    }

    public function setPermissionsAttribute( $value ) {
        if ( ! empty($value) ) {
            $this->attributes['permissions'] = serialize( $value );
        }
    }

    public function getPermissionsAttribute( $value ) {
        $permissions = [];
        if ($value) {
            $permissions = unserialize( $value );
        }
        
        $roles = self::roles()->get();

        foreach ( $roles as $role ) {
            $permissions = array_merge($permissions, $role->permissions);
        }

        return empty($permissions) ? [] : $permissions;
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

    public function shared_files () {
        return $this->belongsToMany('App\File', 'file_user', 'user_id', 'file_id');
    }

    public function getDisplayNameAttribute() {
        return $this->firstname .' '. $this->lastname;
    }

    public function getAvatarAttribute($value)
    {
        if (!is_array($value)) {
            $value = json_decode($value);
        }

        if (empty($value) && empty($value->avatar)) {
            $value = new \STDClass();
            $value->avatar = $this->get_gravatar($this->email, 200);
        }

        return $value;
    }

    protected function get_gravatar($email, $s = 40, $d = 'mp', $r = 'g', $img = false, $atts = array())
    {
        $url = 'https://www.gravatar.com/avatar/';
        $url .= md5(strtolower(trim($email)));
        $url .= "?s=$s&d=$d&r=$r";
        if ($img) {
            $url = '<img src="' . $url . '"';
            foreach ($atts as $key => $val) {
                $url .= ' ' . $key . '="' . $val . '"';
            }
            $url .= ' />';
        }
        return $url;
    }
    
}
