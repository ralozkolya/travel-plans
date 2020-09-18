<?php

use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => 'admin',
            'role' => User::ADMIN,
        ]);

        $user = User::create([
            'name' => 'Manager',
            'email' => 'manager@example.com',
            'password' => 'password',
            'role' => User::MANAGER,
        ]);

        $manager = User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => 'password',
            'role' => User::USER,
        ]);

        factory(Trip::class, 3)->create([
            'user_id' => $user->id
        ]);

        factory(Trip::class, 3)->create([
            'user_id' => $manager->id
        ]);

        factory(Trip::class, 2)->create([
            'user_id' => $admin->id
        ]);
    }
}
