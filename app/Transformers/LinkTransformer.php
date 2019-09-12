<?php 

namespace App\Transformers;

use App\ShareableLink;
use League\Fractal\TransformerAbstract;

class LinkTransformer extends TransformerAbstract {

	protected $defaultIncludes = [
		'file'
	];

	public function transform ( ShareableLink $item ) {
		return [
			'id'             => (int) $item->id,
			'hash'	         => $item->hash,
			'user_id'        => $item->user_id,
			'file_id'        => $item->file_id,
			'allow_edit'     => $item->allow_edit,
			'allow_download' => $item->allow_download,
			'expires_at'     => $item->expires_at,
			'updated_at'     => $item->updated_at,
			'deleted_at'     => $item->deleted_at,
			'link'			=> route("shareable", ['hash' => $item->hash ])
		];
	}

	    /**
     * Include parent of file
     *
     * @param Task $item
     * @return \League\Fractal\Resource\Item
     */
    public function includeFile( ShareableLink $item ) { 
        $parent = $item->file->first();
        
        if ( ! empty( $parent ) ) {
            return $this->item( $parent, (new FileTransformer)->setDefaultIncludes(['owner']) );
        }

        return null;
	}
	

}