<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\ClienteVip;
use App\Models\EncargadoAlmacen;
use App\Models\Comercial;
class AdministradorController extends Controller

{
    // Función GUARDAR (Create)
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'nombre'    => 'required|string|max:50',
            'apellidos' => 'required|string|max:100',
            'telefono'  => 'required|string|max:20',
            'email'     => 'required|email|max:100|unique:administradores,email',
            'password'  => 'required|string',
        ]);

        try {
            $administrador = Administrador::create($validatedData);

            return response()->json([
                'message' => 'Administrador creado con éxito.',
                'administrador' => $administrador,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el administrador.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function mostrarAdministrador($id_administrador)
    {
        $administrador = Administrador::find($id_administrador);

        if (!$administrador) {
            return response()->json(['message' => 'Administrador no encontrado'], 404);
        }

        return response()->json($administrador, 200);
    }
    public function userIndex()
    {
        // 1. Recopilamos los datos de todos los modelos que ya tienes
        $datos = [
            'admins'   => Administrador::all(),
            'clientes'          => Cliente::all(),
            'vips'      => ClienteVip::all(),
            'encargados'        => EncargadoAlmacen::all(),
            'comerciales'       => Comercial::all(),
        ];

        // 2. Devolvemos todo junto en un JSON
        return response()->json($datos, 200);
    }

    // Función MOSTRAR (Read)
    public function mostrar(Request $request){
        try{
            $administrador = Administrador::all();
            return response()->json([
                'message' => "Datos recogidos",
                'almacen' => $administrador
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los almacenes.',
            'error' => $e->getMessage()
        ], 500);
        }
    }

    // Función ACTUALIZAR (Update)
    public function actualizar (Request $request){

        $validatedData = $request->validate([
            'nombre'    => 'required|string|max:50',
            'apellidos' => 'required|string|max:100',
            'telefono'  => 'required|string|max:20',
            'email'     => 'required|email|max:100',
            'password'  => 'required|string',
        ]);

        try{

            $administrador = Administrador::findOrFail($request->id_administrador);

            $administrador->update($validatedData);

            return response()->json([
                'message' => 'Administrador actualizado con éxito.',
                'administrador' => $administrador,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el administrador.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    // Función ELIMINAR (Delete)
    public function eliminar(Request $request){
        $administrador = Administrador::destroy($request->id_administrador);

        return response()->json([
            "message" => "Administrador con id =" . $request->id_administrador . " ha sido borrado con éxito"
        ],201);
    }
}
