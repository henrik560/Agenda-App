<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Building;
use App\Models\Space;
use Error;
use Illuminate\Database\Eloquent\Builder;

class BuildingController extends Controller
{
    public function index()
    {
        $building = Building::with("spaces", "spaces.reservations")->get();

        return response()->json([
            'buildings' => $building,
        ]);
    }
    // public function getBuildingWithUserThatHasTheBuilding()
    // {
    //     $building = Building::with("users")->get();

    //     return response()->json([
    //         'buildings' => $building,
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $building = Building::where("id", $id)->with("spaces")->get();

        return response()->json([
            'building' => $building,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $building = Building::where("id", $id)->get();

        $data = [
            "Title" => "Edit gebouw",
            "Building" => $building
        ];

        return view('buildings.edit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Building::find($id)->delete();
        return response($content = "succes", $status = "200");
    }

    public function getAllBuildings()
    {
        $buildings = Building::all();

        $data = [
            "Title" => "Building",
            "buildings" => $buildings
        ];

        return view("buildings.overview", $data);
    }

    public function getAllBuildingsWithRooms()
    {

        $data = [
            "Title" => "Agenda",
        ];

        return view("agenda.overview", $data);
    }


    public function getBuildingById($id)
    {
        $building = Building::find($id);

        $data = [
            "Title" => "Agenda",
            "building" => $building
        ];

        return view("buildings.view", $data);
    }

    public function editForm($id)
    {
        $building = Building::find($id);

        $data = [
            "Title" => "Agenda",
            "building" => $building
        ];

        return view("buildings.edit", $data);
    }

    public function deleteForm($id)
    {
        $building = Building::find($id);

        $data = [
            "Title" => "Agenda",
            "building" => $building
        ];

        return view("buildings.delete", $data);
    }
}
