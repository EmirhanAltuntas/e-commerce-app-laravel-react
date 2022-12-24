<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',

    ];

    public function getSubCategory(){
        return $this->hasMany(SubCategory::class,'main_category_id','id');
    }
}
