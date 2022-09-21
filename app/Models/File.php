<?php

namespace App\Models;

use App\Models\User;
use App\Models\Traits\HashesId;
use Illuminate\Support\Arr;
use App\Models\Traits\HandlesPaths;
use App\Models\Observers\FileObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use HandlesPaths;
    use HashesId;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'path',
        'file_name',
        'extension',
        'mime',
        'type',
        'public_path',
        'parent_id',
        'driver',
        'driver_data',
        'uploaded_by',
        'meta',
    ];

    protected $casts = [
        'id' => 'integer',
        'file_size' => 'integer',
        'user_id' => 'integer',
        'parent_id' => 'integer',
        'meta' => 'array',
        'permissions' => 'array',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'meta',
        'file_name'
    ];

    /**
     * the accessor that should append with response.
     *
     * @var array
     */
    protected $appends = [
        // 'sizes',
        'hash',
        'stared'
    ];


    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();
        File::observe(FileObserver::class);
    }

    public function newQuery($except_deleted = true)
    {
        return parent::newQuery($except_deleted)->stared();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(static::class, 'folder_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(static::class, 'folder_id');
    }


    public function getStoragePath()
    {
        return "$this->file_name/$this->name";
    }
     /**
     * Get path of specified entry.
     *
     * @param int $id
     * @return string
     */
    public function findPath($id)
    {
        $entry = $this->find($id, ['path']);
        return $entry ? $entry->getOriginal('path') : '';
    }

    /**
     * Return file entry name with extension.
     * @return string
     */
    public function getNameWithExtension()
    {
        if (! $this->exists) {
            return '';
        }

        $extension = pathinfo($this->name, PATHINFO_EXTENSION);

        if (! $extension) {
            return $this->name .'.'. $this->extension;
        }

        return $this->name;
    }

    /**
     * Get all of the tags for the post.
     */
    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function getStaredAttribute()
    {
        return !empty($this->attributes['stared']);
    }

    public function scopeStared($query)
    {
        return $query->addSelect(['stared' => function ($query) {
            $query->select('name')
            ->from('tags')
            ->join('taggables', 'tags.id', '=', 'taggables.tag_id')
            ->whereColumn('taggables.taggable_id', 'files.id')
            ->limit(1);
        }]);
    }

    public function sharedWith()
    {
        return $this->belongsToMany('App\User', 'file_user', 'file_id', 'user_id')->withPivot(['permissions', 'created_at', 'updated_at', 'owner']);
    }

    public function uploader()
    {
        return $this->belongsTo('App\User', 'uploaded_by');
    }

     /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    public function setPermission($permission, $value)
    {
        $permissions = $this->meta['permissions'];
        $permissions[$permission] = $value;

        $this->save();
    }

    public function getPermission($permission = null)
    {
        $permissions = $this->meta['permissions'] ?: [];

        if ($permission !== null) {
            if (array_key_exists($permission, $permissions)) {
                return $permissions[$permission];
            } else {
                return false;
            }
        }
        return $permissions;
    }

    public function hasPermission($permission)
    {
        return $this->getPermission($permission) === true;
    }

    public function setImageSize($size)
    {
        $sizes = $this->meta['sizes'];
        $sizes[$size] = false;

        $this->save();
    }

    public function getImageSizes()
    {
        return $this->meta['sizes'];
    }

    public function updatePublicPaths($driver = null)
    {
        if ($this->driver !== $driver) {
            $this->driver = $driver;
        }

        if ($this->hasPermission('public')) {
            $this->public_path = Storage::disk($this->driver)->url($this->getStoragePath());
        } else {
            $this->public_path = Storage::disk('local')->url($this->getStoragePath());
        }
        $this->save();
    }
}
