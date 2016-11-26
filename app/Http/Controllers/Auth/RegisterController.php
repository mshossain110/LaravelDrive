<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Usermeta;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|max:255',
            'companyName' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }


    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        
        // validate user from validation function
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }

        // create a new user
        $user                       = new User;
        $user->name                 = $request->input('name');
        $user->email                = $request->input('email');
        $user->password             = bcrypt($request->input('password'));
        $user->active_code          = $this->makeHash();

        //save user in db
        if ($user->save()) {

            // save usermeta for this user
            Usermeta::addUsermeta($user->id, 'firstName', $request->input('firstName'));
            Usermeta::addUsermeta($user->id, 'lastName', $request->input('lastName'));
            Usermeta::addUsermeta($user->id, 'companyName', $request->input('companyName'));
            Usermeta::addUsermeta($user->id, 'permission', '1');

            //go welcome page for email activation
            return view('welcome');

        } else {

            return back()->with($request->all());
        }

    }
    /**
     * make a hash string for active code
     * @return hash
     */
    public function makeHash(){
        return Hash::make(str_random(60));
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
