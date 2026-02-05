<x-guest-layout>
    <div class="min-h-screen flex flex-col justify-between bg-[#c20025]">

        <header class="bg-[#111] py-3 px-6 flex items-center">
            <div class="bg-white rounded-full w-12 h-12 flex items-center justify-center mr-3">
                 <span class="text-[#c20025] font-bold text-[8px]">ROLSER</span>
            </div>
            <span class="text-white text-2xl font-bold tracking-widest uppercase">Rolser</span>
        </header>

        <div class="flex flex-grow items-center justify-center p-4">
            <div class="w-full max-w-sm bg-white p-8 shadow-lg">

                <div class="flex justify-center mb-6 items-center gap-2">
                    <span class="text-[#c20025] font-bold text-xs uppercase tracking-wide">Rolser</span>
                    <h2 class="text-3xl font-bold text-black tracking-wider uppercase">Registro</h2>
                </div>

                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="mb-4">
                        <input id="name" type="text" name="name" :value="old('name')" required autofocus
                            class="w-full bg-[#f2f2f2] border border-gray-500 py-3 px-4 text-gray-800 text-center placeholder-gray-600 focus:outline-none focus:border-black transition"
                            placeholder="Nombre completo">
                        <x-input-error :messages="$errors->get('name')" class="mt-2 text-center" />
                    </div>

                    <div class="mb-4">
                        <input id="email" type="email" name="email" :value="old('email')" required
                            class="w-full bg-[#f2f2f2] border border-gray-500 py-3 px-4 text-gray-800 text-center placeholder-gray-600 focus:outline-none focus:border-black transition"
                            placeholder="Correo electrónico">
                        <x-input-error :messages="$errors->get('email')" class="mt-2 text-center" />
                    </div>

                    <div class="mb-4">
                        <input id="password" type="password" name="password" required
                            class="w-full bg-[#f2f2f2] border border-gray-500 py-3 px-4 text-gray-800 text-center placeholder-gray-600 focus:outline-none focus:border-black transition"
                            placeholder="Contraseña">
                        <x-input-error :messages="$errors->get('password')" class="mt-2 text-center" />
                    </div>

                    <div class="mb-6">
                        <input id="password_confirmation" type="password" name="password_confirmation" required
                            class="w-full bg-[#f2f2f2] border border-gray-500 py-3 px-4 text-gray-800 text-center placeholder-gray-600 focus:outline-none focus:border-black transition"
                            placeholder="Confirmar contraseña">
                        <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2 text-center" />
                    </div>

                    <button type="submit" class="w-full bg-[#c20025] hover:bg-[#a0001e] text-white font-medium py-2 rounded shadow-md border border-[#99001d] transition duration-200 text-lg">
                        Registrarse
                    </button>

                    <div class="mt-6 text-center">
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 hover:text-black">
                            ¿Ya tienes cuenta? Accede aquí
                        </a>
                    </div>
                </form>
            </div>
        </div>

        <footer class="bg-[#1a1a1a] h-32 w-full">
            </footer>
    </div>
</x-guest-layout>
