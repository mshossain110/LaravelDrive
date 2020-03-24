<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Repositories\FolderRepository;
use App\Http\Requests\FolderRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class FolderController extends ApiController
{
    protected $folder;


    public function __construct ( FolderRepository $folder ) {

        $this->folder = $folder;
    }

    public function index () {
    	return JsonResource::collection($this->folder->getList());
    }

    public function show ( $id ){
    	return new JsonResource($this->folder->getById($id));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store( FolderRequest $request){
        $validated = $request->validated();

        $data              = $request->only(['name', 'description', 'parent_id']);
        $data['parent_id'] = isset($data['parent_id']) ? intval($data['parent_id']): 0;
        $data['file_name'] = \Str::random(40);

        
        $folder = $this->folder->store($data);
        $folder->generatePath();

       	return new JsonResource($folder);
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
    	$folder      = $this->folder->update( $id, $data);

    	return new JsonResource($folder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy ( $id ) {
        $this->folder->destroy($id);

        return response()->json(['message'=> "Folder deleted successfully."]);
    }
    
}