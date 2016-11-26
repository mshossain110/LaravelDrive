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

Auth::routes();

Route::get('/home', 'HomeController@index');
