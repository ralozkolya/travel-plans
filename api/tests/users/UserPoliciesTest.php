<?php

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UserPoliciesTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testAdminPolicies()
    {
        $admin = factory(User::class)->create([
            'role' => User::ADMIN
        ]);

        $anotherAdmin = factory(User::class)->create([
            'role' => User::ADMIN
        ]);

        $manager = factory(User::class)->create([
            'role' => User::MANAGER
        ]);

        $user = factory(User::class)->create();

        $this->actingAs($admin);

        $this->assertTrue(Gate::allows('list', User::class));

        $this->assertTrue(Gate::allows('show', $user));
        $this->assertTrue(Gate::allows('show', $manager));
        $this->assertTrue(Gate::allows('show', $admin));
        $this->assertTrue(Gate::allows('show', $anotherAdmin));

        $this->assertTrue(Gate::allows('update', $user));
        $this->assertTrue(Gate::allows('update', [ $user, null ]));
        $this->assertTrue(Gate::allows('update', [ $user, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $user, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $user, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $manager));
        $this->assertTrue(Gate::allows('update', [ $manager, null ]));
        $this->assertTrue(Gate::allows('update', [ $manager, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $manager, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $manager, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $admin));
        $this->assertTrue(Gate::allows('update', [ $admin, null ]));
        $this->assertTrue(Gate::allows('update', [ $admin, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $admin, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $admin, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $anotherAdmin));
        $this->assertTrue(Gate::allows('update', [ $anotherAdmin, null ]));
        $this->assertTrue(Gate::allows('update', [ $anotherAdmin, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $anotherAdmin, User::MANAGER ]));
        $this->assertTrue(Gate::allows('update', [ $anotherAdmin, User::ADMIN ]));

        $this->assertTrue(Gate::allows('delete', $user));
        $this->assertTrue(Gate::allows('delete', $manager));
        $this->assertTrue(Gate::allows('delete', $anotherAdmin));
        $this->assertTrue(Gate::allows('delete', $admin));
    }

    public function testManagerPolicies()
    {
        $admin = factory(User::class)->create([
            'role' => User::ADMIN
        ]);

        $manager = factory(User::class)->create([
            'role' => User::MANAGER
        ]);

        $anotherManager = factory(User::class)->create([
            'role' => User::MANAGER
        ]);

        $user = factory(User::class)->create();

        $this->actingAs($manager);

        $this->assertTrue(Gate::allows('list', User::class));

        $this->assertTrue(Gate::allows('show', $user));
        $this->assertTrue(Gate::allows('show', $manager));
        $this->assertTrue(Gate::allows('show', $anotherManager));
        $this->assertTrue(Gate::allows('show', $admin));

        $this->assertTrue(Gate::allows('update', $user));
        $this->assertTrue(Gate::allows('update', [ $user, null ]));
        $this->assertTrue(Gate::allows('update', [ $user, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $user, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $user, User::ADMIN ]));

        $this->assertTrue(Gate::allows('update', $manager));
        $this->assertTrue(Gate::allows('update', [ $manager, null ]));
        $this->assertTrue(Gate::allows('update', [ $manager, User::USER ]));
        $this->assertTrue(Gate::allows('update', [ $manager, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $manager, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $anotherManager));
        $this->assertTrue(Gate::denies('update', [ $anotherManager, null ]));
        $this->assertTrue(Gate::denies('update', [ $anotherManager, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $anotherManager, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $anotherManager, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $admin));
        $this->assertTrue(Gate::denies('update', [ $admin, null ]));
        $this->assertTrue(Gate::denies('update', [ $admin, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $admin, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $admin, User::ADMIN ]));

        $this->assertTrue(Gate::allows('delete', $user));
        $this->assertTrue(Gate::allows('delete', $manager));
        $this->assertTrue(Gate::denies('delete', $anotherManager));
        $this->assertTrue(Gate::denies('delete', $admin));
    }

    public function testUserPolicies()
    {
        $admin = factory(User::class)->create([
            'role' => User::ADMIN
        ]);

        $manager = factory(User::class)->create([
            'role' => User::MANAGER
        ]);

        $user = factory(User::class)->create();
        $anotherUser = factory(User::class)->create();

        $this->actingAs($user);

        $this->assertTrue(Gate::denies('list', User::class));

        $this->assertTrue(Gate::allows('show', $user));
        $this->assertTrue(Gate::denies('show', $anotherUser));
        $this->assertTrue(Gate::denies('show', $manager));
        $this->assertTrue(Gate::denies('show', $admin));

        $this->assertTrue(Gate::allows('update', $user));
        $this->assertTrue(Gate::allows('update', [ $user, null ]));
        $this->assertTrue(Gate::denies('update', [ $user, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $user, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $user, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $anotherUser));
        $this->assertTrue(Gate::denies('update', [ $anotherUser, null ]));
        $this->assertTrue(Gate::denies('update', [ $anotherUser, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $anotherUser, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $anotherUser, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $manager));
        $this->assertTrue(Gate::denies('update', [ $manager, null ]));
        $this->assertTrue(Gate::denies('update', [ $manager, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $manager, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $manager, User::ADMIN ]));

        $this->assertTrue(Gate::denies('update', $admin));
        $this->assertTrue(Gate::denies('update', [ $admin, null ]));
        $this->assertTrue(Gate::denies('update', [ $admin, User::USER ]));
        $this->assertTrue(Gate::denies('update', [ $admin, User::MANAGER ]));
        $this->assertTrue(Gate::denies('update', [ $admin, User::ADMIN ]));

        $this->assertTrue(Gate::denies('delete', $user));
        $this->assertTrue(Gate::denies('delete', $anotherUser));
        $this->assertTrue(Gate::denies('delete', $manager));
        $this->assertTrue(Gate::denies('delete', $admin));
    }
}
