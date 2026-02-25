<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\ClienteVip;
use App\Models\Comercial;
use App\Models\Administrador;
use App\Models\EncargadoAlmacen;

class PerfilController extends Controller
{
    public function mostrarVista($tipo, $id)
    {
        $perfil = null;

        // Normalizamos el tipo a minúsculas
        switch (strtolower($tipo)) {
            case 'cliente':
                $perfil = Cliente::where('id_cliente', $id)->firstOrFail();
                break;
            case 'clientevip':
                $perfil = ClienteVip::where('id_clientevip', $id)->firstOrFail();
                break;
            case 'comercial':
                $perfil = Comercial::where('id_comercial', $id)->firstOrFail();
                break;
            case 'admin':
            case 'administrador':
                $perfil = Administrador::where('id_administrador', $id)->firstOrFail();
                break;
            case 'encargado':
            case 'encargado_almacen': // Añadimos esta variante
            case 'encargadoalmacen':
                $perfil = EncargadoAlmacen::where('id_encargado', $id)->firstOrFail();
                break;
            default:
                abort(404, 'Tipo de usuario no válido: ' . $tipo);
        }

        return view('perfil', compact('perfil', 'tipo'));
    }
}
