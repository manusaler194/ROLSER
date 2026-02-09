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
        try {

            $administrador = Administrador::findOrFail($id_administrador);

            return response()->json($administrador, 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {

            return response()->json([
                'message' => 'Administrador no encontrado'
            ], 404);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al obtener el administrador',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function userIndex()
    {

        $datos = [
            'admins'   => Administrador::all(),
            'clientes'          => Cliente::all(),
            'vips'      => ClienteVip::all(),
            'encargados'        => EncargadoAlmacen::all(),
            'comerciales'       => Comercial::all(),
        ];

        return response()->json($datos, 200);
    }


    public function mostrar(Request $request){
        try{
            $administrador = Administrador::all();
            return response()->json([
                'message' => "Datos recogidos",
                'administrador' => $administrador
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los almacenes.',
            'error' => $e->getMessage()
        ], 500);
        }
    }


    public function actualizar(Request $request, $id_administrador) {


    $validatedData = $request->validate([
        'nombre'    => 'required|string|max:50',
        'apellidos' => 'required|string|max:100',
        'telefono'  => 'required|string|max:20',
        'email' => 'required|email|max:100|unique:administradores,email,' . $id_administrador . ',id_administrador',
        'password'  => 'nullable|string',
    ]);

    try {
        $administrador = Administrador::findOrFail($id_administrador);


        if (empty($request->password)) {
            unset($validatedData['password']);
        } else {

        }

        $administrador->update($validatedData);

        return response()->json([
            'message' => 'Administrador actualizado con éxito.',
            'administrador' => $administrador,
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error al actualizar el administrador.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    public function eliminar(Request $request){
        $administrador = Administrador::destroy($request->id_administrador);

        return response()->json([
            "message" => "Administrador con id =" . $request->id_administrador . " ha sido borrado con éxito"
        ],201);
    }
}
