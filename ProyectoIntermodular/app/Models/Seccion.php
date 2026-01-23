<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seccion extends Model
{
    protected $table = 'secciones';

    protected $fillable = ['stock'];

    public function almacen(){
        return $this->belongsToMany(Almacen::class);
    }
    public function articulo(){
        return $this->hasMany(Articulo::class);
    }
}
