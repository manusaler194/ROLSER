<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mi Perfil</title>
    @vite('resources/css/app.css')
    <style>
        html, body { height: 100%; margin: 0; background-color: #f9fafb; }
    </style>
</head>
<body class="font-sans antialiased text-gray-800 flex items-center justify-center p-4">

    @php
        $nombreCompleto = $perfil->nombre;
        if(isset($perfil->apellidos)) {
            $nombreCompleto .= ' ' . $perfil->apellidos;
        }

        $titulo = "Mi Perfil";
        if($tipo === 'cliente') $titulo = "Ficha del Cliente";
        if($tipo === 'clientevip') $titulo = "Ficha Cliente VIP";
        if($tipo === 'comercial') $titulo = "Ficha del Comercial";

        $rolFormateado = strtoupper($tipo);
        if($tipo === 'clientevip') $rolFormateado = 'CLIENTE VIP';
    @endphp

    <div class="w-full max-w-2xl bg-white p-6 sm:p-12 rounded-[30px] border border-gray-200 shadow-xl relative">

        <h2 class="text-3xl sm:text-4xl font-black mb-8 sm:mb-10 text-center text-gray-900 tracking-tight">
            {{ $titulo }}
        </h2>

        <div class="space-y-6 sm:space-y-8">

            <div class="flex flex-col gap-2">
                <label class="text-sm sm:text-base font-black text-gray-500 uppercase tracking-wider pl-2 sm:pl-4">
                    Rol
                </label>
                <div class="relative w-full">
                    <select disabled class="w-full appearance-none border border-gray-200 rounded-full py-3 sm:py-4 px-5 sm:px-6 text-center bg-gray-50 font-bold text-gray-400 cursor-not-allowed text-base sm:text-lg">
                        <option>{{ $rolFormateado }}</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-5 flex items-center">
                        <svg class="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <hr class="border-gray-100 my-6 sm:my-8" />

            <div class="flex flex-col gap-2">
                <label class="text-sm sm:text-base font-black text-gray-500 uppercase tracking-wider pl-2 sm:pl-4">
                    Nombre
                </label>
                <div class="relative w-full">
                    <input type="text" readonly value="{{ $nombreCompleto }}" class="w-full border border-gray-300 rounded-full py-3 sm:py-4 px-5 sm:px-6 text-center cursor-default bg-white text-gray-800 font-semibold text-base sm:text-lg shadow-sm">
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-sm sm:text-base font-black text-gray-500 uppercase tracking-wider pl-2 sm:pl-4">
                    Email
                </label>
                <div class="relative w-full">
                    <input type="email" readonly value="{{ $perfil->email }}" class="w-full border border-gray-300 rounded-full py-3 sm:py-4 px-5 sm:px-6 text-center cursor-default bg-white text-gray-800 font-semibold text-base sm:text-lg shadow-sm truncate">
                </div>
            </div>

            @if(isset($perfil->telefono) || isset($perfil->contacto))
            <div class="flex flex-col gap-2">
                <label class="text-sm sm:text-base font-black text-gray-500 uppercase tracking-wider pl-2 sm:pl-4">
                    Teléfono
                </label>
                <div class="relative w-full">
                    <input type="tel" readonly value="{{ $perfil->telefono ?? $perfil->contacto }}" class="w-full border border-gray-300 rounded-full py-3 sm:py-4 px-5 sm:px-6 text-center cursor-default bg-white text-gray-800 font-semibold text-base sm:text-lg shadow-sm">
                </div>
            </div>
            @endif

            @if(isset($perfil->direccion))
            <div class="flex flex-col gap-2">
                <label class="text-sm sm:text-base font-black text-gray-500 uppercase tracking-wider pl-2 sm:pl-4">
                    Dirección
                </label>
                <div class="relative w-full">
                    <input type="text" readonly value="{{ $perfil->direccion }}" class="w-full border border-gray-300 rounded-full py-3 sm:py-4 px-5 sm:px-6 text-center cursor-default bg-white text-gray-800 font-semibold text-base sm:text-lg shadow-sm truncate">
                </div>
            </div>
            @endif

            <div class="pt-8 sm:pt-10 flex justify-center">
                <a href="http://localhost:5174/modificar-perfil" target="_parent"
                   style="background-color: #bd0026;"
                   class="w-full text-white font-bold py-4 sm:py-5 px-10 rounded-full shadow-lg transition-transform active:scale-95 text-lg sm:text-xl tracking-wide text-center block">
                    Modificar mis datos
                </a>
            </div>

        </div>
    </div>

</body>
</html>
