<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('clientes')->insert([

                'nombre' => $faker->name(),
                'telefono' => $faker->phoneNumber(),
                'correo' => $faker->email(),
                'direccion' => $faker->address(),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
                'id_administrador' => rand(1,10),
                'id_comercial' => rand(1,10),
            ]);
        }
    }
}
