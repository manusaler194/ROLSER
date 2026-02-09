<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;

class Facturas extends Model
{
    protected $table = 'facturas';

    protected $primaryKey = 'id_factura';

protected $fillable = ['cantidad','fecha','precio','id_administrador','id_comercial','id_cliente','id_clientevip'];
    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
    public function clientes()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente');
    }
    public function administrador()
    {
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }
    public function clienteVip()
    {
        return $this->belongsTo(ClienteVip::class, 'id_clientevip');
    }
}
