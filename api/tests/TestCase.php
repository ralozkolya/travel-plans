<?php

use App\Models\Trip;
use App\Models\User;
use Laravel\Lumen\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    public const PATH = '/api/v1';

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
            'user1' => factory(User::class)->create(),
            'user2' => factory(User::class)->create(),
            'manager1' => factory(User::class)->create([ 'role' => User::MANAGER ]),
            'manager2' => factory(User::class)->create([ 'role' => User::MANAGER ]),
            'admin1' => factory(User::class)->create([ 'role' => User::ADMIN ]),
            'admin2' => factory(User::class)->create([ 'role' => User::ADMIN ]),
        ];
    }
}
