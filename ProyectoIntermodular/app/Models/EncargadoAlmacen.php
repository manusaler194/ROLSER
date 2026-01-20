<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EncargadoAlmacen extends Model
{
    protected $table = 'encargados_de_almacen';

    protected $fillable = ['nombre', 'telefono', 'email'];

    public function proveedores(){
        return $this->hasMany(Proveedor::class);
    }

    public function almacenes(){
        return $this->hasMany(Almacen::class);
    }

    public function pedidos(){
        return $this->hasMany(Pedido::class);
    }
}
