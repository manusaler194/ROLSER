<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model{

    protected $table = 'pedidos';
    protected $primaryKey = 'id_pedido';
    protected $fillable = ['estado', 'id_comercial','id_cliente','id_clientevip','id_encargado','id_factura'];


    public function comercial(){
        return $this->belongsTo(Comercial::class, "id_comercial");
    }

    public function LineaPedidos(){
        return $this->hasMany(LineaDePedido::class, 'id_pedido');
    }

    public function encargadoAlmacen(){
        return $this->belongsTo(EncargadoAlmacen::class, "id_encargado");
    }

    public function factura(){
        return $this->belongsTo(Facturas::class, "id_factura");
    }

    public function cliente(){
        return $this->belongsTo(Cliente::class, "id_cliente");
    }
    public function clienteVip(){
        return $this->belongsTo(ClienteVip::class, "id_clientevip");
    }
}
