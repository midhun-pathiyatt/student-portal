<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/7/2022
 * Time: 9:39 AM
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    use HasFactory;
    protected $fillable = [

        'name',
        'age',
        'gender_id',
        'teacher_id',

    ];

    public function gender()
    {
        return $this->belongsTo(Gender::class,'gender_id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class,'teacher_id');
    }

}