<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
        $roleId = $this->input('id');

        $rules = [
            'name'        => "alpha|max:255|unique:roles,name,$roleId",
            'permissions' => "array",
            'description' => "string|min:2|max:255|nullable",
        ];

        if ($this->method() === 'POST') {
            $rules['name']    = 'required|'.$rules['name'];
        }

        return $rules;
    }
}
