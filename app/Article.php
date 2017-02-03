<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'articles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'post_title', 'post_slog'
    ];

    /**
     * Relationship between article and articlemeta. One to Many
     * One User has different usermeta.
     * 
     * @return object usermeta object
     */
    
    public function articlemeta()
    {
    	return $this->hasMany('App\Articlesmeta');
    }

    /**
     * Get article meta value from key. retrive meta value
     *  
     * @param  string $metakey 
     * @return string           
     */
    public function getValue($metakey)
    {
        foreach ($this->articlemeta as $key => $value) {
            if($value->key == $metakey){
                return $value->value;
            }
        }

        return false;
    }

    /**
     * Relationship between user and article. One to Many
     * One article has one user.
     * 
     * @return object User object
     */
    public function user()
	{
	    return $this->belongsTo('App\User');
	}
}
