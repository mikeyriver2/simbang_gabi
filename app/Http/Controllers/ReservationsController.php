<?php

namespace App\Http\Controllers;
use App\Reservation;

use Illuminate\Http\Request;

class ReservationsController extends Controller
{
    public function create(Request $request){
        $inputs = $request->all();
        $reservation = Reservation::create($inputs);
        return $reservation;
    }
}
