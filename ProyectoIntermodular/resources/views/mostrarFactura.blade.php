<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    <style>
        body { 
            font-family: sans-serif; 
            background-color: #f1f5f9;
        }
        .btn-rojo {
            background-color: #b91c1c;
            color: white;
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center py-12">
@foreach ($factura as $f)
    <div class="w-[450px] bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        
        <div class="p-12 flex flex-col">
            
            <div class="text-center mb-16">
                <p class="text-[11px] font-bold tracking-[0.5em] text-red-500 uppercase mb-2">Rolser</p>
                <h1 class="text-4xl font-black text-gray-900 uppercase tracking-tighter">Factura</h1>
                <div class="flex justify-center gap-4 text-xs font-bold uppercase tracking-widest">
                    <span>Nº F-{{ $f->id_factura }}</span>
                </div>
            </div>

            <div class="text-center mb-16 px-4">
                <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Facturar a:</h3>
                @if($f->cliente_vip)
                    <p class="text-2xl font-black text-gray-900 leading-tight uppercase">{{ $f->cliente_vip->nombre }}</p>
                    <p class="text-sm text-gray-500 mt-3 italic underline decoration-indigo-100 underline-offset-4">{{ $f->cliente_vip->email }}</p>
                @elseif($f->cliente)
                    <p class="text-2xl font-black text-gray-900 leading-tight uppercase">{{ $f->cliente->nombre }}</p>
                    <p class="text-sm text-gray-500 mt-3 italic underline decoration-indigo-100 underline-offset-4">{{ $f->cliente->email }}</p>
                @endif                
            </div>
            <div class="mb-16 text-center">
                <div class="border-b-2 border-gray-100 pb-3 mb-8">
                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Detalle del Pedido</p>
                </div>
                
                <p class="text-sm font-bold text-gray-800 uppercase leading-relaxed mb-8 px-2">Datos del precio total del pedido a facturar</p>
                
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100 inline-block w-full">
                    <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Base Imponible</span>
                    <span class="text-2xl font-black text-gray-900">{{$f->base_imponible}}€</span>
                </div>
            </div>

            <div class="pt-8 border-t border-gray-100 text-center">
                <div class="space-y-4 mb-12">
                    <div class="flex flex-col items-center">
                        <span class="text-[10px] font-bold text-gray-400 uppercase">Subtotal</span>
                        <span class="text-md font-bold text-gray-800">{{$f->base_imponible}}€</span>
                    </div>
                    
                    <div class="flex flex-col items-center">
                        <span class="text-[10px] font-bold text-gray-400 uppercase">IVA ({{ $f->iva_porcentaje }}%)</span>
                        <span class="text-md font-bold text-gray-800">+{{$f->total_iva}}€</span>
                    </div>
                    
                    <div class="bg-indigo-50 p-6 rounded-md mt-6 border-y-2">
                        <span class="block text-xs font-black uppercase tracking-widest mb-2">Total Factura</span>
                        <span class="text-4xl font-black text-red-700 tracking-tighter">{{$f->total_factura}}€</span>
                    </div>
                </div>

                <div class="text-center">
                    <p class="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] mb-8 italic">Documento Oficial de Venta</p>
                    <div class="no-print">
                        <a href="/mostrar/facturas" class="btn-rojo inline-block w-full text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-lg shadow-lg hover:brightness-110 transition-all">Cerrar y Volver</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endforeach

</body>
</html>