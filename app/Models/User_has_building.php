<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_has_building extends Model
{
    use HasFactory;

    public function building()
    {
        return $this->belongsTo(Building::class);
    }
}
