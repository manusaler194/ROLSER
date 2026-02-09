<?php

namespace App\Http\Controllers;
use App\Models\Facturas;
use Illuminate\Http\Request;
use App\Models\Administrador;
use App\Models\Comercial;
use App\Models\Cliente;
use App\Models\ClienteVip;
use App\Models\Pedido;

class FacturaController extends Controller{

    public function guardar(Request $request){
        $validatedData = $request->validate([
            'cantidad'         => 'required|integer|min:0',
            'fecha'            => 'required|date',
            'precio'           => 'required|numeric|min:0',
            'id_administrador' => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
            'id_cliente'       => 'nullable|integer',
            'id_clientevip'    => 'nullable|integer',
        ]);

        try {
            $factura = new Facturas([
                'cantidad' => $validatedData["cantidad"],
                'fecha'    => $validatedData["fecha"],
                'precio'   => $validatedData["precio"]
            ]);

            if ($request->id_administrador) {
                $factura->administrador()->associate(Administrador::find($request->id_administrador));
            }
            if ($request->id_comercial) {
                $factura->comercial()->associate(Comercial::find($request->id_comercial));
            }
            if ($request->id_cliente) {
                $factura->clientes()->associate(Cliente::find($request->id_cliente));
            }
            if ($request->id_clientevip) {
                $factura->clienteVip()->associate(ClienteVip::find($request->id_clientevip));
            }
            $factura->save();

            return response()->json([
                'message' => 'Factura creada con éxito.',
                'factura' => $factura,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la factura.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        try{
            $factura = Facturas::with(['pedidos', 'clientes', 'administrador', 'clienteVip'])->get();
            return response()->json([
                'message' => "Datos recogidos",
                'almacen' => $factura
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
            'cantidad'         => 'required|integer|min:0',
            'fecha'            => 'required|date',
            'precio'           => 'required|numeric|min:0',
            'id_administrador' => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
            'id_cliente'       => 'nullable|integer',
            'id_clientevip'    => 'nullable|integer',
        ]);

        try{

            $factura = Facturas::findOrFail($request->id_factura);
            $factura->update($validatedData);

            return response()->json([
                'message' => 'Factura actualizada con éxito.',
                'factura' => $factura,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar la factura.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function eliminar(Request $request){

        $factura = Facturas::destroy($request->id_factura);

        return response()->json([
            "message" => "Factura con id =" . $request->id_factura . " ha sido borrada con éxito"

        ],201);
    }
}
