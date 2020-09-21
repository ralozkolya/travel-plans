<?php

use App\Models\User;

class UserWriteTest extends TestCase
{
    public function testUpdateUser()
    {
        $path = "{$this->path}/users";
        $passwordPayload = [ 'password' => 'irrelevant' ];
        $passwordIncorrect = array_merge($passwordPayload, [ 'password_confirmation' => 'somethingElse' ]);
        $confirmedPassword = array_merge($passwordPayload, [ 'password_confirmation' => $passwordPayload['password'] ]);
        $shortConfirmedPassword = array_map(function ($item) { return mb_substr($item, 0, 4); }, $confirmedPassword);

        $this->actingAs($this->user);

        $this->call('PATCH', "{$path}/{$this->user->id}")
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => 'nonexistent' ])
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => User::ADMIN ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$this->anotherUser->id}")
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$this->anotherUser->id}", [ 'role' => User::MANAGER ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->user->id}", $passwordPayload)
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$this->user->id}", $passwordIncorrect)
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$this->user->id}", $shortConfirmedPassword)
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$this->user->id}", $confirmedPassword)
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->anotherUser->id}", [ 'name' => 'New name' ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$this->admin->id}", $confirmedPassword)
            ->assertForbidden();

        $this->call('DELETE', "{$path}/{$this->user->id}")
            ->assertForbidden();

        $this->call('DELETE', "{$path}/{$this->anotherUser->id}")
            ->assertForbidden();

        $this->call('DELETE', "{$path}/{$this->manager->id}")
            ->assertForbidden();

        $this->call('DELETE', "{$path}/{$this->admin->id}")
            ->assertForbidden();
    }

    public function testUpdateManager()
    {
        $path = "{$this->path}/users";

        $this->actingAs($this->manager);

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => User::ADMIN ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => User::MANAGER ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => User::USER ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$this->admin->id}", [ 'name' => 'New name' ])
            ->assertForbidden();

        $this->call('PATCH', "{$path}/{$this->manager->id}", [ 'role' => User::USER ])
            ->assertForbidden();

        $this->call('DELETE', "{$path}/{$this->anotherUser->id}")
            ->assertNoContent();

        $this->call('DELETE', "{$path}/{$this->manager->id}")
            ->assertForbidden();

        $this->call('DELETE', "{$path}/{$this->anotherManager->id}")
            ->assertForbidden();

        $this->call('DELETE', "{$path}/{$this->admin->id}")
            ->assertForbidden();
    }

    public function testUpdateAdmin()
    {
        $path = "{$this->path}/users";

        $this->actingAs($this->admin);

        $this->call('PATCH', "{$path}/{$this->user->id}")
            ->assertStatus(422);

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => User::ADMIN ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => User::MANAGER ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->user->id}", [ 'role' => User::USER ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->admin->id}", [ 'name' => 'New name' ])
            ->assertNoContent();

        $this->call('PATCH', "{$path}/{$this->manager->id}", [ 'role' => User::USER ])
            ->assertNoContent();

        $this->call('DELETE', "{$path}/{$this->user->id}")
            ->assertNoContent();

        $this->call('DELETE', "{$path}/{$this->manager->id}")
            ->assertNoContent();

        $this->call('DELETE', "{$path}/{$this->anotherAdmin->id}")
            ->assertNoContent();

        $this->call('DELETE', "{$path}/{$this->admin->id}")
            ->assertForbidden();
    }
}
