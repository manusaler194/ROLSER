<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
class ClienteController extends Controller
{
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:50',
            'telefono'         => 'required|string|max:20',
            'correo'           => 'required|string|max:255',
            'direccion'        => 'required|string|max:255',
            'id_administrador' => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
        ]);

        try {
            $cliente = Cliente::create($validatedData);

            return response()->json([
                'message' => 'Cliente creado con éxito.',
                'cliente' => $cliente,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el cliente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        try{
            $cliente = Cliente::all();
            return response()->json([
                'message' => "Datos recogidos",
                'almacen' => $cliente
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los almacenes.',
            'error' => $e->getMessage()
        ], 500);
        }
    }

    public function actualizar (Request $request){

        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:50',
            'telefono'         => 'required|string|max:20',
            'correo'           => 'required|string|max:255',
            'direccion'        => 'required|string|max:255',
            'id_administrador' => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
        ]);

        try{
            // Usamos id_cliente según tu migración
            $cliente = Cliente::findOrFail($request->id_cliente);
            $cliente->update($validatedData);

            return response()->json([
                'message' => 'Cliente actualizado con éxito.',
                'cliente' => $cliente,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el cliente.',
                'error' => $e->getMessage(),
            ],500);
        }
    }
    public function mostrarCliente($id_cliente)
    {
        try {
            // Usamos 'findOrFail': si no existe, salta directo al catch
            $cliente = Cliente::findOrFail($id_cliente);

            return response()->json($cliente, 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            
            return response()->json([
                'message' => 'Cliente no encontrado'
            ], 404);

        } catch (\Exception $e) {
            
            return response()->json([
                'message' => 'Error al obtener el Cliente',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function eliminar(Request $request){

        $cliente = Cliente::destroy($request->id_cliente);

        return response()->json([
            "message" => "Cliente con id =" . $request->id_cliente . " ha sido borrado con éxito"

        ],201);
    }
}
