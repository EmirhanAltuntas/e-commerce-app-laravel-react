<?php

namespace App\Http\Controllers;

use App\Models\temp_employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Mail\ComfirmMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TempEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

public function addEmployee(Request $request){
        $data = $request->only('store_name','store_id','email');
        $validator = Validator::make($data, [
            'store_name' => 'required|string',
            'email'=>'required|string',
            'store_id' => 'required|integer',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }
        $user = User::get()->where('email','=',$request->email)->first();

        $username = $user?$user->name:"";
         if($username!=""){
            $user->user_level = 3;
            $user->store_id = $request->store_id;
            $result = $user->save();
            if($result){

                $username = $user->name;
                $useremail = $user->email;
             //   return  $useremail;
                $details = [
                    'title'=> 'Getiriverin Gari -den bir e-postanız var',
                    'body'=>'Çalışma Kabul',
                    'user'=> $username
                ];
                Mail::to($useremail)->send(new ComfirmMail($details));
                return $user;
            }
        }else{
            $newUser = new User;
            $newUser->name = 'çalışan';
            $newUser->email= $request->email;
            $newUser->user_level= 3;
            $newUser->store_id= $request->store_id;
            $random_password = Str::random(10);
            $newUser->password = bcrypt($random_password);
            $result = $newUser->save();

            if($result){

               // $username = $newUser->name;
                $useremail = $newUser->email;
               // return  $useremail;
                $details = [
                    'title'=> 'Getiriverin den bir e-postanız var',
                    'body'=>'Çalışma Kabul',
                    'email'=> $useremail,
                    'password'=> $random_password,
                ];
                Mail::to($useremail)->send(new ComfirmMail($details));
                return $newUser;
            }


            return $newUser->password;
        }

}


    public function add(Request $request)
    {
        //Validate data
        $data = $request->only('store_name','store_id','email');
        $validator = Validator::make($data, [
            'store_name' => 'required|string',
            'email'=>'required|string',
            'store_id' => 'required|integer',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        $temp_employee = new temp_employee;
        $temp_employee->store_name = $request->store_name;
        $temp_employee->store_id = $request ->store_id;
        $temp_employee->email = $request ->email;
        $temp_employee->status = 0;
        $user = User::get()->where('email','=',$request->email)->first();

         $username = $user?$user->name:"";
          if($username!=""){

            $temp_employee->status = 1;

         }else{
              $temp_employee->status = 0;
          }

        $result= $temp_employee->save();

        if($result){
             return $temp_employee;
         }else{
            return 'Kaydedilmedi';
     }

    }

    public function getAll()
    {
        $temp_employees = temp_employee::all();
         return response()->json($temp_employees, );
    }
    public function getByStoreId($id){


        $temp_employees = temp_employee::get()->where('store_id','=',$id);
        return response()->json(['data'=>$temp_employees,'message'=>'çalışanlar listelendi','status'=>'success',200] );
    }

    public function getEmployeeByStoreId($id){

        $user = User::get()->where('store_id','=',$id);

        return response()->json(['data'=>$user,'status'=>'success',200] );
    }

    public function delete($id){
        $temp_employee = temp_employee::findOrFail($id);
    //    return $temp_employee;

        if($temp_employee){
            $temp_employee->delete();
            return $id;
            }else{
                return response()->json(error);
            }
    }

}
