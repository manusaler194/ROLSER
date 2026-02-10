<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClienteVip;
use App\Models\Administrador;
use App\Models\Catalogo;
use App\Models\Comercial;
class ClienteVipController extends Controller
{
    // ==========================================
    // GUARDAR (CREAR)
    // ==========================================
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:50',
            'telefono'         => 'required|string|max:20',
            'email'           => 'required|string|max:255',
            'direccion'        => 'required|string|max:255',
            'id_administrador' => 'nullable|integer',
            'id_catalogo'      => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
        ]);

        try {
            $administrador = Administrador::findOrFail($validatedData["id_administrador"]);
            $catalogo      = Catalogo::findOrFail($validatedData["id_catalogo"]);
            $comercial      = Comercial::findOrFail($validatedData["id_comercial"]);
            $clienteVip = new ClienteVip([
                'nombre'    => $validatedData["nombre"],
                'telefono'  => $validatedData["telefono"],
                'email'    => $validatedData["email"],
                'direccion' => $validatedData["direccion"]
            ]);

            // Asociamos las relaciones (foreign keys)
            $clienteVip->catalogo()->associate($catalogo);
            $clienteVip->administrador()->associate($administrador);
            $clienteVip->comercial()->associate($comercial);
            $clienteVip->save();
           // $clienteVip = ClienteVip::create($validatedData);

            return response()->json([
                'message'    => 'Cliente VIP creado con éxito.',
                'clienteVip' => $clienteVip,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el cliente VIP.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ==========================================
    // MOSTRAR TODOS
    // ==========================================
    public function mostrar(Request $request){
        try{
            // Usamos eager loading (with) para traer las relaciones
            $clientesVip = ClienteVip::with(['administrador', 'catalogo','comercial'])->get();

            return response()->json([
                'message'     => "Datos recogidos",
                'clientesVip' => $clientesVip
            ], 200);

        } catch(\Exception $e){
            return response()->json([
                'message' => 'Error al obtener los clientes VIP.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    // ==========================================
    // MOSTRAR UNO (POR ID EN REQUEST)
    // ==========================================
    public function mostrarClienteVip(Request $request)
    {
        try {
            // Adaptado al estilo de PedidoController: recibe Request y usa where
            $clienteVip = ClienteVip::with(['administrador', 'catalogo', 'comercial'])
                            ->where("id_clientevip", $request->id_clientevip)
                            ->get();

            if ($clienteVip->isEmpty()) {
                return response()->json([
                    'message' => 'Cliente VIP no encontrado'
                ], 404);
            }

            return response()->json([
                'message'    => "Cliente VIP recogido",
                'clienteVip' => $clienteVip
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el Cliente VIP',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    // ==========================================
    // ACTUALIZAR
    // ==========================================
    public function actualizar(Request $request){
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:50',
            'telefono'         => 'required|string|max:20',
            'email'           => 'required|string|max:255',
            'direccion'        => 'required|string|max:255',
            'id_administrador' => 'nullable|integer',
            'id_catalogo'      => 'nullable|integer',
            'id_comercial'     => 'nullable|integer',
        ]);

        try{
            $clienteVip = ClienteVip::findOrFail($request->id_clientevip);
            $clienteVip->update($validatedData);

            return response()->json([
                'message'    => 'Cliente VIP actualizado con éxito.',
                'clienteVip' => $clienteVip,
            ], 200);

        } catch (\Exception $e){
            return response()->json ([
                'message' => 'Error al actualizar el cliente VIP.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ==========================================
    // ELIMINAR
    // ==========================================
    public function eliminar(Request $request){
        try{
            $clienteVip = ClienteVip::destroy($request->id_clientevip);

            if ($clienteVip === 0) {
                return response()->json([
                    "message" => "No se encontró el cliente VIP con ID " . $request->id_clientevip
                ], 404);
            }

            return response()->json([
                "message" => "Cliente VIP con id =" . $request->id_clientevip . " ha sido borrado con éxito"
            ], 201);

        } catch(\Exception $e){
            return response()->json([
                "message" => "Error de base de datos al eliminar",
                "error"   => $e->getMessage()
            ], 500);
        }
    }
}
