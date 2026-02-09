<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class LineaPedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('lineas_pedido')->insert([
           'precio' => $faker->randomFloat(2,10,100),
           'cantidad' => $faker->numberBetween(1,10),
           'created_at' => date('Y-m-d'),
           'updated_at' => date('Y-m-d'),
           "id_pedido" => rand(1,10),
           "id_articulo" => rand(1,10)]);
        }
    }
}
