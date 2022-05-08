<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/7/2022
 * Time: 12:34 PM
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectMark extends Model
{
    use HasFactory;
    protected $fillable = [

        'subject_id',
        'mark',
        'student_term_id'

    ];

    public function subjectName()
    {
        return $this->belongsTo(Subjects::class,'subject_id');
    }

    public function studentTerm()
    {
        return $this->belongsTo(StudentTerm::class,'student_term_id');
    }

}