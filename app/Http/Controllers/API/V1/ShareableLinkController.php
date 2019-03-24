<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Repositories\ShareableLinkRepository;
use App\Transformers\LinkTransformer;

class ShareableLinkController extends ApiController
{
    /**
     * @var Request
     */
    private $request;

    /**
     * @var ShareableLink
     */
    private $link;

    /**
     * @param Request $request
     * @param ShareableLink $link
     */
    public function __construct(Request $request, ShareableLinkRepository $link)
    {
        parent::__construct();
        $this->request = $request;
        $this->link = $link;
    }

    /**
     * @param int|string $idOrHash
     * 
     */
    public function show($fileId)
    {
        $link = $this->link->getLink($fileId);

        if ( ! $link || ! $link->file || $link->file->trashed()) abort(404);

        if ($this->request->get('withFile')) {
            $link->load('file.children', 'file.owner');
        }

    	return $this->respondWithItem($link, new LinkTransformer);
    }

    /**
     * @param int $entryId
     */
    public function store($fileId)
    {
        $params = $this->request->all();
        $params['user_id'] = $this->request->user()->id;
        $params['file_id'] = $fileId;
        $params['hash'] = '';

        $link = $this->link->store($params);

        return $this->respondWithItem($link, new LinkTransformer);
    }

    /**
     * @param int $id
     * 
     */
    public function update($id)
    {
        $params = $request->all();
        $params['user_id'] = $request->user()->id;

        $link = $this->link->update($id, $params);

        return $this->respondWithItem($link, new LinkTransformer);
    }

    /**
     * @param int $id
     */
    public function destroy($id)
    {
        if ( $this->link->destroy( $id ) ) {
            return $this->respondWithMessage("Link has been deleted successfully.");
        }


    }

    public function check($linkId)
    {
        $link = $this->link->getById($linkId);
        $password = $this->request->get('password');

        return $this->respondWithArray([
            'matches' => Hash::check($password, $link->password)
        ]);
    }
}
