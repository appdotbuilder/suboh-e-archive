<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['incoming', 'outgoing'])->comment('Type of letter: incoming or outgoing');
            $table->string('number')->comment('Letter number/reference');
            $table->date('letter_date')->comment('Date of the letter');
            $table->string('subject')->comment('Subject/title of the letter');
            $table->string('sender_recipient')->comment('Sender for incoming letters, recipient for outgoing letters');
            $table->text('description')->nullable()->comment('Additional description or notes');
            $table->string('file_path')->nullable()->comment('Path to uploaded PDF file');
            $table->string('original_filename')->nullable()->comment('Original filename of uploaded file');
            $table->unsignedBigInteger('category_id')->nullable()->comment('Letter category');
            $table->unsignedBigInteger('created_by')->comment('User who created this record');
            $table->timestamps();
            
            // Foreign keys
            $table->foreign('category_id')->references('id')->on('letter_categories')->onDelete('set null');
            $table->foreign('created_by')->references('id')->on('users');
            
            // Indexes for performance
            $table->index('type');
            $table->index('number');
            $table->index('letter_date');
            $table->index(['type', 'letter_date']);
            $table->index('created_by');
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};