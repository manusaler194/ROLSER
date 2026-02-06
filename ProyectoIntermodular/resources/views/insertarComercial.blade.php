@if ($errors->any()) {{-- esto muestra todos los errores seguidos --}}
    <ul>
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
<br/>
@endif

<form method="post" action="{{ route('almacenar') }}">

        @csrf
        <label for="name">Nombre:</label>
        <input type="text" name="nombre" value="{{old('nombre')}}"/>
     {!! $errors->first('name', '<small>:message</small><br>' )!!}  <!-- así especificamos los errores debajo-->

        <label for="price">Descripcion:</label>
        <input type="text" name="descripcion" value="{{old('descripcion')}}"/>
     {!! $errors->first('descripcion', '<small>:message</small><br>' )!!}


    <button type="submit">Crear</button>
</form>
