<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Building extends Model
{
    use HasFactory;

    protected $table = 'building';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
