<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'sub_name',
        "main_category_id",

    ];

    public function getCategory(){
        return $this->belongsTo(Category::class,'id','main_category_id');
    }
    public function products(){
        return $this->belongsTo(Product::class,'id','sub_category_id');

    }
}
