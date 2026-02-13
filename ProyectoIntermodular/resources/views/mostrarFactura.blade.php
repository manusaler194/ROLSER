<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-100 p-4">
    @foreach ($factura as $f)
        <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="bg-indigo-600 p-4">
                <h2 class="text-white text-lg font-bold">Detalles de Factura #{{ $f->id_factura }}</h2>
            </div>

            <div class="p-6">
                <div class="space-y-4 text-gray-700">
                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold">Cliente VIP:</span>
                        {{-- Accedemos a la relación cargada en el controlador --}}
                        <span>{{ $f->cliente_vip->nombre ?? 'Sin nombre' }}</span>
                    </div>

                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold">Email:</span>
                        <span>{{ $f->cliente_vip->email ?? 'N/A' }}</span>
                    </div>

                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold">Estado:</span>
                        @php
                            $statusClass = $f->estado === 'pagada' ? 'text-green-600' : 'text-red-500';
                        @endphp
                        <span class="uppercase font-semibold {{ $statusClass }}">
                            {{ $f->estado }}
                        </span>
                    </div>

                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold">Método de Pago:</span>
                        <span class="capitalize">{{ $f->metodo_pago }}</span>
                    </div>

                    <div class="mt-6 bg-gray-50 p-4 rounded-lg">
                        <div class="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Base Imponible:</span>
                            <span>{{ number_format($f->base_imponible, 2) }}€</span>
                        </div>
                        <div class="flex justify-between text-sm text-gray-500 mb-2">
                            <span>IVA ({{ $f->iva_porcentaje }}%):</span>
                            <span>{{ number_format($f->total_iva, 2) }}€</span>
                        </div>
                        <div class="flex justify-between border-t border-gray-200 pt-2">
                            <span class="text-xl font-bold text-gray-800">TOTAL:</span>
                            <span class="text-xl font-mono font-bold text-indigo-600">
                                {{ number_format($f->total_factura, 2) }}€
                            </span>
                        </div>
                    </div>
                </div>

                <div class="mt-8 flex justify-center">
                    <a href="/mostrar/facturas" class="inline-flex items-center px-6 py-2 bg-indigo-500 ...">
                        Volver al listado
                    </a>
                </div>
            </div>
        </div>
    @endforeach

    {{-- En caso de que la lista venga vacía --}}
    @if ($factura->isEmpty())
        <div class="text-center p-10">
            <p class="text-gray-500 italic">No se ha encontrado la factura solicitada.</p>
            <a href="/facturas" target="_top" class="...">
                ← Volver al listado
            </a>
        </div>
    @endif

</body>

</html>
