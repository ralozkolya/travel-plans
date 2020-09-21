<?php

namespace App\Policies;

use App\Models\Trip;
use App\Models\User;

class TripPolicy
{
    public function update(User $user, Trip $trip)
    {
        return $user->isAdmin() || $user->id === $trip->user_id;
    }
}
