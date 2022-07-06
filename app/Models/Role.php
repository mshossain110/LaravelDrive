<?php

namespace App\Models;

use Spatie\Permission\Models\Role as ModelsRole;

class Role extends ModelsRole
{
    const ADMINISTRATOR = 'administrator';
    const ADMIN = 'admin';
    const USER = 'user';
}
