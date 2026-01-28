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
           'fecha_pedido' => $faker->dateTimeBetween('-30 days', 'now'),
           'estado' => $faker->randomElement(["En preparación", "Enviado", "En proceso de entrega", "Entregado"]),
           'created_at' => date('Y-m-d'),
           'updated_at' => date('Y-m-d'),
           "id_comercial" => rand(1,10),
           "id_cliente" => rand(1,10),
           "id_clientevip" => rand(1,10),
           "id_encargado" => rand(1,10),
           "id_factura" => rand(1,10)]);
        }
    }
}

