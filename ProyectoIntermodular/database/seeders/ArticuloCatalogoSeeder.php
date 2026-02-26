<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ArticuloCatalogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $faker = Faker::create('es_ES');

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 1,
            'id_articulo' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 1,
            'id_articulo' => 2,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 1,
            'id_articulo' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 1,
            'id_articulo' => 4,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 2,
            'id_articulo' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 2,
            'id_articulo' => 6,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 2,
            'id_articulo' => 7,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 3,
            'id_articulo' => 8,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 3,
            'id_articulo' => 9,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('articulos_catalogos')->insert([
            'id_catalogo' => 4,
            'id_articulo' => 10,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);


    }
}
