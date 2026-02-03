<?php

namespace App\Http\Controllers;
use App\Models\Catalogo;
use Illuminate\Http\Request;

class CatalogoController extends Controller{

    public function mostrarCatalogos(Request $request) {
        $catalogos = Catalogo::all();
        return $catalogos;
    }

    public function catalogoNuevo(Request $request) {
       $validatedData = $request->validate([
            'nombre_temporada' => 'required|string|max: 100',
            'anyo' => 'required|numeric',
            'id_administrador' => 'nullable|integer',
        ]);



        try {
            $catalogo = Catalogo::create($validatedData);

            return response()->json([
                'mensaje' => 'Catálogo creado con éxito.',
                'task' => $catalogo,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'mensaje' => 'Error al crear el catálogo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function catalogoActualizar(Request $request){
        $validatedData = $request->validate([
            'nombre_temporada' => 'required|string|max: 100',
            'anyo' => 'required|numeric',
            'id_administrador' => 'nullable|integer',
        ]);
        try{
            $catalogo = Catalogo::findOrFail($request->id_catalogo);
            $catalogo->update($validatedData);

            return response()->json([
                'message' => 'Catálogo actualizado con éxito.',
                'almacen' => $catalogo,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el catálogo.',
                'error' => $e->getMessage(),
            ],500);
        }
    }


    public function eliminarCatalogo(Request $request){
        $catalogo = Catalogo:: destroy($request->id_catalogo);

        return response()->json([
            "message" => "catálogo con id =" . $request->id_catalogo . " ha sido borrado con éxito"
        ],201);
    }


}
