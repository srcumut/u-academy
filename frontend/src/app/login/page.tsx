'use client';

import { useState } from 'react';
import Image from 'next/image';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [isResetOpen, setIsResetOpen] = useState(false);

    // Reset Password State
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPass !== confirmPass) {
            setError('Yeni şifreler eşleşmiyor!');
            setTimeout(() => setError(''), 3000); // Clear error after 3s
            return;
        }

        // API call
        setIsLoading(true);
        try {
            await api.post('/auth/reset-password', {
                email: email,
                current_password: currentPass,
                new_password: newPass
            });

            setResetMessage('Şifreniz başarıyla yenilendi!');
            setTimeout(() => {
                setIsResetOpen(false);
                setResetMessage('');
                setCurrentPass('');
                setNewPass('');
                setConfirmPass('');
            }, 2000);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || 'Şifre yenileme başarısız.');
            setTimeout(() => setError(''), 3000);
        } finally {
            setIsLoading(false);
        }
    };
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('username', email);
            params.append('password', password);

            const response = await api.post('/auth/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Invalid credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-background relative overflow-hidden">
            {/* Abstract Shapes - REMOVED */}

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
                            <span className="font-bold text-white">10k+</span> Students Joined
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-[400px]">
                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-white">Hoş Geldiniz</h2>
                            <p className="text-white/70 text-sm mt-2">Hesabınıza erişmek için giriş yapın.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white">E-posta</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/10 h-12 mt-3"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-white">Şifre</Label>
                                    <button type="button" onClick={() => setIsResetOpen(true)} className='text-sm text-white font-bold hover:text-white hover:underline cursor-pointer'>Şifremi Unuttum</button>
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

                        <div className="mt-8 text-center text-sm text-white/60">
                            Üye değil misiniz? <a href="#" className="font-semibold text-white hover:text-white/90 transition-colors">Hemen Kaydolun</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Reset Modal */}
            {isResetOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <Card className="w-full max-w-md bg-card border-border shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsResetOpen(false)}
                            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                        <CardContent className="p-6">
                            <div className="mb-6 text-center">
                                <h2 className="text-2xl font-bold text-foreground">Şifre Yenileme</h2>
                                <p className="text-muted-foreground text-sm mt-2">Lütfen bilgilerinizi giriniz.</p>
                            </div>

                            {resetMessage ? (
                                <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-600 rounded-lg text-center font-medium">
                                    {resetMessage}
                                </div>
                            ) : (
                                <>
                                    {error && (
                                        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm text-center">
                                            {error}
                                        </div>
                                    )}
                                    <form onSubmit={handleResetPassword} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPass" className="text-foreground">Mevcut Şifre</Label>
                                            <Input
                                                id="currentPass"
                                                type="password"
                                                value={currentPass}
                                                onChange={(e) => setCurrentPass(e.target.value)}
                                                required
                                                className="bg-secondary/50 border-input"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="newPass" className="text-foreground">Yeni Şifre</Label>
                                            <Input
                                                id="newPass"
                                                type="password"
                                                value={newPass}
                                                onChange={(e) => setNewPass(e.target.value)}
                                                required
                                                className="bg-secondary/50 border-input"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPass" className="text-foreground">Yeni Şifre (Tekrar)</Label>
                                            <Input
                                                id="confirmPass"
                                                type="password"
                                                value={confirmPass}
                                                onChange={(e) => setConfirmPass(e.target.value)}
                                                required
                                                className="bg-secondary/50 border-input"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mt-2"
                                        >
                                            Şifreyi Güncelle
                                        </Button>
                                    </form>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
