<?php

namespace App\Repositories;

use Auth;
use App\User;
use App\Role;
//use App\Scopes\StatusScope;

class RoleRepository
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
    public function __construct(Role $role)
    {
        $this->model = $role;
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
     * Get the user by title.
     * 
     * @param  string $title
     * @return mixed
     */
    public function getByTitle ($title)
    {
        return $this->model
                    ->where('title', $title)
                    ->first();
    }

}
