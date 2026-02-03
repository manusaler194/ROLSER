<?php

namespace App\Http\Controllers;
use App\Models\Proveedor; // Añadimos el modelo al controlador
use Illuminate\Http\Request;

class ProveedorController extends Controller {

    public function mostrarProveedores(Request $request) {
        // Cogemos todos los proveedores de la Base Datos
        $proveedores = Proveedor::all();
        return $proveedores;
    }

    public function proveedorNuevo(Request $request) {
       $validatedData = $request->validate([
            'nombre_empresa' => 'required|string|max: 100',
            'contacto' => 'required|string|max: 100',
            'cif' => 'required|string|max: 20',
            'id_encargado' => 'nullable|integer',
        ]);



        try {
            $proveedores = Proveedor::create($validatedData);

            return response()->json([
                'mensaje' => 'Proveedor creado con éxito.',
                'task' => $proveedores,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'mensaje' => 'Error al crear el proveedor.',
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
