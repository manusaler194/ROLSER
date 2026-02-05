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
        try {
            // Usamos 'findOrFail': si no existe, salta directo al catch
            $administrador = Administrador::findOrFail($id_administrador);

            return response()->json($administrador, 200);

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
                'admin' => $administrador
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los almacenes.',
            'error' => $e->getMessage()
        ], 500);
        }
    }

    // Función ACTUALIZAR (Update)
    public function actualizar(Request $request, $id_administrador) { 

    // 1. Validamos. NOTA: Quitamos 'password' de required y lo hacemos 'nullable'
    $validatedData = $request->validate([
        'nombre'    => 'required|string|max:50',
        'apellidos' => 'required|string|max:100',
        'telefono'  => 'required|string|max:20',
        'email' => 'required|email|max:100|unique:administradores,email,' . $id_administrador . ',id_administrador', 
        'password'  => 'nullable|string', // Cambiado a nullable
    ]);

    try {
        $administrador = Administrador::findOrFail($id_administrador);

        // 2. Lógica para la contraseña:
        // Si el usuario NO envió contraseña nueva, eliminamos ese campo del array
        // para que no se sobrescriba con null o vacío.
        if (empty($request->password)) {
            unset($validatedData['password']);
        } else {
            // Si envió contraseña, recuerda encriptarla si usas Hash en el modelo, 
            // o Laravel lo hará si tienes 'casts' o mutators. 
            // $validatedData['password'] = bcrypt($request->password); 
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

    // Función ELIMINAR (Delete)
    public function eliminar(Request $request){
        $administrador = Administrador::destroy($request->id_administrador);

        return response()->json([
            "message" => "Administrador con id =" . $request->id_administrador . " ha sido borrado con éxito"
        ],201);
    }
}
