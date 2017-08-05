<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
	    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'path'
    ];




    /**
     * Get the media's storage path.
     *
     * @return string
     */
    public function getPath(): string
    {
        return asset('storage/upload/'.$this->path);
    }

}
