<?php

use App\Http\Controllers\AdministradorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\PedidoController;
use App\Models\Almacen;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/almacenes', [AlmacenController::class, 'mostrar']);
Route::post('/almacenes/guardar', [AlmacenController::class, 'guardar']);
Route::put('/almacenes/actualizar/{id_almacen}', [AlmacenController::class, 'actualizar']);
Route::delete('/almacenes/borrar/{id_almacen}', [AlmacenController::class, 'eliminar']);

Route::get('/almacenes', [AlmacenController::class, 'mostrar']);
Route::get('/administradores', [AdministradorController::class, 'index']);
Route::get('/users', [AdministradorController::class, 'userIndex']);


Route::post('/pedidos/guardar', [PedidoController::class, 'guardar']);
Route::get('/pedidos', [PedidoController::class, 'mostrar']);
Route::put('/pedidos/actualizar/{id_pedido}', [PedidoController::class, 'actualizar']);
Route::delete('/pedidos/borrar/{id_pedido}', [PedidoController::class, 'eliminar']);
