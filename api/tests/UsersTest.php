<?php

use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UsersTest extends TestCase {

    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testEnsureAllUsers()
    {
        $users = User::all()->toArray();

        $this->assertIsArray($users);
        $this->assertEquals(3, count($users));

        $admin = User::where([ 'name' => 'Administrator' ])->firstOrFail();
        $manager = User::where([ 'name' => 'Manager' ])->firstOrFail();
        $user = User::where([ 'name' => 'User' ])->firstOrFail();

        $this->assertEquals(User::ADMIN, $admin->role);
        $this->assertEquals(User::MANAGER, $manager->role);
        $this->assertEquals(User::USER, $user->role);
    }

    public function testRegisterUser()
    {
        $user = factory(User::class)->make()->toArray();

        $path = $this::PATH;

        $response = $this->call('POST', "{$path}/register", array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]));

        $this->assertEquals(200, $response->status());
    }

}
