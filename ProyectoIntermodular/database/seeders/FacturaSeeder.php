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

        for ($i = 1; $i < 11; $i++) {
            $opcion = rand(1, 2);
            $base_imponible = $faker->randomFloat(2, 50, 1000);
            $total_iva =  $base_imponible * (21 / 100);

        if ($opcion == 1) {
            DB::table('facturas')->insert([
                'base_imponible' => $base_imponible,
                'iva_porcentaje' => 21.00,
                'total_iva' => $total_iva,
                'total_factura' => $base_imponible + $total_iva,
                'estado' => $faker->randomElement(['pendiente', 'pagada', 'anulada']),
                'metodo_pago' => $faker->randomElement(['tarjeta', 'transferencia', 'efectivo']),
                'created_at' => now(),
                'updated_at' => now(),
                'id_comercial' => rand(1, 10),
                'id_cliente' => rand(1, 10),
                'id_clientevip' => null
            ]);
        } else {
            DB::table('facturas')->insert([
                'base_imponible' => $faker->randomFloat(2, 50, 1000),
                'iva_porcentaje' => 21.00,
                'total_iva' => $base_imponible * (21 / 100),
                'total_factura' => $base_imponible + $total_iva,
                'estado' => $faker->randomElement(['pendiente', 'pagada', 'anulada']),
                'metodo_pago' => $faker->randomElement(['tarjeta', 'transferencia', 'efectivo']),
                'created_at' => now(),
                'updated_at' => now(),
                'id_comercial' => null,
                'id_cliente' => null,
                'id_clientevip' => rand(1, 10)
            ]);
        }
        }
    }
}
