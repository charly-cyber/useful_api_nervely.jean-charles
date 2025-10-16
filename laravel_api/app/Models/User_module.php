<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class User_module extends Model
{
    use HasFactory;



    protected $fillable = [

        'user_id',
        'module_id',

    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
