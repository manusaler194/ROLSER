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

        for ($i = 0; $i < 10; $i++) {
            DB::table('articulos_catalogos')->insert([
            'id_catalogo' => rand(1,10),
            'id_articulo' => rand(1,10),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')]);
        }
    }
}
