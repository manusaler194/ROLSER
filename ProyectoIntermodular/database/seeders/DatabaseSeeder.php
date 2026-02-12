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
    public function run(): void{
        $this->call([
            AdministradorSeeder::class,
            EncargadoAlmacenSeeder::class,
            AlmacenSeeder::class,
            ProveedorSeeder::class,
            ComercialSeeder::class,
            CatalogoSeeder::class,
            SeccionSeeder::class,
            ArticuloSeeder::class,
            ClienteSeeder::class,
            ClienteVipSeeder::class,
            FacturaSeeder::class,
            PedidoSeeder::class,
            PedidoReposicionSeeder::class,
            LineaPedidoSeeder::class,
            CatalogoComercialSeeder::class,
            ArticuloCatalogoSeeder::class,

        ]);

        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
