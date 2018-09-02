<?php

namespace App\Transformers;

use App\User;
use App\Role;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    protected $availableIncludes  = [
        
    ];

    protected $defaultIncludes = [

    ];

    public function transform(User $user)
    {
        return [
            'id'            => (int)$user->id,
            'name'          => $user->name,
            'email'         => $user->email,
            'firstname'     => $user->firstname,
            'lastname'      => $user->lastname,
            'avatar'        => $user->avatar,           
            'status'        => $user->status,       
            'permissions'   => $user->permissions,       
            'last_loged_in' => $user->last_loged_in,       
            'ip'            => $user->ip,       
            'created_at'    => $user->created_at->toDateTimeString(),
        ];
    }


}
