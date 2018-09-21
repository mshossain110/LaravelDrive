<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\File;
use App\Response\FileContentResponseCreator;

class UploadController extends Controller
{
    // file model
    public $file = null;

        /**
     * ImageResponse service instance.
     *
     * @var ImageResponse
     */
    private $fileResponse;

    /**
     * AudioVideoResponse service instance.
     *
     * @var AudioVideoResponse
     */
    private $audioVideoResponse;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(File $file, FileContentResponseCreator $fileResponse)
    {
        $this->file = $file;
        // $this->middleware('auth');
        $this->fileResponse = $fileResponse;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function show ($id) 
    {

        if ((int) $id === 0) {
            $id = $this->file->decodeHash($id);
        }

        $entry = $this->file->findOrFail($id);

        // $this->authorize('show', $entry);

        return $this->fileResponse->create($entry);
    }


}
