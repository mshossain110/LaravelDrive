<?php

namespace App\Observers;

use App\Folder;
use Illuminate\Support\Facades\Auth;

class FolderObserver
{
    /**
     * Handle the folder "creating" event.
     *
     * @param  \App\Folder  $folder
     * @return void
     */
    public function creating(Folder $folder)
    {
        $id = Auth::id();
        $folder->created_by = $id;
    }

    /**
     * Handle the folder "updated" event.
     *
     * @param  \App\Folder  $folder
     * @return void
     */
    public function updated(Folder $folder)
    {
        //
    }

    /**
     * Handle the folder "deleted" event.
     *
     * @param  \App\Folder  $folder
     * @return void
     */
    public function deleting(Folder $folder)
    {
        $id = Auth::id();
        $folder->deleted_by = $id;
    }

    /**
     * Handle the folder "restored" event.
     *
     * @param  \App\Folder  $folder
     * @return void
     */
    public function restored(Folder $folder)
    {
        //
    }

    /**
     * Handle the folder "force deleted" event.
     *
     * @param  \App\Folder  $folder
     * @return void
     */
    public function forceDeleted(Folder $folder)
    {
        //
    }
}
