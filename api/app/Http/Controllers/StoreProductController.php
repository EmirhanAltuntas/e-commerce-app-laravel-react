<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Models\Store;
use App\Models\Product;
use App\Models\StoreProduct;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class StoreProductController extends Controller
{


    public function add(Request $request)
    {
        //Validate data
        $data = $request->only('store_id','product_id','stock','price');
        $validator = Validator::make($data, [
            'store_id' => 'required|integer',
            'product_id' => 'required|integer',
            'stock' => 'required|integer|max:999',
            'price' => 'required|integer|max:15000',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        $store_product = new StoreProduct;
        $store_product->store_id = $request->store_id;
        $store_product->product_id = $request -> product_id;
        $store_product->stock = $request -> stock;
        $store_product->price = $request -> price;
        $result= $store_product->save();

        if($result){

            $store_products  = Store::with(['storeproducts'])->get()->where('id', '=', $store_product->store_id)->last();

            return $store_products;
        }else{
            return 'Kaydedilmedi';
        }

    }


    public function getStoreProducts(){

        $store_products  = Store::with('storeproducts')->get();

         return response()->json($store_products, 200);
    }
    public function getStoreProductById($id){

        $store_products  = Store::with('storeproducts')->get() ->where('id', '=', $id);

         return $store_products;

    }
}
