<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineaDePedido extends Model
{
    protected $table = 'pedidos';

    protected $fillable = ['fecha_pedido', 'estado'];

}
