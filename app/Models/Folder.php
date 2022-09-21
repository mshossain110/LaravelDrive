<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Observers\FolderObserver;
use App\Models\Traits\HandlesPaths;
use App\Models\Traits\HashesId;

class Folder extends Model
{
    use HandlesPaths;
    use HashesId;

    protected $table = 'files';


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
        'parent_id' => 'integer'
    ];

    protected $attributes = ['type' => 'folder'];

    protected $appends = [
        'hash',
        'stared'
    ];

    public function newQuery($except_deleted = true)
    {
        return parent::newQuery($except_deleted)->where('type', '=', 'folder')->stared();
    }
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();
        Folder::observe(FolderObserver::class);
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(static::class, 'parent_id')->withoutGlobalScope('fsType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(static::class, 'parent_id');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Tag', 'taggables', 'taggable_id', 'tag_id');
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
}
