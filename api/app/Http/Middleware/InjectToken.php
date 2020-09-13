<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class InjectToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $tokenName = config('auth.cookie');

        if (!$request->headers->has('Authorization') && $request->cookies->has($tokenName)) {
            Auth::setToken($request->cookies->get($tokenName));
        }

        return $next($request);
    }
}
