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

        DB::table('articulos')->insert([
            'nombre'=> "Rolser I-Max",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Rolser I-Max MF",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Rolser Bolso Plegamatic MF 2",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Rolser I-Max MF 6",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Carro Rolser Saquet Gloria",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Carro Rolser Saquet",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Carro Rolser I-MAX William Morris",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Escalera Aluminio Rolser Unica 3 Peldaños",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Escalera Aluminio Rolser BRICO",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);

        DB::table('articulos')->insert([
            'nombre'=> "Tabla de Planchar Rolser K-UNO Black Tube",
            'descripcion' => $faker->randomElement(["Para viaje", "para estar en casita", "ideal para casa", "perfecto para viaje", "lo más barato del mercado", "Mejor calidad precio", "Lo mejor para regalar"]),
            'precio' => $faker->randomFloat(2, 1, 30),
            'stock_actual' => $faker->numberBetween(0, 500),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_seccion' => rand(1, 10),
            'id_administrador' => rand(1, 10)
        ]);
    }
}
