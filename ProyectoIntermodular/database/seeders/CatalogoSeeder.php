<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class CatalogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('catalogos')->insert([
            'nombre_catalogo' => $faker->randomElement(["Catalogo 1","Catalogo 2","Catalogo 3","Catalogo 4","Catalogo 5","Catalogo 6","Catalogo 7","Catalogo 8","Catalogo 9","Catalogo 10","Catalogo 11","Catalogo 12","Catalogo 13","Catalogo 14", ]),
            'anyo' => $faker->numberBetween(2000, 2026),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
            'id_administrador' => rand(1,10),
        ]);
        }
    }
}
