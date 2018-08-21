<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use App\Transformers\UserTransformer;
use App\Http\Requests\UserRequest;

class UserController extends ApiController
{
    protected $user;


    public function __construct ( UserRepository $user ) {
        parent::__construct();

        $this->user = $user;
    }

    public function index () {
    	return $this->respondWithPaginator($this->user->page(), new UserTransformer);
    }

    public function show ( $id ){
    	return $this->respondWithItem($this->user->getById($id), new UserTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store( UserRequest $request){
        $data = $request->all();

        $user = $this->user->store($data);

       	return $this->respondWithItem($user, new UserTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update ( UserRequest $request, $id ) {

    	$data = $request->all();

    	$user = $this->user->update( $id, $data);

    	return $this->respondWithItem($user, new UserTransformer);
    }

    /**
     * Update User Status By User ID
     *
     * @param $id
     * @param Request $request
     * @return \App\User
     */
    public function status($id, Request $request)
    {
        $input = $request->all();

        if (auth()->user()->id == $id ) {
            return $this->errorUnauthorized('You can\'t change status for yourself and other Administrators!');
        }

        $this->user->update($id, $input);

        return $this->noContent();
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

        $this->user->destroy($id);

        return $this->noContent();
    } 
}