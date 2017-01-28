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


Route::group([],function () {
   Route::get('/admin', function () {
        return view('admin.dashboard.index');
    });

    Route::get('/admin/dashbord', function () {
        return view('admin.dashboard.index');
    });

    Route::get('/admin/dashbord2', function () {
        return view('admin.dashboard.index2');
    });

    Route::get('/admin/dashbord3', function () {
        return view('admin.dashboard.index3');
    });
    Route::get('/admin/form', function () {
        return view('admin.form.form');
    });
    Route::get('/admin/form-advance-component', function () {
        return view('admin.form.formAdvance');
    });
    Route::get('/admin/form-validation', function () {
        return view('admin.form.formValidation');
    });
    Route::get('/admin/form-wizard', function () {
        return view('admin.form.formWizard');
    });
    Route::get('/admin/form-upload', function () {
        return view('admin.form.formUpload');
    });
    Route::get('/admin/form-buttons', function () {
        return view('admin.form.formButtons');
    });

    Route::get('/admin/general-element', function () {
        return view('admin.elements.general');
    });
    Route::get('/admin/media', function () {
        return view('admin.elements.media');
    });
    Route::get('/admin/calender', function () {
        return view('admin.elements.calender');
    });
    Route::get('/admin/tables', function () {
        return view('admin.elements.tables');
    });
    Route::get('/admin/tables-dynamic', function () {
        return view('admin.elements.tablesDynamic');
    });

    Route::get('/admin/users', 'UsersController@getUsers');
    Route::get('/admin/user/create', 'UsersController@create');

    Route::get('/admin/articles', 'ArticleController@index');
    Route::get('/admin/article/create', 'ArticleController@create');
});