<?php

namespace App\Http\Controllers;

use App\Models\temp_store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class TempStoreController extends Controller
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
    public function add(Request $request)
    {
        //Validate data
        $data = $request->only('store_name','tax_number','tel_number','status','user_id');
        $validator = Validator::make($data, [
            'store_name' => 'required|string',
            'tax_number' => 'required|string',
            'tel_number' => 'required|string',
            'status' => 'required|boolean',
            'user_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        $temp_store = new temp_store;
        $temp_store->store_name = $request->store_name;
        $temp_store->tax_number = $request ->tax_number;
        $temp_store->tel_number = $request ->tel_number;
        $temp_store->status = $request ->status;
        $temp_store->user_id = $request ->user_id;

        $result= $temp_store->save();

        if($result){
            return $temp_store;
        }else{
            return 'Kaydedilmedi';
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\temp_store  $temp_store
     * @return \Illuminate\Http\Response
     */

    public function getTempStores(){
        return temp_store::all();
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\temp_store  $temp_store
     * @return \Illuminate\Http\Response
     */
    public function edit(temp_store $temp_store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\temp_store  $temp_store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, temp_store $temp_store)
    {
        //
    }

    public function delete($id)
    {
        $temp_store = temp_store::findOrFail($id);

        if($temp_store){
        $temp_store->delete();
        return $id;
        }else{
            return response()->json(error);
        }


    }
}
