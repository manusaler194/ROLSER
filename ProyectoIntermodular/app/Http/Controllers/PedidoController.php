<?php

namespace App\Http\Controllers;
use App\Models\Pedido;

use Illuminate\Http\Request;

class PedidoController extends Controller{

    public function guardar(Request $request){
        $validatedData = $request->validate([
            'fecha_pedido'=> 'required|date',
            'estado'=>'required|string',
            'id_comercial' => 'nullable|integer',
            'id_cliente' => 'nullable|integer',
            'id_clientevip' => 'nullable|integer',
            'id_encargado' => 'nullable|integer',
            'id_factura' => 'nullable|integer',
        ]);
        try {
            $pedido = Pedido::create($validatedData);
            return response()->json([
                'message' => 'Pedido creado con éxito.',
                'pedido' => $pedido,
            ], 201); // Código HTTP 201: Creado
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el pedido.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        $pedido = Pedido::all();
        return $pedido;
    }

    public function actualizar(Request $request){
        $validatedData = $request->validate([
            'fecha_pedido'=> 'required|date',
            'estado'=>'required|string',
            'id_comercial' => 'nullable|integer',
            'id_cliente' => 'nullable|integer',
            'id_clientevip' => 'nullable|integer',
            'id_encargado' => 'nullable|integer',
            'id_factura' => 'nullable|integer',
        ]);
        try {
            $pedido = Pedido::findOrFail($request->id_pedido);
            $pedido->update($validatedData);

            return response()->json([
                'message' => 'Pedido actualizado con éxito.',
                'pedido' => $pedido,
            ], 200);
        } catch (\Exception $e) {
            return response()->json ([
                'message' => 'Error al actualizar el pedido.',
                'error' => $e->getMessage(),
            ],500);
        }
    }
    public function eliminar(Request $request){
        $pedido = Pedido::destroy($request->id_pedido);

        return response()->json([
            "message" => "Pedido con id =" . $request->id_pedido . " ha sido borrado con éxito"

        ],201);
    }
}
