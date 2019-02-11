<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {  
           // Using Closure based composers...
            View::composer('drive.index', 'App\Http\ViewComposers\AdminComposer');
            
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
