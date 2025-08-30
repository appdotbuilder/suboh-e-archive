<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLetterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && (auth()->user()->isAdmin() || auth()->user()->isStaff());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|in:incoming,outgoing',
            'number' => 'required|string|max:255|unique:letters,number,' . $this->route('letter')->id,
            'letter_date' => 'required|date',
            'subject' => 'required|string|max:255',
            'sender_recipient' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:letter_categories,id',
            'file' => 'nullable|file|mimes:pdf|max:10240', // 10MB max
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'type.required' => 'Jenis surat harus dipilih.',
            'type.in' => 'Jenis surat harus masuk atau keluar.',
            'number.required' => 'Nomor surat harus diisi.',
            'number.unique' => 'Nomor surat sudah digunakan.',
            'letter_date.required' => 'Tanggal surat harus diisi.',
            'letter_date.date' => 'Format tanggal tidak valid.',
            'subject.required' => 'Perihal surat harus diisi.',
            'sender_recipient.required' => 'Pengirim/Penerima harus diisi.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'file.mimes' => 'File harus berformat PDF.',
            'file.max' => 'Ukuran file maksimal 10MB.',
        ];
    }
}