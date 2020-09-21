<?php

use App\Models\Trip;

class TripTest extends TestCase
{
    public function testTripsAdmin()
    {
        $path = "{$this->path}/trips";

        $newTrip = factory(Trip::class)->make();

        $this->assignTrips();

        $this->actingAs($this->admin);

        $response = $this->call('GET', $path);
        $response->assertOk();

        $response = $this->call('GET', "{$path}/past");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/{$this->managerTrip->id}");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/month?dl=0");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/month");
        $response->assertOk();

        $response = $this->call('POST', "{$path}", $newTrip->toArray());
        $response->assertCreated();

        $response = $this->call('PATCH', "{$path}/{$this->userTrip->id}", [ 'end_date' => '1968-10-12' ]);
        $response
            ->assertStatus(422)
            ->assertJson([ 'start_date' => [ 'The start date field is required when end date is present.' ] ]);

        $response = $this->call('PATCH', "{$path}/{$this->anotherAdminTrip->id}", [ 'end_date' => '2030-13-12' ]);
        $response
            ->assertStatus(422)
            ->assertJson([ 'end_date' => [ 'The end date is not a valid date.' ] ]);

        $response = $this->call('PATCH', "{$path}/{$this->adminTrip->id}", [
            'end_date' => '2030-12-12', 'start_date' => '2030-12-13'
        ]);
        $response
            ->assertStatus(422)
            ->assertJson([ 'end_date' => [ 'The end date must be a date after start date.' ] ]);

        $response = $this->call('PATCH', "{$path}/{$this->anotherAdminTrip->id}", [ 'comment' => 'New Comment' ]);
        $response->assertNoContent();

        $response = $this->call('DELETE', "{$path}/{$this->anotherAdminTrip->id}");
        $response->assertNoContent();
    }

    public function testTripsManager()
    {
        $path = "{$this->path}/trips";

        $newTrip = factory(Trip::class)->make();

        $this->assignTrips();

        $this->actingAs($this->manager);

        $response = $this->call('GET', $path);
        $response->assertOk();

        $response = $this->call('GET', "{$path}/past");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/{$this->managerTrip->id}");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/{$this->anotherManagerTrip->id}");
        $response->assertForbidden();

        $response = $this->call('GET', "{$path}/month?dl=0");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/month");
        $response->assertOk();

        $response = $this->call('POST', "{$path}", $newTrip->toArray());
        $response->assertCreated();

        $response = $this->call('PATCH', "{$path}/{$this->adminTrip->id}", [ 'comment' => 'irrelevant' ]);
        $response->assertForbidden();

        $response = $this->call('PATCH', "{$path}/{$this->anotherManagerTrip->id}", [ 'destination' => 'irrelevant' ]);
        $response->assertForbidden();

        $response = $this->call('DELETE', "{$path}/{$this->userTrip->id}");
        $response->assertForbidden();

        $response = $this->call('DELETE', "{$path}/{$this->managerTrip->id}");
        $response->assertNoContent();
    }

    public function testTripsUser()
    {
        $path = "{$this->path}/trips";

        $newTrip = factory(Trip::class)->make();

        $this->assignTrips();

        $this->actingAs($this->user);

        $response = $this->call('GET', $path);
        $response->assertOk();

        $response = $this->call('GET', "{$path}/past");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/{$this->userTrip->id}");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/{$this->adminTrip->id}");
        $response->assertForbidden();

        $response = $this->call('GET', "{$path}/month?dl=0");
        $response->assertOk();

        $response = $this->call('GET', "{$path}/month");
        $response->assertOk();

        $response = $this->call('POST', "{$path}", $newTrip->toArray());
        $response->assertCreated();

        $response = $this->call('PATCH', "{$path}/{$this->anotherUserTrip->id}", [ 'destination' => 'irrelevant' ]);
        $response->assertForbidden();

        $response = $this->call('PATCH', "{$path}/{$this->anotherManagerTrip->id}", [ 'comment' => 'irrelevant' ]);
        $response->assertForbidden();

        $response = $this->call('DELETE', "{$path}/{$this->adminTrip->id}");
        $response->assertForbidden();

        $response = $this->call('DELETE', "{$path}/{$this->managerTrip->id}");
        $response->assertForbidden();

        $response = $this->call('DELETE', "{$path}/{$this->userTrip->id}");
        $response->assertNoContent();
    }
}
