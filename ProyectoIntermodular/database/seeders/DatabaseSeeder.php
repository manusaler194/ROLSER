<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\AlmacenSeeder;
use Database\Seeders\ComercialSeeder;
use Database\Seeders\PedidoSeeder;
use Database\Seeders\LineaPedidoSeeder;
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
{
        $this->call([
                AlmacenSeeder::class,
                ComercialSeeder::class,
                PedidoSeeder::class,
                LineaPedidoSeeder::class,
                ArticuloSeeder::class,
                ClienteVipSeeder::class,
                ClienteSeeder::class,
                FacturaSeeder::class,
                SeccionSeeder::class,
                AdministradorSeeder::class,
        ]);
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
