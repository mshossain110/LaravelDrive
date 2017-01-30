<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/active', 'Auth\RegisterController@active');

Route::get('/home', 'HomeController@index');


Route::group(['middleware' => 'auth','prefix' => 'admin'],function () {
   Route::get('/', function () {
        return view('admin.dashboard.index');
    });

    Route::get('/dashbord', function () {
        return view('admin.dashboard.index');
    });

    Route::get('/dashbord2', function () {
        return view('admin.dashboard.index2');
    });

    Route::get('/dashbord3', function () {
        return view('admin.dashboard.index3');
    });
    Route::get('/form', function () {
        return view('admin.form.form');
    });
    Route::get('/form-advance-component', function () {
        return view('admin.form.formAdvance');
    });
    Route::get('/form-validation', function () {
        return view('admin.form.formValidation');
    });
    Route::get('/form-wizard', function () {
        return view('admin.form.formWizard');
    });
    Route::get('/form-upload', function () {
        return view('admin.form.formUpload');
    });
    Route::get('/form-buttons', function () {
        return view('admin.form.formButtons');
    });

    Route::get('/general-element', function () {
        return view('admin.elements.general');
    });
    Route::get('/media', function () {
        return view('admin.elements.media');
    });
    Route::get('/calender', function () {
        return view('admin.elements.calender');
    });
    Route::get('/tables', function () {
        return view('admin.elements.tables');
    });
    Route::get('/tables-dynamic', function () {
        return view('admin.elements.tablesDynamic');
    });

    Route::get('/users', 'UsersController@getUsers');
    Route::get('/user/create', 'UsersController@create');
    Route::post('/user/create', 'UsersController@store');

    Route::get('/articles', 'ArticleController@index');
    Route::get('/article/create', 'ArticleController@create');
});