<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';

    protected $primaryKey = 'id_cliente';

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'correo',
        'id_administrador',
        'id_comercial'
    ];

    public function facturas()
    {
        return $this->hasMany(Facturas::class);
    }
    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
    public function comercial()
    {
        return $this->belongsTo(Comercial::class, 'id_comercial');
    }
    public function administrador()
    {
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }
}
