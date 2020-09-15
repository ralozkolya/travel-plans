<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TripsController extends Controller
{
    private $perPage = 20;

    public function index()
    {
        // TODO: figure out the way to remove this call
        // Need to retrieve Eloquent instance, otherwise linter complains
        $user = User::findOrFail(Auth::user()->id);

        if ($user->isAdmin()) {
            return Trip::paginate($this->perPage);
        }

        return $user->trips()->paginate($this->perPage);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'destination' => 'required|max:256',
            'start_date' => 'required|date|before:end_date',
            'end_date' => 'required|date|after:start_date',
            'comment' => 'max:1024'
        ]);

        $trip = new Trip();
        $trip->fill($request->only([ 'destination', 'start_date', 'end_date', 'comment' ]));
        $trip->user_id = Auth::user()->id;

        $trip->save();

        return $trip;
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'destination' => 'max:256|required_without_all:start_date,end_date,comment',
            'start_date' => 'date|before:end_date|required_without_all:destination,end_date,comment|required_with:end_date',
            'end_date' => 'date|after:start_date|required_without_all:destination,start_date,comment|required_with:start_date',
            'comment' => 'max:102|required_without_all:destination,start_date,end_date'
        ]);

        $trip = Trip::findOrFail($id);
        Gate::authorize('update', $trip);

        $trip->destination = $request->get('destination', $trip->destination);
        $trip->start_date = $request->get('start_date', $trip->start_date);
        $trip->end_date = $request->get('end_date', $trip->end_date);
        $trip->comment = $request->get('comment', $trip->comment);

        $trip->save();

        return response(null, 204);
    }

    public function destroy($id)
    {
        $trip = Trip::findOrFail($id);
        Gate::authorize('update', $trip);

        $trip->delete();

        return response(null, 204);
    }
}
