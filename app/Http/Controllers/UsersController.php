<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Usermeta;
use Illuminate\Support\Facades\Log;
use App\Mail\RegistrationConfirmation;

class UsersController extends Controller
{

 	public function getUsers(){
 			$users = User::with('usermeta')->get();
 			return view('admin.users.users')->with(compact('users'));
 	}


 	public function create(){
 		return view('admin.users.create');
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
    public function store(Request $request)
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
            return redirect('/admin/users');

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
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('admin.users.edit')->with(compact('user'));;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
          
    }

}
