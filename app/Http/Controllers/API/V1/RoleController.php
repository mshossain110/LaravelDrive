<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\RoleRepository;
use App\Transformers\RoleTransformer;
use App\Http\Requests\RoleRequest;
use Gate;

class RoleController extends ApiController
{
    protected $role;


    public function __construct ( RoleRepository $role ) {
        parent::__construct();

        $this->role = $role;
    }

    public function index () {
    	return $this->respondWithPaginator($this->role->getList(), new RoleTransformer);
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
        $validated = $request->validated();
        $data      = $request->only(['name', 'description', 'statua', 'permissions']);
        $role      = $this->role->store($data);

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
        $validated = $request->validated();
        $data      = $request->only(['name', 'description', 'statua', 'permissions']);
    	$role      = $this->role->update( $id, $data);

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
    
    public function attachUser (Request $request) {
        $role_id = $request->get('role_id');
        $user_id = $request->get('user_id');
        $this->role->attachUser($role_id, $user_id);

        return $this->respondWithMessage("Role attached with the user");

    }

    public function getAbilities() {
        $permissions = [];
        
        $permissions[]['super'] = config('admin.auth.permissions.super');

        $policies = Gate::policies();
        
        if ( is_array($policies) ) {
            foreach ($policies as $model => $policy) {
                $permissions[][$model] = $this->getPolicyMethods($model, $policy);
            }
        }

        $abilities = Gate::abilities();

        if ( is_array($abilities) ) {
            $permissions[]['abilities'] = array_keys($abilities);  
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
              $data[] = strtolower($name) . '.' . $method;
            }
        }

        return $data;
    }
}