<?php
//1 Crear la tabla 2Creaar el model 3 La ruta 4 el controlador 5 vista
//Laravel extension pack

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComercialController;
use App\Http\Controllers\AlmacenController;

use App\Http\Controllers\AdministradorController;
use Illuminate\Http\Request;

use App\Models\Almacen;



Route::get('/login', function () {
    return view('login'); // El nombre debe coincidir con el nombre de tu archivo .blade.php
})->name('login');
Route::get('/registrar', function () {
    return view('registrar'); // El nombre debe coincidir con el nombre de tu archivo .blade.php
})->name('registrar');
Route::get('/', function () {
    return view('welcome');
});

Route::get('/almacen',[AlmacenController::class,'mostrar'])->name('almacenMostrar');

// Route::view('/login', 'login')->name('logininicio');
// Route::post('/login-usuario', [ComercialController::class, 'login'])->name('login');


// Route::get('/almacenes', [AlmacenController::class, 'mostrar']);
Route::get('/administradores', [AdministradorController::class, 'index']);
Route::get('/encargado', [AlmacenController::class, 'encargado']);
