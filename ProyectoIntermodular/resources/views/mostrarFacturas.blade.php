<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50">
    
    <div class="p-4 flex flex-col gap-6 max-w-4xl mx-auto">
        <div class="border border-gray-400 rounded-sm shadow-sm overflow-hidden bg-white">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-200 text-gray-800">
                        <th class="border border-gray-400 px-2 py-2 font-bold text-3xl">ID</th>
                        <th class="border border-gray-400 px-2 py-2 font-bold text-3xl">Cliente</th>
                        <th class="border border-gray-400 px-2 py-2 font-bold text-3xl text-center">Estado</th>
                        <th class="border border-gray-400 px-2 py-2 font-bold text-3xl text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($facturas as $factura)
                        <tr class="bg-gray-100 hover:bg-white transition-colors">
                            <td class="border border-gray-400 px-2 py-1 font-medium text-2xl italic text-gray-700">F-{{$factura->id_factura}}</td>
                            <td class="border border-gray-400 px-2 py-1">
                                <div class="flex flex-col">
                                    @if($factura->clienteVip)
                                        <span class="font-black text-gray-900 text-xl">{{$factura->clienteVip->nombre}}</span>
                                        <span class="text-l uppercase tracking-tight font-extrabold text-red-600">Cliente VIP</span>
                                    @elseif($factura->cliente)
                                        <span class="font-black text-gray-900 text-xl">{{$factura->cliente->nombre}}</span>
                                        <span class="text-l text-gray-600 font-bold uppercase">Comercial: {{$factura->cliente->comercial->nombre}}</span>
                                    @endif
                                </div>
                            </td>
                            <td class="border border-gray-400 px-2 py-1 text-center">
                                <span class="px-2 py-0.5 rounded text-xl font-black shadow-sm">{{$factura->estado}}</span>
                            </td>
    
                            <td class="border border-gray-400 px-2 py-1 text-center relative">
                                <a href="/mostrar/factura/{{$factura->id_factura}}" class="bg-red-600 text-white px-4 py-1 rounded text-xl font-black shadow-md">Detalles</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="p-8 text-center text-4xl text-gray-400 font-bold">No hay facturas.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>