<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use App\Http\Requests\UserRequest;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UserController extends ApiController
{
    protected $user;


    public function __construct(UserRepository $user)
    {
        $this->user = $user;
        $this->middleware('auth');
    }

    public function index()
    {
        $this->authorize('view', User::class);
        return JsonResource::collection($this->user->page());
    }

    public function show($id)
    {
        $this->authorize('view', User::class);
        return new JsonResource($this->user->getById($id));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $this->authorize('create', User::class);
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

        return new JsonResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UserRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
        $this->authorize('update', User::class);

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

        $user = $this->user->update($id, $data);

        return new JsonResource($user);
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
        $this->authorize('update', User::class);
        $input = $request->all();

        if (auth()->user()->id == $id) {
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
    public function destroy($id)
    {
        $this->authorize('delete', User::class);
        if (auth()->user()->id == $id) {
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
    public function deleteMultiple(Request $request)
    {
        $this->authorize('delete', User::class);

        $this->validate($request, [
            'ids' => 'required|array|min:1'
        ]);

        $this->user->deleteMultiple($request->get('ids'));

        return $this->respondWithMessage("Successfully deleted");
    }

    public function search(Request $request)
    {
        $this->authorize('view', User::class);
        $query = $request->get('s');

        $this->validate($request, [
            's' => 'required|string|min:1'
        ]);

        $users = $this->user->searchUser($query);

        return JsonResource::collection($users);
    }
}
