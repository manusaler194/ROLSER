<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    // Nombre tabla en BD
    protected $table = 'proveedores';

    // Todos los atributos escepto (id, created_at, updated_at y foreign keys)
    protected $fillable = ['nombre_empresa', 'contacto', 'cif'];

    // encargador_de_almacen = nombre de la talba en la BD
    public function encargados_de_almacen(){
        return $this->belongsTo(EncargadoAlmacen::class);
    }
}
