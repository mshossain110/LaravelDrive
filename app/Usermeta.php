<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usermeta extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'usermeta';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'key', 'value'];

    /**
     * timestamps dose not need for this table
     * 
     * @var boolean
     */
    public $timestamps = false;

    /**
     * Relationship between user and usermeta. One to Many
     * One User has different usermeta.
     * 
     * @return object User object
     */
    public function user()
	{
	    return $this->belongsTo('App\User');
	}


	/**
	 * We should have an easy way to add usermeta for a user
	 * @param [type] $user_id [description]
	 * @param [type] $key     [description]
	 * @param [type] $value   [description]
	 */
	public static function addUsermeta($user_id, $key, $value)
	{
		return Usermeta::create([
            'user_id' => $user_id,
            'key' => $key,
            'value' => $value,
        ]);
	}

}
