<?php 

namespace App\Transformers;

use App\Folder;
use League\Fractal\TransformerAbstract;

class FolderTransformer extends TransformerAbstract {

	protected $availableIncludes = [

	];

	public function transform ( Folder $folder ) {
		return [
			'id'          => (int) $folder->id,
			'name'        => $folder->name,
			'description' => $folder->description,
			'path'        => $folder->path,
			'type'        => $folder->type,
			'public_path' => $folder->public_path,
			'public'      => $folder->public,
			'extension'   => $folder->extension,
			'mime'        => $folder->mime,
			'file_size'   => $folder->file_size,
			'hash'	      => $folder->hash,
			'url'         => $folder->url,
			'file_name'   => $folder->file_name,
			'parent_id'   => $folder->parent_id,
			'created_at'  => $folder->created_at,
			'updated_at'  => $folder->updated_at,
			'deleted_at'  => $folder->deleted_at,
		];
	
	}

}