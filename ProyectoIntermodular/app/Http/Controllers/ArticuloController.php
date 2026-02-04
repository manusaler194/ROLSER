<?php

namespace App\Http\Controllers;
use App\Models\Articulo;
use Illuminate\Http\Request;

class ArticuloController extends Controller {

    public function mostrarArticulos(Request $request) {
        $articulos = Articulo::all();
        return $articulos;
    }

    public function articuloNuevo(Request $request) {
       $validatedData = $request->validate([
            'descripcion' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'stock_actual' => 'required|integer|min: 0',
            'id_seccion' => 'required|integer|nullable',
            'id_administrador' => 'required|integer|nullable',
        ]);

        try {
            $articulo = Articulo::create($validatedData);

            return response()->json([
                'mensaje' => 'Articulo creado con éxito.',
                'task' => $articulo,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'mensaje' => 'Error al crear el artículo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function articuloActualizar(Request $request){
        $validatedData = $request->validate([
            'descripcion' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'stock_actual' => 'required|integer|min: 0',
            'id_seccion' => 'nullable|integer',
            'id_administrador' => 'nullable|integer',
        ]);
        try{
            $articulo = Articulo::findOrFail($request->id_articulo);
            $articulo->update($validatedData);

            return response()->json([
                'message' => 'Artículo actualizado con éxito.',
                'almacen' => $articulo,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el artículo.',
                'error' => $e->getMessage(),
            ],500);
        }
    }


    public function eliminarArticulo(Request $request){
        $articulo = Articulo:: destroy($request->id_articulo);

        return response()->json([
            "message" => "Artículo con id =" . $request->id_articulo . " ha sido borrado con éxito"
        ],201);
    }
}
