<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrador extends Model{

    protected $table = 'administradores';
    protected $primaryKey = 'id_administrador';
    protected $fillable = ['nombre', 'apellidos','telefono', 'email','password'];


    public function clientes(){

        return $this->hasMany(Cliente::class,);
    }
    public function facturas(){

        return $this->hasMany(Facturas::class);
    }
    public function articulos(){
        return $this->hasMany(Articulo::class);
    }

    public function catalogos(){
        return $this->hasMany(Catalogo::class);
    }

    public function clientesvips(){
        return $this->hasMany(ClienteVip::class);
    }

    public function comerciales(){
        return $this->hasMany(Comercial::class);
    }


}
