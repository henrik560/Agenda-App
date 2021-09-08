<?php

use Illuminate\Support\Facades\Route;

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
        return view("app");
    });
    Route::get("/home", function () {
        return view("app");
    });
    Route::get("/login", function () {
        return view("app");
    });
    Route::get("/agenda", function () {
        return view("app");
    })->name("agenda");
    Route::get("/buildings", function () {
        return view("app");
    })->name("buildings");
    Route::get("/users", function () {
        return view("app");
    })->name("users");
    Route::get("/export", function () {
        return view("app");
    })->name("export");
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
