<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Cliente extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'clientes';
    protected $primaryKey = 'id_cliente';

    protected $fillable = ['nombre','direccion','telefono','email', 'password','id_administrador','id_comercial'];

    protected $hidden = ['password'];


    public function facturas() {
        return $this->hasMany(Facturas::class, 'id_cliente');
    }
    public function pedidos() {
         return $this->hasMany(Pedido::class, 'id_cliente');
    }

    public function comercial() {
        return $this->belongsTo(Comercial::class, 'id_comercial');
    }
    public function administrador() {
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }
}
