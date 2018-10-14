<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        $userId = $this->input('id');

        $rules = [
            'firstname'   => 'alpha|min:2|max:255|nullable',
            'lastname'    => 'alpha|min:2|max:255|nullable',
            'permissions' => 'array|nullable',
            'roles'       => 'array|nullable',
            'password'    => 'min:6|max:255|confirmed',
            'name'        => "min:3|max:255|unique:users,name,$userId",
            'email'       => "email|min:3|max:255|unique:users,email,$userId"
        ];

        if ($this->method() === 'POST') {
            $rules['email']    = 'required|'.$rules['email'];
            $rules['name']    = 'required|'.$rules['name'];
            $rules['password'] = 'required|'.$rules['password'];
        }

        return $rules;
    }
}
