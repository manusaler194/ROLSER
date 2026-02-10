<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Administrador extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'administradores';
    protected $primaryKey = 'id_administrador';

    protected $fillable = ['nombre','apellidos','telefono','email','password'];

    protected $hidden = ['password','remember_token',];

    public function comerciales() {
        return $this->hasMany(Comercial::class, 'id_administrador');
    }

    public function clientes() {
        return $this->hasMany(Cliente::class, 'id_administrador');
    }

    public function clientesvips() {
        return $this->hasMany(ClienteVip::class, 'id_administrador');
    }

    // El resto de tus relaciones se mantienen igual
    public function facturas() { return $this->hasMany(Facturas::class); }
    public function articulos() { return $this->hasMany(Articulo::class); }
    public function catalogos() { return $this->hasMany(Catalogo::class); }
}
