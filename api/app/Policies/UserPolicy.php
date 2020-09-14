<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Http\Request;

class UserPolicy
{
    public function list(User $user) {
        return $user->role === User::ADMIN
            || $user->role === User::MANAGER;
    }

    public function show(User $user, $target) {
        return $this->list($user)
            || $user->id === $target->id;
    }

    public function update(User $user, $target, $role = null) {

        // Admin can always change anything
        if ($user->role === User::ADMIN) {
            return true;
        }

        // Manager is only allowed to change regular users, promote them to managers, or demote themselves
        if ($user->role === User::MANAGER) {
            return $role !== User::ADMIN
                && ($target->role === User::USER || $user->id === $target->id);
        }

        // Otherwise no promotions and only updating oneselves
        return !$role && $user->id === $target->id;
    }

    public function delete(User $user, $target) {

        // Admin can always change anything
        if ($user->role === User::ADMIN) {
            return true;
        }

        // Manager can only delete regular users, or themselves
        if ($user->role === User::MANAGER) {
            return $target->role === User::USER || $user->id === $target->id;
        }

        return false;
    }
}
