<?php

class UserReadTest extends TestCase
{
    public function testWhoAmI()
    {
        $path = "{$this->path}/whoami";

        $this->call('GET', $path)
            ->assertOk();

        $this->actingAs($this->user);

        $this->call('GET', $path)
            ->assertOk();
    }

    public function testListUsers()
    {
        $path = "{$this->path}/users";

        $this->actingAs($this->user);

        $this->call('GET', $path)
            ->assertForbidden();

        $this->actingAs($this->manager);

        $response = $this->call('GET', $path);
        $response
            ->assertOk()
            ->assertJson([
            'current_page' => 1
        ]);
        $this->assertEquals(6, count($response['data']));

        $this->actingAs($this->admin);

        $response = $this->call('GET', $path);
        $response
            ->assertOk()
            ->assertJson([
                'current_page' => 1
            ]);
        $this->assertEquals(6, count($response['data']));
    }

    public function testShowAsUser()
    {
        $path = "{$this->path}/users";


        $this->actingAs($this->user);

        $this->call('GET', "{$path}/{$this->user->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->user->id ]);

        $this->call('GET', "{$path}/{$this->anotherUser->id}")
            ->assertForbidden();

        $this->call('GET', "{$path}/{$this->manager->id}")
            ->assertForbidden();

        $this->call('GET', "{$path}/{$this->admin->id}")
            ->assertForbidden();


        $this->actingAs($this->manager);

        $this->call('GET', "{$path}/{$this->user->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->user->id ]);

        $this->call('GET', "{$path}/{$this->manager->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->manager->id ]);

        $this->call('GET', "{$path}/{$this->anotherManager->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->anotherManager->id ]);

        $this->call('GET', "{$path}/{$this->admin->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->admin->id ]);


        $this->actingAs($this->admin);

        $this->call('GET', "{$path}/{$this->user->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->user->id ]);

        $this->call('GET', "{$path}/{$this->manager->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->manager->id ]);

        $this->call('GET', "{$path}/{$this->admin->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->admin->id ]);

        $this->call('GET', "{$path}/{$this->anotherAdmin->id}")
            ->assertOk()
            ->assertJson([ 'id' => $this->anotherAdmin->id ]);;
    }
}
