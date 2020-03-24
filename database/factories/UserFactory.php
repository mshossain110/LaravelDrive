<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'firstname'      => $faker->firstName ,
        'lastname'       => $faker->lastName,
        'avatar'         => 'http://lorempixel.com/80/60/',
        'name'           => $faker->unique()->userName,
        'email'          => $faker->unique()->safeEmail,
        'password'       => bcrypt('secret'),// secret
        'remember_token' => \Str::random(10),
        'ip'             => $faker->ipv6,
    ];
});
