<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $name = $this->command->anticipate('Admin Name:', ['admin', 'super']);
        $email = $this->command->anticipate('Admin Email:', ['admin@example.com']);
        $password = $this->command->secret('Admin Password:');
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        $user->roles()->sync([1]);

        $this->command->line('Admin User Created: ');
        $this->command->info(print_r($user->toArray(), true));
        $number = $this->command->ask('Do you want demo user?', '0');
        factory(App\User::class, $number)->create();
    }
}
