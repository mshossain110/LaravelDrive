<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use App\Transformers\UserTransformer;
use App\Http\Requests\UserRequest;
use Carbon\Carbon;

class UserController extends ApiController
{
    protected $user;


    public function __construct ( UserRepository $user ) {
        parent::__construct();
        $this->user = $user;
        $this->middleware('auth');
    }

    public function index () {
    	return $this->respondWithPaginator($this->user->page(), new UserTransformer);
    }

    public function show ( $id ) {
    	return $this->respondWithItem($this->user->getById($id), new UserTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store ( UserRequest $request) {
        $validated = $request->validated();

        $data = $request->only([
            'firstname',
            'lastname',
            'name',
            'email',
            'password',
            'role',
            'avatar',
            'permissions'
        ]);
        
        $data['ip'] = $request->ip();
        $data['last_loged_in'] =  Carbon::now();

        $user = $this->user->store($data);

       	return $this->respondWithItem($user, new UserTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UserRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update ( UserRequest $request, $id ) {

        $validated = $request->validated();

        $data = $request->only([
            'firstname',
            'lastname',
            'name',
            'email',
            'password',
            'role',
            'avatar',
            'permissions',
            'status'
        ]);

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

        return $this->respondWithMessage("Successfully deleted");
    }
    
    
    /**
     * Delete multiple users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteMultiple(Request $request )
    {
        $this->authorize('destroy', User::class);

        $this->validate($request, [
            'ids' => 'required|array|min:1'
        ]);

        $this->user->deleteMultiple($request->get('ids'));

        return $this->respondWithMessage("Successfully deleted");
    }

    public function search (Request $request) {
        $query = $request->get('s');
        
        $this->validate($request, [
            's' => 'required|string|min:1'
        ]);

        $users = $this->user->searchUser($query);
        
        return $this->respondWithCollection($users, new UserTransformer);
    }
}