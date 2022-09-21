<?php

namespace App\Http\Controllers\API\V1;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ShareableLink;
use Illuminate\Support\Facades\Hash;
use Illuminate\Container\EntryNotFoundException;
use Illuminate\Http\Resources\Json\JsonResource;

class ShareableLinkController extends ApiController
{
    public function getFileShareableLink(Request $request, $fileId)
    {
        $link = ShareableLink::firstWhere('file_id', $fileId);

        if (!$link) {
            throw new EntryNotFoundException("Link Not found!!", 404);
        }

        return $this->shareableLink($link);
    }

    public function storeFileShareableLink(Request $request, $fileId)
    {
        $link = ShareableLink::firstOrNew(['file_id'=> $fileId]);

        $params = $this->request->all();
        $params['user_id'] = $request->user()->id;
        $params['file_id'] = $fileId;
        $params['hash'] = $link->hash ? $link->hash : Str::random(30);
        if ($request->has('password')) {
            $params['password'] = Hash::make($request->get('password'));
        }

        $link->fill($params);
        $link->save();

        return $this->shareableLink($link);
    }


    protected function shareableLink(ShareableLink $link, $withfile = false)
    {
        if ($withfile) {
            $link->load('file', 'file.children', 'file.uploader');
        }

        return new JsonResource($link);
    }

    /**
     * @param int|string $idOrHash
     *
     */
    public function show(Request $request, $fileId)
    {
        $link = ShareableLink::firstOrFail('file_id', $fileId);

        if (! $link || ! $link->file || $link->file->trashed()) {
            abort(404);
        }

        if ($this->request->get('withFile')) {
            $link->load('file.children', 'file.uploader');
        }

        return new JsonResource($link);
    }



    /**
     * @param int $id
     *
     */
    public function update(Request $request, ShareableLink $link)
    {
        $params = $request->all();
        $params['user_id'] = $request->user()->id;

        $link->fill($params);
        $link->save();

        return new JsonResource($link);
    }

    /**
     * @param int $id
     */
    public function destroy(Request $request, ShareableLink $link)
    {
        $link->delete();

        return response()->json(['success' => true, 'message' => "link deleted successfully."]);
    }

    public function check(Request $request, ShareableLink $link)
    {
        $password = $request->get('password');

        if (!Hash::check($password, $link->password)) {
            throw new Exception("You have not permission!!", 401);
        }

        return $this->shareableLink($link);
    }
}
