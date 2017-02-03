<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Relationship between user and usermeta. One to Many
     * One User has different usermeta.
     * 
     * @return object usermeta object
     */
    
    public function usermeta()
    {
    	return $this->hasMany('App\Usermeta');
    }

    /**
     * Get usermeta value from key. retrive meta value
     *  
     * @param  string $metakey 
     * @return string           
     */
    public function getValue($metakey)
    {
        foreach ($this->usermeta as $key => $value) {
            if($value->key == $metakey){
                return $value->value;
            }
        }

        return false;
    }

     /**
     * Relationship between user and article. One to Many
     * One User has many article.
     * 
     * @return object article object
     */
    public function articles()
    {
        return $this->hasMany('App\Article');
    }
}
