<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    private $perPage = 20;

    public function index()
    {
        Gate::authorize('list', User::class);
        return User::paginate($this->perPage);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        Gate::authorize('show', $user);
        return $user;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users|max:256',
            'name' => 'required|max:256',
            'password' => 'required|confirmed|min:6',
            'role' => [ Rule::in(User::ROLES), 'required' ]
        ]);

        $input = $request->only('email', 'name', 'password', 'role');

        Gate::authorize('create', [ User::class, $input['role'] ]);

        $user = new User();
        $user->fill($input);
        $user->password = $input['password'];
        $user->role = $input['role'];

        $user->save();

        return response($user, 201);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'max:256|required_without:role',
            'role' => [ Rule::in(User::ROLES), 'required_without:name' ]
        ]);

        $user = User::findOrFail($id);
        Gate::authorize('update', [ $user, $request->get('role') ]);

        $user->name = $request->get('name', $user->name);
        $user->role = $request->get('role', $user->role);

        $user->save();

        return response(null, 204);
    }

    public function password(Request $request, $id)
    {
        $this->validate($request, [
            'your_password' => 'required',
            'password' => 'confirmed|min:6|required'
        ]);

        $user = User::findOrFail($id);
        Gate::authorize('update', $user);

        $credentials = [
            'email' => Auth::user()->email,
            'password' => $request->get('your_password')
        ];

        if (!Auth::attempt($credentials)) {
            return response([ 'error' => 'Incorrect password' ], 403);
        }

        $user->password = $request->get('password', $user->password);

        $user->save();

        return response(null, 204);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        Gate::authorize('delete', $user);

        $user->delete();

        return response(null, 204);
    }

    public function whoami()
    {
        return Auth::user();
    }
}
