<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'description',
        'sub_category_id',
    ];
    public function photos(){
        return $this->morphMany(Photos::class,name:'imageable');
    }
    public function storeproducts(){
        return $this->belongsToMany( Store::class, 'store_products')->withPivot("price","stock")->orderBy('price');
      }

    public function getSubCategory(){
        return $this->hasMany(SubCategory::class,'sub_category_id','id');
    }
}
