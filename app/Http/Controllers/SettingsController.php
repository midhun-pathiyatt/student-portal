<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/8/2022
 * Time: 1:49 PM
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



class SettingsController extends Controller
{
    public function listGender()
    {
        $list = Gender::get();
        return view('settings.list-gender', compact('list'));
    }

    public function listSubjects()
    {
        $list = Subjects::get();
        return view('settings.list-subjects', compact('list'));
    }

    public function listTerms()
    {
        $list = Term::get();
        return view('settings.list-terms', compact('list'));
    }

    public function listTeachers()
    {
        $list = Teacher::get();
        return view('settings.list-teachers', compact('list'));
    }

}