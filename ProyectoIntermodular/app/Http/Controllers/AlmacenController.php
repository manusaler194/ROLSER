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
            $encargado = EncargadoAlmacen::findOrFail($validatedData["id_encargado"]);

            $almacen = new Almacen([
                'direccion' => $validatedData["direccion"],
                'capacidad' => $validatedData["capacidad"]
            ]);

            $almacen->encargadoAlmacen()->associate($encargado);
            $almacen->save();

            return response()->json([
                'message' => 'Almacen creado con éxito.',
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
        try{
            $almacen = Almacen::all();
            return response()->json([
                'message' => "Datos recogidos",
                'almacen' => $almacen
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los almacenes.',
            'error' => $e->getMessage()
        ], 500);
        }
    }
    public function mostrarAlmacen(Request $request){
        try {
            $almacen = Almacen::with( 'encargadoAlmacen')->where("id_almacen", $request->id_almacen)->get();

            if (!$almacen) {
                return response()->json([
                    'message' => 'Almacén no encontrado'
                ], 404);
            }

            return response()->json([
                'message' => 'Datos recogidos',
                'almacen' => $almacen
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el almacén.',
                'error' => $e->getMessage()
            ], 500);
        }
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
        try{
            $almacen = Almacen::destroy($request->id_almacen);

            if ($almacen === 0) {
                return response()->json([
                    "message" => "No se encontró el almacén con ID " . $request->id_almacen
                ], 404);
            }
            return response()->json([
                "message" => "Almacén con id =" . $request->id_almacen . " ha sido borrado con éxito"

            ],201);
        }catch(\Exception $e){
            return response()->json([
                "message" => "Error de base de datos al eliminar",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
