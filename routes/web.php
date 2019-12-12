<?php

use App\ActionLogs;
use App\Reservation;

use Illuminate\Http\Request;

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

Route::post('/action-log', function(Request $request){
    $data = $request->data;
    $value = [
        'ip_address' => $data["ip"],
        'user_agent' => $request->userAgent,
        'action' => $request->action,
        'coordinates' => $data["loc"],
        'isp' => $data["org"],
        'post_code' => $data["postal"],
        'city' => $data["city"]
    ];
    ActionLogs::create($value);
});

Route::post('/create','ReservationsController@create');

Route::get('/thisisarandomass',function(){
    return Reservation::all();
});


Route::post('/confirmpayment',function(Request $request){
    $reservation = Reservation::find($request->id);
    $reservation->paid = 1;
    $reservation->save();
    return $reservation;
});

Route::get('/', function () {
    return view('app');
});

Route::get('{any}', function () {
    return view('app');
});
