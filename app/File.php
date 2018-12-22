<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Observers\FileObserver;
use App\Traits\HandlesPaths;
use App\Traits\HashesId;

class File extends Model
{
    use HandlesPaths, HashesId;
    
    protected $fillable = [
        'name',
        'description',
        'path',
        'file_name',
        'extension',
        'mime',
        'type',
        'public_path',
        'public',
        'file_size',
        'parent_id',
        'password',
    ];

    protected $casts = [
        'id' => 'integer',
        'file_size' => 'integer',
        'user_id' => 'integer',
        'parent_id' => 'integer'
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(static::class, 'folder_id')->withoutGlobalScope('fsType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(static::class, 'folder_id');
    }

        /**
     * Get url for previewing upload.
     *
     * @param string $value
     * @return string
     */
    public function getUrlAttribute($value)
    {
        if ($value) return $value;
        if ( ! isset($this->attributes['type']) || $this->attributes['type'] === 'folder') {
            return null;
        }

        if (array_get($this->attributes, 'public')) {
            return "storage/$this->public_path/$this->file_name";
        } else {
            return 'uploads/'.$this->attributes['id'];
        }
    }

    public function getStoragePath()
    {
        return "$this->file_name/$this->file_name";
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
    public function getNameWithExtension() {
        if ( ! $this->exists) return '';

        $extension = pathinfo($this->name, PATHINFO_EXTENSION);

        if ( ! $extension) {
            return $this->name .'.'. $this->extension;
        }

        return $this->name;
    }

}
