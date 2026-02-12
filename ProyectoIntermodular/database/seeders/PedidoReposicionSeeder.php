<?php

namespace Database\Seeders;

use App\Models\Articulo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PedidoReposicionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            $opcion = rand(1,2);
            if($opcion == 1){
                DB::table('pedidos_reposicion')->insert([
               'estado' => $faker->randomElement(["En preparación", "En proceso de entrega", "Entregado"]),
               'fecha_pedido' => now(),
               'created_at' => now(),
               'updated_at' => now(),
               "id_administrador" => null,
               "id_encargado" => rand(1,10),
               "id_proveedor" => rand(1,10)]);
            }else{

                DB::table('pedidos_reposicion')->insert([
               'estado' => $faker->randomElement(["En preparación", "En proceso de entrega", "Entregado"]),
               'fecha_pedido' => now(),
               'created_at' => now(),
               'updated_at' => now(),
               "id_encargado" => null,
               "id_administrador" => rand(1,10),
               "id_proveedor" => rand(1,10)]);
            }
        }
    }
}
