<?php

namespace App\Http\Controllers;
use App\Reservation;
use App\ActionLogs;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{
    public function create(Request $request){
        $inputs = $request->all();
        $reservation = Reservation::create($inputs);
        try{
            $this->logAction($request);
        }catch(Exception $e){
            //do nothing, continue
        }
        return $reservation;
    }

    public function logAction($request){
        $data = $request->client["data"];
        $value = [
            'ip_address' => $data["ip"],
            'user_agent' => $request->client["userAgent"],
            'action' => $request->client["action"],
            'coordinates' => $data["loc"],
            'isp' => $data["org"],
            'post_code' => $data["postal"],
            'city' => $data["city"]
        ];
        ActionLogs::create($value);
    }
}
