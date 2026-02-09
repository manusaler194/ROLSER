<?php

namespace App\Http\Controllers;
use App\Models\Catalogo;
use App\Models\Administrador;
use Illuminate\Http\Request;

class CatalogoController extends Controller{
                                              
    public function mostrarCatalogos(Request $request) {
        try{
            $catalogo = Catalogo::with("administradores")->get();
            return response()->json([
                'message' => "Datos recogidos",
                'catalogo' => $catalogo
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los administradores.',
            'error' => $e->getMessage()
        ], 500);
        }
    }

    public function catalogoNuevo(Request $request) {
       $validatedData = $request->validate([
            'nombre_catalogo' => 'required|string|max: 100',
            'anyo' => 'required|numeric',
            'id_administrador' => 'nullable|integer',
        ]);

        try {
            $administrador = Administrador::findOrFail($validatedData['id_administrador']);

            $catalogo = new Catalogo([
                'nombre_catalogo' => $validatedData['nombre_catalogo'],
                'anyo' => $validatedData['anyo'],
            ]);

            $catalogo->administradores()->associate($administrador);
            $catalogo->save();

            return response()->json([
                'mensaje' => 'Catálogo creado con éxito.',
                'catalogo' => $catalogo,
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
            'nombre_catalogo' => 'required|string|max: 100',
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
