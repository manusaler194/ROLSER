<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class ComercialSeeder extends Seeder
{

    public function run(): void{
        $faker = Faker::create('es_ES');

        DB::table('comerciales')->insert([
            'nombre' => 'Comercial de Prueba',
            'contacto' => '611111111',
            'email' => 'comercial@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'remember_token' => null,
            'created_at' => now(),
            'updated_at' => now(),
            'id_administrador' => 1,
        ]);

        for ($i = 1; $i < 11; $i++) {
            DB::table('comerciales')->insert([
                'nombre' => $faker->name(),
                'contacto' => $faker->phoneNumber(),
                'email' => $faker->unique()->safeEmail(),
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
                "id_administrador" => rand(1,10)
            ]);
        }

    }

}

