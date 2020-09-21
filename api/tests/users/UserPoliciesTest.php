<?php

use App\Models\User;
use Illuminate\Support\Facades\Gate;

class UserPoliciesTest extends TestCase
{
    public function testAdminPolicies()
    {
        $this->actingAs($this->admin);

        $this->assertTrue(Gate::allows('list', User::class));

        $this->assertTrue(Gate::allows('show', $this->user));
        $this->assertTrue(Gate::allows('show', $this->manager));
        $this->assertTrue(Gate::allows('show', $this->admin));
        $this->assertTrue(Gate::allows('show', $this->anotherAdmin));

        $this->assertTrue(Gate::allows('create', User::class));
        $this->assertTrue(Gate::allows('create', [ User::class, null ]));
        $this->assertTrue(Gate::allows('create', [ User::class, User::USER ]));
        $this->assertTrue(Gate::allows('create', [ User::class, User::MANAGER ]));
        $this->assertTrue(Gate::allows('create', [ User::class, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $this->user));
        $this->assertTrue(Gate::allows('update', [ $this->user, null ]));
        $this->assertTrue(Gate::allows('update', [ $this->user, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $this->user, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $this->user, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $this->manager));
        $this->assertTrue(Gate::allows('update', [ $this->manager, null ]));
        $this->assertTrue(Gate::allows('update', [ $this->manager, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $this->manager, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $this->manager, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $this->admin));
        $this->assertTrue(Gate::allows('update', [ $this->admin, null ]));
        $this->assertTrue(Gate::allows('update', [ $this->admin, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $this->admin, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $this->admin, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $this->anotherAdmin));
        $this->assertTrue(Gate::allows('update', [ $this->anotherAdmin, null ]));
        $this->assertTrue(Gate::allows('update', [ $this->anotherAdmin, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $this->anotherAdmin, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $this->anotherAdmin, User::ADMIN ]));

        $this->assertTrue(Gate::allows('delete', $this->user));
        $this->assertTrue(Gate::allows('delete', $this->manager));
        $this->assertTrue(Gate::allows('delete', $this->anotherAdmin));
        $this->assertTrue(Gate::allows('delete', $this->admin));
    }

    public function testManagerPolicies()
    {
        $this->actingAs($this->manager);

        $this->assertTrue(Gate::allows('list', User::class));

        $this->assertTrue(Gate::allows('show', $this->user));
        $this->assertTrue(Gate::allows('show', $this->manager));
        $this->assertTrue(Gate::allows('show', $this->anotherManager));
        $this->assertTrue(Gate::allows('show', $this->admin));

        $this->assertTrue(Gate::allows('create', User::class));
        $this->assertTrue(Gate::allows('create', [ User::class, null ]));
        $this->assertTrue(Gate::allows('create', [ User::class, User::USER ]));
        $this->assertTrue(Gate::allows('create', [ User::class, User::MANAGER ]));
        $this->assertTrue(Gate::denies('create', [ User::class, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $this->user));
        $this->assertTrue(Gate::allows('update', [ $this->user, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->user, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $this->user, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->user, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $this->manager));
        $this->assertTrue(Gate::allows('update', [ $this->manager, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->manager, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $this->manager, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->manager, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $this->anotherManager));
        $this->assertTrue(Gate::denies('update', [ $this->anotherManager, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->anotherManager, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $this->anotherManager, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->anotherManager, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $this->admin));
        $this->assertTrue(Gate::denies('update', [ $this->admin, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->admin, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $this->admin, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->admin, User::ADMIN ]));

        $this->assertTrue(Gate::allows('delete', $this->user));
        $this->assertTrue(Gate::denies('delete', $this->manager));
        $this->assertTrue(Gate::denies('delete', $this->anotherManager));
        $this->assertTrue(Gate::denies('delete', $this->admin));
    }

    public function testUserPolicies()
    {
        $this->actingAs($this->user);

        $this->assertTrue(Gate::denies('list', User::class));

        $this->assertTrue(Gate::allows('show', $this->user));
        $this->assertTrue(Gate::denies('show', $this->anotherUser));
        $this->assertTrue(Gate::denies('show', $this->manager));
        $this->assertTrue(Gate::denies('show', $this->admin));

        $this->assertTrue(Gate::denies('create', User::class));
        $this->assertTrue(Gate::denies('create', [ User::class, null ]));
        $this->assertTrue(Gate::denies('create', [ User::class, User::USER ]));
        $this->assertTrue(Gate::denies('create', [ User::class, User::MANAGER ]));
        $this->assertTrue(Gate::denies('create', [ User::class, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $this->user));
        $this->assertTrue(Gate::allows('update', [ $this->user, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->user, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $this->user, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->user, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $this->anotherUser));
        $this->assertTrue(Gate::denies('update', [ $this->anotherUser, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->anotherUser, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $this->anotherUser, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->anotherUser, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $this->manager));
        $this->assertTrue(Gate::denies('update', [ $this->manager, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->manager, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $this->manager, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->manager, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $this->admin));
        $this->assertTrue(Gate::denies('update', [ $this->admin, null ]));
        $this->assertTrue(Gate::denies('update', [ $this->admin, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $this->admin, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $this->admin, User::ADMIN ]));

        $this->assertTrue(Gate::denies('delete', $this->user));
        $this->assertTrue(Gate::denies('delete', $this->anotherUser));
        $this->assertTrue(Gate::denies('delete', $this->manager));
        $this->assertTrue(Gate::denies('delete', $this->admin));
    }
}
