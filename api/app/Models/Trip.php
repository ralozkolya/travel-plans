<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'destination', 'start_date', 'end_date', 'comment'
    ];

    protected $appends = [ 'days_left' ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getDaysLeftAttribute()
    {
        $difference = strtotime($this->start_date) - strtotime('now');
        return $this->attributes['days_left'] = max(ceil($difference / 86400), 0);
    }
}
