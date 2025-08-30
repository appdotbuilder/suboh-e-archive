<?php

namespace Database\Factories;

use App\Models\LetterCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Letter>
 */
class LetterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['incoming', 'outgoing']);
        
        return [
            'type' => $type,
            'number' => fake()->numerify('##/###/####'),
            'letter_date' => fake()->dateTimeBetween('-2 years', 'now'),
            'subject' => fake()->sentence(random_int(4, 8)),
            'sender_recipient' => $type === 'incoming' 
                ? fake()->company() . ' - ' . fake()->name()
                : fake()->name() . ' (' . fake()->jobTitle() . ')',
            'description' => fake()->optional(0.7)->paragraph(),
            'file_path' => null, // Will be set when files are actually uploaded
            'original_filename' => null,
            'category_id' => LetterCategory::factory(),
            'created_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the letter is incoming.
     */
    public function incoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'incoming',
            'sender_recipient' => fake()->company() . ' - ' . fake()->name(),
        ]);
    }

    /**
     * Indicate that the letter is outgoing.
     */
    public function outgoing(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'outgoing',
            'sender_recipient' => fake()->name() . ' (' . fake()->jobTitle() . ')',
        ]);
    }

    /**
     * Indicate that the letter has a file.
     */
    public function withFile(): static
    {
        return $this->state(fn (array $attributes) => [
            'file_path' => 'letters/' . fake()->uuid() . '.pdf',
            'original_filename' => fake()->words(3, true) . '.pdf',
        ]);
    }
}