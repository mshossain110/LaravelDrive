<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name' => 'administrator',
            'description' => "Role to manage all content.",
            'permissions' => [
                'administrator'
            ],
            'status' => 1
        ]);
    }
}
