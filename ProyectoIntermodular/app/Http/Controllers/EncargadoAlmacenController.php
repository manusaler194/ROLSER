<?php

namespace App\Http\Controllers;
use App\Models\EncargadoAlmacen;
use Illuminate\Http\Request;

class EncargadoAlmacenController extends Controller{

    public function mostrarEncargadoAlmacen(Request $request) {
        $encargadoAlmacen = EncargadoAlmacen::all();
        return $encargadoAlmacen;
    }

    public function encargadoAlmacenNuevo(Request $request) {
       $validatedData = $request->validate([
            'nombre' => 'required|string|max: 50',
            'telefono' => 'required|string|max: 20',
            'email' => 'required|string|min: 255',
        ]);

        try {
            $encargadoAlmacen = EncargadoAlmacen::create($validatedData);

            return response()->json([
                'mensaje' => 'Encargado de almacén creado con éxito.',
                'task' => $encargadoAlmacen,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'mensaje' => 'Error al crear el encargado de almacén.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function encargadoAlmacenActualizar(Request $request){
        $validatedData = $request->validate([
            'nombre' => 'required|string|max: 50',
            'telefono' => 'required|string|max: 20',
            'email' => 'required|string|min: 255',
        ]);
        try{
            $encargadoAlmacen= EncargadoAlmacen::findOrFail($request->id_encargado);
            $encargadoAlmacen->update($validatedData);

            return response()->json([
                'message' => 'Artículo actualizado con éxito.',
                'encargadoAlmacen' => $encargadoAlmacen,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el artículo.',
                'error' => $e->getMessage(),
            ],500);
        }
    }


    public function eliminarEncargadoAlmacen(Request $request){
        $encargadoAlmacen = EncargadoAlmacen:: destroy($request->id_encargado);

        return response()->json([
            "message" => "Artículo con id =" . $request->id_encargado . " ha sido borrado con éxito"
        ],201);
    }


}
