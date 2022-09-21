<?php

namespace App\Repositories;

use Auth;
use App\Models\User;
use App\Models\Role;

//use App\Scopes\StatusScope;

class RoleRepository
{
    use BaseRepository;

    /**
     * User Model
     *
     * @var Role
     */
    protected $model;

    /**
     * Constructor
     *
     * @param Role $role
     */
    public function __construct(Role $role)
    {
        $this->model = $role;
    }

    /**
     * Get the list of all the user without.
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
    public function getByName($name)
    {
        return $this->model
                    ->where('name', $name)
                    ->first();
    }

    public function getPermissions($id)
    {
        $this->model = $this->getById($id);

        return $this->model->permissions;
    }

    public function attachUser($role_id, $user_id)
    {
        $this->model = $this->getById($role_id);

        return $this->model->users()->attach($user_id);
    }
}
