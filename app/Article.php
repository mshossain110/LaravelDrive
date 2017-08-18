<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use SoftDeletes;


    
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'articles';

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['published_at', 'created_at', 'deleted_at'];


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'content', 'slug'
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

    /**
    *Set title attribute
    *
    * @param string $value
    * @return 
    */
    public function setTitleAttribute($value){
        $this->attributes['title'] = $value;
        $this->setUniqueSlug($value, '');
    }


    public function setUniqueSlug($value, $extra){
        $slug =srt_slug($value.$extra);

        if(static::whereSlug($slug)->exists()){
            $this->setUniqueSlug($slug, (int) str_random(40));
            return;
        }

        $this->attributes['slug']=$slug;
    }
}
