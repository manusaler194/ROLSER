<?php

namespace App\Http\Controllers;
use App\Models\ClienteVip;
use Illuminate\Http\Request;

class ClienteVipController extends Controller
{
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:50',
            'telefono'         => 'required|string|max:20',
            'correo'           => 'required|string|max:255',
            'direccion'        => 'required|string|max:255',
            'id_administrador' => 'nullable|integer',
            'id_catalogo'      => 'nullable|integer',
        ]);

        try {
            $clienteVip = ClienteVip::create($validatedData);

            return response()->json([
                'message' => 'Cliente VIP creado con éxito.',
                'clienteVip' => $clienteVip,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el cliente VIP.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        try{
            $clienteVip = ClienteVip::all();
            return response()->json([
                'message' => "Datos recogidos",
                'almacen' => $clienteVip
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
            'id_catalogo'      => 'nullable|integer',
        ]);

        try{

            $clienteVip = ClienteVip::findOrFail($request->id_clientevip);
            $clienteVip->update($validatedData);

            return response()->json([
                'message' => 'Cliente VIP actualizado con éxito.',
                'clienteVip' => $clienteVip,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el cliente VIP.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function eliminar(Request $request){

        $clienteVip = ClienteVip::destroy($request->id_clientevip);

        return response()->json([
            "message" => "Cliente VIP con id =" . $request->id_clientevip . " ha sido borrado con éxito"

        ],201);
    }
}
