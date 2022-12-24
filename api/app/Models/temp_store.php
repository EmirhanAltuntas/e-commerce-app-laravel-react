<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class temp_store extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_name',
        'tax_number',
        'tel_number',
        'status',

    ];

    public function getUser(){
        return $this->belongsTo(User::class,'id','user_id');
    }

}
