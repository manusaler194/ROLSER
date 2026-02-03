<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalogo extends Model
{
    protected $table = 'catalogos';
    protected $fillable = ['nombre_temporada', 'anyo', 'id_administrador'];
    protected $primaryKey = 'id_catalogo';

    public function articulos(){
        return $this->belongsToMany(Articulo::class);
    }

    public function comerciales(){
        return $this->belongsToMany(Comercial::class);
    }

    public function administradores(){
        return $this->belongsTo(Administrador::class);
    }
}
