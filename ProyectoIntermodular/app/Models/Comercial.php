<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Comercial extends Authenticatable{

   // use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'comerciales';

    protected $primaryKey = 'id_comercial';

    protected $fillable = ['nombre', 'contacto','email','password','id_administrador'];

    protected $hidden = ['password','remember_token',];

    protected $casts = ['email_verified_at' => 'datetime',];

    public function clientesvips(){
        return $this->hasMany(ClienteVip::class);
    }

    public function catalogos(){
        return $this->belongsToMany(Catalogo::class);
    }

    public function pedidos(){
        return $this->hasMany(Pedido::class);
    }

     public function clientes(){
      return $this->hasMany(Cliente::class);
    }

     public function administrador(){
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }

    public function facturas(){
        return $this->hasMany(Facturas::class);
    }
}
