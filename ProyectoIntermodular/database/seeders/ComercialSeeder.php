<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class
ComercialSeeder extends Seeder
{

    public function run(): void{
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('comerciales')->insert([
                'nombre' => $faker->name(),
                'contacto' => $faker->phoneNumber(),
                'email' => $faker->unique()->safeEmail(),
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => $faker->text(100),
                'created_at' => date('Y-m-d'),
                'updated_at' => date('Y-m-d'),
                "id_administrador" => rand(1,10)
            ]);
        }

    }

}

