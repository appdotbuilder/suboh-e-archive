import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Letter, type LetterCategory, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BarChart3, FileText, FolderOpen, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        total_letters: number;
        incoming_letters: number;
        outgoing_letters: number;
        total_users?: number;
    };
    recentLetters: Letter[];
    monthlyStats: Array<{
        month: string;
        incoming: number;
        outgoing: number;
    }>;
    categoryStats?: LetterCategory[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentLetters, monthlyStats, categoryStats }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6">
                {/* Welcome */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        Selamat datang, {user.name}! 👋
                    </h1>
                    <p className="text-blue-100">
                        {user.role === 'admin' && 'Kelola sistem dan pantau seluruh aktivitas arsip.'}
                        {user.role === 'staf_tata_usaha' && 'Kelola arsip surat masuk dan keluar dengan efisien.'}
                        {user.role === 'pimpinan' && 'Pantau dan monitor aktivitas arsip secara real-time.'}
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Surat</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.total_letters}</div>
                            <p className="text-xs text-muted-foreground">
                                Semua surat dalam arsip
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Surat Masuk</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.incoming_letters}</div>
                            <p className="text-xs text-muted-foreground">
                                {((stats.incoming_letters / stats.total_letters) * 100 || 0).toFixed(1)}% dari total
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Surat Keluar</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.outgoing_letters}</div>
                            <p className="text-xs text-muted-foreground">
                                {((stats.outgoing_letters / stats.total_letters) * 100 || 0).toFixed(1)}% dari total
                            </p>
                        </CardContent>
                    </Card>
                    
                    {stats.total_users !== null && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-600">{stats.total_users}</div>
                                <p className="text-xs text-muted-foreground">
                                    Pengguna terdaftar
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Letters */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Surat Terbaru</CardTitle>
                            <Link
                                href={route('letters.index')}
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Lihat semua
                            </Link>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentLetters.length === 0 ? (
                                <p className="text-muted-foreground text-center py-4">
                                    Belum ada surat yang diarsipkan
                                </p>
                            ) : (
                                recentLetters.map((letter) => (
                                    <div key={letter.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                        <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                                            letter.type === 'incoming' ? 'bg-green-500' : 'bg-orange-500'
                                        }`} />
                                        <div className="flex-1 min-w-0">
                                            <Link 
                                                href={route('letters.show', letter.id)}
                                                className="font-medium text-gray-900 hover:text-blue-600 block truncate"
                                            >
                                                {letter.subject}
                                            </Link>
                                            <p className="text-sm text-gray-600 truncate">
                                                {letter.number} - {letter.sender_recipient}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(letter.letter_date).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Category Statistics */}
                    {categoryStats && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">Kategori Populer</CardTitle>
                                <FolderOpen className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {categoryStats.length === 0 ? (
                                    <p className="text-muted-foreground text-center py-4">
                                        Belum ada kategori yang digunakan
                                    </p>
                                ) : (
                                    categoryStats.map((category) => (
                                        <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{category.name}</h4>
                                                {category.description && (
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {category.description}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {category.letters_count || 0} surat
                                            </span>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Monthly Chart Placeholder */}
                    {monthlyStats.length > 0 && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-lg">Trend Arsip 12 Bulan Terakhir</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {monthlyStats.slice(-6).map((month, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">{month.month}</span>
                                            <div className="flex gap-4 text-sm">
                                                <span className="text-green-600">Masuk: {month.incoming}</span>
                                                <span className="text-orange-600">Keluar: {month.outgoing}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Quick Actions */}
                {(user.role === 'admin' || user.role === 'staf_tata_usaha') && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Tindakan Cepat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Link
                                    href={route('letters.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    📤 Tambah Surat
                                </Link>
                                <Link
                                    href={route('letters.index')}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    🔍 Cari Arsip
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        href={route('categories.index')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        🗂️ Kelola Kategori
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}