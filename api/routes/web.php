<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group([ 'prefix' => 'api/v1' ], function () use ($router) {

    $router->get('whoami', 'UsersController@whoami');

    $router->post('login', 'AuthController@login');
    $router->post('register', 'AuthController@register');

    $router->group([ 'middleware' => 'auth' ], function () use ($router) {

        // Restricted endpoints go here

        $router->post('logout', 'AuthController@logout');

        $router->get('users/{id}', 'UsersController@show');
        $router->get('users', 'UsersController@index');
        $router->post('users', 'UsersController@store');
        $router->patch('users/{id}', 'UsersController@update');
        $router->delete('users/{id}', 'UsersController@destroy');

        $router->get('trips/past', 'TripsController@past');
        $router->get('trips/month', 'TripsController@month');
        $router->get('trips/{id}', 'TripsController@show');
        $router->get('trips', 'TripsController@index');
        $router->post('trips', 'TripsController@store');
        $router->patch('trips/{id}', 'TripsController@update');
        $router->delete('trips/{id}', 'TripsController@destroy');
    });
});
