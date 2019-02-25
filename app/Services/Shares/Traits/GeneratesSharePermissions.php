<?php

namespace App\Services\Shares\Traits;


use Illuminate\Support\Arr;

trait GeneratesSharePermissions
{
    /**
     * Generate permissions for for shared entry.
     *
     * @param array $permissions
     * @return array
     */
    protected function generateSharePermissions($permissions)
    {
        return [
            'view' => true,
            'edit' => $permissions == 1,
            'download' => $permissions == 2,
        ];
    }
}