<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comercial;
use App\Models\Administrador;
use Illuminate\Support\Facades\Hash; // Necesario si vas a encriptar la contraseña

class ComercialController extends Controller
{
    // ==========================================
    // GUARDAR (CREAR)
    // ==========================================
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:100',
            'contacto'         => 'required|string|max:100',
            'email'            => 'required|email|unique:comerciales,email',
            'password'         => 'required|string',
            'id_administrador' => 'nullable|integer',
        ]);

        try {
            // 1. Busamos la entidad relacionada
            $administrador = Administrador::findOrFail($validatedData["id_administrador"]);

            // 2. Instanciamos el objeto con los datos básicos
            // Nota: Es recomendable encriptar la contraseña aquí
            $comercial = new Comercial([
                'nombre'   => $validatedData["nombre"],
                'contacto' => $validatedData["contacto"],
                'email'    => $validatedData["email"],
                'password' => Hash::make($validatedData["password"]),
            ]);

            // 3. Asociamos la relación
            $comercial->administrador()->associate($administrador);

            // 4. Guardamos
            $comercial->save();

            return response()->json([
                'message'   => 'Comercial creado con éxito.',
                'comercial' => $comercial,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el comercial.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ==========================================
    // MOSTRAR TODOS
    // ==========================================
    public function mostrar(Request $request){
        try{
            // Usamos eager loading para traer al administrador responsable
            $comerciales = Comercial::with(['administrador'])->get();

            return response()->json([
                'message'     => "Datos recogidos",
                'comerciales' => $comerciales
            ], 200);

        } catch(\Exception $e){
            return response()->json([
                'message' => 'Error al obtener los comerciales.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    // ==========================================
    // MOSTRAR UNO (POR ID EN REQUEST)
    // ==========================================
    public function mostrarComercial(Request $request)
    {
        try {
            // Adaptado al patrón: Request -> where -> get -> isEmpty
            $comercial = Comercial::with(['administrador'])
                            ->where("id_comercial", $request->id_comercial)
                            ->get();

            if ($comercial->isEmpty()) {
                return response()->json([
                    'message' => 'Comercial no encontrado'
                ], 404);
            }

            return response()->json([
                'message'   => "Comercial recogido",
                'comercial' => $comercial
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el Comercial',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    // ==========================================
    // ACTUALIZAR
    // ==========================================
    public function actualizar(Request $request){
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:100',
            'contacto'         => 'required|string|max:100',
            'email'            => 'required|email',
            'password'         => 'nullable|string',
            'id_administrador' => 'nullable|integer',
        ]);

        try{
            $comercial = Comercial::findOrFail($request->id_comercial);

            // Si viene contraseña nueva, idealmente habría que hashearla de nuevo
            if(isset($validatedData['password'])){
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $comercial->update($validatedData);

            return response()->json([
                'message'   => 'Comercial actualizado con éxito.',
                'comercial' => $comercial,
            ], 200);

        } catch (\Exception $e){
            return response()->json ([
                'message' => 'Error al actualizar el comercial.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ==========================================
    // ELIMINAR
    // ==========================================
    public function eliminar(Request $request){
         try{
            $comercial = Comercial::destroy($request->id_comercial);

            if ($comercial === 0) {
                return response()->json([
                    "message" => "No se encontró el comercial con ID " . $request->id_comercial
                ], 404);
            }

            return response()->json([
                "message" => "Comercial con id =" . $request->id_comercial . " ha sido borrado con éxito"
            ], 201);

        } catch(\Exception $e){
            return response()->json([
                "message" => "Error de base de datos al eliminar",
                "error"   => $e->getMessage()
            ], 500);
        }
    }
}
