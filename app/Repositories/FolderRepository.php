<?php

namespace App\Repositories;

use Auth;
use App\User;
use App\Folder;
//use App\Scopes\StatusScope;

class FolderRepository
{
    use BaseRepository;

    /**
     * User Model
     *
     * @var Folder
     */
    protected $model;

    /**
     * Constructor
     *
     * @param Folder $user
     */
    public function __construct(Folder $folder)
    {
        $this->model = $folder;
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
    public function getByName($name)
    {
        return $this->model
                    ->where('name', $name)
                    ->first();
    }

    /**
     * Get number of the records
     *
     * @param  int $number
     * @param  string $sort
     * @param  string $sortColumn
     * @return Paginate
     */
    public function page($number = 10, $sort = 'desc', $sortColumn = 'created_at')
    {
        return $this->model->orderBy($sortColumn, $sort)->paginate($number);
    }

    /**
     * Get the article record without draft scope.
     * 
     * @param  int $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->model->withoutGlobalScope(StatusScope::class)->findOrFail($id);
    }

    /**
     * Store a new record.
     *
     * @param  $input
     * @return User
     */
    public function store($input)
    {   
        return $this->save($this->model, $input);
    }

    /**
     * Update the article record without draft scope.
     * 
     * @param  int $id
     * @param  array $input
     * @return boolean
     */
    public function update($id, $input)
    {
        $this->model = $this->model->withoutGlobalScope(StatusScope::class)->findOrFail($id);

        return $this->save($this->model, $input);
    }

    /**
     * Change the user password.
     * 
     * @param  App\User $user 
     * @param  string $password
     * @return boolean
     */
    public function changePassword($user, $password)
    {
        return $user->update(['password' => bcrypt($password)]);
    }

    /**
     * Save the user avatar path.
     * 
     * @param  int $id
     * @param  string $photo
     * @return boolean
     */
    public function saveAvatar($id, $photo)
    {
        $user = $this->getById($id);

        $user->avatar = $photo;

        return $user->save();
    }

    /**
     * Delete the draft article.
     *
     * @param int $id
     * @return boolean
     */
    public function destroy($id)
    {
        return $this->getById($id)->delete();
    }


    /**
     * Delete multiple users.
     *
     * @param array $ids
     * @return bool|null
     */
    public function deleteMultiple($ids)
    {
        foreach ($ids as $id) {
            $user = $this->user->find($id);
            if (is_null($user)) continue;

            $user->roles()->detach();
            $user->delete();
        }

        return $ids;
    }
}
