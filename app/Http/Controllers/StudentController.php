<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/7/2022
 * Time: 9:23 AM
 */

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Gender;
use App\Models\Students;
use App\Models\StudentTerm;
use App\Models\Subjects;
use App\Models\Teacher;
use App\Models\Term;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AddStudentRequest;
use App\Repositories\StudentRepository;
use App\Http\Requests\StudentMarkRequest;



class StudentController extends Controller
{
    public $studentRepo;

    public function __construct(StudentRepository $studentRepo)
    {
        $this->studentRepo = $studentRepo;
    }

    public function listStudent()
    {
        $listStudent = Students::with(['gender'], ['teacher'])->where('deleted_at',null)->get();
        return view('student.list-student', compact('listStudent'));
    }

    public function addStudent()
    {

        $gender = Gender::get();
        $teacher = Teacher::get();
        return view('student.add-student', compact('gender', 'teacher'));
    }

    public function saveStudent(AddStudentRequest $request)
    {
        $this->studentRepo->createStudent($request);
        return response()->json(['status' => 200, 'message' => 'success']);
    }

    public function listStudentMarks()
    {
        $student_term = StudentTerm::with(['studentName', 'term', 'subjectMark'])
            ->withSum('subjectMark', 'mark')->where('student_terms.deleted_at',null)->get();

        $subject = Subjects::get();
        return view('student.list-student-marks', compact('student_term', 'subject'));
    }

    public function addStudentMarks()
    {

        $student = Students::get();
        $term = Term::get();
        $subject = Subjects::get();

        return view('student.add-student-marks', compact('student', 'term', 'subject'));
    }

    public function saveStudentMarks(StudentMarkRequest $request)
    {

        $this->studentRepo->studentMark($request);
        return response()->json(['status' => 200, 'message' => 'success']);
    }

    public function editStudent($id)
    {

        $gender = Gender::get();
        $teacher = Teacher::get();
        $student_details = Students::where('id',$id)->first();
        return view('student.edit-student', compact('gender', 'teacher','student_details'));
    }

    public function updateStudent(AddStudentRequest $request)
    {
        $this->studentRepo->updateStudent($request);
        return response()->json(['status' => 200, 'message' => 'success']);
    }

    public function deleteStudent(Request $request)
    {
        $this->studentRepo->deleteStudent($request);
        return response()->json(['status' => 200, 'message' => 'success']);
    }

    public function deleteStudentMarks(Request $request)
    {
        $this->studentRepo->deleteStudentMarks($request);
        return response()->json(['status' => 200, 'message' => 'success']);
    }

    public function editStudentMarks($term_id)
    {
        $student = Students::get();
        $term = Term::get();
        $subject = Subjects::get();


        $mark_details = StudentTerm::with(['studentName', 'term', 'subjectMark'])->where('id',$term_id)
            ->withSum('subjectMark', 'mark')->where('student_terms.deleted_at',null)->first();

        return view('student.edit-student-marks', compact('student', 'term', 'subject','mark_details'));
    }

    public function updateStudentMarks(StudentMarkRequest $request)
    {

        $this->studentRepo->updatestudentMark($request);
        return response()->json(['status' => 200, 'message' => 'success']);
    }



}