<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EncargadoAlmacen extends Model
{
    protected $table = 'encargados_de_almacen';
    protected $primaryKey = 'id_encargado';
    protected $fillable = ['nombre', 'telefono', 'email'];

    public function proveedores(){
        return $this->hasMany(Proveedor::class, 'id_proveedor');
    }

    public function almacenes(){
        return $this->hasMany(Almacen::class, 'id_almacen');
    }

    public function pedidos(){
        return $this->hasMany(Pedido::class, 'id_pedido');
    }
}
