<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UsersController extends Controller {

    public function __construct()
    {
        $this->middleware('users', [
            'except' => 'show'
        ]);
    }

    public function list() {
        return User::paginate(10);
    }

    public function show($id) {
        $user = User::findOrFail($id);
        Gate::authorize('show', $user);
        return $user;
    }
}
