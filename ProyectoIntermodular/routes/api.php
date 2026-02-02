<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlmacenController;
use App\Models\Almacen;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/almacenes', [AlmacenController::class, 'mostrar']);

Route::post('/almacenes/guardar', [AlmacenController::class, 'guardar']);

Route::put('/almacenes/actualizar/{id_almacen}', [AlmacenController::class, 'actualizar']);

Route::delete('/almacenes/borrar/{id_almacen}', [AlmacenController::class, 'eliminar']);
