<?php
namespace App\Http\ViewComposers;

use Auth;
use Illuminate\View\View;
class AdminComposer {
     /**
     * The user repository implementation.
     *
     * @var UserRepository
     */
    protected $user;

    /**
     * Create a new profile composer.
     *
     * @param  UserRepository  $users
     * @return void
     */
    public function __construct()
    {
        // Dependencies automatically resolved by service container...
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $data = [
            'user' => Auth::check() ? Auth::user() : null,
        ];
        
        $view->with($data);
    }
}