<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use App\Models\Photos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $store = Store::all();
        return $stores;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addStore(Request $request)
    {
        $data = $request->only('store_name','tax_number','tel_number','user_id');
        $validator = Validator::make($data, [
            'store_name' => 'required|string',
            'tax_number' => 'required|string',
            'tel_number' => 'required|string',
            'user_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        $store = new Store;
        $store->store_name = $request->store_name;
        $store->tax_number = $request->tax_number;
        $store->tel_number = $request->tel_number;
        $store->status = true;
        $result= $store->save();

        $photo = new Photos;
        $photo->create([
            'image_path' => 'default.png',
            'imageable_id'=>$store->id,
            'imageable_type'=>Store::class,
            'type'=> 0
        ]);
        if($result){
            $user = User::find($request->user_id);
            $user->store_id = $store->id;
            $user->user_level = "2";
            $result2 = $user->save();

            if ($result2) {
            return response()->json([
                    'success' => true,
                    'message' => 'User Güncelleme Başarılı',
                    'data' => [
                        'user'=>$user,
                        'store'=>$store
                    ]
                ], Response::HTTP_OK);
            }else{
                return 'güncellenmedi';
            }

            return $store;
        }else{
            return 'Kaydedilmedi';
        }
    }

    public function getStores (){
        return Store::all();
    }

    public function getStoreById($id){
        $store = Store::With(['photos'])->findOrFail($id);

        if($store){
            return $store;
            }else{
                return response()->json(error);
        }
}
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\store  $store
     * @return \Illuminate\Http\Response
     */
    public function edit(store $store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\store  $store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, store $store)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\store  $store
     * @return \Illuminate\Http\Response
     */
    public function destroy(store $store)
    {
        //
    }
}
