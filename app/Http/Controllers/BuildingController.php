<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Building;

class BuildingController extends Controller
{
    public function index(Request $request, Building $building)
    {
        $buildings = $building::limit(100)->get();
        return response()->json([
            'buildings' => $buildings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $building = Building::where("id", $id)->with("space")->get();

        $data = [
            "Title" => "Building",
            "Building" => $building[0]
        ];

        return view("buildings.view", $data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function getAllBuildings()
    {
        $buildings = Building::all();

        $data = [
            "Title" => "Building",
            "Buildings" => $buildings
        ];

        return view("buildings.overview", $data);
    }

    public function getAllBuildingsWithRooms()
    {
        $buildings = Building::with("rooms")->get();

        $data = [
            "Title" => "Agenda",
            "Buildings" => $buildings
        ];

        return view("agenda.overview", $data);
    }

    public function editForm($id, $name) 
    {
        $buildings = Building::with("rooms")->get();

        $data = [
            "Title" => "Agenda",
            "Buildings" => $buildings
        ];

        return view("agenda.overview", $data);
    }
}
