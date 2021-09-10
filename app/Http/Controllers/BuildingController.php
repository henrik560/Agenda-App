<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Building;
use App\Models\User;
use App\Models\Agenda;

class BuildingController extends Controller
{
    public function getAllBuildings()
    {
        $buildings = Building::with("user")->get();

        $data = [
            "Title" => "Building",
            "Buildings" => $buildings
        ];

        return view("buildings.overview", $data);
    }
}
