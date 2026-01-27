<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
class FacturaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        for ($i = 0; $i < 10; $i++) {
            DB::table('facturas')->insert([

                'cantidad' => $faker->numberBetween(1,100),
                'fecha' => $faker->date(),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
                'id_administrador' => rand(1,10),
                'id_comercial' => rand(1,10),
                'id_cliente' => rand(1,10),
                'id_clientevip' => rand(1,10),
            ]);
        }
    }
}
