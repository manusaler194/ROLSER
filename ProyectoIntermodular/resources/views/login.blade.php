<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Rolser</title>




    <script src="https://cdn.tailwindcss.com"></script>
    
</head>
<body class="font-sans antialiased">

    <div class="flex flex-col min-h-screen">

        {{-- ================= HEADER ================= --}}
        <header class="bg-[#1a1a1a] h-24 flex items-center px-6 md:px-12 flex-shrink-0">
            <div class="flex items-center gap-4">
                {{-- Logo Círculo Blanco --}}
                <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0">
                    <div class="text-[#C8102E] font-bold text-[10px] leading-none text-center">
                        ROL<br>SER
                    </div>
                </div>
                {{-- Texto Rolser --}}
                <h1 class="text-white text-3xl font-bold tracking-widest uppercase">
                    Rolser
                </h1>
            </div>
        </header>

        {{-- ================= MAIN (Fondo Rojo) ================= --}}
        <main class="flex-1 bg-[#C8102E] flex items-center justify-center px-4 py-10">

            {{-- Tarjeta Blanca --}}
            <div class="bg-white p-10 w-full max-w-[420px] shadow-2xl flex flex-col items-center">

                {{-- Logo dentro de la tarjeta --}}
                <div class="flex items-center gap-3 mb-8">
                    {{-- Simulación 3 puntos rojos --}}
                    <div class="flex gap-1">
                        <div class="w-1.5 h-1.5 bg-[#C8102E] rounded-full"></div>
                        <div class="w-1.5 h-1.5 bg-[#C8102E] rounded-full"></div>
                        <div class="w-1.5 h-1.5 bg-[#C8102E] rounded-full"></div>
                    </div>
                    <h2 class="text-4xl font-bold text-black tracking-wide uppercase">
                        Rolser
                    </h2>
                </div>

                {{-- Formulario Laravel --}}
                <form method="POST" action="{{ route('login') }}" class="w-full flex flex-col gap-6">
                    @csrf

                    {{-- Input Usuario --}}
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Nombre de usuario"
                            class="w-full bg-[#f5f5f5] border border-gray-400 text-gray-700 text-center py-3 px-4 focus:outline-none focus:border-[#C8102E] placeholder-gray-600 shadow-sm"
                            value="{{ old('email') }}"
                            required
                            autofocus
                        >
                        {{-- Mensaje de error (opcional) --}}
                        @error('email')
                            <span class="text-white text-xs mt-1 block bg-red-800 p-1">{{ $message }}</span>
                        @enderror
                    </div>

                    {{-- Input Contraseña --}}
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            class="w-full bg-[#f5f5f5] border border-gray-400 text-gray-700 text-center py-3 px-4 focus:outline-none focus:border-[#C8102E] placeholder-gray-600 shadow-sm"
                            required
                        >
                        @error('password')
                            <span class="text-white text-xs mt-1 block bg-red-800 p-1">{{ $message }}</span>
                        @enderror
                    </div>

                    {{-- Checkbox Recordar --}}
                    <div class="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            class="w-4 h-4 border-gray-300 rounded text-[#C8102E] focus:ring-[#C8102E]"
                        >
                        <label for="remember" class="text-gray-600 text-sm cursor-pointer select-none">
                            Recordar
                        </label>
                    </div>

                    {{-- Botón Acceder --}}
                    <button
                        type="submit"
                        class="w-full bg-[#C8102E] hover:bg-[#a50b24] text-white font-bold py-2.5 rounded shadow-md transition-colors uppercase tracking-wide text-sm"
                    >
                        Acceder
                    </button>

                    {{-- Link No Registrado --}}
                    <div class="text-center mt-2">
                        <a href="{{ route('registrar') }}" class="text-gray-600 text-sm hover:text-black hover:underline transition-colors">
                            No estoy registrado
                        </a>
                    </div>
                </form>
            </div>
        </main>

        {{-- ================= FOOTER ================= --}}
        <footer class="bg-[#1a1a1a] h-32 flex-shrink-0">
            {{-- Espacio vacío negro como en la foto --}}
        </footer>

    </div>
</body>
</html>
