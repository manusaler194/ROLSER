<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\Comercial;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use App\Models\Administrador;

class ComercialController extends Controller{
    public function guardar(Request $request){
        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:100',
            'contacto'         => 'required|string|max:100',
            'email'            => 'required|email|unique:comerciales,email',
            'password'         => 'required|string',
            'id_administrador' => 'nullable|integer',
        ]);

        try {
            $comercial = Comercial::create($validatedData);

            return response()->json([
                'message' => 'Comercial creado con éxito.',
                'comercial' => $comercial,
            ], 201); 

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el comercial.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function mostrar(Request $request){
        $datos = Comercial::all();
        return $datos;
    }

    public function actualizar (Request $request){

        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:100',
            'contacto'         => 'required|string|max:100',
            'email'            => 'required|email',
            'password'         => 'required|string',
            'id_administrador' => 'nullable|integer',
        ]);
        
        try{
            
            $comercial = Comercial::findOrFail($request->id_comercial);
            $comercial->update($validatedData);

            return response()->json([
                'message' => 'Comercial actualizado con éxito.',
                'comercial' => $comercial,
            ], 200);

        }catch (\Exception $e){

            return response()->json ([
                'message' => 'Error al actualizar el comercial.',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function eliminar(Request $request){
        
        $comercial = Comercial::destroy($request->id_comercial);

        return response()->json([
            "message" => "Comercial con id =" . $request->id_comercial . " ha sido borrado con éxito"

        ],201);
    }

/*

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->except(['_token']);

        if (Auth::attempt($credentials)) {  //comprobación de autenticación

            return redirect()->route('admin');  //nos redirije a la ruta 'admin'

        } else {
            session()->flash('message', 'Invalid credentials');
            return redirect()->back();
        }
    }

    public function getAuthPassword(){
        return $this->password;
    }

    public function registro(Request $request){
             $request->validate([
                 'name' => 'required',
                 'email' => 'required',
                 'password' => 'required'
             ]);

             $user = Comercial::create([
                 'name' => trim($request->input('name')),
                 'email' => strtolower($request->input('email')),
                 'password' => bcrypt($request->input('password')),
             ]);

             return redirect()->route('admin');
         }

         public function logout(Request $request){
             //Session::flush();
             Auth::logout();
             return redirect('login');
         }
*/
}
