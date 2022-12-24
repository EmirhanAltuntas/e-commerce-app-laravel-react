<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use JWTAuth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email|min:5|max:35',
            'password' => 'required|string|min:5|max:20'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages(),'status'=>'error'], 200);
        }
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 'error',
                	'success' => false,
                	'message' => 'Login credentials are invalid.',
                ], 400);
            }
        } catch (JWTException $e) {
    	return $credentials;
            return response()->json([
                'status' => 'error',
                	'success' => false,
                	'message' => 'Could not create token.',
                ], 500);
        }
        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Bilgiler doğru. Giriş yapılıyor...',
            'data'=>['token' => $token]
          //  'user' =>auth()->guard()->user(),
        ]);
    }

    public function logout(Request $request)
    {

        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);


        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }
        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function get_user(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        $user = JWTAuth::authenticate($request->token);

        return response()->json(['user' => $user]);
    }

    public function register(Request $request)
    {
        $data = $request->only('name','email','password');
        $validator = Validator::make($data, [
            'name'      => 'required | string|min:5|max:20',
            'email'     => 'required | email |Unique:users|min:5|max:40',
            'password'  => 'required | string|min:6|max:15'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages(),'status'=>'error'], 200);
        }
        else{
            $data =[
                'name'      => request()->get('name'),
                'email'     => request()->get('email'),
                'password'  => bcrypt( request()->get('password')),
                'user_level'=> !empty(request()->get('user_level'))?request()->get('user_level'):4,
               // 'store_id'=> !empty(request()->get('store_id'))?request()->get('store_id'):0,

            ];

                   return response()-> json([
                    'data'=> User::create($data),
                    'message'   => 'Kayıt Başarılı, Giriş Yapın.',
                    'status'=>'success'
                ],200);
        }
}



    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
}
