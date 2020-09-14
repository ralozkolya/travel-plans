<?php

namespace App\Http\Controllers;

use App\Models\Trip;

class TripsController extends Controller {

    public function index() {
        return Trip::all();
    }
}
