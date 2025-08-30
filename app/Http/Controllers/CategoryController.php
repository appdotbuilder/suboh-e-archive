<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\LetterCategory;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = LetterCategory::withCount('letters')
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = LetterCategory::create($request->validated());

        return redirect()->route('categories.show', $category)
            ->with('success', 'Kategori berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LetterCategory $category)
    {
        $category->loadCount('letters');

        return Inertia::render('categories/show', [
            'category' => $category,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LetterCategory $category)
    {
        return Inertia::render('categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, LetterCategory $category)
    {
        $category->update($request->validated());

        return redirect()->route('categories.show', $category)
            ->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LetterCategory $category)
    {
        // Check if category has letters
        if ($category->letters()->count() > 0) {
            return redirect()->back()
                ->with('error', 'Kategori tidak dapat dihapus karena masih digunakan oleh surat.');
        }

        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}