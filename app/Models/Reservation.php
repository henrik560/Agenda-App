<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;


    public function reservationHasUser()
    {
        return $this->belongsTo(User::class, 'reserved_by_user_id');
    }
}
