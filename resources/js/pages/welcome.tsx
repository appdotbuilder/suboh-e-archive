import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="E-Archive Kecamatan Suboh">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
                <header className="px-6 py-4">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center px-6 py-2 text-white/90 hover:text-white border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </nav>
                </header>
                
                <main className="px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                                    <span className="text-3xl">📁</span>
                                </div>
                                <h1 className="text-5xl font-bold text-white">
                                    E-Archive
                                </h1>
                            </div>
                            <h2 className="text-2xl text-blue-100 mb-4">
                                Sistem Arsip Digital Kecamatan Suboh
                            </h2>
                            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                                Platform digital untuk mengelola arsip surat masuk dan keluar dengan mudah, aman, dan efisien. 
                                Mendukung workflow yang terstruktur untuk administrasi perkantoran modern.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📤</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Upload Surat</h3>
                                <p className="text-blue-200">
                                    Upload dan kelola surat masuk/keluar dengan file PDF. Lengkapi dengan metadata seperti nomor, tanggal, dan perihal.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">🔍</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Pencarian Canggih</h3>
                                <p className="text-blue-200">
                                    Cari dokumen berdasarkan nomor surat, tanggal, pengirim/penerima, atau kata kunci dalam perihal.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Manajemen Pengguna</h3>
                                <p className="text-blue-200">
                                    3 level akses: Administrator, Staf Tata Usaha, dan Pimpinan dengan hak akses yang berbeda.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Dashboard Monitoring</h3>
                                <p className="text-blue-200">
                                    Pantau statistik dan aktivitas arsip dengan dashboard yang informatif dan real-time.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">🗂️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Kategorisasi</h3>
                                <p className="text-blue-200">
                                    Organisir surat dengan sistem kategori yang dapat disesuaikan sesuai kebutuhan.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Responsive Design</h3>
                                <p className="text-blue-200">
                                    Akses dari desktop, tablet, atau smartphone dengan tampilan yang optimal di semua perangkat.
                                </p>
                            </div>
                        </div>

                        {/* User Roles */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-16">
                            <h3 className="text-2xl font-bold text-white text-center mb-8">Role Pengguna</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">👨‍💼</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Administrator</h4>
                                    <p className="text-blue-200 text-sm">
                                        Mengelola sistem, pengguna, dan kategori. Akses penuh ke semua fitur.
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">👩‍💻</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Staf Tata Usaha</h4>
                                    <p className="text-blue-200 text-sm">
                                        Upload, edit, dan kelola arsip surat. User utama untuk operasional harian.
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">👔</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Pimpinan</h4>
                                    <p className="text-blue-200 text-sm">
                                        Melihat dan memonitor data arsip. Akses read-only untuk keperluan supervisi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="text-center">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                    <h3 className="text-2xl font-bold text-white mb-4">Mulai Digitalisasi Arsip Anda</h3>
                                    <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
                                        Bergabunglah dengan sistem e-archive modern untuk meningkatkan efisiensi 
                                        pengelolaan dokumen di instansi Anda.
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                                        >
                                            🚀 Daftar Sekarang
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-8 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                                        >
                                            Masuk ke Akun
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <footer className="mt-16 pt-8 border-t border-white/20 text-center">
                            <p className="text-blue-300">
                                © 2024 E-Archive Kecamatan Suboh. Dikembangkan untuk meningkatkan pelayanan administrasi digital.
                            </p>
                        </footer>
                    </div>
                </main>
            </div>
        </>
    );
}