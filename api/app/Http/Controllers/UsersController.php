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

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'max:256|required_without_all:password,role',
            'password' => 'confirmed|min:6|required_without_all:name,role',
            'role' => [ Rule::in(User::ROLES), 'required_without_all:name,password' ]
        ]);

        $user = User::findOrFail($id);
        Gate::authorize('update', [ $user, $request->get('role') ]);

        $user->name = $request->get('name', $user->name);
        $user->password = $request->get('password', $user->password);
        $user->role = $request->get('role', $user->role);

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
