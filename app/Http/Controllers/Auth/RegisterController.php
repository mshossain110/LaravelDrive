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
        $user->username             = $request->input('username');
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
