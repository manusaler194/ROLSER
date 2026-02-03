<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    protected $table = 'articulos';
    protected $primaryKey = 'id_articulo';
    protected $fillable = ['descripcion', 'precio', 'stock_actual', 'id_seccion', 'id_administrador'];

    public function secciones(){
        return $this->belongsTo(Seccion::class);
    }

    public function administradores(){
        return $this->belongsTo(Administrador::class);
    }

    public function lineas_pedidos(){
        return $this->hasMany(Pedido::class);
    }
}
