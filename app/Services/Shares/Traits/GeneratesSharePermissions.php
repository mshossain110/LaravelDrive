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
            'edit' => Arr::get($permissions, 'edit', false),
            'download' => Arr::get($permissions, 'download', false),
        ];
    }
}