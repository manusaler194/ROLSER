<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClienteVip extends Model
{
    //

    protected $table = 'clientes_vip';

    protected $fillable = ['nombre', 'telefono','correo','direccion'];

    public function pedido() {
        return $this->belongsToMany(Pedido::class);
    }
    public function comercial() {
        return $this->hasMany(Comercial::class);
    }
    public function administrador() {
        return $this->hasMany(Administrador::class);
    }
    public function factura() {
        return $this->belongsToMany(Facturas::class);
    }
}
