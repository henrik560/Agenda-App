<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();

        $data = [
            "Title" => "Building",
            "users" => $users
        ];

        return view("users.overview", $data);
    }

    public function index()
    {

        $user = User::with("userHasBuildings.building", "userHasBuildings.building.spaces", "userHasBuildings.building.spaces.reservations", "userHasBuildings.building.spaces.reservations.reservationHasUser")->get();

        return response()->json([
            'users' => $user
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
        //     $user = User::where("id", $id)->with("spaces")->get();

        //     return response()->json([
        //         'user' => $user,
        //     ]);
        $user = User::with("userHasBuildings.building", "userHasBuildings.building.spaces", "userHasBuildings.building.spaces.reservations", "userHasBuildings.building.spaces.reservations.reservationHasUser")->where("users.id", $id)->get();

        return response()->json([
            'user' => $user
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
}
