<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShareableController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __invoke($id)
    {
        return view('sharedfiles');
    }

    
}
