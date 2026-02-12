<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    // Nombre tabla en BD
    protected $table = 'proveedores';
    protected $primaryKey = 'id_proveedor';
    // Todos los atributos escepto (id, created_at, updated_at y foreign keys)
    protected $fillable = ['nombre_empresa', 'contacto', 'cif', 'id_encargado'];

    // encargador_de_almacen = nombre de la talba en la BD
    public function encargados_de_almacen(){
        return $this->belongsTo(EncargadoAlmacen::class, 'id_encargado');
    }

    public function pedidosReposicion() { 
        return $this->hasMany(PedidoReposicion::class, 'id_proveedor'); 
    }
}
