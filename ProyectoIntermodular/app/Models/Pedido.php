<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model{

    protected $table = 'pedidos';

    protected $fillable = ['fecha_pedido', 'estado'];


    public function comerciales(){
        return $this->belongsToMany(Comercial::class);
    }

    public function LineaPedidos(){
        return $this->hasMany(LineaDePedido::class);
    }

    public function encargadoAlmacenes(){
        return $this->belongsToMany(EncargadoAlmacen::class);
    }

    public function facturas(){
        return $this->belongsToMany(Factura::class);
    }

    public function clientes(){
        return $this->belongsToMany(Cliente::class);
    }
}
