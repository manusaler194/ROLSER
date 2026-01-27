<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class EncargadoAlmacenSeeder extends Seeder
{


    public function run(): void{
        $faker = Faker::create('es_ES');

        for ($i = 0; $i < 10; $i++) {
            DB::table('encargado_de_almacen')->insert([
            'nombre' => $faker->name(),
            'telefono' => $faker->phoneNumber(),
            'email' => $faker->email(),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')]);
        }
    }
}
