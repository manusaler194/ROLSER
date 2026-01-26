<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comercial extends Model{

    protected $table = 'comerciales';

    protected $fillable = ['nombre', 'contacto'];


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

     public function administradores(){
        return $this->belongsTo(Administrador::class);
    }

    public function facturas(){
        return $this->hasMany(Facturas::class);
    }
}
