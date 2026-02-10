<?php

namespace Database\Seeders;

use App\Models\Articulo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ClienteVipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('clientes_vip')->insert([

                'nombre' => $faker->name(),
                'telefono' => $faker->phoneNumber(),
                'email' => $faker->unique()->email(),
                'password' => Hash::make('password'),
                'direccion' => $faker->address(),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
                'id_administrador' => rand(1,10),
                'id_catalogo' => rand(1,10),
                'id_comercial' => rand(1,10),
            ]);
        }
    }
}
