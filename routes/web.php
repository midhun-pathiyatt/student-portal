<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SettingsController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin-login', [LoginController::class, 'index'])->name('admin-login');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


Route::get('/list-student', [StudentController::class, 'listStudent'])->name('list-student');
Route::get('/add-student', [StudentController::class, 'addStudent'])->name('add-student');
Route::post('/save-student', [StudentController::class, 'saveStudent'])->name('save-student');
Route::get('/edit-student/{id}', [StudentController::class, 'editStudent'])->name('edit-student');
Route::post('/update-student', [StudentController::class, 'updateStudent'])->name('update-student');
Route::post('/delete-student', [StudentController::class, 'deleteStudent'])->name('delete-student');



Route::get('/list-student-marks', [StudentController::class, 'listStudentMarks'])->name('list-student-marks');
Route::get('/add-student-marks', [StudentController::class, 'addStudentMarks'])->name('add-student-marks');
Route::post('/save-student-mark', [StudentController::class, 'saveStudentMarks'])->name('save-student-marks');
Route::get('/edit-student-marks/{term_id}', [StudentController::class, 'editStudentMarks'])->name('edit-student-marks');
Route::post('/update-student-marks', [StudentController::class, 'updateStudentMarks'])->name('update-student-marks');
Route::post('/delete-student-marks', [StudentController::class, 'deleteStudentMarks'])->name('delete-student-marks');


Route::get('/list-gender', [SettingsController::class, 'listGender'])->name('list-gender');
Route::get('/list-subjects', [SettingsController::class, 'listSubjects'])->name('list-subjects');
Route::get('/list-terms', [SettingsController::class, 'listTerms'])->name('list-terms');
Route::get('/list-teachers', [SettingsController::class, 'listTeachers'])->name('list-teachers');



