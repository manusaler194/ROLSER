<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineaDePedido extends Model
{
    protected $table = 'lineas_pedido';
    protected $primaryKey = 'id_linea';

    protected $fillable = ['precio', 'cantidad','id_pedido', 'id_articulo'];

    public function pedido(){
        return $this->belongsTo(Pedido::class, 'id_pedido');
    }

    public function articulo(){
        return $this->belongsTo(Articulo::class, 'id_articulo');
    }
}
