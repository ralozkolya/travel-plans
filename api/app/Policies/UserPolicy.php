<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function list(User $user)
    {
        return $user->isAdmin() || $user->isManager();
    }

    public function show(User $user, $target)
    {
        return $this->list($user)
            || $user->id === $target->id;
    }

    public function update(User $user, $target, $role = null)
    {
        // Admin can always change anything
        if ($user->isAdmin()) {
            return true;
        }

        // Manager is only allowed to change regular users, promote them to managers, or demote themselves
        if ($user->isManager()) {
            if ($role) {
                return $role === User::MANAGER && $target->isUser();
            }

            return $target->isUser() || $user->id === $target->id;
        }

        // Otherwise no promotions and only updating oneselves
        return !$role && $user->id === $target->id;
    }

    public function delete(User $user, $target)
    {
        // Admin can always change anything, unless he's deleting the last admin
        if ($user->isAdmin()) {
            if ($target->isAdmin()) {
                $count = User::where([ 'role' => User::ADMIN ])->count();
                return $count > 1 ? true : Response::deny('Deleting only admin left');
            }
            return true;
        }

        // Manager can only delete regular users
        if ($user->isManager()) {
            return $target->role === User::USER;
        }

        return false;
    }
}
