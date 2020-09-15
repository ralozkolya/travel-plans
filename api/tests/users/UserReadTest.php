<?php

use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UserReadTest extends TestCase
{
    use DatabaseMigrations;

    private $path;
    private $users;

    public function setUp(): void
    {
        parent::setUp();
        $this->path = $this::PATH;
        $this->users = $this->createUsers();
    }

    public function testEnsureAllUsers()
    {
        $users = User::all()->toArray();

        $this->assertIsArray($users);
        $this->assertEquals(6, count($users));
    }

    public function testListUsers()
    {
        [
            'user1' => $user,
            'manager1' => $manager,
            'admin1' => $admin
        ] = $this->users;

        $path = "{$this->path}/users";

        $this->actingAs($user);

        $this->call('GET', $path)
            ->assertForbidden();

        $this->actingAs($manager);

        $response = $this->call('GET', $path);
        $response
            ->assertOk()
            ->assertJson([
            'current_page' => 1
        ]);
        $this->assertEquals(6, count($response['data']));

        $this->actingAs($admin);

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
        [
            'user1' => $user,
            'user2' => $anotherUser,
            'manager1' => $manager,
            'manager2' => $anotherManager,
            'admin1' => $admin,
            'admin2' => $anotherAdmin,
        ] = $this->users;

        $path = "{$this->path}/users";


        $this->actingAs($user);

        $this->call('GET', "{$path}/{$user->id}")
            ->assertOk()
            ->assertJson([ 'id' => $user->id ]);

        $this->call('GET', "{$path}/{$anotherUser->id}")
            ->assertForbidden();

        $this->call('GET', "{$path}/{$manager->id}")
            ->assertForbidden();

        $this->call('GET', "{$path}/{$admin->id}")
            ->assertForbidden();


        $this->actingAs($manager);

        $this->call('GET', "{$path}/{$user->id}")
            ->assertOk()
            ->assertJson([ 'id' => $user->id ]);

        $this->call('GET', "{$path}/{$manager->id}")
            ->assertOk()
            ->assertJson([ 'id' => $manager->id ]);

        $this->call('GET', "{$path}/{$anotherManager->id}")
            ->assertOk()
            ->assertJson([ 'id' => $anotherManager->id ]);

        $this->call('GET', "{$path}/{$admin->id}")
            ->assertOk()
            ->assertJson([ 'id' => $admin->id ]);


        $this->actingAs($admin);

        $this->call('GET', "{$path}/{$user->id}")
            ->assertOk()
            ->assertJson([ 'id' => $user->id ]);

        $this->call('GET', "{$path}/{$manager->id}")
            ->assertOk()
            ->assertJson([ 'id' => $manager->id ]);

        $this->call('GET', "{$path}/{$admin->id}")
            ->assertOk()
            ->assertJson([ 'id' => $admin->id ]);

        $this->call('GET', "{$path}/{$anotherAdmin->id}")
            ->assertOk()
            ->assertJson([ 'id' => $anotherAdmin->id ]);;
    }
}
