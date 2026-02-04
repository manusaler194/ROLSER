

<?php

use App\Http\Controllers\ComercialController;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\AdministradorController;
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

Route::post('/guardarComercial', [ComercialController::class, 'guardar'])->name('guardarComercial');

require __DIR__.'/auth.php';
