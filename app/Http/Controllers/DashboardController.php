<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/6/2022
 * Time: 12:44 PM
 */

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class DashboardController extends Controller
{
    public function index()
    {
        $list = Students::count();

        return view('dashboard',compact('list'));
    }

}