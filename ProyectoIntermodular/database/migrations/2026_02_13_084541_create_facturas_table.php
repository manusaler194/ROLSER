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
        Schema::create('facturas', function (Blueprint $table) {
            $table->id('id_factura');
            $table->float('base_imponible', 10, 2);
            $table->float('iva_porcentaje', 5, 2);
            $table->float('total_iva', 10, 2);
            $table->float('total_factura', 10, 2);
            $table->string('estado');
            $table->string('metodo_pago');
            $table->foreignId('id_comercial')->nullable()->constrained('comerciales', 'id_comercial')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_cliente')->nullable()->constrained('clientes', 'id_cliente')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_clientevip')->nullable()->constrained('clientes_vip', 'id_clientevip')->nullOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
