<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model{

    protected $table = 'pedidos';
    protected $primaryKey = 'id_pedido';
    protected $fillable = ['fecha_pedido', 'estado', 'id_comercial','id_cliente','id_clientevip','id_encargado','id_factura'];


    public function comerciales(){
        return $this->belongsTo(Comercial::class);
    }

    public function LineaPedidos(){
        return $this->hasMany(LineaDePedido::class);
    }

    public function encargadoAlmacenes(){
        return $this->belongsTo(EncargadoAlmacen::class);
    }

    public function facturas(){
        return $this->belongsTo(Facturas::class);
    }

    public function clientes(){
        return $this->belongsTo(Cliente::class);
    }
}
