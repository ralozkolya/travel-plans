<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Trip;
use App\Models\User;
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

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => 'password',
        'role' => User::USER,
    ];
});

$factory->define(Trip::class, function (Faker $faker) {

    $start = rand(0, 5);
    $end = rand(3, 7) + $start;
    $start_date = date('Y-m-d', strtotime("$start days"));
    $end_date = date('Y-m-d', strtotime("$end days"));

    return [
        'destination' => $faker->city,
        'start_date' => $start_date,
        'end_date' => $end_date,
        'comment' => $faker->sentence(4)
    ];
});
