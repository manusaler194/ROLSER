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
            $table->unsignedInteger('cantidad');
            $table->date('fecha');
            $table->timestamps();
            $table->decimal('precio',10,2);
            $table->foreignId('id_administrador')->nullable()->constrained('administradores', 'id_administrador')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_comercial')->nullable()->constrained('comerciales', 'id_comercial')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_cliente')->nullable()->constrained('clientes', 'id_cliente')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_clientevip')->nullable()->constrained('clientes_vip', 'id_clientevip')->nullOnDelete()->cascadeOnUpdate();

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
