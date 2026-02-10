<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
                'nombre' => $faker->firstName(),
                'apellidos' => $faker->lastName() . ' ' . $faker->lastName(),
                'email' => $faker->unique()->safeEmail(),
                'telefono' => $faker->phoneNumber(),
                'password' => Hash::make('password'), // Pass por defecto para el resto
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
