<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Cookie;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users|max:256',
            'name' => 'required|max:256',
            'password' => 'required|confirmed|min:6'
        ]);

        $input = $request->only('email', 'name', 'password');

        $user = new User();
        $user->fill($input);
        $user->password = $input['password'];
        $user->role = User::USER;

        $user->save();

        return $this->respondWithToken(Auth::login($user), 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'message' => 'Incorrect credentials'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        Auth::logout();
        return response(null, 204);
    }

    private function respondWithToken($token, $status = 200)
    {
        $expiresIn = Auth::factory()->getTTL() * 60;
        $tokenName = config('auth.cookie');

        return response([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $expiresIn,
            'user' => Auth::user()
        ], $status)->cookie(new Cookie($tokenName, $token, time() + $expiresIn));
    }
}
