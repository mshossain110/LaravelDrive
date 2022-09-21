<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\FileController;
use App\Http\Controllers\API\V1\RoleController;
use App\Http\Controllers\API\V1\UserController;
use App\Http\Controllers\API\V1\FolderController;
use App\Http\Controllers\API\V1\SharesController;
use App\Http\Controllers\API\V1\StarredController;
use App\Http\Controllers\API\V1\CopyFileController;
use App\Http\Controllers\API\V1\DownloadController;
use App\Http\Controllers\API\V1\MoveFileController;
use App\Http\Controllers\API\V1\DeleteFileController;
use App\Http\Controllers\API\V1\ShareableLinkController;
use App\Http\Controllers\Translation\LanguageController;
use App\Http\Controllers\Translation\LanguageTranslationController;

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

Route::group(
    [
        'middleware' => ['auth:sanctum'],
    ],
    function () {
        Route::delete('users/delete-multiple', [UserController::class, 'deleteMultiple']);
        Route::get('users/search', [UserController::class, 'search']);
        Route::resource('users', UserController::class)->except(['edit']);

        Route::resource('roles', RoleController::class)->except(['edit']);
        Route::post('roles/{role_id}/attach_users', [RoleController::class, 'attachUser']);
        Route::get('permissions', [RoleController::class, 'getAbilities']);

        Route::resource('folder', FolderController::class);

        Route::delete('file/delete', [DeleteFileController::class, 'delete']);
        Route::get('file/trash', [DeleteFileController::class, 'trash']);
        Route::get('file/star', [StarredController::class, 'index']);
        Route::post('file/copy', [CopyFileController::class, 'copy']);
        Route::post('file/move', MoveFileController::class);
        Route::post('file', [FileController::class, 'store'])->middleware('throttle:60');
        Route::resource('file', FileController::class);


        Route::post('tag/star', [StarredController::class, 'add']);
        Route::post('tag/unstar', [StarredController::class, 'remove']);

        Route::post('/download', [DownloadController::class, 'download']);

        //sharing
        // Route::post('shareable-links/{linkId}/import', [SharesController::class, ]addCurrentUser);
        Route::get('shared/files', [SharesController::class, 'sharedWithMe']);
        Route::get('shared/file/{file_id}/share-with', [SharesController::class, 'sharedWith']);
        Route::post('shares/add-users', [SharesController::class, 'addUsers']);
        Route::put('shares/update-users', [SharesController::class, 'updateUsers']);
        Route::delete('shares/remove-user/{userId}', [SharesController::class, 'removeUser']);

        // //SHAREABLE LINKS
        Route::get('shareable-links/file/{fileId}', [ShareableLinkController::class, 'getFileShareableLink']);
        Route::post('shareable-links/file/{fileId}', [ShareableLinkController::class, 'storeFileShareableLink']);
        Route::put('shareable-links/{id}', [ShareableLinkController::class, 'update']);
        Route::delete('shareable-links/{id}', [ShareableLinkController::class, 'destroy']);


        // translations
        Route::get('translation/languages', [LanguageController::class, 'index']);
        Route::post('translation/languages', [LanguageController::class, 'store']);
        Route::get('translation/{language}/translations', [LanguageTranslationController::class, 'index']);
        Route::post('translation/{language}/translations', [LanguageTranslationController::class, 'store']);
        Route::put('translation/{language}/translations', [LanguageTranslationController::class, 'update']);
    }
);
