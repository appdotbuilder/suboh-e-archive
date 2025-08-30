<?php

namespace Database\Seeders;

use App\Models\Letter;
use App\Models\LetterCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@suboh.id',
            'role' => 'admin',
            'password' => Hash::make('admin123'),
        ]);

        // Create staff user
        User::factory()->create([
            'name' => 'Staf Tata Usaha',
            'email' => 'staff@suboh.id',
            'role' => 'staf_tata_usaha',
            'password' => Hash::make('staff123'),
        ]);

        // Create leader user
        User::factory()->create([
            'name' => 'Pimpinan Suboh',
            'email' => 'pimpinan@suboh.id',
            'role' => 'pimpinan',
            'password' => Hash::make('pimpinan123'),
        ]);

        // Create additional staff users
        User::factory(5)->staff()->create();

        // Create letter categories
        $categories = [
            ['name' => 'Surat Undangan', 'description' => 'Surat undangan kegiatan atau rapat'],
            ['name' => 'Surat Keputusan', 'description' => 'Surat keputusan dan kebijakan'],
            ['name' => 'Surat Edaran', 'description' => 'Surat edaran dan pengumuman'],
            ['name' => 'Surat Permohonan', 'description' => 'Surat permohonan dari masyarakat'],
            ['name' => 'Surat Keterangan', 'description' => 'Surat keterangan dan rekomendasi'],
            ['name' => 'Laporan', 'description' => 'Laporan kegiatan dan program'],
        ];

        foreach ($categories as $category) {
            LetterCategory::create($category);
        }

        // Create sample letters
        Letter::factory(50)->create();
    }
}
