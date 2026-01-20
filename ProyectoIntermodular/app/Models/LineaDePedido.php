<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineaDePedido extends Model
{
    protected $table = 'lineas_pedido';

    protected $fillable = ['precio', 'cantidad'];

    public function pedidos(){
        return $this->belongsTo(Pedido::class);
    }

    public function articulos(){
        return $this->belongsTo(Articulo::class);
    }
}
