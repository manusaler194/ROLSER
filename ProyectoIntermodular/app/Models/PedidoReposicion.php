<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PedidoReposicion extends Model{
    protected $table ="pedidos_reposicion";
    protected $primaryKey = 'id_pedidoReposicion';
    protected $fillable = ['estado','fecha_pedido','id_administrador','id_encargado','id_proveedor'];

    public function encargadoAlmacen(){
        return $this->belongsTo(EncargadoAlmacen::class, "id_encargado");
    }
    public function proveedor(){
        return $this->belongsTo(Proveedor::class, "id_proveedor");
    }
    public function administrador(){
        return $this->belongsTo(Administrador::class, "id_administrador");
    }
}
