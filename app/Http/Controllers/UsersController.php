<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{

 	public function getUsers(){
 			$users = User::all();

 			return view('admin.users.users')->with(compact('users'));
 	}
}
