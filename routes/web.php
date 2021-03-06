<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('app');
// });

// Route::get('/dashboard', function () {   
//     return view('dashboard');
// })->middleware(['auth'])->name('dashboard');
Route::group(["middleware" => ["auth"]], function () {
    Route::get("/", function () {
        return redirect("/agenda");
    });
    Route::get("/login", function () {
        return view("app");
    });
    Route::get("/agenda", [BuildingController::class, "getAllBuildingsWithRooms"]);
    Route::group(["prefix" => "/buildings"], function () {
        Route::get("/overview", [BuildingController::class, "getAllBuildings"]);
        Route::get("/view/{id}/", [BuildingController::class, "getBuildingById"]);
        Route::get("/editForm/{id}/", [BuildingController::class, "editForm"]);
        Route::get("/deleteForm/{id}/", [BuildingController::class, "deleteForm"]);
    });
    Route::group(["prefix" => "/users"], function () {
        Route::get("/overview", [UserController::class, "getAllUsers"]);
    });
    Route::get("/export", function () {
        return view("app");
    });

    Route::prefix('/api')->group(function () {
        Route::resource('/buildings', BuildingController::class);
        Route::resource('/users', UserController::class);
        Route::resource('/reservations', ReservationController::class);
    });
    // Route::resource('api/buildings/get/{id}/', BuildingController::class);
});

// Route::prefix("/")->group(function () {
//     Route::get("/", function () {
//         return view("app");
//     });
//     Route::get("/login", function () {
//         return view("Auth.login");
//     });
// });

require __DIR__ . '/auth.php';
