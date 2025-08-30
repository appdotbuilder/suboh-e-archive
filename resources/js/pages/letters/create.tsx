import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type LetterCategory } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FileText, Upload } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Arsip Surat', href: '/letters' },
    { title: 'Tambah Surat', href: '/letters/create' },
];

interface CreateLetterProps {
    categories: LetterCategory[];
    [key: string]: unknown;
}

interface LetterFormData {
    type: string;
    number: string;
    letter_date: string;
    subject: string;
    sender_recipient: string;
    description: string;
    category_id: string;
    file: File | null;
    [key: string]: File | string | null;
}

export default function CreateLetter({ categories }: CreateLetterProps) {
    const { data, setData, post, processing, errors } = useForm<LetterFormData>({
        type: '',
        number: '',
        letter_date: new Date().toISOString().split('T')[0], // Today's date
        subject: '',
        sender_recipient: '',
        description: '',
        category_id: '',
        file: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('letters.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Surat" />
            
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            📝 Tambah Surat Baru
                        </CardTitle>
                        <p className="text-gray-600">
                            Lengkapi informasi surat dan upload file PDF jika tersedia
                        </p>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            {/* Type Selection */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="type">Jenis Surat *</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis surat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="incoming">📥 Surat Masuk</SelectItem>
                                            <SelectItem value="outgoing">📤 Surat Keluar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="category_id">Kategori</Label>
                                    <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori (opsional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Tanpa Kategori</SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>}
                                </div>
                            </div>

                            {/* Letter Details */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="number">Nomor Surat *</Label>
                                    <Input
                                        id="number"
                                        type="text"
                                        placeholder="Contoh: 001/KEL/2024"
                                        value={data.number}
                                        onChange={(e) => setData('number', e.target.value)}
                                    />
                                    {errors.number && <p className="text-sm text-red-600 mt-1">{errors.number}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="letter_date">Tanggal Surat *</Label>
                                    <Input
                                        id="letter_date"
                                        type="date"
                                        value={data.letter_date}
                                        onChange={(e) => setData('letter_date', e.target.value)}
                                    />
                                    {errors.letter_date && <p className="text-sm text-red-600 mt-1">{errors.letter_date}</p>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="subject">Perihal/Subject *</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="Perihal atau subjek surat"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                />
                                {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <Label htmlFor="sender_recipient">
                                    {data.type === 'incoming' ? 'Pengirim *' : data.type === 'outgoing' ? 'Penerima *' : 'Pengirim/Penerima *'}
                                </Label>
                                <Input
                                    id="sender_recipient"
                                    type="text"
                                    placeholder={
                                        data.type === 'incoming' 
                                            ? "Nama pengirim dan instansi" 
                                            : data.type === 'outgoing'
                                            ? "Nama penerima dan jabatan"
                                            : "Nama pengirim atau penerima"
                                    }
                                    value={data.sender_recipient}
                                    onChange={(e) => setData('sender_recipient', e.target.value)}
                                />
                                {errors.sender_recipient && <p className="text-sm text-red-600 mt-1">{errors.sender_recipient}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Keterangan Tambahan</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Keterangan atau catatan tambahan (opsional)"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                />
                                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                            </div>

                            {/* File Upload */}
                            <div>
                                <Label htmlFor="file">Upload File PDF</Label>
                                <div className="mt-2">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                                                </p>
                                                <p className="text-xs text-gray-500">PDF (maksimal 10MB)</p>
                                            </div>
                                            <input 
                                                id="file" 
                                                type="file" 
                                                className="hidden" 
                                                accept=".pdf"
                                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                            />
                                        </label>
                                    </div>
                                    {data.file && (
                                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-blue-800">{data.file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('file', null)}
                                                    className="ml-auto text-blue-600 hover:text-blue-800"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file}</p>}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            💾 Simpan Surat
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                
                {/* Help Card */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">💡 Tips Pengisian</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                        <p>• <strong>Nomor Surat:</strong> Gunakan format standar instansi (contoh: 001/KEL/2024)</p>
                        <p>• <strong>Perihal:</strong> Tuliskan subjek surat dengan jelas dan singkat</p>
                        <p>• <strong>Pengirim/Penerima:</strong> Sertakan nama dan instansi/jabatan</p>
                        <p>• <strong>File PDF:</strong> Upload hanya jika file asli tersedia (maksimal 10MB)</p>
                        <p>• <strong>Kategori:</strong> Bantu pengelompokan dan pencarian surat</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}