<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActionLogs extends Model
{
    protected $fillable = [
        'ip_address',
        'user_agent',
        'action',
        'coordinates',
        'isp',
        'post_code',
        'city'
    ];
}
