<?php

namespace App\Http\Controllers;
use App\Models\Articulo;
use App\Models\Seccion;
use App\Models\Administrador;
use App\Models\Catalogo;
use Illuminate\Http\Request;


class ArticuloController extends Controller {

    public function mostrarArticulos(Request $request) {
        try{
            $articulo = Articulo::all();
            return response()->json([
                'message' => "Datos recogidos",
                'almacen' => $articulo
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los almacenes.',
            'error' => $e->getMessage()
        ], 500);
        }
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
            $seccion = Seccion::findOrFail($validatedData['id_seccion']);
            $administrador = Administrador::findOrFail($validatedData['id_administrador']);

            $articulo = new Articulo([
                'descripcion' => $validatedData['descripcion'],
                'precio' => $validatedData['precio'],
                'stock_actual' => $validatedData['stock_actual'],
            ]);

            $articulo->secciones()->associate($seccion);
            $articulo->administradores()->associate($administrador);
            $articulo->save();

            return response()->json([
                'mensaje' => 'Articulo creado con éxito.',
                'articulo' => $articulo,
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
            'nombre' => 'required|string',
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


    public function guardarCatalogo(Request $request){
        // 1️⃣ Validar datos
        $request->validate([
            'nombre_catalogo' => 'required|string|max:255',
            'anyo' => 'required|integer',
            'id_administrador' => 'required|integer',
            'articulos' => 'nullable|array',
            'articulos.*' => 'integer',
        ]);

        // 2️⃣ Crear el catálogo
        $catalogo = Catalogo::create([
            'nombre_catalogo' => $request->nombre_catalogo,
            'anyo' => $request->anyo,
            'id_administrador' => $request->id_administrador,
        ]);

        // 3️⃣ Asociar artículos si los hay
        if ($request->has('articulos')) {
            $catalogo->articulos()->attach($request->articulos, [
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response()->json([
            'success' => true,
            'id_catalogo' => $catalogo->id,
        ]);
    }

    public function mostrarArticulosPorCatalogo($id_catalogo){
        $catalogo = Catalogo::with('articulos')->find($id_catalogo);

        if (!$catalogo) {
            return response()->json(['error' => 'Catálogo no encontrado'], 404);
        }

        return response()->json([
            'catalogoNombre' => $catalogo->nombre_catalogo,
            'articulos' => $catalogo->articulos
        ]);
    }



}
