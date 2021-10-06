<?php

namespace App\Models;

use App\Http\Controllers\BuildingController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    use HasFactory;

    public function buildings()
    {
        return $this->belongsTo(BuildingController::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
