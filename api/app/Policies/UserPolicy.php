<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function update(User $user) {
        return $user->role === User::ADMIN
            || $user->role === User::MANAGER;
    }

    public function show(User $requestor, User $target) {
        return $this->update($requestor)
            || $requestor->id === $target->id;
    }
}
