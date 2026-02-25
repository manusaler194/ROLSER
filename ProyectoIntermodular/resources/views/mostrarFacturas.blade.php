<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Facturas</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50 p-4">

    <div class="max-w-4xl mx-auto">
        <div class="overflow-hidden bg-white shadow-md border border-gray-300 rounded-lg">
            <table class="w-full border-collapse">
                <thead class="hidden md:table-header-group">
                    <tr class="bg-gray-200 text-gray-800">
                        <th class="border-b border-gray-300 px-4 py-3 font-bold text-xl text-left">ID</th>
                        <th class="border-b border-gray-300 px-4 py-3 font-bold text-xl text-left">Cliente</th>
                        <th class="border-b border-gray-300 px-4 py-3 font-bold text-xl text-center">Estado</th>
                        <th class="border-b border-gray-300 px-4 py-3 font-bold text-xl text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    @forelse ($facturas as $factura)
                        <tr class="flex flex-col md:table-row hover:bg-gray-50 transition-colors">

                            <td class="px-4 py-2 md:py-4 border-b md:border-none flex justify-between md:table-cell items-center">
                                <span class="md:hidden font-bold text-gray-500 uppercase text-xs">ID de Factura</span>
                                <span class="italic font-medium text-lg md:text-xl text-gray-700">F-{{$factura->id_factura}}</span>
                            </td>

                            <td class="px-4 py-2 md:py-4 border-b md:border-none flex flex-col md:table-cell">
                                <span class="md:hidden font-bold text-gray-500 uppercase text-xs mb-1">Información Cliente</span>
                                <div class="flex flex-col">
                                    @if($factura->clienteVip)
                                        <span class="font-black text-gray-900 text-lg md:text-xl">{{$factura->clienteVip->nombre}}</span>
                                        <span class="text-xs md:text-sm uppercase tracking-tight font-extrabold text-red-600">Cliente VIP</span>
                                    @elseif($factura->cliente)
                                        <span class="font-black text-gray-900 text-lg md:text-xl">{{$factura->cliente->nombre}}</span>
                                        <span class="text-xs md:text-sm text-gray-500 font-bold uppercase">Comercial: {{$factura->cliente->comercial->nombre}}</span>
                                    @endif
                                </div>
                            </td>

                            <td class="px-4 py-2 md:py-4 border-b md:border-none flex justify-between md:table-cell items-center text-center">
                                <span class="md:hidden font-bold text-gray-500 uppercase text-xs">Estado</span>
                                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm md:text-base font-black shadow-sm">
                                    {{$factura->estado}}
                                </span>
                            </td>

                            <td class="px-4 py-4 md:table-cell text-center flex justify-center items-center bg-gray-50 md:bg-transparent">
                                <a href="/mostrar/factura/{{$factura->id_factura}}"
                                   class="w-full md:w-auto inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold shadow-md transition-all text-center">
                                   Detalles
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="p-12 text-center text-2xl text-gray-400 font-bold">
                                No hay facturas registradas.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</body>
</html>
