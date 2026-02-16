<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class EncargadoAlmacen extends Authenticatable{

    use HasApiTokens, Notifiable;

    protected $table = 'encargados_de_almacen';
    protected $primaryKey = 'id_encargado';

    protected $fillable = ['nombre', 'telefono', 'email', 'password'];

    protected $hidden = ['password'];

    public function proveedores(){
        return $this->hasMany(Proveedor::class, 'id_encargado');
    }

    public function almacenes(){
        return $this->hasMany(Almacen::class, 'id_encargado');
    }

    public function pedidos(){
        return $this->hasMany(Pedido::class, 'id_encargado');
    }

    public function pedidosReposicion() {
        return $this->hasMany(PedidoReposicion::class, 'id_encargado');
    }
}
