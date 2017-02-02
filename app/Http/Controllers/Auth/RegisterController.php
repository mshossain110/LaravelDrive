<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Usermeta;
use App\Mail\RegistrationConfirmation;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Socialite;
use Illuminate\Support\Facades\Auth;

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
            'username' => 'required|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
            'permission' => 'numeric'
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
        $user->username             = $request->input('username');
        $user->firstName             = $request->input('firstName');
        $user->lastName             = $request->input('lastName');
        $user->email                = $request->input('email');
        $user->password             = bcrypt($request->input('password'));
        $user->active_code          = $this->makeHash();
        $permission = $request->input('permission') ? $request->input('permission') : 1;


        //save user in db
        if ($user->save()) {

            // save usermeta for this user
            Usermeta::addUsermeta($user->id, 'permission', $permission);

            //create mail data
                $data = array(
                    'name'  => $user->username,
                    'code'  => $user->active_code,
                    'email' => $user->email
                    );

                Mail::to($user->email)->send(new RegistrationConfirmation($data));
            //go welcome page for email activation
            return redirect('/');

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
     * confermation your registration with email and code 
     * @param  Request $request 
     * @return 
     */
    public function active(Request $request)
    {
        $this->validate($request, [
            'code' => 'required', 'email' => 'required|email',
        ]);
        
        $code = $request->code;
        $email = $request->email;

        $user = User::where('active_code', $code)->where('email', $email)->first();

        if($user){
            $user->active_code = null;
            $user->active = true;

            if($user->save()){
                return redirect('login');
            }
        }else{
            return redirect('/');
        }
    }


    public function getSocialRedirect( $provider )
    {
        $providerKey = \Config::get('services.' . $provider);
        if(empty($providerKey))
            return redirect('/');

        return Socialite::driver( $provider )->redirect();

    }

    public function getSocialHandle( $provider )
    {

        $suser = Socialite::driver( $provider )->user();

        $user = null;

        //CHECK IF USERS EMAIL ADDRESS IS ALREADY IN DATABASE
        $is_user = User::where('email', '=', $suser->email)->first();

        if(!empty($is_user))
        {
            $user = $is_user;
        }
        else
        {
            // USER IS NOT IN DATABASE BASED ON EMAIL ADDRESS

            $social_id = Usermeta::where('key', '=', $provider )->where('value', '=', $suser->id)->first();
            // CHECK IF NEW SOCIAL MEDIA USER
            if(empty($social_id))
            {

                $new_user                    = new User;
                $new_user->email             = $suser->email;
                $name                        = explode(' ', $suser->name);
                if ($suser->email) {
                    $new_user->username      = substr($suser->email, 0, strpos($suser->email, '@'));
                } else {
                    $new_user->username      = $name[0];
                }
                $new_user->firstName        = $name[0];

                // CHECK FOR LAST NAME
                if (isset($name[1])) {
                    $new_user->lastName     = $name[1];
                }

                $new_user->active_code      = null;
                $new_user->active           = true;
                $new_user->password         = bcrypt($this->makeHash());
                
                if($new_user->save()){
                    Usermeta::addUsermeta($new_user->id, $provider,  $suser->id);
                    Usermeta::addUsermeta($new_user->id, 'permission', '1');

                    //create mail data
                    $data = array(
                        'name'  => $new_user->username,
                        'code'  => $new_user->active_code,
                        'email' => $new_user->email
                        );

                    Mail::to($new_user->email)
                        ->send(new RegistrationConfirmation($data));

                    $user = $new_user;
                }
                
            }
            else
            {
                //Load this existing social user
                $user = $social_id->user;
            }

        }

        Auth::login($user, true);

        

        return back();
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
