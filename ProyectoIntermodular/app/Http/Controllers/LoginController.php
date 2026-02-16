<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
public function login(Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Mapeo exacto de tus tablas y roles [cite: 2026-02-11]
    $guards = [
        'admin_api'      => 'admin',
        'clientevip_api' => 'cliente vip',
        'cliente_api'    => 'cliente',
        'comercial_api'  => 'comercial',
        'encargado_api'  => 'encargado de almacen'
    ];

    foreach ($guards as $guard => $roleName) {
        // Intentamos entrar por cada "puerta" (tabla) [cite: 2026-02-11]
        if (Auth::guard($guard)->attempt($credentials)) {
            $user = Auth::guard($guard)->user();

            // Generamos el token de Sanctum para que React lo use
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'role' => $roleName // Esto es lo que lee tu response.data en React
            ]);
        }
    }

    return response()->json(['message' => 'Usuario no encontrado'], 401);
}
}
