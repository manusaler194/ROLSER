<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ComercialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
    }
}

$faker = Faker::create('es_ES');

for ($i = 0; $i < 10; $i++) {
    DB::table('lineas_pedido')->insert([
   'nombre' => $faker->name(),
   'contacto' => $faker->phoneNumber(),
   'created_at' => date('Y-m-d'),
   'updated_at' => date('Y-m-d'),
   "id_administrador" => rand(1,10)]);
}
