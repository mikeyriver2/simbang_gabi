<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'full_name',
        'email',
        'phone_number',
        'patrons',
        'adults',
        'students'
    ];
}
