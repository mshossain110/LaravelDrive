<?php 

namespace App\Transformers;

use App\File;
use League\Fractal\TransformerAbstract;

class FileTransformer extends TransformerAbstract {

	protected $availableIncludes = [

	];

	public function transform ( File $file ) {
		return [
			'id' 				=> (int) $file->id,
			'name'				=> $file->name,
			'description'		=> $file->description,
		];
	}

}