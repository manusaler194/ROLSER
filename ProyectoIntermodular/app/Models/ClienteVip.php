<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClienteVip extends Model
{
    //

    protected $table = 'clientes_vip';
    protected $primaryKey = 'id_clientevip';
    protected $fillable = ['nombre', 'telefono','correo','direccion','id_administrador','id_catalogo','id_comercial'];

    public function pedido() {
        return $this->hasMany(Pedido::class, 'id_pedido');
    }
    public function comercial() {
        return $this->belongsTo(Comercial::class, 'id_comercial');
    }
    public function administrador() {
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }
    public function factura() {
        return $this->hasMany(Facturas::class, 'id_factura');
    }
    public function catalogo() {
        return $this->belongsTo(Catalogo::class, 'id_catalogo');
    }
}

