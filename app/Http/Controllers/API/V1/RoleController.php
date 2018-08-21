<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\RoleRepository;
use App\Transformers\RoleTransformer;
use App\Http\Requests\RoleRequest;

class RoleController extends ApiController
{
    protected $role;


    public function __construct ( RoleRepository $role ) {
        parent::__construct();

        $this->role = $role;
    }

    public function index () {
    	return $this->respondWithPaginator($this->role->page(), new RoleTransformer);
    }

    public function show ( $id ){
    	return $this->respondWithItem($this->role->getById($id), new RoleTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store( RoleRequest $request){
        $data = $request->all();
        $role = $this->role->store($data);

       	return $this->respondWithItem($role, new RoleTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update ( RoleRequest $request, $id ) {

    	$data = $request->all();

    	$role = $this->role->update( $id, $data);

    	return $this->respondWithItem($role, new RoleTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy ( $id ) {

        if (auth()->user()->id == $id ) {
            return $this->errorUnauthorized('You can\'t delete for yourself and other Administrators!');
        }

        $this->role->destroy($id);

        return $this->noContent();
    } 
}