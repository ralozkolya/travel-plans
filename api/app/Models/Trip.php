<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'destination', 'start_date', 'end_date', 'comment'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
