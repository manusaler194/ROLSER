<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;

class Facturas extends Model
{
    protected $table = 'facturas';

    protected $primaryKey = 'id_factura';

protected $fillable = ['base_imponible','iva_porcentaje','total_iva','total_factura','estado','metodo_pago','id_administrador','id_comercial','id_cliente','id_clientevip'];

    public function cliente(){
        return $this->belongsTo(Cliente::class, 'id_cliente');
    }

    public function comercial(){
        return $this->belongsTo(Cliente::class, 'id_comercial');
    }
    public function pedido(){
        return $this->belongsTo(Administrador::class, 'id_pedido');
    }

    public function clienteVip(){
        return $this->belongsTo(ClienteVip::class, 'id_clientevip');
    }
}
