<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Almacen;
use App\Models\EncargadoAlmacen;
use Database\Seeders\EncargadoAlmacenSeeder;

class AlmacenController extends Controller{

    public function guardar(Request $request){
        $validatedData = $request->validate([
            'direccion' => 'required|string|max:255',
            'capacidad' => 'required|integer|min:0',
            'id_encargado' => 'nullable|integer',
        ]);

        try {
            $almacen = Almacen::create($validatedData);

            return response()->json([
                'message' => 'Almacen creada con éxito.',
                'almacen' => $almacen,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el almacen.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        $datos = Almacen::all();
        return $datos;
    }


    public function actualizar (Request $request){

        $validatedData = $request->validate([
            'direccion' => 'required|string|max:255',
            'capacidad' => 'required|integer|min:0',
            'id_encargado' => 'required|integer',
        ]);
        try{
            $almacen = Almacen::findOrFail($request->id_almacen);
            $almacen->update($validatedData);

            return response()->json([
                'message' => 'Almacen actualizado con éxito.',
                'almacen' => $almacen,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el almacen.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function eliminar(Request $request){
        $almacen = Almacen:: destroy($request->id_almacen);

        return response()->json([
            "message" => "Almacen con id =" . $request->id_almacen . " ha sido borrado con éxito"

        ],201);
    }
}
