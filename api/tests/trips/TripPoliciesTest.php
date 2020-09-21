<?php

use App\Models\Trip;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Laravel\Lumen\Testing\DatabaseMigrations;

class TripPoliciesTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testTripPolicies()
    {
        [
            'admin1' => $admin,
            'admin2' => $anotherAdmin,
            'manager1' => $manager,
            'manager2' => $anotherManager,
            'user1' => $user,
            'user2' => $anotherUser,
        ] = $this->createUsers();

        $adminTrip = factory(Trip::class)->create([
            'user_id' => $admin->id
        ]);

        $anotherAdminTrip = factory(Trip::class)->create([
            'user_id' => $anotherAdmin->id
        ]);

        $managerTrip = factory(Trip::class)->create([
            'user_id' => $manager->id
        ]);

        $anotherManagerTrip = factory(Trip::class)->create([
            'user_id' => $anotherManager->id
        ]);

        $userTrip = factory(Trip::class)->create([
            'user_id' => $user->id
        ]);

        $anotherUserTrip = factory(Trip::class)->create([
            'user_id' => $anotherUser->id
        ]);

        $this->actingAs($admin);

        $this->assertTrue(Gate::allows('update', $adminTrip));
        $this->assertTrue(Gate::allows('update', $anotherAdminTrip));
        $this->assertTrue(Gate::allows('update', $managerTrip));
        $this->assertTrue(Gate::allows('update', $userTrip));

        $this->actingAs($manager);

        $this->assertTrue(Gate::allows('update', $managerTrip));
        $this->assertTrue(Gate::denies('update', $anotherManagerTrip));
        $this->assertTrue(Gate::denies('update', $adminTrip));
        $this->assertTrue(Gate::denies('update', $userTrip));

        $this->actingAs($user);

        $this->assertTrue(Gate::allows('update', $userTrip));
        $this->assertTrue(Gate::denies('update', $anotherUserTrip));
        $this->assertTrue(Gate::denies('update', $managerTrip));
        $this->assertTrue(Gate::denies('update', $adminTrip));
    }
}
