<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\ClienteVip;
use App\Models\Comercial;
use App\Models\EncargadoAlmacen;
use App\Models\Facturas;
use App\Models\Pedido;
use Exception;
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

            $comercial = Comercial::findOrFail($validatedData["id_comercial"]);
            $cliente = Cliente::findOrFail($validatedData["id_cliente"]);
            $clientevip = ClienteVip::findOrFail($validatedData["id_clientevip"]);
            $encargado = EncargadoAlmacen::findOrFail($validatedData["id_encargado"]);
            $factura = Facturas::findOrFail($validatedData["id_factura"]);

            $pedido = new Pedido([
                'fecha_pedido' => $validatedData["fecha_pedido"],
                'estado' => $validatedData["estado"]
            ]);

            $pedido->comercial()->associate($comercial);
            $pedido->cliente()->associate($cliente);
            $pedido->clienteVip()->associate($clientevip);
            $pedido->encargadoAlmacen()->associate($encargado);
            $pedido->factura()->associate($factura);
            $pedido->save();

            return response()->json([
                'message' => 'Pedido creado con éxito.',
                'pedidos' => $pedido,
            ], 201); // Código HTTP 201: Creado
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el pedido.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        try{
            $pedidos = Pedido::with(['cliente', 'encargadoAlmacen'])->get();
            return response()->json([
                'message' => "Datos recogidos",
                'pedidos' => $pedidos
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los pedidos.',
            'error' => $e->getMessage()
        ], 500);
        }
    }
    public function mostrarPedido(Request $request){
        try{
            $pedido = Pedido::with(['cliente', 'encargadoAlmacen'])->where("id_pedido", $request->id_pedido)->get();
             if (!$pedido) {
                return response()->json([
                    'message' => 'Pedido no encontrado'
                ], 404);
            }

            return response()->json([
                'message' => "Pedido recogido",
                'pedido' => $pedido
            ], 200);
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener el pedido.',
            'error' => $e->getMessage()
        ], 500);
        }
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
        try{
            $pedido = Pedido::destroy($request->id_pedido);

            if ($pedido === 0) {
                return response()->json([
                    "message" => "No se encontró el pedido con ID " . $request->id_pedido
                ], 404);
            }
            return response()->json([
                "message" => "Pedido con id =" . $request->id_pedido . " ha sido borrado con éxito"

            ],201);
        }catch(\Exception $e){
            return response()->json([
                "message" => "Error de base de datos al eliminar",
                "error" => $e->getMessage()
            ], 500);
        }

    }
}
