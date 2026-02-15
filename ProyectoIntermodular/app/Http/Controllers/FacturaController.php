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
            'base_imponible'   => 'required|numeric|min:0',
            'iva_porcentaje'   => 'required|numeric|min:0',
            'total_iva'        => 'required|numeric|min:0',
            'total_factura'    => 'required|numeric|min:0',
            'estado'           => 'required|string',
            'metodo_pago'      => 'required|string',
            'id_comercial'     => 'nullable|integer',
            'id_cliente'       => 'nullable|integer',
            'id_clientevip'    => 'nullable|integer',
        ]);
        try {
            $factura = new Facturas([
                'base_imponible'   => $validatedData["base_imponible"],
                'iva_porcentaje'   => $validatedData["iva_porcentaje"],
                'total_iva'        => $validatedData["total_iva"],
                'total_factura'    => $validatedData["total_factura"],
                'estado'           => $validatedData["estado"],
                'metodo_pago'      => $validatedData["metodo_pago"],
            ]);

            if ($request->id_pedido) {
                $factura->pedido()->associate(Pedido::find($request->id_pedido));
            }
            if ($request->id_comercial) {
                $factura->comercial()->associate(Comercial::find($request->id_comercial));
            }
            if ($request->id_cliente) {
                $factura->cliente()->associate(Cliente::find($request->id_cliente));
            }
            if ($request->id_clientevip) {
                $factura->clienteVip()->associate(ClienteVip::find($request->id_clientevip));
            }
            $factura->save();

            return redirect()->route("mostrarFactura");

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la factura.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        try{
            $facturas = Facturas::with(['cliente', 'comercial', 'clienteVip'])->get();

            return view("mostrarFacturas", compact("facturas"));

        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener las facturas.',
            'error' => $e->getMessage()
        ], 500);
        }
    }

    public function mostrarFactura($id_factura) {
        try {
            $factura = Facturas::with(['cliente', 'comercial', 'clienteVip'])->where("id_factura", $id_factura)->get();
            return view("mostrarFactura", compact("factura"));

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener la factura.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function actualizar (Request $request){
        $validatedData = $request->validate([
            'base_imponible'   => 'required|numeric|min:0',
            'iva_porcentaje'   => 'required|numeric|min:0',
            'total_iva'        => 'required|numeric|min:0',
            'total_factura'    => 'required|numeric|min:0',
            'estado'           => 'required|string',
            'metodo_pago'      => 'required|string',
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
}
