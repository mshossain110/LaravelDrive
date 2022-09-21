<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class ShareableLink extends Model
{
    //
    protected $guarded = ['id'];

    protected $dates = ['expires_at'];

    protected $fillable = [
        'hash',
        'user_id',
        'file_id',
        'allow_edit',
        'allow_download',
        'password',
        'expires_at'
    ];

    protected $casts = [
        'id' => 'integer',
        'allow_download' => 'boolean',
        'allow_edit' => 'boolean'
    ];

    protected $hidden = [
        'password', 'expires_at', 'hash', 'user_id', 'file_id'
    ];

    protected $appends = [
        'link'
    ];


    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function getLinkAttribute()
    {
        return route('shareable', [ 'hash' => $this->hash]);
    }


    /**
     * @param string $value
     */
    public function setHashAttribute($value)
    {
        $this->attributes['hash'] = $value ? $value : Str::random(30);
    }

    /**
     * @param string $value
     */
    public function setExpiresAtAttribute($value)
    {
        $this->attributes['expires_at'] = Carbon::parse($value);
    }
}
