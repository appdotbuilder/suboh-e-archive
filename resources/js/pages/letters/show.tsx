import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Letter, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Calendar, Download, Edit, FileText, Trash2, User } from 'lucide-react';

interface LetterShowProps {
    letter: Letter;
    [key: string]: unknown;
}

export default function LetterShow({ letter }: LetterShowProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const canManage = user.role === 'admin' || user.role === 'staf_tata_usaha';
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Arsip Surat', href: '/letters' },
        { title: letter.subject, href: `/letters/${letter.id}` },
    ];

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
            router.delete(route('letters.destroy', letter.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={letter.subject} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                letter.type === 'incoming' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                            }`}>
                                {letter.type === 'incoming' ? '📥 Surat Masuk' : '📤 Surat Keluar'}
                            </span>
                            {letter.category && (
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                    {letter.category.name}
                                </span>
                            )}
                            {letter.file_path && (
                                <span className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                                    📄 File PDF Tersedia
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">{letter.subject}</h1>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {letter.file_path && (
                            <Link
                                href={route('letters.show', { letter: letter.id, download: 1 })}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </Link>
                        )}
                        
                        {canManage && (
                            <>
                                <Link
                                    href={route('letters.edit', letter.id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                                
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    className="inline-flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Hapus
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Letter Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Detail Surat
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Nomor Surat</label>
                                        <p className="text-gray-900 font-mono">{letter.number}</p>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Tanggal Surat</label>
                                        <p className="text-gray-900">
                                            {new Date(letter.letter_date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        {letter.type === 'incoming' ? 'Pengirim' : 'Penerima'}
                                    </label>
                                    <p className="text-gray-900">{letter.sender_recipient}</p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Perihal</label>
                                    <p className="text-gray-900">{letter.subject}</p>
                                </div>
                                
                                {letter.description && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                        <p className="text-gray-900 whitespace-pre-wrap">{letter.description}</p>
                                    </div>
                                )}
                                
                                {letter.category && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Kategori</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                {letter.category.name}
                                            </span>
                                            {letter.category.description && (
                                                <span className="text-gray-600 text-sm">
                                                    - {letter.category.description}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* File Information */}
                        {letter.file_path && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        📄 File Lampiran
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                                📄
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {letter.original_filename || 'Dokumen.pdf'}
                                                </p>
                                                <p className="text-sm text-gray-600">File PDF</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={route('letters.show', { letter: letter.id, download: 1 })}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Informasi Sistem
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Dibuat oleh</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-900">{letter.creator?.name}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Dibuat</label>
                                    <p className="text-gray-900">
                                        {new Date(letter.created_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Terakhir Diperbarui</label>
                                    <p className="text-gray-900">
                                        {new Date(letter.updated_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tindakan Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link
                                    href={route('letters.index')}
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    ← Kembali ke Daftar
                                </Link>
                                
                                {canManage && (
                                    <Link
                                        href={route('letters.create')}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        + Tambah Surat Baru
                                    </Link>
                                )}
                                
                                {letter.file_path && (
                                    <Link
                                        href={route('letters.show', { letter: letter.id, download: 1 })}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download File
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}