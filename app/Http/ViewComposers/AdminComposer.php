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
    public function __construct(Auth $user)
    {
        // Dependencies automatically resolved by service container...
        $this->user = $user;
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
            'token' => Auth::check()? Auth::user()->createToken('laravelAdmin')->accessToken: null,
        ];
        
        $view->with($data);
    }
}