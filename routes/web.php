<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\ShareableController;
use App\Http\Controllers\Auth\SocialController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/drive');
});

require __DIR__.'/auth.php';

// Public Routes
Route::group(['middleware' => ['web']], function () {

    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/drive/{any?}', [HomeController::class, 'drive'])->where('any', '.*')->name('drive');

    Route::get('/uploads/{id}/{any?}', UploadController::class)->where('any', '.*');

    Route::get('file/s/{hash}', ShareableController::class)->name('shareable');
    // Socialite Register Routes
    Route::get('/login/redirect/{provider}', [SocialController::class, 'getSocialRedirect'])->name('social.redirect');
    Route::get('/login/handle/{provider}', [SocialController::class, 'getSocialHandle'])->name('social.handle');
});

