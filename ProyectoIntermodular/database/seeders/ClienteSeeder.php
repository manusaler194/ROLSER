<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class ClienteSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        DB::table('clientes')->insert([
            'nombre' => 'Cliente de Prueba',
            'telefono' => '633333333',
            'email' => 'cliente@gmail.com',
            'password' => Hash::make('12345678'),
            'direccion' => 'Calle Falsa 123, Valencia',
            'id_administrador' => 1, 
            'id_comercial' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        for ($i = 1; $i < 11; $i++) {
            DB::table('clientes')->insert([
                'nombre' => $faker->name(),
                'telefono' => $faker->phoneNumber(),
                'email' => $faker->unique()->email(),
                'password' => Hash::make('password'),
                'direccion' => $faker->address(),
                'created_at' => now(),
                'updated_at' => now(),
                'id_administrador' => rand(1,10),
                'id_comercial' => rand(1,10),
            ]);
        }
    }
}
