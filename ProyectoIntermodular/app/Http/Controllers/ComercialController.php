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

    public function mostrarComercial($id_comercial)
    {
        try {
            // Usamos 'findOrFail': si no existe, salta directo al catch
            $comercial = Comercial::findOrFail($id_comercial);

            return response()->json($comercial, 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            
            return response()->json([
                'message' => 'Comercial no encontrado'
            ], 404);

        } catch (\Exception $e) {
            
            return response()->json([
                'message' => 'Error al obtener el Comercial',
                'error' => $e->getMessage()
            ], 500);
        }
    }

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
        try{
            $datos = Comercial::all();
            return $datos;
        }catch(\Exception $e){
            return response()->json([
            'message' => 'Error al obtener los comerciales.',
            'error' => $e->getMessage()
        ], 500);
        }    
    
    }

    public function actualizar (Request $request){

        $validatedData = $request->validate([
            'nombre'           => 'required|string|max:100',
            'contacto'         => 'required|string|max:100',
            'email'            => 'required|email',
            'password'         => 'nullable|string',
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
         try{
            $comercial = Comercial::destroy($request->id_comercial);

            if ($comercial === 0) {
                return response()->json([
                    "message" => "No se encontró el comercial con ID " . $request->id_comercial
                ], 404);
            }
            return response()->json([
                "message" => "Comercial con id =" . $request->id_comercial . " ha sido borrado con éxito"
            ],201);
        }catch(\Exception $e){
            return response()->json([
                "message" => "Error de base de datos al eliminar",
                "error" => $e->getMessage()
            ], 500);
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
