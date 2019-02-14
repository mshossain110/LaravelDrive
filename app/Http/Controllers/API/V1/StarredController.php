<?php

namespace App\Http\Controllers\Api\V1;

use App\File;
use App\Tag;
use Illuminate\Http\Request;


class StarredController extends ApiController
{
    const TAG_NAME = 'starred';

    /**
     * @var Request
     */
    private $request;

    /**
     * @var Tag
     */
    private $tag;

    /**
     * @param Request $request
     * @param Tag $tag
     */
    public function __construct(Request $request, Tag $tag)
    {
        $this->request = $request;
        $this->tag = $tag;
    }

    /**
     * Attach "starred" tag to specified entries.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function add()
    {
        $ids = $this->request->get('ids');

        $this->validate($this->request, [
            'ids' => 'required|array|exists:files,id'
        ]);

        $tag = $this->tag->where('name', self::TAG_NAME)->first();

        if (!$tag) {
            $tag = $this->createStarTag();
        }

        $tag->attachFile($ids, $this->request->user()->id);

        return $this->respondWithMessage("Successfully added to stared.");
    }

    /**
     * Detach "starred" tag from specified entries.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function remove()
    {
        $ids = $this->request->get('ids');

        $this->validate($this->request, [
            'ids' => 'required|array|exists:files,id'
        ]);


        $tag = $this->tag->where('name', self::TAG_NAME)->first();

        $tag->detachFile($ids, $this->request->user()->id);

        return $this->respondWithMessage("Successfully remove from stared.");
    }

    protected function createStarTag () {
        $tag = Tag::firstOrCreate([
            'name' => self::TAG_NAME,
            'description' => 'Stared file for quick access',
            'type' => 'custom',
        ]);

        return $tag;
    }

}
