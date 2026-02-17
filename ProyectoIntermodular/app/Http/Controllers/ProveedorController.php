<?php

namespace App\Http\Controllers;

use App\Models\EncargadoAlmacen;
use App\Models\Proveedor; // Añadimos el modelo al controlador
use Illuminate\Http\Request;

class ProveedorController extends Controller {

    public function mostrarProveedores(Request $request) {
        try{
            $proveedor = Proveedor::all();
            return response()->json([
                'message' => "Datos recogidos",
                'proveedor' => $proveedor
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los almacenes.',
            'error' => $e->getMessage()
        ], 500);
        }
    }

    public function proveedorNuevo(Request $request) {
       $validatedData = $request->validate([
            'nombre_empresa' => 'required|string|max: 100',
            'contacto' => 'required|string|max: 100',
            'cif' => 'required|string|max: 20',
            'id_encargado' => 'nullable|integer',
        ]);

        try {
            $encargado = EncargadoAlmacen::findOrFail($validatedData['id_encargado']);

            $proveedor = new Proveedor([
                'nombre_empresa' => $validatedData['nombre_empresa'],
                'contacto' => $validatedData['contacto'],
                'cif' => $validatedData['cif'],
            ]);

            $proveedor->encargados_de_almacen()->associate($encargado);
            $proveedor->save();

            return response()->json([
                'mensaje' => 'Encargado creado con éxito.',
                'encargado' => $encargado,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Error al crear el Encargado.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function proveedorActualizar(Request $request){
        $validatedData = $request->validate([
            'nombre_empresa' => 'required|string|max: 100',
            'contacto' => 'required|string|max: 100',
            'cif' => 'required|string|max: 20',
            'id_encargado' => 'nullable|integer',
        ]);
        try{
            $proveedor = Proveedor::findOrFail($request->id_proveedor);
            $proveedor->update($validatedData);

            return response()->json([
                'message' => 'Proveedor actualizado con éxito.',
                'almacen' => $proveedor,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el proveedor.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function eliminarProveedor(Request $request){
        $proveedor = Proveedor:: destroy($request->id_proveedor);

        return response()->json([
            "message" => "Proveedor con id =" . $request->id_proveedor . " ha sido borrado con éxito"
        ],201);
    }
}
