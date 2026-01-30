<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Almacen;

class AlmacenController extends Controller{

    public function mostrar(Request $request){
        $datos = Almacen::all();
        return $datos;
    }
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'direccion' => 'required|string|max:255',
            'capacidad' => 'nullable|string',
            'id_encargado' => 'nullable|string',
        ]);
    }
}
