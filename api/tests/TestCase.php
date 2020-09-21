<?php

use App\Models\Trip;
use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use DatabaseMigrations;

    public const PATH = '/api/v1';

    protected $path;
    protected $users;

    protected $user;
    protected $anotherUser;
    protected $manager;
    protected $anotherManager;
    protected $admin;
    protected $anotherAdmin;

    protected $trips;

    protected $userTrip;
    protected $anotherUserTrip;
    protected $managerTrip;
    protected $anotherManagerTrip;
    protected $adminTrip;
    protected $anotherAdminTrip;

    public function setUp(): void
    {
        parent::setUp();
        $this->path = $this::PATH;
        $this->users = $this->createUsers();

        $this->user = $this->users['user'];
        $this->anotherUser = $this->users['anotherUser'];
        $this->manager = $this->users['manager'];
        $this->anotherManager = $this->users['anotherManager'];
        $this->admin = $this->users['admin'];
        $this->anotherAdmin = $this->users['anotherAdmin'];
    }

    /**
     * Creates the application.
     *
     * @return \Laravel\Lumen\Application
     */
    public function createApplication()
    {
        return require __DIR__.'/../bootstrap/app.php';
    }

    protected function createUsers()
    {
        return [
            'user' => factory(User::class)->create(),
            'anotherUser' => factory(User::class)->create(),
            'manager' => factory(User::class)->create([ 'role' => User::MANAGER ]),
            'anotherManager' => factory(User::class)->create([ 'role' => User::MANAGER ]),
            'admin' => factory(User::class)->create([ 'role' => User::ADMIN ]),
            'anotherAdmin' => factory(User::class)->create([ 'role' => User::ADMIN ]),
        ];
    }

    protected function createTrips()
    {
        return [
            'userTrip' => factory(Trip::class)->create([ 'user_id' => $this->user->id ]),
            'anotherUserTrip' => factory(Trip::class)->create([ 'user_id' => $this->anotherUser->id ]),
            'managerTrip' => factory(Trip::class)->create([ 'user_id' => $this->manager->id ]),
            'anotherManagerTrip' => factory(Trip::class)->create([ 'user_id' => $this->anotherManager->id ]),
            'adminTrip' => factory(Trip::class)->create([ 'user_id' => $this->admin->id ]),
            'anotherAdminTrip' => factory(Trip::class)->create([ 'user_id' => $this->anotherAdmin->id ]),
        ];
    }

    protected function assignTrips()
    {
        $this->trips = $this->createTrips();

        $this->userTrip = $this->trips['userTrip'];
        $this->anotherUserTrip = $this->trips['anotherUserTrip'];
        $this->managerTrip = $this->trips['managerTrip'];
        $this->anotherManagerTrip = $this->trips['anotherManagerTrip'];
        $this->adminTrip = $this->trips['adminTrip'];
        $this->anotherAdminTrip = $this->trips['anotherAdminTrip'];
    }
}
