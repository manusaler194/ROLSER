<?php

namespace App\Http\Controllers;
use App\Models\EncargadoAlmacen;
use Illuminate\Http\Request;

class EncargadoAlmacenController extends Controller{

    public function mostrar(Request $request) {
        $encargadoAlmacen = EncargadoAlmacen::all();
        return $encargadoAlmacen;
    }

    public function mostrarEncargadoAlmacen($id_encargado)
    {
        try {
            // Usamos 'findOrFail': si no existe, salta directo al catch
            $encargado = EncargadoAlmacen::findOrFail($id_encargado);

            return response()->json($encargado, 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Capturamos específicamente cuando el ID no existe
            return response()->json([
                'message' => 'Administrador no encontrado'
            ], 404);

        } catch (\Exception $e) {
            // Capturamos cualquier otro error (BD caída, errores de sintaxis, etc.)
            return response()->json([
                'message' => 'Error al obtener el administrador',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function encargadoAlmacenNuevo(Request $request) {
       $validatedData = $request->validate([
            'nombre' => 'required|string|max: 50',
            'telefono' => 'required|string|max: 20',
            'email' => 'required|string|max: 255',
        ]);

        try {

            $encargadoAlmacen = new EncargadoAlmacen([
                'nombre' => $validatedData['nombre'],
                'telefono' => $validatedData['telefono'],
                'email' => $validatedData['email'],
            ]);

            $encargadoAlmacen->save();

            return response()->json([
                'mensaje' => 'Encargado almacén creado con éxito.',
                'encargadoAlmacen' => $encargadoAlmacen,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Error al crear el encargado almacén.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function encargadoAlmacenActualizar(Request $request){
        $validatedData = $request->validate([
            'nombre' => 'required|string|max: 50',
            'telefono' => 'required|string|max: 20',
            'email' => 'required|string|max: 255',
        ]);
        try{
            $encargadoAlmacen= EncargadoAlmacen::findOrFail($request->id_encargado);
            $encargadoAlmacen->update($validatedData);

            return response()->json([
                'message' => 'Encargado actualizado con éxito.',
                'encargado' => $encargadoAlmacen,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el Encargado.',
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
