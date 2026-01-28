<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class CatalogoComercialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $faker = Faker::create('es_ES');

        for ($i = 0; $i < 10; $i++) {
            DB::table('comerciales_catalogos')->insert([
           'created_at' => date('Y-m-d'),
           'updated_at' => date('Y-m-d'),
           "id_comercial" => rand(1,10),
           "id_catalogo" => rand(1,10)]);
        }
    }
}
