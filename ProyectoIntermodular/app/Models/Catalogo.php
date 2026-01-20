<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalogo extends Model{

    protected $table = 'catalogos';

    protected $fillable = ['nombre', 'anyo'];

    public function jugadores(){
        return $this->belongsToMany(Jugador::class);
    }
}
