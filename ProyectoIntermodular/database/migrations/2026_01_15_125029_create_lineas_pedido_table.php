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
        Schema::create('lineas_pedido', function (Blueprint $table) {
            $table->id('id_linea');
            $table->float('precio', 10, 2);
            $table->unsignedInteger('cantidad');
            $table->timestamps();

            $table->foreignId('id_pedido')->nullable()->constrained('pedidos', 'id_pedido')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_articulo')->nullable()->constrained('articulos', 'id_articulo')->nullOnDelete()->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lineas_pedido');
    }
};
