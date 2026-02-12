<?php

use App\Http\Controllers\AdministradorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PedidoReposicionController;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\EncargadoAlmacenController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ClienteVipController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\LineaPedidoController;
use App\Http\Controllers\SeccionController;
use App\Http\Controllers\ComercialController;
use App\Http\Controllers\Api\AuthController;
use App\Models\Almacen;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'role:administrador'])->get('/test-admin', function () {
    return response()->json(['message' => 'Hola Jefe, el middleware funciona.']);
});

Route::middleware(['auth:sanctum', 'role:comercial'])->get('/test-comercial', function () {
    return response()->json(['message' => 'Hola Comercial, el middleware funciona.']);
});

Route::middleware('role:cliente,clientevip')->get('/test-cliente', function () {
    return response()->json(['message' => 'Acceso para clientes ok']);
});

Route::middleware('role:clientevip')->get('/test-vip', function () {
    return response()->json(['message' => 'Bienvenido a la zona de lujo, VIP']);
});

Route::middleware('role:encargadoalmacen')->get('/test-almacen', function () {
    return response()->json(['message' => 'Stock y almacén bajo control']);
});

Route::get('/almacenes', [AlmacenController::class, 'mostrar']);
Route::get('/almacenes/{id_almacen}', [AlmacenController::class, 'mostrarAlmacen']);
Route::post('/almacenes/guardar', [AlmacenController::class, 'guardar']);
Route::put('/almacenes/actualizar/{id_almacen}', [AlmacenController::class, 'actualizar']);
Route::delete('/almacenes/borrar/{id_almacen}', [AlmacenController::class, 'eliminar']);

/* -------------------------------------------------------------------------- */
/* ADMINISTRADORES                                 */
/* -------------------------------------------------------------------------- */
Route::get('/administradores', [AdministradorController::class, 'mostrar']);
Route::get('/administradores/{id_administrador}', [AdministradorController::class, 'mostrarAdministrador']);
Route::post('/administradores/guardar', [AdministradorController::class, 'guardar']);
Route::put('/administradores/actualizar/{id_administrador}', [AdministradorController::class, 'actualizar']);
Route::delete('/administradores/borrar/{id_administrador}', [AdministradorController::class, 'eliminar']);
Route::get('/users', [AdministradorController::class, 'userIndex']);
//-------------------------------------------------------------------------------------------------------------
Route::post('/pedidos/guardar', [PedidoController::class, 'guardar']);
Route::get('/pedidos', [PedidoController::class, 'mostrar']);
Route::get('/pedidos/{id_pedido}', [PedidoController::class, 'mostrarPedido']);
Route::put('/pedidos/actualizar/{id_pedido}', [PedidoController::class, 'actualizar']);
Route::delete('/pedidos/borrar/{id_pedido}', [PedidoController::class, 'eliminar']);

