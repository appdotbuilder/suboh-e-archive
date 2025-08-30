<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LetterController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - all authenticated users
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Letters - all authenticated users can view
    Route::get('letters', [LetterController::class, 'index'])->name('letters.index');
    Route::get('letters/{letter}', [LetterController::class, 'show'])->name('letters.show');
    
    // Letters management - admin and staff only
    Route::middleware(CheckRole::class . ':admin,staf_tata_usaha')->group(function () {
        Route::get('letters/create', [LetterController::class, 'create'])->name('letters.create');
        Route::post('letters', [LetterController::class, 'store'])->name('letters.store');
        Route::get('letters/{letter}/edit', [LetterController::class, 'edit'])->name('letters.edit');
        Route::put('letters/{letter}', [LetterController::class, 'update'])->name('letters.update');
        Route::delete('letters/{letter}', [LetterController::class, 'destroy'])->name('letters.destroy');
    });
    
    // Admin only routes
    Route::middleware(CheckRole::class . ':admin')->group(function () {
        Route::resource('categories', CategoryController::class);
        Route::resource('users', UserController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
