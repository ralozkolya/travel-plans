<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;

    public const USER = 'user';
    public const MANAGER = 'manager';
    public const ADMIN = 'admin';
    public const ROLES = [ User::USER, User::MANAGER, User::ADMIN ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function isAdmin()
    {
        return $this->role === User::ADMIN;
    }

    public function isManager()
    {
        return $this->role === User::MANAGER;
    }

    public function isUser()
    {
        return $this->role === User::USER;
    }

    public function setPasswordAttribute($value)
    {
        if (password_get_info($value)['algoName'] === 'unknown') {
            $value = Hash::make($value, [ 'rounds' => 12 ]);
        }

        $this->attributes['password'] = $value;
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
