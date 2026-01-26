<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;

class Facturas extends Model
{
    protected $table = 'facturas';

    protected $fillable = ['cantidad', 'fecha'];

    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
    public function clientes()
    {
        return $this->belongsToMany(Cliente::class);
    }
    public function administrador()
    {
        return $this->belongsToMany(Administrador::class);
    }
    public function clienteVip()
    {
        return $this->belongsToMany(ClienteVip::class);
    }
}
