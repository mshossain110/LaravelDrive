<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\FolderRepository;
use App\Transformers\FolderTransformer;
use App\Http\Requests\FolderRequest;
use Gate;

class FolderController extends ApiController
{
    protected $folder;


    public function __construct ( FolderRepository $folder ) {
        parent::__construct();

        $this->folder = $folder;
    }

    public function index () {
    	return $this->respondWithCollection($this->folder->getList(), new RoleTransformer);
    }

    public function show ( $id ){
    	return $this->respondWithItem($this->folder->getById($id), new RoleTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store( FolderRequest $request){
        $validated = $request->validated();

        $data           = $request->only(['name', 'description', 'parent_id']);
        $data['parent_id'] = isset($data['parent_id']) ? intval($data['parent_id']): 0;

        
        $folder = $this->folder->store($data);
        $folder->generatePath();

       	return $this->respondWithItem($folder, new FolderTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update ( FolderRequest $request, $id ) {
        $validated = $request->validated();
        $data      = $request->only(['name', 'description']);
    	$folder      = $folderthis->folder->update( $id, $data);

    	return $this->respondWithItem($folder, new RoleTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy ( $id ) {
        $this->folder->destroy($id);

        return $this->respondWithMessage("Folder deleted successfully.");
    }
    
}