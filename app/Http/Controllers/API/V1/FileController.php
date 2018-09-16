<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\FileRepository;
use App\Transformers\FileTransformer;
use App\Http\Requests\FileRequest;
use Auth;

class FileController extends ApiController
{
    protected $file;


    public function __construct ( FileRepository $file ) {
        parent::__construct();

        $this->file = $file;
    }

    public function index () {
    	return $this->respondWithCollection($this->file->getList(), new RoleTransformer);
    }

    public function show ( $id ){
    	return $this->respondWithItem($this->file->getById($id), new RoleTransformer);
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
        $parentId     = $request->get('parentId');
        $uploadedFile = $request->file('file');
        $fileEntry = $this->file->createFile($uploadedFile, ['parent_id' => $parentId, 'path' => $path] );

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
    	$file      = $filethis->file->update( $id, $data);

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