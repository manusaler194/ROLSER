<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response{
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        // Detecta el rol según el nombre del Modelo
        $userRole = strtolower(class_basename($user));

        if (!in_array($userRole, $roles)) {
            return response()->json([
                'message' => "Acceso denegado. Tu rol es $userRole y no tiene permiso aquí."
            ], 403);
        }

        return $next($request);
    }
}
