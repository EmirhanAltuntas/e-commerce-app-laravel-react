<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class CategoryController extends Controller
{

    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }


    public function add(Request $request)
    {
        //Validate data
        $data = $request->only('name');
        $validator = Validator::make($data, [
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        $category = new Category;
        $category->name = $request->name;
        $result= $category->save();

        if($result){
            return $category;
        }else{
            return 'Kaydedilmedi';
        }

    }
    public function addMulti(Request $request){

       $data = $request->all();

     try {
       foreach ($data as $item) {
        $category = new Category;
        $category->name = $item['categoryName'];


         $category->save();

     }
     return response()->json([
        'success' => true,
        'message' => 'Ekleme başarılı',
    ], Response::HTTP_OK);
     } catch (\Throwable $th) {
       return 'ekleme başarısız';
     }
}

    public function update(Request $request){
        $category = Category::find($request->id);
        $category->name = $request->name;
        $result = $category->save();

        if ($result) {
        return response()->json([
                'success' => true,
                'message' => 'Category Güncelleme Başarılı',
                'data' => $category
            ], Response::HTTP_OK);
        }else{
            return 'güncellenmedi';
        }

    }

public function delete($id)
    {
        $category = Category::findOrFail($id);

        if($category){
        $category->delete();
        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ], Response::HTTP_OK);
        }else{
            return response()->json(error);
        }


}



}
