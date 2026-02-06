<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
class PedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('pedidos')->insert([
           'estado' => $faker->randomElement(["En preparación", "En proceso de entrega", "Entregado"]),
           'created_at' => now(),
           'updated_at' => now(),
           "id_comercial" => rand(1,10),
           "id_cliente" => rand(1,10),
           "id_clientevip" => rand(1,10),
           "id_encargado" => rand(1,10),
           "id_factura" => rand(1,10)]);
        }
    }
}

