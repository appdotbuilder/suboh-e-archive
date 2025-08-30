<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Letter
 *
 * @property int $id
 * @property string $type
 * @property string $number
 * @property \Illuminate\Support\Carbon $letter_date
 * @property string $subject
 * @property string $sender_recipient
 * @property string|null $description
 * @property string|null $file_path
 * @property string|null $original_filename
 * @property int|null $category_id
 * @property int $created_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\LetterCategory|null $category
 * @property-read \App\Models\User $creator
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Letter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Letter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Letter query()
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereLetterDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereOriginalFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereSenderRecipient($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter incoming()
 * @method static \Illuminate\Database\Eloquent\Builder|Letter outgoing()
 * @method static \Database\Factories\LetterFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Letter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'type',
        'number',
        'letter_date',
        'subject',
        'sender_recipient',
        'description',
        'file_path',
        'original_filename',
        'category_id',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'letter_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the letter.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(LetterCategory::class);
    }

    /**
     * Get the user who created the letter.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope a query to only include incoming letters.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIncoming($query)
    {
        return $query->where('type', 'incoming');
    }

    /**
     * Scope a query to only include outgoing letters.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOutgoing($query)
    {
        return $query->where('type', 'outgoing');
    }

    /**
     * Get the type display name.
     */
    public function getTypeDisplayAttribute(): string
    {
        return match($this->type) {
            'incoming' => 'Surat Masuk',
            'outgoing' => 'Surat Keluar',
            default => $this->type,
        };
    }

    /**
     * Get the file download URL.
     */
    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }
}