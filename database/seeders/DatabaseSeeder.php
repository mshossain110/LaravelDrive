<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();

        $user = User::find(1);

        $user->email = 'admin@admin.com';
        $user->firstname = 'admin';
        $user->lastname = 'admin';
        $user->name = 'admin';
        $user->email_verified_at = now();
        $user->status = 'active';

        $user->save();
    }
}
