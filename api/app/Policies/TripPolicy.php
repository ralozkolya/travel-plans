<?php

namespace App\Policies;

use App\Models\Trip;
use App\Models\User;

class TripPolicy
{
    public function show(User $user, $target)
    {
        return $user->isAdmin() || $user->id === $target->id;
    }

    public function update(User $user, Trip $trip)
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $trip->user_id;
    }
}
