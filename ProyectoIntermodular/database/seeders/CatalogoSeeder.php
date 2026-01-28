<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class CatalogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $faker = Faker::create('es_ES');

        for ($i = 1; $i < 11; $i++) {
            DB::table('catalogos')->insert([
            'nombre_temporada' => $faker->name(),
            'anyo' => $faker->numberBetween(2000, 2026),
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')]);
        }
    }
}
