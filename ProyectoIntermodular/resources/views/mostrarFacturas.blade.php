<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Facturas</title>
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-50 p-8">

    <div class="max-w-6xl mx-auto">
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 class="text-xl font-semibold text-gray-800">Gestión de Facturas</h2>
            </div>

            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 font-bold">ID</th>
                        <th class="py-3 px-6 font-bold">Cliente VIP</th>
                        <th class="py-3 px-6 font-bold text-right">Base Imp.</th>
                        <th class="py-3 px-6 font-bold text-center">IVA</th>
                        <th class="py-3 px-6 font-bold text-right">Total</th>
                        <th class="py-3 px-6 font-bold text-center">Estado</th>
                        <th class="py-3 px-6 font-bold text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    @forelse ($facturas as $factura)
                        <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td class="py-3 px-6 text-left whitespace-nowrap font-medium">
                                #{{ $factura->id_factura }}
                            </td>
                            <td class="py-3 px-6 text-left">
                                <div class="flex flex-col">
                                    <span class="font-semibold text-gray-800">
                                        {{ $factura->cliente_vip->nombre ?? 'N/A' }}
                                    </span>
                                    <span class="text-xs text-gray-400">
                                        {{ $factura->cliente_vip->email ?? '' }}
                                    </span>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-right font-mono">
                                {{ number_format($factura->base_imponible, 2) }}€
                            </td>
                            <td class="py-3 px-6 text-center">
                                <span class="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs">
                                    {{ $factura->iva_porcentaje }}%
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right font-bold text-gray-800 font-mono">
                                {{ number_format($factura->total_factura, 2) }}€
                            </td>
                            <td class="py-3 px-6 text-center">
                                @php
                                    $statusColor =
                                        $factura->estado === 'pagada'
                                            ? 'bg-green-200 text-green-800'
                                            : 'bg-yellow-200 text-yellow-800';
                                @endphp
                                <span class="{{ $statusColor }} py-1 px-3 rounded-full text-xs font-bold uppercase">
                                    {{ $factura->estado }}
                                </span>
                            </td>
                            <td class="py-3 px-6 text-center">

                                <a href="/mostrar/factura/{{ $factura->id_factura }}"
                                    class="bg-indigo-500 text-white py-2 px-4 rounded">
                                    Ver Detalles
                                </a>
                            </td>

                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="py-10 text-center text-gray-500 italic">
                                No se encontraron facturas registradas.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</body>

</html>
