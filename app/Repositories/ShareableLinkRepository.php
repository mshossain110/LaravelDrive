<?php

namespace App\Repositories;

use Auth;
use App\User;
use App\ShareableLink;
//use App\Scopes\StatusScope;

class ShareableLinkRepository
{
    use BaseRepository;

    /**
     * User Model
     *
     * @var User
     */
    protected $model;

    /**
     * Constructor
     *
     * @param User $user
     */
    public function __construct(ShareableLink $link)
    {
        $this->model = $link;
    }

    /**
     * Get the list of all the user without myself.
     *
     * @return mixed
     */
    public function getList()
    {
        return $this->model
            ->orderBy('id', 'desc')
            ->get();
    }

    /**
     * Get the user by name.
     * 
     * @param  string $name
     * @return mixed
     */
    public function getByHash($hash)
    {
        return $this->model
                    ->where('hash', $hash)
                    ->first();
    }

    
    public function getLink($idOrHash)
    {
        if (is_integer($idOrHash) || ctype_digit($idOrHash)) {
            return $this->getByFileId($idOrHash);
        } else {
            return $this->getByHash($idOrHash);
        }
    }


    private function getByFileId($fileId)
    {
        $userId = Auth::user()->id;

        return $this->model
            ->where('user_id', $userId)
            ->where('file_id', $fileId)
            ->first();
    }

  
}
