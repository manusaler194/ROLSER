<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
class SeccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('secciones')->insert([

                'stock' => $faker->numberBetween(1,100),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
                'id_almacen' => rand(1,10),
            ]);
        }
    }
}
