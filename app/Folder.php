<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Observers\FolderObserver;
use App\Model\HandlesPaths;

class Folder extends Model
{
    use HandlesPaths;

    protected $fillable = [
        'name',
        'description',
        'path',
        'parent',
        'share_id',
        'password',
        'name',
    ];

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public static function boot()
    {
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
}
