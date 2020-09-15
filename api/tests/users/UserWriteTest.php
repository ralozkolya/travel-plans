<?php

use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UserWriteTest extends TestCase
{
    use DatabaseMigrations;

    private $path;

    public function setUp(): void
    {
        parent::setUp();
        $this->path = $this::PATH;
        $this->users = $this->createUsers();
    }

    public function testRegisterUser()
    {
        $user = factory(User::class)->make()->toArray();

        $this->call('POST', "{$this->path}/register", array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]))->assertOk();
    }

    public function testUpdateUser()
    {
        [
            'user1' => $user,
            'user2' => $anotherUser,
            'admin1' => $admin,
        ] = $this->users;

        $path = "{$this->path}/users";
        $passwordPayload = [ 'password' => 'irrelevant' ];
        $passwordIncorrect = array_merge($passwordPayload, [ 'password_confirmation' => 'somethingElse' ]);
        $confirmedPassword = array_merge($passwordPayload, [ 'password_confirmation' => $passwordPayload['password'] ]);
        $shortConfirmedPassword = array_map(function ($item) { return mb_substr($item, 0, 4); }, $confirmedPassword);

        $this->actingAs($user);

        $this->call('PATCH', "{$path}/{$user->id}")
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => 'nonexistent' ])
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => User::ADMIN ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$anotherUser->id}")
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$anotherUser->id}", [ 'role' => User::MANAGER ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$user->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$user->id}", $passwordPayload)
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$user->id}", $passwordIncorrect)
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$user->id}", $shortConfirmedPassword)
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$user->id}", $confirmedPassword)
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$anotherUser->id}", [ 'name' => 'New name' ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$admin->id}", $confirmedPassword)
            ->assertForbidden();
    }

    public function testUpdateManager()
    {
        [
            'user1' => $user,
            'manager1' => $manager,
            'admin1' => $admin
        ] = $this->users;

        $path = "{$this->path}/users";

        $this->actingAs($manager);

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => User::ADMIN ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$user->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => User::MANAGER ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => User::USER ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$admin->id}", [ 'name' => 'New name' ])
            ->assertForbidden();
    }

    public function testUpdateAdmin()
    {
        [
            'user1' => $user,
            'manager1' => $manager,
            'admin1' => $admin
        ] = $this->users;

        $path = "{$this->path}/users";

        $this->actingAs($admin);

        $this->call('PATCH', "{$path}/{$user->id}")
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => User::ADMIN ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$user->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => User::MANAGER ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$user->id}", [ 'role' => User::USER ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$admin->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$manager->id}", [ 'role' => User::USER ])
            ->assertNoContent();
    }
}
