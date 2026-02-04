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
            "nombre" => "required|string",
            "contacto" => "required|string",
            "email" => "required|string",
            "password" => "required|string",
            "id_administrador" => "nullable|integer",
        ]);
        try{
            $administrador = Administrador::findOrFail($validatedData["id_administrador"]);

            $comercial = new Comercial([
                "nombre" => $validatedData["nombre"],
                "contacto" => $validatedData["contacto"],
                "email" => $validatedData["email"],
                "password" => $validatedData["password"],
            ]);
            $comercial->administrador()->associate($administrador);
            $comercial->save();

            return redirect()->route('insertarComercial');

        }catch(\Exception $e){
            return response()->json ([
                'message' => 'Error al crear el comercial.',
                'error' => $e->getMessage(),
            ],500);
        }
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
