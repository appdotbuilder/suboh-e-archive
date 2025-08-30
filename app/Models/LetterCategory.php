<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\LetterCategory
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Letter> $letters
 * @property-read int|null $letters_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterCategory active()
 * @method static \Database\Factories\LetterCategoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LetterCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the letters in this category.
     */
    public function letters(): HasMany
    {
        return $this->hasMany(Letter::class, 'category_id');
    }

    /**
     * Scope a query to only include active categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}