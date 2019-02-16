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

    Route::delete('users/delete-multiple', 'UserController@deleteMultiple');
    Route::get('users/search', 'UserController@search');
    Route::resource('users', 'UserController', ['except' => ['edit']]);

    Route::resource('roles', 'RoleController', ['except' => ['edit']]);
    Route::post('roles/{role_id}/attach_users', 'RoleController@attachUser');
    Route::get('permissions', 'RoleController@getAbilities');

    Route::resource('folder', 'FolderController');
    
    Route::delete('file/delete', 'DeleteFileController@delete');
    Route::get('file/trash', 'DeleteFileController@trash');
    Route::post('file/copy', 'CopyFileController@copy');
    Route::post('file', 'FileController@store')->middleware('throttle:60');
    Route::resource('file', 'FileController');

    Route::get('file/star', 'StarredController@index');
    Route::post('tag/star', 'StarredController@add');
    Route::post('tag/unstar', 'StarredController@remove');

    Route::post('/download', 'DownloadController@download');

    //sharing
    // Route::post('shareable-links/{linkId}/import', 'SharesController@addCurrentUser');
    // Route::post('shares/add-users', 'SharesController@addUsers');
    // Route::put('shares/update-users', 'SharesController@updateUsers');
    // Route::delete('shares/remove-user/{userId}', 'SharesController@removeUser');

    // //SHAREABLE LINKS
    // Route::get('file/{id}/shareable-link', 'ShareableLinksController@show');
    // Route::post('file/{id}/shareable-link', 'ShareableLinksController@store');
    // Route::put('shareable-links/{id}', 'ShareableLinksController@update');
    // Route::delete('shareable-links/{id}', 'ShareableLinksController@destroy');
});

