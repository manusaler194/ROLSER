<?php

namespace App\Http\Controllers\Api;
use App\Models\Administrador;
use App\Models\Comercial;
use App\Models\Cliente;
use App\Models\ClienteVip;
use App\Models\EncargadoAlmacen;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $roles = [
            'admin' => \App\Models\Administrador::class,
            'comercial' => \App\Models\Comercial::class,
            'cliente' => \App\Models\Cliente::class,
            'clientevip' => \App\Models\ClienteVip::class,
            'encargado_almacen' => \App\Models\EncargadoAlmacen::class,
        ];

        foreach ($roles as $rolNombre => $modelo) {
            $user = $modelo::where('email', $request->email)->first();

            if ($user && Hash::check($request->password, $user->password)) {
                $token = $user->createToken('token-name')->plainTextToken;

                return response()->json([
                    'status' => 'success',
                    'token' => $token,
                    'user' => $user,
                    'role' => $rolNombre
                ]);
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Credenciales no válidas en ninguna de nuestras bases de datos.'
        ], 401);
    }
}
