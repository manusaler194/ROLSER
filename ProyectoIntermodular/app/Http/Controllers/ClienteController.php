<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Administrador;
use App\Models\Comercial;

class ClienteController extends Controller
{

    public function guardar(Request $request)
    {
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:50',
            'telefono'         => 'required|string|max:20',
            'correo'           => 'required|string|max:255',
            'direccion'        => 'required|string|max:255',
            'id_administrador' => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
        ]);

        try {
            $administrador = Administrador::findOrFail($validatedData["id_administrador"]);
            $comercial = Comercial::findOrFail($validatedData["id_comercial"]);

            $cliente = new Cliente([
                'nombre'    => $validatedData["nombre"],
                'telefono'  => $validatedData["telefono"],
                'correo'    => $validatedData["correo"],
                'direccion' => $validatedData["direccion"]
            ]);


            $cliente->comercial()->associate($comercial);
            $cliente->administrador()->associate($administrador);
            $cliente->save();

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


    public function mostrar(Request $request)
    {
        try {

            $clientes = Cliente::with(['administrador', 'comercial'])->get();

            return response()->json([
                'message' => "Datos recogidos",
                'clientes' => $clientes
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los clientes.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function mostrarCliente(Request $request)
    {
        try {

            $cliente = Cliente::with(['administrador', 'comercial'])
                ->where("id_cliente", $request->id_cliente)
                ->get();


            if ($cliente->isEmpty()) {
                return response()->json([
                    'message' => 'Cliente no encontrado'
                ], 404);
            }

            return response()->json([
                'message' => "Cliente recogido",
                'cliente' => $cliente
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el cliente.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function actualizar(Request $request)
    {
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:50',
            'telefono'         => 'required|string|max:20',
            'correo'           => 'required|string|max:255',
            'direccion'        => 'required|string|max:255',
            'id_administrador' => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
        ]);

        try {
            $cliente = Cliente::findOrFail($request->id_cliente);
            $cliente->update($validatedData);

            return response()->json([
                'message' => 'Cliente actualizado con éxito.',
                'cliente' => $cliente,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el cliente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function eliminar(Request $request)
    {
        try {
            $cliente = Cliente::destroy($request->id_cliente);

            if ($cliente === 0) {
                return response()->json([
                    "message" => "No se encontró el cliente con ID " . $request->id_cliente
                ], 404);
            }

            return response()->json([
                "message" => "Cliente con id =" . $request->id_cliente . " ha sido borrado con éxito"
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error de base de datos al eliminar",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
