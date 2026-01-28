<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProveedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $faker = Faker::create('es_ES');
        $letras = ['A','B','C','D','E','F','G','H','J','N','P','Q','R','S','U','V','W'];
        $letraControl = range('A', 'Z');

        for ($i = 0; $i < 10; $i++) {

            $letraInicial = $letras[array_rand($letras)];

            $numeros = '';
            for ($j = 0; $j < 7; $j++) {
                $numeros .= rand(0, 9);
            }

            $control = rand(0, 1) ? rand(0, 9) : $letraControl[array_rand($letraControl)];

            $cif = $letraInicial . $numeros . $control;

            DB::table('proveedores')->insert([
                'nombre_empresa' => $faker->company(),
                'contacto' => $faker->phoneNumber(),
                'cif' => $cif,
                'created_at' => date('Y-m-d'),
                'updated_at' => date('Y-m-d'),
                'id_encargado' => rand(1, 10),
            ]);
        }
    }

}
