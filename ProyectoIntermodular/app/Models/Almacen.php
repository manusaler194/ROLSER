<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Almacen extends Model{
    protected $table = 'almacenes';
    protected $primaryKey = 'id_almacen';


    protected $fillable = ['direccion', 'capacidad', 'id_encargado'];

    public function secciones() {
        return $this->hasMany(Seccion::class);
    }
    public function encargadoAlmacen() {
        return $this->belongsTo(EncargadoAlmacen::class);
    }
}
