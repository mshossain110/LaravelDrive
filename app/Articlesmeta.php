<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articlesmeta extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'articlesmetas';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['post_id', 'key', 'value'];

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
    public function article()
	{
	    return $this->belongsTo('App\Article');
	}


	/**
	 * We should have an easy way to add usermeta for a user
	 * @param [type] $user_id [description]
	 * @param [type] $key     [description]
	 * @param [type] $value   [description]
	 */
	public static function addUsermeta($post_id, $key, $value)
	{
		return Usermeta::create([
            'post_id' => $post_id,
            'key' => $key,
            'value' => $value,
        ]);
	}
}
