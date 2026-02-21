<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Importación de todos los Controladores
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\AdministradorController;
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


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/clientes/guardar', [ClienteController::class, 'guardar']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) { return $request->user(); });
        Route::get('/articulo', [ArticuloController::class, 'mostrarArticulos']);


    Route::middleware('role:administrador')->get('/test-admin', function () {
        return response()->json(['message' => 'Hola Jefe, el middleware funciona.']);
    });
    Route::middleware('role:comercial')->get('/test-comercial', function () {
        return response()->json(['message' => 'Hola Comercial, el middleware funciona.']);
    });
    Route::middleware('role:cliente,clientevip')->get('/test-cliente', function () {
        return response()->json(['message' => 'Acceso para clientes ok']);
    });
    Route::middleware('role:encargadoalmacen')->get('/test-almacen', function () {
        return response()->json(['message' => 'Stock y almacén bajo control']);
    });


    Route::middleware('role:administrador,comercial,encargadoalmacen,cliente,clientevip')->group(function () {
        Route::get('/secciones', [SeccionController::class, 'mostrar']);
        Route::get('/catalogo', [CatalogoController::class, 'mostrarCatalogos']);
        Route::get('/catalogo/{id_catalogo}/articulos', [ArticuloController::class, 'mostrarArticulosPorCatalogo']);

        Route::get('/pedidos', [PedidoController::class, 'mostrar']);
        Route::get('/pedidos/{id_pedido}', [PedidoController::class, 'mostrarPedido']);
        Route::post('/pedidos/guardar', [PedidoController::class, 'guardar']);
        Route::put('/pedidos/actualizar/{id_pedido}', [PedidoController::class, 'actualizar']);

        Route::get('/lineasPedido', [LineaPedidoController::class, 'mostrar']);
        Route::post('/lineasPedido/guardar', [LineaPedidoController::class, 'guardar']);
        Route::put('/lineasPedido/actualizar/{id_linea}', [LineaPedidoController::class, 'actualizar']);
    });

    Route::middleware('role:administrador,encargadoalmacen')->group(function () {
        Route::post('/articulo/guardar', [ArticuloController::class, 'articuloNuevo']);
        Route::put('/articulo/actualizar/{id_articulo}', [ArticuloController::class, 'articuloActualizar']);

        Route::post('/secciones/guardar', [SeccionController::class, 'guardar']);
        Route::put('/secciones/actualizar/{id_seccion}', [SeccionController::class, 'actualizar']);

        Route::post('/catalogo/guardar', [CatalogoController::class, 'catalogoNuevo']);
        Route::put('/catalogo/actualizar/{id_catalogo}', [CatalogoController::class, 'catalogoActualizar']);
    });


    Route::middleware('role:administrador,encargadoalmacen')->group(function () {
        Route::get('/almacenes', [AlmacenController::class, 'mostrar']);
        Route::get('/almacenes/{id_almacen}', [AlmacenController::class, 'mostrarAlmacen']);
        Route::post('/almacenes/guardar', [AlmacenController::class, 'guardar']);
        Route::put('/almacenes/actualizar/{id_almacen}', [AlmacenController::class, 'actualizar']);

        Route::get('/proveedor', [ProveedorController::class, 'mostrarProveedores']);
        Route::post('/proveedor/guardar', [ProveedorController::class, 'proveedorNuevo']);
        Route::put('/proveedor/actualizar/{id_proveedor}', [ProveedorController::class, 'proveedorActualizar']);

        Route::get('/pedidos/reposicion', [PedidoReposicionController::class, 'mostrar']);
        Route::get('/pedidos/reposicion/{id_pedidoReposicion}', [PedidoReposicionController::class, 'mostrarPedido']);
        Route::post('/pedidos/reposicion/guardar', [PedidoReposicionController::class, 'guardar']);
        Route::put('/pedidos/reposicion/actualizar/{id_pedidoReposicion}', [PedidoReposicionController::class, 'actualizar']);
    });


    Route::middleware('role:administrador,comercial')->group(function () {
        Route::get('/clientes', [ClienteController::class, 'mostrar']);
        Route::get('/clientes/{id_cliente}', [ClienteController::class, 'mostrarCliente']);
        Route::put('/clientes/actualizar/{id_cliente}', [ClienteController::class, 'actualizar']);

        Route::get('/clientesVip', [ClienteVipController::class, 'mostrar']);
        Route::get('/clientesVip/{id_clientevip}', [ClienteVipController::class, 'mostrarClienteVip']);
        Route::post('/clientesVip/guardar', [ClienteVipController::class, 'guardar']);
        Route::put('/clientesVip/actualizar/{id_clientevip}', [ClienteVipController::class, 'actualizar']);

        Route::get('/comerciales', [ComercialController::class, 'mostrar']);
        Route::get('/comerciales/{id_comercial}', [ComercialController::class, 'mostrarComercial']);
        Route::put('/comerciales/actualizar/{id_comercial}', [ComercialController::class, 'actualizar']);
    });

    Route::middleware('role:administrador')->group(function () {
        Route::get('/administradores', [AdministradorController::class, 'mostrar']);
        Route::get('/administradores/{id_administrador}', [AdministradorController::class, 'mostrarAdministrador']);
        Route::post('/administradores/guardar', [AdministradorController::class, 'guardar']);
        Route::put('/administradores/actualizar/{id_administrador}', [AdministradorController::class, 'actualizar']);
        Route::get('/users', [AdministradorController::class, 'userIndex']);

        Route::get('/encargadoAlmacen', [EncargadoAlmacenController::class, 'mostrar']);
        Route::get('/encargadoAlmacen/{id_cliente}', [EncargadoAlmacenController::class, 'mostrarEncargadoAlmacen']);
        Route::post('/encargadoAlmacen/guardar', [EncargadoAlmacenController::class, 'encargadoAlmacenNuevo']);
        Route::put('/encargadoAlmacen/actualizar/{id_encargado}', [EncargadoAlmacenController::class, 'encargadoAlmacenActualizar']);

        Route::post('/comerciales/guardar', [ComercialController::class, 'guardar']);

        Route::get('/mis-facturas', [FacturaController::class, 'misFacturas']);
        Route::get('/mostrar/factura/{id_factura}', [FacturaController::class, 'mostrarFactura']);
        Route::get('/mostrar/facturas/{tipo}/{id}', [FacturaController::class, 'mostrar']);

        Route::delete('/almacenes/borrar/{id_almacen}', [AlmacenController::class, 'eliminar']);
        Route::delete('/administradores/borrar/{id_administrador}', [AdministradorController::class, 'eliminar']);
        Route::delete('/pedidos/borrar/{id_pedido}', [PedidoController::class, 'eliminar']);
        Route::delete('/proveedor/borrar/{id_proveedor}', [ProveedorController::class, 'eliminarProveedor']);
        Route::delete('/catalogo/borrar/{id_catalogo}', [CatalogoController::class, 'eliminarCatalogo']);
        Route::delete('/articulo/borrar/{id_articulo}', [ArticuloController::class, 'eliminarArticulo']);
        Route::delete('/encargadoAlmacen/borrar/{id_encargado}', [EncargadoAlmacenController::class, 'eliminarEncargadoAlmacen']);
        Route::delete('/clientes/borrar/{id_cliente}', [ClienteController::class, 'eliminar']);
        Route::delete('/clientesVip/borrar/{id_clientevip}', [ClienteVipController::class, 'eliminar']);
        Route::delete('/lineasPedido/borrar/{id_linea}', [LineaPedidoController::class, 'eliminar']);
        Route::delete('/secciones/borrar/{id_seccion}', [SeccionController::class, 'eliminar']);
        Route::delete('/comerciales/borrar/{id_comercial}', [ComercialController::class, 'eliminar']);
        Route::delete('/pedidos/reposicion/borrar/{id_pedidoReposicion}', [PedidoReposicionController::class, 'eliminar']);
    });
});
