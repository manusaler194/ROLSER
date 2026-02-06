<?php

namespace App\Http\Controllers;
use App\Models\Seccion;
use Illuminate\Http\Request;

class SeccionController extends Controller
{
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'stock'      => 'required|integer|min:0',
            'id_almacen' => 'nullable|integer',
        ]);

        try {
            $seccion = Seccion::create($validatedData);

            return response()->json([
                'message' => 'Sección creada con éxito.',
                'seccion' => $seccion,
            ], 201); 

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear la sección.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        $datos = Seccion::all();
        return $datos;
    }

    public function actualizar (Request $request){

        $validatedData = $request->validate([
            'stock'      => 'required|integer|min:0',
            'id_almacen' => 'nullable|integer',
        ]);
        
        try{
            
            $seccion = Seccion::findOrFail($request->id_seccion);
            $seccion->update($validatedData);

            return response()->json([
                'message' => 'Sección actualizada con éxito.',
                'seccion' => $seccion,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar la sección.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function eliminar(Request $request){
        
        $seccion = Seccion::destroy($request->id_seccion);

        return response()->json([
            "message" => "Sección con id =" . $request->id_seccion . " ha sido borrada con éxito"

        ],201);
    }
}