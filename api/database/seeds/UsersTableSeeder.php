<?php

use App\Models\User;
use Illuminate\Database\Seeder;
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

        User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.org',
            'password' => 'admin',
            'role' => User::ADMIN,
        ]);

        User::create([
            'name' => 'User',
            'email' => 'user@example.org',
            'password' => 'password',
            'role' => User::USER,
        ]);

        User::create([
            'name' => 'Manager',
            'email' => 'manager@example.org',
            'password' => 'password',
            'role' => User::MANAGER,
        ]);
    }
}
