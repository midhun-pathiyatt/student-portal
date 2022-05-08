<?php
/**
 * Created by PhpStorm.
 * User: Midhun
 * Date: 5/7/2022
 * Time: 12:03 PM
 */
namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'age' => 'required',
            'gender' => 'required',
            'teacher' => 'required',
        ];
    }
}