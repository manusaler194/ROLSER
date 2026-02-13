

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
//1 Crear la tabla 2Creaar el model 3 La ruta 4 el controlador 5 vista
//Laravel extension pack

/* -------------------------------------------------------------------------- */
/* FACTURAS                                  */
/* -------------------------------------------------------------------------- */
Route::get('/mostrar/facturas', [FacturaController::class, 'mostrar'])->name("mostrarFacturas");
Route::get('/mostrar/factura/{id_factura}', [FacturaController::class, 'mostrarFactura']);
require __DIR__.'/auth.php';
