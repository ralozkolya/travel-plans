<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
        $user = new User();

        $user->name = 'Administrator';
        $user->email = 'admin@example.org';
        $user->password = Hash::make('admin');
        $user->role = 'admin';

        $user->save();
    }
}
