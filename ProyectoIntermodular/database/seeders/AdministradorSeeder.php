<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
class AdministradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('administradores')->insert([

                'nombre' => $faker->name(),
                'apellidos' => $faker->lastName(),
                'email' => $faker->email(),
                'password' => bcrypt('password'),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
            ]);
        }
    }
}
