<?php

namespace App\Observers;

use App\File;
use Illuminate\Support\Facades\Auth;

class FileObserver
{
    /**
     * Handle the File "creating" event.
     *
     * @param  \App\File  $file
     * @return void
     */
    public function creating(File $file)
    {
        $id = Auth::id();
        $file->uploaded_by = $id;
    }

    /**
     * Handle the File "updated" event.
     *
     * @param  \App\File  $file
     * @return void
     */
    public function updated(File $file)
    {
        //
    }

    /**
     * Handle the File "deleted" event.
     *
     * @param  \App\File  $file
     * @return void
     */
    public function deleting(File $file)
    {
        $id = Auth::id();
        $file->deleted_by = $id;
    }

    /**
     * Handle the File "restored" event.
     *
     * @param  \App\File  $file
     * @return void
     */
    public function restored(File $file)
    {
        //
    }

    /**
     * Handle the File "force deleted" event.
     *
     * @param  \App\File  $file
     * @return void
     */
    public function forceDeleted(File $file)
    {
        //
    }
}
