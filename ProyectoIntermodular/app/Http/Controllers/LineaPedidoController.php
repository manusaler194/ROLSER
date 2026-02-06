<?php

namespace App\Http\Controllers;
use App\Models\LineaDePedido;
use Illuminate\Http\Request;

class LineaPedidoController extends Controller
{
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'precio'      => 'required|numeric|min:0',
            'cantidad'    => 'required|integer|min:0',
            'id_pedido'   => 'nullable|integer',
            'id_articulo' => 'nullable|integer',
        ]);

        try {
            $lineaPedido = LineaDePedido::create($validatedData);

            return response()->json([
                'message' => 'Línea de pedido creada con éxito.',
                'lineaPedido' => $lineaPedido,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear la línea de pedido.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        try{
            $lineaPedido = LineaDePedido::all();
            return response()->json([
                'message' => "Datos recogidos",
                'almacen' => $lineaPedido
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
            'precio'      => 'required|numeric|min:0',
            'cantidad'    => 'required|integer|min:0',
            'id_pedido'   => 'nullable|integer',
            'id_articulo' => 'nullable|integer',
        ]);

        try{

            $lineaPedido = LineaDePedido::findOrFail($request->id_linea);
            $lineaPedido->update($validatedData);

            return response()->json([
                'message' => 'Línea de pedido actualizada con éxito.',
                'lineaPedido' => $lineaPedido,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar la línea de pedido.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function eliminar(Request $request){

        $lineaPedido = LineaDePedido::destroy($request->id_linea);

        return response()->json([
            "message" => "Línea de pedido con id =" . $request->id_linea . " ha sido borrada con éxito"

        ],201);
    }
}
