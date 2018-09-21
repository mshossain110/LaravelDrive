<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => ['auth:api'],
    'namespace' => 'Api\V1',
], function () {

    Route::resource('users', 'UserController', ['except' => ['edit']]);
    Route::delete('users/delete-multiple', 'UserController@deleteMultiple');

    Route::resource('roles', 'RoleController', ['except' => ['edit']]);
    Route::post('roles/{role_id}/attach_users', 'RoleController@attachUser');
    Route::get('permissions', 'RoleController@getAbilities');

    Route::resource('folder', 'FolderController');
    Route::resource('file', 'FileController');
});

