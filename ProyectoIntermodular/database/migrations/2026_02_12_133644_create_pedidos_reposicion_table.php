<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos_reposicion', function (Blueprint $table) {
            $table->id('id_pedidoReposicion');
            $table->date('fecha_pedido');
            $table->string('estado',50);
            $table->timestamps();

            $table->foreignId('id_administrador')->nullable()->constrained('administradores', 'id_administrador')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_proveedor')->nullable()->constrained('proveedores', 'id_proveedor')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_encargado')->nullable()->constrained('encargados_de_almacen', 'id_encargado')->nullOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos_reposicion');
    }
};
