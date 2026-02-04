<?php

namespace App\Http\Controllers;
use App\Models\Facturas;
use Illuminate\Http\Request;

class FacturaController extends Controller
{
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
            $factura = Facturas::create($validatedData);

            return response()->json([
                'message' => 'Factura creada con éxito.',
                'factura' => $factura,
            ], 201); 

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear la factura.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        $datos = Facturas::all();
        return $datos;
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