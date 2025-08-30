import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Letter, type LetterCategory, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Download, Edit, Eye, FileText, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Arsip Surat', href: '/letters' },
];

interface LettersIndexProps {
    letters: {
        data: Letter[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    categories: LetterCategory[];
    filters: {
        type?: string;
        category_id?: string;
        search?: string;
        date_from?: string;
        date_to?: string;
    };
    [key: string]: unknown;
}

export default function LettersIndex({ letters, categories, filters }: LettersIndexProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const canManage = user.role === 'admin' || user.role === 'staf_tata_usaha';
    
    const [searchForm, setSearchForm] = useState({
        type: filters.type || '',
        category_id: filters.category_id || '',
        search: filters.search || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = Object.fromEntries(
            Object.entries(searchForm).filter(([, value]) => value !== '')
        );
        router.get(route('letters.index'), params);
    };

    const handleReset = () => {
        setSearchForm({
            type: '',
            category_id: '',
            search: '',
            date_from: '',
            date_to: '',
        });
        router.get(route('letters.index'));
    };

    const handleDelete = (letter: Letter) => {
        if (confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
            router.delete(route('letters.destroy', letter.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Arsip Surat" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📁 Arsip Surat</h1>
                        <p className="text-gray-600">
                            Kelola dan cari arsip surat masuk dan keluar
                        </p>
                    </div>
                    {canManage && (
                        <Link
                            href={route('letters.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Surat
                        </Link>
                    )}
                </div>

                {/* Search Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="w-5 h-5" />
                            Filter Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Pencarian</label>
                                    <Input
                                        type="text"
                                        placeholder="Nomor, perihal, pengirim..."
                                        value={searchForm.search}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, search: e.target.value }))}
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Jenis</label>
                                    <Select value={searchForm.type} onValueChange={(value) => setSearchForm(prev => ({ ...prev, type: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua jenis" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua jenis</SelectItem>
                                            <SelectItem value="incoming">Surat Masuk</SelectItem>
                                            <SelectItem value="outgoing">Surat Keluar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kategori</label>
                                    <Select value={searchForm.category_id} onValueChange={(value) => setSearchForm(prev => ({ ...prev, category_id: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua kategori</SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Dari Tanggal</label>
                                    <Input
                                        type="date"
                                        value={searchForm.date_from}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, date_from: e.target.value }))}
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Sampai Tanggal</label>
                                    <Input
                                        type="date"
                                        value={searchForm.date_to}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, date_to: e.target.value }))}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <Button type="submit">
                                    <Search className="w-4 h-4 mr-2" />
                                    Cari
                                </Button>
                                <Button type="button" variant="outline" onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Results */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Hasil Pencarian ({letters.total} surat)
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {letters.data.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada surat ditemukan</h3>
                                <p className="text-gray-600 mb-6">
                                    {canManage ? 'Coba ubah filter pencarian atau tambah surat baru.' : 'Coba ubah filter pencarian.'}
                                </p>
                                {canManage && (
                                    <Link
                                        href={route('letters.create')}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Tambah Surat Pertama
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {letters.data.map((letter) => (
                                    <div key={letter.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        letter.type === 'incoming' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                        {letter.type === 'incoming' ? '📥 Masuk' : '📤 Keluar'}
                                                    </span>
                                                    {letter.category && (
                                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                            {letter.category.name}
                                                        </span>
                                                    )}
                                                    {letter.file_path && (
                                                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                                            📄 PDF
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    {letter.subject}
                                                </h3>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">Nomor:</span> {letter.number}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">
                                                            {letter.type === 'incoming' ? 'Pengirim:' : 'Penerima:'}
                                                        </span> {letter.sender_recipient}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Tanggal:</span>{' '}
                                                        {new Date(letter.letter_date).toLocaleDateString('id-ID')}
                                                    </div>
                                                </div>
                                                
                                                {letter.description && (
                                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                        {letter.description}
                                                    </p>
                                                )}
                                                
                                                <div className="text-xs text-gray-500 mt-2">
                                                    Dibuat oleh: {letter.creator?.name} • {new Date(letter.created_at).toLocaleDateString('id-ID')}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 ml-4">
                                                <Link
                                                    href={route('letters.show', letter.id)}
                                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                                                    title="Lihat detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                
                                                {letter.file_path && (
                                                    <Link
                                                        href={route('letters.show', { letter: letter.id, download: 1 })}
                                                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                                                        title="Download file"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </Link>
                                                )}
                                                
                                                {canManage && (
                                                    <>
                                                        <Link
                                                            href={route('letters.edit', letter.id)}
                                                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                                                            title="Edit surat"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        
                                                        <button
                                                            onClick={() => handleDelete(letter)}
                                                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                                                            title="Hapus surat"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Pagination */}
                        {letters.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6 pt-4 border-t">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {((letters.current_page - 1) * letters.per_page) + 1} - {Math.min(letters.current_page * letters.per_page, letters.total)} dari {letters.total} surat
                                </div>
                                <div className="flex gap-1">
                                    {letters.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-2 text-sm rounded ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="px-3 py-2 text-sm text-gray-400 bg-gray-100 rounded"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}