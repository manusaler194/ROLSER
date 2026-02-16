

<?php

use App\Http\Controllers\FacturaController;
use Illuminate\Http\Request;
use App\Models\Almacen;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/mis-facturas', [FacturaController::class, 'misFacturas']);
});
Route::get('/mostrar/factura/{id_factura}', [FacturaController::class, 'mostrarFactura']);
Route::get('/mostrar/facturas/{tipo}/{id}', [FacturaController::class, 'mostrar'])->name("mostrarFacturas");
//Route::get('/mostrar/facturas/cliente/{id_cliente}', [FacturaController::class, 'mostrarFacturaCliente']);
//1 Crear la tabla 2Creaar el model 3 La ruta 4 el controlador 5 vista
//Laravel extension pack

/* -------------------------------------------------------------------------- */
/* FACTURAS                                  */
/* -------------------------------------------------------------------------- */
require __DIR__.'/auth.php';
