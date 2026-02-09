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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id('id_pedido');
            $table->date('fecha_pedido')->default(now());
            $table->string('estado',50);
            $table->timestamps();

            $table->foreignId('id_comercial')->nullable()->constrained('comerciales', 'id_comercial')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_cliente')->nullable()->constrained('clientes', 'id_cliente')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_clientevip')->nullable()->constrained('clientes_vip', 'id_clientevip')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_encargado')->nullable()->constrained('encargados_de_almacen', 'id_encargado')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_factura')->nullable()->constrained('facturas', 'id_factura')->nullOnDelete()->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
