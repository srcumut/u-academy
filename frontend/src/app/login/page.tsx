'use client';

import { useState } from 'react';
import Image from 'next/image';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    // State for login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);

            const response = await api.post('/auth/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const { access_token } = response.data;
            localStorage.setItem('token', access_token);

            // 1. Rolünü öğrenmek için kullanıcı bilgilerini çek
            try {
                const meResponse = await api.get('/auth/me');
                const userRole = meResponse.data.role; // 'student' | 'teacher'

                console.log("Kullanıcı Rolü:", userRole);

                // 2. Role göre yönlendir
                if (userRole === 'student') {
                    router.push('/student/dashboard');
                } else if (userRole === 'teacher' || userRole === 'admin') {
                    router.push('/teacher/dashboard');
                } else {
                    console.warn("Bilinmeyen rol:", userRole);
                    router.push('/student/dashboard'); // Varsayılan olarak öğrenciye at
                }
            } catch (roleError) {
                console.log("Rol bilgisi alınamadı:", roleError);
                router.push('/student/dashboard'); // Hata durumunda öğrenci paneline yolla
            }

        } catch (err: any) {
            console.log(err);
            setError('Kayıt bulunamadı veya şifre yanlış.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-background relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/login-bg.png"
                    alt="Student Learning Background"
                    fill
                    className="object-cover blur-sm"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="flex w-full h-screen relative z-10">
                {/* Left Side - Hero / Branding */}
                <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 border-r border-black bg-transparent">
                    <div className="mb-8">
                        <span className="px-3 py-1 rounded-full border border-white/30 text-white text-xs font-semibold bg-white/10">
                            Öğrenme Yönetim Sistemi
                        </span>
                    </div>
                    <h1 className="text-6xl font-bold leading-tight tracking-tight text-white mb-6">
                        Yeni Beceriler Edinin <br />
                        <span className="text-white">Her Zaman, Her Yerde.</span>
                    </h1>
                    <p className="text-lg text-white/80 max-w-md mb-10">
                        Alanında uzman kişiler tarafından geliştirilen binlerce derse erişmek için topluluğumuza katılın.
                    </p>

                    <div className="flex items-center space-x-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-slate-700"></div>
                            ))}
                        </div>
                        <div className="text-sm text-white/80">
                            <span className="font-bold text-white">10k+</span> Öğrenci Katıldı
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-[400px]">
                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-3xl font-bold mb-6 text-white text-center">Giriş Yap</h2>
                            <p className="text-white/70 text-sm mt-2">Hesabınıza erişmek için giriş yapın.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-white">Kullanıcı Adı</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Kullanıcı adınız"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white transition-all rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-white">Şifre</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/10 h-12 mt-3"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 bg-white text-black hover:bg-gray-600 hover:text-white transition-colors font-semibold text-lg shadow-xl shadow-black/20 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Yükleniyor...' : 'Hesaba Giriş Yap'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
