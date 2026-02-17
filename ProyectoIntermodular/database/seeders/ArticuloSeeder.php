<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ArticuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('articulos')->insert([
            'nombre'=>$faker->randomElement(["Plancha", "Carrito", "Bolsas", "Escaleras", "Tabla de planchar", "Taburete", "funda de tabla", "carro plegable", "carro no plegable", "bolsas no adaptables"]),
            'descripcion' => $faker->text(),
            'precio' => $faker->randomFloat(2, 1, 30), // Float random: 2 decimales, minimo 1 maximo 1000
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);
        }


    }
}
