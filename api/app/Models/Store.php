<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class store extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_name',
        'tax_number',
        'tel_number',
        'status',

    ];

    public function photos(){
        return $this->morphMany(Photos::class,name:'imageable');
    }
    public function getUser(){
        return $this->belongsTo(User::class,'id','store_id');
    }

    public function storeproducts(){
        return $this->belongsToMany( Product::class, 'store_products', )->with('photos')->withPivot("price","stock")->orderBy('price');
      }
}
