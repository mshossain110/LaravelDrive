<?php 

namespace App\Transformers;

use App\Folder;
use League\Fractal\TransformerAbstract;

class FolderTransformer extends TransformerAbstract {

	protected $availableIncludes = [

	];

	public function transform ( Folder $folder ) {
		return [
			'id' 				=> (int) $folder->id,
			'name'				=> $folder->name,
			'description'		=> $folder->description,
		];
	}

}