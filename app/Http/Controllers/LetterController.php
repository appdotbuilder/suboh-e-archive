<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLetterRequest;
use App\Http\Requests\UpdateLetterRequest;
use App\Models\Letter;
use App\Models\LetterCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Letter::with(['category', 'creator'])
            ->latest('letter_date');

        // Apply filters
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('number', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('sender_recipient', 'like', "%{$search}%");
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('letter_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('letter_date', '<=', $request->date_to);
        }

        $letters = $query->paginate(15)->withQueryString();

        $categories = LetterCategory::active()->orderBy('name')->get();

        return Inertia::render('letters/index', [
            'letters' => $letters,
            'categories' => $categories,
            'filters' => $request->only(['type', 'category_id', 'search', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = LetterCategory::active()->orderBy('name')->get();

        return Inertia::render('letters/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLetterRequest $request)
    {
        $validated = $request->validated();
        $validated['created_by'] = auth()->id();

        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('letters', 'public');
            $validated['file_path'] = $path;
            $validated['original_filename'] = $file->getClientOriginalName();
        }

        $letter = Letter::create($validated);

        return redirect()->route('letters.show', $letter)
            ->with('success', 'Surat berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Letter $letter, Request $request)
    {
        // Handle file download
        if ($request->query('download') === '1') {
            if (!$letter->file_path || !Storage::disk('public')->exists($letter->file_path)) {
                return redirect()->back()->with('error', 'File tidak ditemukan.');
            }

            return Storage::disk('public')->download(
                $letter->file_path,
                $letter->original_filename ?: 'surat.pdf'
            );
        }

        $letter->load(['category', 'creator']);

        return Inertia::render('letters/show', [
            'letter' => $letter,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Letter $letter)
    {
        $categories = LetterCategory::active()->orderBy('name')->get();

        return Inertia::render('letters/edit', [
            'letter' => $letter,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLetterRequest $request, Letter $letter)
    {
        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($letter->file_path) {
                Storage::disk('public')->delete($letter->file_path);
            }

            $file = $request->file('file');
            $path = $file->store('letters', 'public');
            $validated['file_path'] = $path;
            $validated['original_filename'] = $file->getClientOriginalName();
        }

        $letter->update($validated);

        return redirect()->route('letters.show', $letter)
            ->with('success', 'Surat berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Letter $letter)
    {
        // Delete file if exists
        if ($letter->file_path) {
            Storage::disk('public')->delete($letter->file_path);
        }

        $letter->delete();

        return redirect()->route('letters.index')
            ->with('success', 'Surat berhasil dihapus.');
    }


}