<?php

use App\Models\User;

class UserCreateTest extends TestCase
{
    public function testRegisterUser()
    {
        $user = factory(User::class)->make([
            'email' => 'user@example.com'
        ])->toArray();

        $this->call('POST', "{$this->path}/register", array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'non-matching',
        ]))
            ->assertStatus(422)
            ->assertJson([ 'password' => [ 'The password confirmation does not match.' ] ]);

        $this->call('POST', "{$this->path}/register", array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]))->assertCreated();

        $this->call('POST', "{$this->path}/register", array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]))
            ->assertStatus(422)
            ->assertJson([ 'email' => [ 'The email has already been taken.' ] ]);
    }

    public function testCreateUser()
    {
        $path = "{$this->path}/users";

        $user = factory(User::class)->make()->toArray();

        $this->actingAs($this->user);

        $this->call('POST', $path, array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]))->assertForbidden();
    }

    public function testCreateManager()
    {
        $path = "{$this->path}/users";

        $user = factory(User::class)->make()->toArray();

        $this->actingAs($this->manager);

        $this->call('POST', $path, array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => User::ADMIN
        ]))->assertForbidden();

        $this->call('POST', $path, array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'non-matching',
        ]))
            ->assertStatus(422)
            ->assertJson([ 'password' => [ 'The password confirmation does not match.' ] ]);

        $this->call('POST', $path, array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]))->assertCreated();
    }

    public function testCreateAdmin()
    {
        $path = "{$this->path}/users";

        $user = factory(User::class)->make()->toArray();

        $this->actingAs($this->admin);

        $this->call('POST', $path, array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'non-matching',
        ]))
            ->assertStatus(422)
            ->assertJson([ 'password' => [ 'The password confirmation does not match.' ] ]);

        $this->call('POST', $path, array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]))->assertCreated();

        $this->call('POST', $path, [
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => User::ADMIN
        ])
            ->assertStatus(422)
            ->assertJson([ 'name' => [ 'The name field is required.' ] ]);

        $this->call('POST', $path, array_merge($user, [
            'password' => 'password',
            'password_confirmation' => 'password',
        ]))
            ->assertStatus(422)
            ->assertJson([ 'email' => [ 'The email has already been taken.' ] ]);

        $this->call('POST', $path, [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => User::ADMIN
        ])
            ->assertCreated()
            ->assertJSON([
                'name' => 'John Doe',
                'email' => 'john@example.com',
            ]);
    }
}
