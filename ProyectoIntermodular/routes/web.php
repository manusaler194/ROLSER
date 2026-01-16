<?php
//1 Crear la tabla 2Creaar el model 3 La ruta 4 el controlador 5 vista
//Laravel extension pack
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeliculasController;
use App\Http\Controllers\ArticulosController;
use App\Http\Controllers\DatosController;
use App\Http\Controllers\PruebasController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/ejercicio', [PruebasController::class, 'ejercicio'])->name('ejercicio');
Route::post('/mostrarArticulos', [PruebasController::class, 'mostrar'])->name('mostrar');


Route::get('/pruebas', [PruebasController::class, 'relacionUnoAMuchos'])->name('pruebas');




Route::get('/pelis', [PeliculasController::class, 'mostrar']);

Route::get('/articulos', [ArticulosController::class, 'visualizar']);

Route::get('/mostrar', [ArticulosController::class, 'informacion']);

//Name es el nombre de la ruta
Route::get('/index', [DatosController::class, 'index'])->name('index');

//Asi va a la vista directamente, no tiene sentido un controlador que te lleve a la vista
Route::view('/insertarFormulario','insertar')->name('insertar');


Route::post('/almacenar', [DatosController::class, 'almacenar'])->name('almacenar');

Route::delete('/borrar/{id}', [DatosController::class,'borrar'])->name('borrar');

Route::get('/editar/{id}', [DatosController::class,'editar'])->name('editar');

Route::patch('/actualizar/{id}', [DatosController::class,'actualizar'])->name('actualizar');
