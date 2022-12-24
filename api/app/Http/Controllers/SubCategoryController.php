<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class SubCategoryController extends Controller
{

    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function add(Request $request)
    {
        //Validate data
        $data = $request->only('sub_name','main_category_id');
        $validator = Validator::make($data, [
            'sub_name' => 'required|string',
            'main_category_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        $subCategory = new SubCategory;
        $subCategory->sub_name = $request->sub_name;
        $subCategory->main_category_id = $request -> main_category_id;
        $result= $subCategory->save();

        if($result){
            return $subCategory;
        }else{
            return 'Kaydedilmedi';
        }

    }

    public function addMulti(Request $request){

        $data = $request->all();

      try {
        foreach ($data as $item) {
            $subCategory = new SubCategory;
            $subCategory->main_category_id = $item['main_category_id'];
            $subCategory->sub_name = $item['sub_name'];
            $subCategory->save();

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
        $subCategory = SubCategory::find($request->id);
        $subCategory->sub_name = $request->sub_name;
        $subCategory->main_category_id = $request->main_category_id;
        $result = $subCategory->save();

        if ($result) {
            return response()->json([
                'success' => true,
                'message' => 'Product Güncelleme Başarılı',
                'data' => $subCategory
            ], Response::HTTP_OK);
        }else{
            return 'güncellenmedi';
        }

    }

    public function delete($id)
    {
        $subCategory = SubCategory::findOrFail($id);

        if($subCategory){
        $subCategory->delete();
        return response()->json([
            'success' => true,
            'message' => 'SubCategory silindi.'
        ], Response::HTTP_OK);
        }else{
            return response()->json(error);
        }

    }
}
