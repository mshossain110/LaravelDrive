<?php

namespace App\Observers;

use App\Folder;
use Illuminate\Support\Facades\Auth;

class FolderObserver
{
    /**
    * Handle the Folder "creating" event.
    *
    * @param  \App\File  $folder
    * @return void
    */
   public function creating(Folder $folder)
   {
       $id = Auth::id();
       $folder->uploaded_by = $id;
   }

   /**
    * Handle the Folder "updated" event.
    *
    * @param  \App\Folder  $folder
    * @return void
    */
   public function updated(Folder $folder)
   {
       //
   }

   /**
    * Handle the Folder "deleted" event.
    *
    * @param  \App\Folder  $folder
    * @return void
    */
   public function deleting(Folder $folder)
   {
       $id = Auth::id();
       $folder->uploaded_by = $id;
   }

   /**
    * Handle the Folder "restored" event.
    *
    * @param  \App\Folder  $folder
    * @return void
    */
   public function restored(Folder $folder)
   {
       //
   }

   /**
    * Handle the Folder "force deleted" event.
    *
    * @param  \App\Folder  $folder
    * @return void
    */
   public function forceDeleted(Folder $folder)
   {
       //
   }
}
