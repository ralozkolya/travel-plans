<?php

use Illuminate\Support\Facades\Gate;

class TripPoliciesTest extends TestCase
{
    public function testTripPolicies()
    {
        $this->assignTrips();

        $this->actingAs($this->admin);

        $this->assertTrue(Gate::allows('update', $this->adminTrip));
        $this->assertTrue(Gate::allows('update', $this->anotherAdminTrip));
        $this->assertTrue(Gate::allows('update', $this->managerTrip));
        $this->assertTrue(Gate::allows('update', $this->userTrip));

        $this->actingAs($this->manager);

        $this->assertTrue(Gate::allows('update', $this->managerTrip));
        $this->assertTrue(Gate::denies('update', $this->anotherManagerTrip));
        $this->assertTrue(Gate::denies('update', $this->adminTrip));
        $this->assertTrue(Gate::denies('update', $this->userTrip));

        $this->actingAs($this->user);

        $this->assertTrue(Gate::allows('update', $this->userTrip));
        $this->assertTrue(Gate::denies('update', $this->anotherUserTrip));
        $this->assertTrue(Gate::denies('update', $this->managerTrip));
        $this->assertTrue(Gate::denies('update', $this->adminTrip));
    }
}
