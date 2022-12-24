<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StoreProduct;
use App\Models\Category;
use App\Models\Store;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class GetDataController extends Controller

{

    public function getProducts (){
        $products = Product::With(['photos'])->get();
        return response()->json($products);
    }

    public function getCategories(){
        $categories = Category::With(['getSubCategory'])->get();
        return response()->json($categories);
    }

    public function getSubCategories(){
        return SubCategory::all();
    }
    public function getSubCategoriesByCategoryId(Request $request){




        $subCategories = SubCategory::all()->whereIn('main_category_id',$request);
        return $subCategories;



    }
    public function getStoreProducts(){

        $store_products  = Store::with('storeproducts')->get();

         return response()->json($store_products, 200);
    }

    public function getAllProducts(Request $request){

       // return $request;
        if($request->subs){
            $store_products  = Product::with('storeproducts')->has("storeproducts")->with('photos')->whereIn('sub_category_id',explode(",",$request->subs))->get()->paginate(2);

            return response()->json($store_products, 200);
        }
        else{
            $store_products  = Product::with('storeproducts')->has("storeproducts")->with('photos')->get()->paginate(2);

            return response()->json($store_products, 200);
        }


    }

}
