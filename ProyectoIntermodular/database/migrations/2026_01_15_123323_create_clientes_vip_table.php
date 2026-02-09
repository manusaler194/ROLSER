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
        Schema::create('clientes_vip', function (Blueprint $table) {
            $table->id('id_clientevip');
            $table->string('nombre', 50);
            $table->string('telefono', 20);
            $table->string('correo', 255);
            $table->string('direccion',255);
            $table->timestamps();

            $table->foreignId('id_administrador')->nullable()->constrained('administradores', 'id_administrador')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_catalogo')->nullable()->constrained('catalogos', 'id_catalogo')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_comercial')->nullable()->constrained('comerciales', 'id_comercial')->nullOnDelete()->cascadeOnUpdate();
            

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes_vip');
    }
};
