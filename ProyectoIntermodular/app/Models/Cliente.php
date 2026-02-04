<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';

    protected $primaryKey = 'id_cliente';

    protected $fillable = ['nombre','direccion', 'capacidad','telefono','correo'];

    public function facturas() {
    return $this->hasMany(Facturas::class);
}
    public function pedidos() {
    return $this->hasMany(Pedido::class);
}
    public function comercial() {
    return $this->belongsToMany(Comercial::class);
}
    public function administrador() {
    return $this->belongsToMany(Administrador::class);
}

}
