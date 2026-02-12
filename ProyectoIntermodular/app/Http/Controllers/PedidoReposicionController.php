<?php

namespace App\Http\Controllers;
use App\Models\Administrador;
use App\Models\EncargadoAlmacen;
use App\Models\PedidoReposicion;
use App\Models\Proveedor;
use Exception;
use Illuminate\Http\Request;

class PedidoReposicionController extends Controller{

    public function guardar(Request $request){
        $validatedData = $request->validate([
            'fecha_pedido'=> 'required|date',
            'estado'=>'required|string',
            'id_proveedor' => 'nullable|integer',
            'id_administrador' => 'nullable|integer',
            'id_encargado' => 'nullable|integer',
        ]);
        try {
            $pedidoReposicion = new PedidoReposicion([
                'fecha_pedido' => $validatedData["fecha_pedido"],
                'estado' => $validatedData["estado"]
            ]);
                if ($request->id_proveedor) {
                    $pedidoReposicion->proveedor()->associate(Proveedor::find($request->id_proveedor));
                }
                if ($request->id_administrador) {
                    $pedidoReposicion->administrador()->associate(Administrador::find($request->id_administrador));
                }
                if ($request->id_encargado) {
                    $pedidoReposicion->encargadoAlmacen()->associate(EncargadoAlmacen::find($request->id_encargado));
                }
            $pedidoReposicion->save();

            return response()->json([
                'message' => 'Pedido de reposición creado con éxito.',
                'pedidos' => $pedidoReposicion,
            ], 201); // Código HTTP 201: Creado
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el pedido de reposición.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request) {
    try {
        $pedidos = PedidoReposicion::with(['administrador', 'encargadoAlmacen'])->get();

        return response()->json([
            'message' => "Pedido recogido",
            'pedido' => $pedidos          
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error al obtener los pedidos de reposición.',
            'error' => $e->getMessage()
        ], 500);
    }
}
    public function mostrarPedido(Request $request){
        try{
            $pedido = PedidoReposicion::where("id_pedidoReposicion", $request->id_pedidoReposicion)->get();
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
            'id_proveedor' => 'nullable|integer',
            'id_administrador' => 'nullable|integer',
            'id_encargado' => 'nullable|integer',
        ]);
        try {
            $pedido = PedidoReposicion::findOrFail($request->id_pedidoReposicion);
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
            $pedido = PedidoReposicion::destroy($request->id_pedidoReposicion);

            if ($pedido === 0) {
                return response()->json([
                    "message" => "No se encontró el pedido con ID " . $request->id_pedidoReposicion
                ], 404);
            }
            return response()->json([
                "message" => "Pedido con id =" . $request->id_pedidoReposicion . " ha sido borrado con éxito"

            ],201);
        }catch(\Exception $e){
            return response()->json([
                "message" => "Error de base de datos al eliminar",
                "error" => $e->getMessage()
            ], 500);
        }

    }
}
