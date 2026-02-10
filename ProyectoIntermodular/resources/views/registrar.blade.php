<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Rolser</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans antialiased">

    <div class="flex flex-col min-h-screen">

        {{-- ================= HEADER ================= --}}
        <header class="bg-[#1a1a1a] h-24 flex items-center px-6 md:px-12 flex-shrink-0">
            <div class="flex items-center gap-4">
                {{-- Logo --}}
                <a href="/" class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0">
                        <div class="text-[#C8102E] font-bold text-[10px] leading-none text-center">
                            ROL<br>SER
                        </div>
                    </div>
                    <h1 class="text-white text-3xl font-bold tracking-widest uppercase">
                        Rolser
                    </h1>
                </a>
            </div>
        </header>

        {{-- ================= MAIN (Fondo Rojo) ================= --}}
        <main class="flex-1 bg-[#C8102E] flex items-center justify-center px-4 py-10">

            {{-- Tarjeta Blanca --}}
            <div class="bg-white p-10 w-full max-w-[450px] shadow-2xl flex flex-col items-center">

                {{-- Logo dentro de la tarjeta --}}
                <div class="flex items-center gap-3 mb-8">
                    <div class="flex gap-1">
                        <div class="w-1.5 h-1.5 bg-[#C8102E] rounded-full"></div>
                        <div class="w-1.5 h-1.5 bg-[#C8102E] rounded-full"></div>
                        <div class="w-1.5 h-1.5 bg-[#C8102E] rounded-full"></div>
                    </div>
                    <h2 class="text-4xl font-bold text-black tracking-wide uppercase">
                        Rolser
                    </h2>
                </div>

                <h3 class="text-gray-500 mb-6 text-sm uppercase tracking-wider">Crear nueva cuenta</h3>

                {{-- Formulario de Registro --}}
                <form method="POST" action="{{ route('registrar') }}" class="w-full flex flex-col gap-5">
                    @csrf

                    {{-- Input: Nombre --}}
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre completo"
                            class="w-full bg-[#f5f5f5] border border-gray-400 text-gray-700 text-center py-3 px-4 focus:outline-none focus:border-[#C8102E] placeholder-gray-600 shadow-sm"
                            value="{{ old('name') }}"
                            required
                            autofocus
                        >
                        @error('name')
                            <span class="text-white text-xs mt-1 block bg-red-800 p-1">{{ $message }}</span>
                        @enderror
                    </div>

                    {{-- Input: Email --}}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            class="w-full bg-[#f5f5f5] border border-gray-400 text-gray-700 text-center py-3 px-4 focus:outline-none focus:border-[#C8102E] placeholder-gray-600 shadow-sm"
                            value="{{ old('email') }}"
                            required
                        >
                        @error('email')
                            <span class="text-white text-xs mt-1 block bg-red-800 p-1">{{ $message }}</span>
                        @enderror
                    </div>

                    {{-- Input: Contraseña --}}
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

                    {{-- Input: Confirmar Contraseña --}}
                    <div>
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirmar contraseña"
                            class="w-full bg-[#f5f5f5] border border-gray-400 text-gray-700 text-center py-3 px-4 focus:outline-none focus:border-[#C8102E] placeholder-gray-600 shadow-sm"
                            required
                        >
                    </div>

                    {{-- Botón Registrar --}}
                    <button
                        type="submit"
                        class="w-full bg-[#C8102E] hover:bg-[#a50b24] text-white font-bold py-3 rounded shadow-md transition-colors uppercase tracking-wide text-sm mt-2"
                    >
                        Registrarse
                    </button>

                    {{-- Link Volver al Login --}}
                    <div class="text-center mt-4">
                        <span class="text-gray-500 text-sm">¿Ya tienes cuenta?</span>
                        <a href="{{ route('login') }}" class="block text-black font-semibold text-sm hover:underline mt-1">
                            Iniciar sesión
                        </a>
                    </div>
                </form>
            </div>
        </main>

        {{-- ================= FOOTER ================= --}}
        <footer class="bg-[#1a1a1a] h-32 flex-shrink-0">
            {{-- Espacio vacío negro --}}
        </footer>

    </div>
</body>
</html>
