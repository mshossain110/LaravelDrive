<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\FileRepository;
use App\Transformers\FileTransformer;
use App\Http\Requests\FileRequest;
use App\File;
use Auth;
use DB;

class FileController extends ApiController
{
    protected $file;


    public function __construct ( FileRepository $file ) {
        parent::__construct();

        $this->file = $file;
    }

    public function index (Request $request) {
        $parent_id = $request->get('parent_id');

        $folder = $this->file->getFolder($parent_id);

        $files = File::orderBy(DB::raw('type = "folder"'), 'desc')
                ->where('parent_id', $folder ? $folder->id : 0)
                ->get();

    	return $this->respondWithCollection($files, new FileTransformer);
    }

    public function show ( $id ){
        if ((int) $id === 0) {
            $id = $this->file->decodeHash($id);
        }
    	$entry = $this->entry->withTrashed()->findOrFail($id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store( FileRequest $request){
        $userId       = Auth::user()->id;
        $path         = $request->get('path');
        $parent_id    = $request->get('parent_id');
        $uploadedFile = $request->file('file');
        $fileEntry    = $this->file->createFile($uploadedFile, ['parent_id' => $parent_id, 'path' => $path] );

        $this->file->storePrivateUpload($fileEntry, $uploadedFile);
        return $this->respondWithItem($fileEntry, new FileTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update ( FileRequest $request, $id ) {
        $validated = $request->validated();
        $data      = $request->only(['name', 'description']);
    	$file      = $this->file->update( $id, $data);

    	return $this->respondWithItem($file, new FileTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy ( $id ) {
        $this->file->destroy($id);

        return $this->respondWithMessage("file deleted successfully.");
    }
    
}