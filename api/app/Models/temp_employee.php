<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class temp_employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'store_name',
        'email',
        'status',

    ];
}
