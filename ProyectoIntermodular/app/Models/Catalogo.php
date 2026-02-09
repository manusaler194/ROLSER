<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalogo extends Model
{
    protected $table = 'catalogos';
    protected $primaryKey = 'id_catalogo';
    protected $fillable = ['nombre_catalogo', 'anyo', 'id_administrador'];

    public function articulos(){
        return $this->belongsToMany(Articulo::class, 'id_articulo');
    }

    public function comerciales(){
        return $this->belongsToMany(Comercial::class, 'id_comercial');
    }

    public function administradores(){
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }
}
