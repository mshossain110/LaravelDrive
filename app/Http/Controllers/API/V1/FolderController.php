<?php

namespace App\Http\Controllers\API\V1;

use App\Folder;
use App\Http\Requests\FolderRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class FolderController extends ApiController
{

    public function index () {
        $folders = Folder::all();
    	return JsonResource::collection($folders);
    }

    public function show ( Folder $folder ){
    	return new JsonResource($folder);
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

        
        $folder = Folder::create($data);
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
    public function update ( FolderRequest $request, Folder $folder ) {
        $validated = $request->validated();
        $data      = $request->only(['name', 'description']);
        $folder->fill($data);
        $folder->save();

    	return new JsonResource($folder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy (  Folder $folder ) {
        
        $folder->delete();
        return response()->json(['message'=> "Folder deleted successfully."]);
    }
    
}