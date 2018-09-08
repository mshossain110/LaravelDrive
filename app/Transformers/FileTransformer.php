<?php 

namespace App\Transformers;

use App\Role;
use League\Fractal\TransformerAbstract;

class FileTransformer extends TransformerAbstract {

	protected $availableIncludes = [

	];

	public function transform ( Role $role ) {
		return [
			'id' 				=> (int) $role->id,
			'name'				=> $role->name,
			'description'		=> $role->description,
			'permissions'		=> (array) $role->permissions,
		];
	}

}