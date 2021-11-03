<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Building extends Model
{
    use HasFactory;

    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function users()
    {
        return $this->hasMany(User_has_building::class)->with("user");
    }

    public function spaces()
    {
        return $this->hasMany(Space::class);
    }
}
