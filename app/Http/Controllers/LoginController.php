<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/5/2022
 * Time: 9:29 AM
 */

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAdminFormRequest;
use App\Http\Requests\UpdateAdminFormRequest;
use App\Models\User;
use App\Notifications\AdminAccountCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function index()
    {
        dd(13);
    }

}