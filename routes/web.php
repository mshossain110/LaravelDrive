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
