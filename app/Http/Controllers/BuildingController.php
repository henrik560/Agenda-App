<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Building;

class BuildingController extends Controller
{
    public function getAllBuildings()
    {
        $buildings = Building::all();

        $data = [
            "Title" => "Building",
            "Buildings" => $buildings
        ];

        return view("buildings.overview", $data);
    }
}