/* -------------------------------------------------------------------------- */
/* PROVEEDOR                                 */
/* -------------------------------------------------------------------------- */
Route::get('/proveedor', [ProveedorController::class, 'mostrarProveedores']);
Route::post('/proveedor/guardar', [ProveedorController::class, 'proveedorNuevo']);
Route::put('/proveedor/actualizar/{id_proveedor}', [ProveedorController::class, 'proveedorActualizar']);
Route::delete('/proveedor/borrar/{id_proveedor}', [ProveedorController::class, 'eliminarProveedor']);
/* -------------------------------------------------------------------------- */
/* CATALOGO                                 */
/* -------------------------------------------------------------------------- */
Route::get('/catalogo', [CatalogoController::class, 'mostrarCatalogos']);
Route::post('/catalogo/guardar', [CatalogoController::class, 'catalogoNuevo']);
Route::put('/catalogo/actualizar/{id_catalogo}', [CatalogoController::class, 'catalogoActualizar']);
Route::delete('/catalogo/borrar/{id_catalogo}', [CatalogoController::class, 'eliminarCatalogo']);
/* -------------------------------------------------------------------------- */
/* ARTICULO                                 */
/* -------------------------------------------------------------------------- */
// Poner el método, /articulo la ruta, de que controlador, y lo último nombre del método al que se refiere
Route::get('/articulo', [ArticuloController::class, 'mostrarArticulos']);
Route::post('/articulo/guardar', [ArticuloController::class, 'articuloNuevo']);
Route::put('/articulo/actualizar/{id_articulo}', [ArticuloController::class, 'articuloActualizar']);
Route::delete('/articulo/borrar/{id_articulo}', [ArticuloController::class, 'eliminarArticulo']);
/* -------------------------------------------------------------------------- */
/* ENCARGADO ALMACEN                                 */
/* -------------------------------------------------------------------------- */
Route::get('/encargadoAlmacen', [EncargadoAlmacenController::class, 'mostrar']);
Route::post('/encargadoAlmacen/guardar', [EncargadoAlmacenController::class, 'encargadoAlmacenNuevo']);
Route::put('/encargadoAlmacen/actualizar/{id_encargado}', [EncargadoAlmacenController::class, 'encargadoAlmacenActualizar']);
Route::delete('/encargadoAlmacen/borrar/{id_encargado}', [EncargadoAlmacenController::class, 'eliminarEncargadoAlmacen']);
Route::get('/encargadoAlmacen/{id_cliente}', [EncargadoAlmacenController::class, 'mostrarEncargadoAlmacen']);
/* -------------------------------------------------------------------------- */
/* CLIENTES                                 */
/* -------------------------------------------------------------------------- */
Route::get('/clientes', [ClienteController::class, 'mostrar']);
Route::post('/clientes/guardar', [ClienteController::class, 'guardar']);
Route::put('/clientes/actualizar/{id_cliente}', [ClienteController::class, 'actualizar']);
Route::delete('/clientes/borrar/{id_cliente}', [ClienteController::class, 'eliminar']);
Route::get('/clientes/{id_cliente}', [ClienteController::class, 'mostrarCliente']);
/* -------------------------------------------------------------------------- */
/* CLIENTES VIP                                */
/* -------------------------------------------------------------------------- */
Route::get('/clientesVip', [ClienteVipController::class, 'mostrar']);
Route::post('/clientesVip/guardar', [ClienteVipController::class, 'guardar']);
Route::put('/clientesVip/actualizar/{id_clientevip}', [ClienteVipController::class, 'actualizar']);
Route::delete('/clientesVip/borrar/{id_clientevip}', [ClienteVipController::class, 'eliminar']);
Route::get('/clientesVip/{id_clientevip}', [ClienteVipController::class, 'mostrarClienteVip']);
/* -------------------------------------------------------------------------- */
/* FACTURAS                                  */
/* -------------------------------------------------------------------------- */
Route::get('/facturas', [FacturaController::class, 'mostrar']);
Route::post('/facturas/guardar', [FacturaController::class, 'guardar']);
Route::put('/facturas/actualizar/{id_factura}', [FacturaController::class, 'actualizar']);
Route::delete('/facturas/borrar/{id_factura}', [FacturaController::class, 'eliminar']);

/* -------------------------------------------------------------------------- */
/* LINEAS PEDIDO                               */
/* -------------------------------------------------------------------------- */
Route::get('/lineasPedido', [LineaPedidoController::class, 'mostrar']);
Route::post('/lineasPedido/guardar', [LineaPedidoController::class, 'guardar']);
Route::put('/lineasPedido/actualizar/{id_linea}', [LineaPedidoController::class, 'actualizar']);
Route::delete('/lineasPedido/borrar/{id_linea}', [LineaPedidoController::class, 'eliminar']);

/* -------------------------------------------------------------------------- */
/* SECCIONES                                 */
/* -------------------------------------------------------------------------- */
Route::get('/secciones', [SeccionController::class, 'mostrar']);
Route::post('/secciones/guardar', [SeccionController::class, 'guardar']);
Route::put('/secciones/actualizar/{id_seccion}', [SeccionController::class, 'actualizar']);
Route::delete('/secciones/borrar/{id_seccion}', [SeccionController::class, 'eliminar']);

/* -------------------------------------------------------------------------- */
/* COMERCIALES                                */
/* -------------------------------------------------------------------------- */
Route::get('/comerciales', [ComercialController::class, 'mostrar']);
Route::post('/comerciales/guardar', [ComercialController::class, 'guardar']);
Route::put('/comerciales/actualizar/{id_comercial}', [ComercialController::class, 'actualizar']);
Route::delete('/comerciales/borrar/{id_comercial}', [ComercialController::class, 'eliminar']);
Route::get('/comerciales/{id_comercial}', [ComercialController::class, 'mostrarComercial']);


/* -------------------------------------------------------------------------- */
/* ARTICULO-CATÁLOGO                               */
/* -------------------------------------------------------------------------- */
Route::post('/catalogo/guardar', [ArticuloController::class, 'guardarCatalogo']);

//******************************************* */
Route::post('/pedidos/reposicion/guardar', [PedidoReposicionController::class, 'guardar']);
Route::get('/pedidos/reposicion', [PedidoReposicionController::class, 'mostrar']);
Route::get('/pedidos/reposicion/{id_pedidoReposicion}', [PedidoReposicionController::class, 'mostrarPedido']);
Route::put('/pedidos/reposicion/actualizar/{id_pedidoReposicion}', [PedidoReposicionController::class, 'actualizar']);
Route::delete('/pedidos/reposicion/borrar/{id_pedidoReposicion}', [PedidoReposicionController::class, 'eliminar']);
