<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUsers() {
        $users = User::with("buildings")->get();
        $data = [ 
            "Title" => "Users",
            "Users" => $users
        ];
        return view("users.overview", $data);
    }
}
