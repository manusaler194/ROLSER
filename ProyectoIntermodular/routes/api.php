<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\EncargadoAlmacenController;
use App\Http\Controllers\ProveedorController;
use App\Models\Almacen;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/almacenes', [AlmacenController::class, 'mostrar']);
Route::post('/almacenes/guardar', [AlmacenController::class, 'guardar']);
Route::put('/almacenes/actualizar/{id_almacen}', [AlmacenController::class, 'actualizar']);
Route::delete('/almacenes/borrar/{id_almacen}', [AlmacenController::class, 'eliminar']);


Route::get('/proveedor', [ProveedorController::class, 'mostrarProveedores']);
Route::post('/proveedor/guardar', [ProveedorController::class, 'proveedorNuevo']);
Route::put('/proveedor/actualizar/{id_proveedor}', [ProveedorController::class, 'proveedorActualizar']);
Route::delete('/proveedor/borrar/{id_proveedor}', [ProveedorController::class, 'eliminarProveedor']);

Route::get('/catalogo', [CatalogoController::class, 'mostrarCatalogos']);
Route::post('/catalogo/guardar', [CatalogoController::class, 'catalogoNuevo']);
Route::put('/catalogo/actualizar/{id_catalogo}', [CatalogoController::class, 'catalogoActualizar']);
Route::delete('/catalogo/borrar/{id_catalogo}', [CatalogoController::class, 'eliminarCatalogo']);

// Poner el método, /articulo la ruta, de que controlador, y lo último nombre del método al que se refiere
Route::get('/articulo', [ArticuloController::class, 'mostrarArticulos']);
Route::post('/articulo/guardar', [ArticuloController::class, 'articuloNuevo']);
Route::put('/articulo/actualizar/{id_articulo}', [ArticuloController::class, 'articuloActualizar']);
Route::delete('/articulo/borrar/{id_articulo}', [ArticuloController::class, 'eliminarArticulo']);

Route::get('/encargadoAlmacen', [EncargadoAlmacenController::class, 'mostrarEncargadoAlmacen']);
Route::post('/encargadoAlmacen/guardar', [EncargadoAlmacenController::class, 'encargadoAlmacenNuevo']);
Route::put('/encargadoAlmacen/actualizar/{id_encargado}', [EncargadoAlmacenController::class, 'encargadoAlmacenActualizar']);
Route::delete('/encargadoAlmacen/borrar/{id_encargado}', [EncargadoAlmacenController::class, 'eliminarEncargadoAlmacen']);
