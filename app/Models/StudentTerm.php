<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/7/2022
 * Time: 12:33 PM
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentTerm extends Model
{
    use HasFactory;
    protected $fillable = [

        'student_id',
        'term_id',

    ];

    public function studentName()
    {
        return $this->belongsTo(Students::class, 'student_id');
    }

    public function term()
    {
        return $this->belongsTo(Term::class, 'term_id');
    }

    public function subjectMark()
    {
        return $this->hasMany(SubjectMark::class, 'student_term_id');
    }
}