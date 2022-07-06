<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => Role::ADMINISTRATOR]);
        Role::create(['name' => Role::ADMIN]);
        Role::create(['name' => Role::USER]);

        User::factory(100)->create();

        User::get()->map(function (User $user) {
            $user->assignRole(Role::USER);
        });

        $user = User::find(1);

        $user->email = 'admin@admin.com';
        $user->firstname = 'admin';
        $user->lastname = 'admin';
        $user->name = 'admin';
        $user->email_verified_at = now();
        $user->status = 'active';

        $user->save();

        $user->assignRole(Role::ADMINISTRATOR);
    }
}
