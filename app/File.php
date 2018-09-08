<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    
    protected $fillable = [
        'name',
        'description',
        'file_name',
        'mime',
        'share_id',
        'attach_id',
        'file_size',
        'user_id',
        'folder_id',
        'password',
    ];
}
