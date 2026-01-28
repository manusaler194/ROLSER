<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AlmacenController extends Controller{

    public function mostrar(){
        $datos = DB::table('almacenes')->get();

        foreach($datos as $dato){
            echo $dato->direccion . "<br>";
            echo $dato->capacidad . "<br>";

        }

        $valor = 'Calle Falsa 123';
        $direccion = DB::table('almacenes')->where('direccion', $valor)->get();
        dump($direccion->toArray());

        $capacidad = 50;
        $almacenCap = DB::table('almacenes')->where('capacidad', '>', $capacidad)->get();
        dump($almacenCap->toArray());


        $encargado = 1;
        $almacenEncargado = DB::table('almacenes')->where('id_encargado', $encargado)->get();
        dump($almacenEncargado->toArray());

    }
}
