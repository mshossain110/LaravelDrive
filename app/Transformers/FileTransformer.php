<?php 

namespace App\Transformers;

use App\File;
use League\Fractal\TransformerAbstract;

class FileTransformer extends TransformerAbstract {

	protected $availableIncludes = [

	];

	public function transform ( File $file ) {
		return [
			'id'          => (int) $file->id,
			'name'        => $file->name,
			'description' => $file->description,
			'path'        => $file->path,
			'type'        => $file->type,
			'public_path' => $file->public_path,
			'public'      => $file->public,
			'extension'   => $file->extension,
			'mime'        => $file->mime,
			'file_size'   => $file->file_size,
			'hash'	      => $file->hash,
			'url'         => $file->url,
			'file_name'   => $file->file_name,
			'parent_id'   => $file->parent_id,
			'created_at'  => $file->created_at,
			'updated_at'  => $file->updated_at,
			'deleted_at'  => $file->deleted_at,
		];
	}

	    /**
     * Include parent of file
     *
     * @param Task $item
     * @return \League\Fractal\Resource\Item
     */
    public function includeParent( File $item ) { 
        $parent = $item->parent->first();
        
        if ( ! empty( $parent ) ) {
            return $this->item( $parent, new FileTransformer );
        }

        return null;
    }

}