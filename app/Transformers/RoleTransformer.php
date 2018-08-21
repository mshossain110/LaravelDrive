<?php 

namespace App\Transformers;

use App\Role;
use League\Fractal\TransformerAbstract;

class RoleTransformer extends TransformerAbstract {

	protected $availableIncludes = [

	];

	public function transform ( Role $role ) {
		return [
			'id' 				=> (int) $role->id,
			'title'				=> $role->title,
			'description'		=> $role->description,
			'price'				=> (int) $role->price,
			'payment_type'		=> (int) $role->payment_type,
			'capabilities'		=> $role->capabilities,
		];
	}

}