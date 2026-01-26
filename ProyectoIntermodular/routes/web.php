<?php
//1 Crear la tabla 2Creaar el model 3 La ruta 4 el controlador 5 vista
//Laravel extension pack
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});
