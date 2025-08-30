<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Letter;
use App\Models\LetterCategory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Basic statistics
        $stats = [
            'total_letters' => Letter::count(),
            'incoming_letters' => Letter::incoming()->count(),
            'outgoing_letters' => Letter::outgoing()->count(),
            'total_users' => $user->isAdmin() ? User::count() : null,
        ];

        // Recent letters
        $recentLetters = Letter::with(['category', 'creator'])
            ->latest()
            ->limit(5)
            ->get();

        // Monthly statistics for chart
        $monthlyStats = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthlyStats[] = [
                'month' => $date->format('M Y'),
                'incoming' => Letter::incoming()
                    ->whereYear('letter_date', $date->year)
                    ->whereMonth('letter_date', $date->month)
                    ->count(),
                'outgoing' => Letter::outgoing()
                    ->whereYear('letter_date', $date->year)
                    ->whereMonth('letter_date', $date->month)
                    ->count(),
            ];
        }

        // Category statistics (for admin and staff only)
        $categoryStats = null;
        if ($user->isAdmin() || $user->isStaff()) {
            $categoryStats = LetterCategory::withCount('letters')
                ->orderByDesc('letters_count')
                ->limit(5)
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentLetters' => $recentLetters,
            'monthlyStats' => $monthlyStats,
            'categoryStats' => $categoryStats,
        ]);
    }
}