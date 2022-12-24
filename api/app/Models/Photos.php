<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photos extends Model
{
    use HasFactory;
    protected $fillable = [
        'imageable_id',
        'imageable_type',
        'image_path',
        'type',
    ];
    public function imegeable(){
        return $this->morphTo();
    }
}
