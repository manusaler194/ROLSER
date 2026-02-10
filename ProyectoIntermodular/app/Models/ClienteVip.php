<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class ClienteVip extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'clientes_vip';
    protected $primaryKey = 'id_clientevip';

    protected $fillable = ['nombre', 'telefono', 'email', 'password', 'direccion', 'id_administrador', 'id_catalogo', 'id_comercial'];

    protected $hidden = ['password'];


    public function pedidos() {
        return $this->hasMany(Pedido::class, 'id_clientevip');
    }
    public function comercial() {
        return $this->belongsTo(Comercial::class, 'id_comercial');
    }
    public function administrador() {
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }
    public function facturas() {
        return $this->hasMany(Facturas::class, 'id_clientevip');
    }
    public function catalogo() {
        return $this->belongsTo(Catalogo::class, 'id_catalogo');
    }
}
