<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articulos_catalogos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_catalogo')->nullable()->constrained('catalogos', 'id_catalogo')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_articulo')->nullable()->constrained('articulos', 'id_articulo')->nullOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('articulos_catalogos');
    }
};
