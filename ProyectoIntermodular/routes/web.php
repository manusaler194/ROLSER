<?php
//1 Crear la tabla 2Creaar el model 3 La ruta 4 el controlador 5 vista
//Laravel extension pack
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComercialController;


Route::get('/', function () {
    return view('welcome');
});

Route::view('/login', 'login')->name('logininicio');
Route::post('/login-usuario', [ComercialController::class, 'login'])->name('login');


Route::view('/registrar', 'registrar')->name('registrarinicio');
Route::post('/registrar-usuario', [ComercialController::class, 'registro'])->name('registrar');


