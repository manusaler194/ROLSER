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


        for ($i = 1; $i < 11; $i++) {
            DB::table('encargados_de_almacen')->insert([
                'nombre' => $faker->name(),
                'telefono' => $faker->phoneNumber(),
                'email' => $faker->unique()->email(),
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ]);

        }
    }
}
