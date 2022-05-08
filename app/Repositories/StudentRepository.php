<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/7/2022
 * Time: 12:07 PM
 */
namespace App\Repositories;

use App\Models\Students;
use App\Models\StudentTerm;
use App\Models\SubjectMark;

class StudentRepository
{
    public function model()
    {
        return Students::class;
    }

    public function createStudent($data)
    {

        $student = new Students();
        $student->student_name = $data['name'];
        $student->age = $data['age'];
        $student->gender_id = $data['gender'];
        $student->teacher_id = $data['teacher'];

        $student->save();

        return $student;
    }

    public function studentMark($data)
    {
        $student_term = new StudentTerm();
        $student_term->student_id = $data['student'];
        $student_term->term_id = $data['term'];
        $student_term->save();

        foreach ($data['mark'] as $subject_id => $mark) {

            $subject_mark = new SubjectMark();
            $subject_mark->subject_id = $subject_id;
            $subject_mark->mark = $mark;
            $subject_mark->student_term_id = $student_term->id;
            $subject_mark->save();
        }
        return true;
    }

    public function updateStudent($data)
    {

        $student = Students::where('id',$data['user_id'])->first();
        $student->student_name = $data['name'];
        $student->age = $data['age'];
        $student->gender_id = $data['gender'];
        $student->teacher_id = $data['teacher'];

        $student->update();

        return $student;
    }

    public function deleteStudent($data)
    {

        $student = Students::where('id',$data['user_id'])->update(['deleted_at' => date("Y-m-d H:i:s")]);
        $student_marks = StudentTerm::where('student_id',$data['user_id'])->update(['deleted_at' => date("Y-m-d H:i:s")]);

        return $student;
    }

    public function deleteStudentMarks($data)
    {

        $student_marks = StudentTerm::where('id',$data['term_id'])->update(['deleted_at' => date("Y-m-d H:i:s")]);

        return $student_marks;
    }

    public function updatestudentMark($data)
    {
        $delete = StudentTerm::where('id',$data['hidden_term_id'])->update(['deleted_at' => date("Y-m-d H:i:s")]);

        $student_term = new StudentTerm();
        $student_term->student_id = $data['student'];
        $student_term->term_id = $data['term'];
        $student_term->save();

        foreach ($data['mark'] as $subject_id => $mark) {

            $subject_mark = new SubjectMark();
            $subject_mark->subject_id = $subject_id;
            $subject_mark->mark = $mark;
            $subject_mark->student_term_id = $student_term->id;
            $subject_mark->save();
        }
        return true;

    }



}