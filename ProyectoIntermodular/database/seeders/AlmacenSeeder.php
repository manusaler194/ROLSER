<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;


class AlmacenSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{

        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('almacenes')->insert([
           'direccion' => $faker->name(),
           'capacidad' => rand(100,1000),
           'created_at' => date('Y-m-d'),
           'updated_at' => date('Y-m-d'),
           "id_encargado" => rand(1,10)]);
        }
    }
}

