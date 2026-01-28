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
    }
}
