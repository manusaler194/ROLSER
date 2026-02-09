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
        Schema::create('articulos', function (Blueprint $table) {
            $table->id('id_articulo');
            $table->string('nombre');
            $table->text('descripcion');
            $table->float('precio', 8, 2); // 8 será el máximo de dígitos, y 2 el máximo de decimales (Ejemplo: 123.33€)
            $table->unsignedInteger('stock_actual'); // Solo se peude poner valores positivos (no se puede poner -1)
            $table->timestamps();

            $table->foreignId('id_seccion')->nullable()->constrained('secciones', 'id_seccion')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_administrador')->nullable()->constrained('administradores', 'id_administrador')->nullOnDelete()->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articulos');
    }
};
