<?php

namespace App\Http\Controllers;

use App\Media;

class AdminPageController extends Controller{

	 /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');

    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function media()
    {
        $images = Media::all();

        return view('admin.media.index')->with(compact('images'));
    }
}

?>