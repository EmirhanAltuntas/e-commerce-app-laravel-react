<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Photos;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use App\Mail\ComfirmMail;
use Illuminate\Support\Facades\Mail;

class ProductController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getProducts (){
        $products = Product::With(['photos'])->get();
        return response()->json($products);
    }

    public function add(Request $request)
    {
        //Validate data
        $data = $request->only('product_name', 'description', 'sub_category_id');
        $validator = Validator::make($data, [
            'product_name' => 'required|string',
            'description' => 'required',
            'sub_category_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        $product = new Product;
        $product->product_name = $request->product_name;
        $product->sub_category_id = $request -> sub_category_id;
        $product->description = $request -> description;
        $result= $product->save();


        if ($request->hasFile('imagePath')) {
            $type =0;
            foreach ($request->file('imagePath') as $image) {
                $imagePath = date('YmdHi') . $image->getClientOriginalName();
                $image->move(public_path('product_images/'),$imagePath);
                 Photos::create([
                     'image_path'=>$imagePath,
                     'imageable_id'=>$product->id,
                     'imageable_type'=>Product::class,
                     'type'=>$type
                 ]);
                 $type = $type +1;
            }

        }


        $data = Product::where('product_name','=',$request->product_name)->with('photos')->first();

       if($result){

        $details = [
            'title'=> 'Hepsi 1 aradadan bir e-postanız var',
            'body'=>'Test e-postası',
            'user'=>'Emirhan'
        ];
     //   Mail::to('eticaretproject753@gmail.com')->send(new ComfirmMail($details));

        return $data;
       }else{
        return 'ürün eklenemedi';
       }
    }

    public function update(Request $request){
        $product = Product::find($request->id);
        $product->product_name = $request->product_name;
        $product->description = $request->description;
        $product->sub_category_id = $request->sub_category_id;
        $result = $product->save();

        if ($result) {

        return response()->json([
                'success' => true,
                'message' => 'Product Güncelleme Başarılı',
                'data' => $product
            ], Response::HTTP_OK);
        }else{
            return 'güncellenmedi';
        }
    }
    public function delete ($id)
    {
        $product = Product::findOrFail($id);

        if($product){
        $product->delete();
        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ], Response::HTTP_OK);
        }else{
            return response()->json(error);
        }

    }
}
