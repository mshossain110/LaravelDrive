<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    'namespace' => 'API\V1',
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
    Route::get('file/star', 'StarredController@index');
    Route::post('file/copy', 'CopyFileController@copy');
    Route::post('file/move', 'MoveFileController');
    Route::post('file', 'FileController@store')->middleware('throttle:60');
    Route::resource('file', 'FileController');

  
    Route::post('tag/star', 'StarredController@add');
    Route::post('tag/unstar', 'StarredController@remove');

    Route::post('/download', 'DownloadController@download');

    //sharing
    // Route::post('shareable-links/{linkId}/import', 'SharesController@addCurrentUser');
    Route::get('shared/files', 'SharesController@sharedWithMe');
    Route::get('shared/file/{file_id}/share-with', 'SharesController@sharedWith');
    Route::post('shares/add-users', 'SharesController@addUsers');
    Route::put('shares/update-users', 'SharesController@updateUsers');
    Route::delete('shares/remove-user/{userId}', 'SharesController@removeUser');

    // //SHAREABLE LINKS
    Route::get('shareable-links/file/{fileId}', 'ShareableLinkController@getFileShareableLink');
    Route::post('shareable-links/file/{fileId}', 'ShareableLinkController@storeFileShareableLink');
    Route::put('shareable-links/{id}', 'ShareableLinkController@update');
    Route::delete('shareable-links/{id}', 'ShareableLinkController@destroy');


    // translations
    Route::get('translation/languages', '\App\Http\Controllers\Translation\LanguageController@index');
    Route::post('translation/languages', '\App\Http\Controllers\Translation\LanguageController@store');
    Route::get('translation/{language}/translations', '\App\Http\Controllers\Translation\LanguageTranslationController@index');
    Route::post('translation/{language}/translations', '\App\Http\Controllers\Translation\LanguageTranslationController@store');
    Route::put('translation/{language}/translations', '\App\Http\Controllers\Translation\LanguageTranslationController@update');

});
