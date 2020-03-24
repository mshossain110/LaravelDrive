<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Repositories\RoleRepository;
use App\Http\Requests\RoleRequest;
use Gate;
use App\Role;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleController extends ApiController
{
    protected $role;


    public function __construct ( RoleRepository $role ) {

        $this->role = $role;
    }

    public function index () {
        $this->authorize('view', Role::class);

    	return JsonResource::collection($this->role->getList());
    }

    public function show ( $id ){
        $this->authorize('view', Role::class);
    	return new JsonResource($this->role->getById($id));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store( RoleRequest $request){
        $this->authorize('create', Role::class);
        $validated = $request->validated();

        $data      = $request->only(['name', 'description', 'status', 'permissions']);
        $role      = $this->role->store($data);

       	return new JsonResource($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update ( RoleRequest $request, $id ) {
        $this->authorize('view', Role::class);
        $validated = $request->validated();
        $data      = $request->only(['name', 'description', 'status', 'permissions']);
    	$role      = $this->role->update( $id, $data);

    	return new JsonResource($role);
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
    
    public function attachUser (Request $request) {
        $role_id = $request->get('role_id');
        $user_id = $request->get('user_id');
        $this->role->attachUser($role_id, $user_id);

        return $this->respondWithMessage("Role attached with the user");

    }

    public function getAbilities() {
        $permissions = [];
        
        $permissions[] = [
            "model" => "Super",
            "permissions" => config('admin.auth.permissions.super'),
        ];

        $policies = Gate::policies();
        
        if ( is_array($policies) ) {
            foreach ($policies as $model => $policy) {
                $permissions[] = [
                    "model" => $model,
                    "permissions" => $this->getPolicyMethods($model, $policy)
                ];
            }
        }

        $abilities = Gate::abilities();

        if ( is_array($abilities) ) {
            $permissions[] = [
                "model" => 'Abilities',
                "permissions" => array_keys($abilities),
            ];
       } 


        return $this->respondWithCollection($permissions, function ($permission) {
           return $permission;
        });
    }

    protected function getPolicyMethods($model, $policy) {
        $name = (new \ReflectionClass($model))->getShortName();
        $methods = get_class_methods($policy);
        $data = [];

        if ( is_array( $methods ) ) {
            foreach ( $methods as $method) {
                if ($method == 'before') {
                    continue;
                }
              $data[] = strtolower($name) . '.' . $method;
            }
        }

        return $data;
    }
}