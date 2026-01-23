<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    protected $table = 'almacenes';

    protected $fillable = ['direccion', 'capacidad'];

public function secciones() {
    return $this->hasMany(Seccion::class);
}
public function encargadoAlmacen() {
    return $this->belongsToMany(EncargadoAlmacen::class);
}
}
