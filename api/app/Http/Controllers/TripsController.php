<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\User;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TripsController extends Controller
{
    private $perPage = 5;
    private $dateFormat = 'Y-m-d';

    public function index(Request $request)
    {
        $user = User::findOrFail(Auth::user()->id);

        $collection = Trip::orderBy('start_date')
            ->where('end_date', '>', $this->getDate('now'));

        $q = $request->get('q');

        if ($q) {
            $collection->where(function ($query) use ($q) {
                $query->where('destination', 'like', '%'.$q.'%');
                $query->orWhere('comment', 'like', '%'.$q.'%');
            });
        }

        if (!$user->isAdmin()) {
            $collection->where([ 'user_id' => $user->id ]);
        }

        return $collection->paginate($this->perPage);
    }

    public function past()
    {
        $user = User::findOrFail(Auth::user()->id);

        $collection = Trip::orderBy('start_date')
            ->where('end_date', '<', $this->getDate('now'));

        if (!$user->isAdmin()) {
            $collection->where([ 'user_id' => $user->id ]);
        }

        return $collection->take(5)->get();
    }

    public function month(Request $request)
    {
        $user = User::findOrFail(Auth::user()->id);

        $collection = $user->trips()
            ->where('start_date', '>=', $this->getDate('now'))
            ->where('start_date', '<', $this->getDate('1 month'))
            ->orderBy('start_date');

        $data = [
            'trips' => $collection->get(),
            'start' => $this->getDate('now'),
            'end' => $this->getDate('1 month'),
            'user' => $user
        ];

        if ($request->get('dl') === '0') {
            return view('next-month-plan', $data);
        }

        return PDF::loadView('next-month-plan', $data)->download('plan.pdf');
    }

    public function show($id)
    {
        $trip = Trip::findOrFail($id);
        Gate::authorize('update', $trip);
        return $trip;
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

        return response($trip, 201);
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

    private function getDate($str)
    {
        return date($this->dateFormat, strtotime($str));
    }
}
