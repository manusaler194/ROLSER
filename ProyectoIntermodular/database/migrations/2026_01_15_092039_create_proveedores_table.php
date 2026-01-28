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
        Schema::create('proveedores', function (Blueprint $table) {
            $table->id('id_proveedor');
            $table->string('nombre_empresa',100);
            $table->string('contacto',100);
            $table->string('cif',20);
            $table->timestamps(); // Crea automáticamente dos columnas ("created_at" y "updated_at")


            $table->foreignId('id_encargado')->nullable()->constrained('encargados_de_almacen', 'id_encargado')->nullOnDelete()->cascadeOnUpdate();
            // Foreign key (id_encargado), nullable = puede estar vacío,constrained selecciona la clave ajena, nullOnDelete si se borra se pone null, y cascadeOnUpdate se actualiza en cascada
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proveedores');
    }
};
