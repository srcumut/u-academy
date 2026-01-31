'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Award, TrendingUp, AlertTriangle } from 'lucide-react';

interface User {
    email: string;
    full_name: string;
    role: string;
}

export default function DashboardPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    console.error("Yetkisiz erişim, giriş sayfasına yönlendiriliyor...");
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                console.error('Kullanıcı bilgisi alınamadı:', error);

                setUser({ email: 'demo@example.com', full_name: 'Demo Öğretmen', role: 'teacher' });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handlePublishAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmiting(true);
        try {
            await api.post("/announcements", {
                title: title,
                content: content,
                is_global: true
            });
            alert("duyuru başarıyla yayınlandı!");
            setTitle("");
            setContent("");
        }
        catch (error) {
            console.error("duyuru hatası: ", error);
            alert("duyuru yayınlanırken hata oluştu. ")
        }
        finally {
            setIsSubmiting(false);
        }

    };

    if (loading) {
        return <div className="flex items-center justify-center h-full text-muted-foreground">Panel yükleniyor...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            {/* Welcome Section */}
            {/* Welcome Section & Announcement Form */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Left: Welcome Message */}
                <div className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl bg-card p-10 border border-border">
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-3 text-foreground">
                            Tekrar Hoş Geldin, <span className="text-primary">{user?.full_name || 'Öğretmen'}</span>!
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Öğrencilerine ilham vermeye hazır mısın?
                        </p>
                        <button className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-sm hover:bg-primary/90 transition-all hover:translate-y-0">
                            Ders Programını Gör
                        </button>
                    </div>
                </div>

                {/* Right: Announcement Form */}
                <div className="w-full lg:w-1/2 bg-card p-8 rounded-3xl border border-border shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
                        📢 Yeni Duyuru Oluştur
                    </h2>
                    <form onSubmit={handlePublishAnnouncement} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground">Duyuru Başlığı</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 rounded-xl bg-secondary/50 border border-border focus:ring-2 focus:ring-primary outline-none transition-all text-foreground"
                                placeholder="Örn: Sınav Tarihleri Hakkında"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground">İçerik</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                className="w-full p-3 rounded-xl bg-secondary/50 border border-border focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-foreground"
                                placeholder="Duyuru detaylarını buraya yazın..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmiting}
                            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmiting ? 'Yayınlanıyor...' : 'Duyuruyu Yayınla'}
                        </button>
                    </form>
                </div>

            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    icon={BookOpen}
                    title="Kayıtlı Kurslar"
                    value="4"
                    trend="+1 bu ay"
                    color="text-blue-500"
                />
                <DashboardCard
                    icon={Clock}
                    title="Harcanan Saat"
                    value="12.5"
                    trend="+2.4s geçen haftaya göre"
                    color="text-orange-500"
                />
                <DashboardCard
                    icon={Award}
                    title="Sertifikalar"
                    value="2"
                    trend="Yeni!"
                    color="text-purple-500"
                />
                <DashboardCard
                    icon={TrendingUp}
                    title="Ortalama Puan"
                    value="88%"
                    trend="+5% gelişme"
                    color="text-green-500"
                />
            </div>

            {/* Recent Activity & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-foreground">Öğrenmeye Devam Et</h2>
                    <div className="grid gap-4">
                        {[1, 2].map((i) => (
                            <Card key={i} className="group hover:border-primary/50 transition-all cursor-pointer bg-card/50 backdrop-blur-sm border-white/5">
                                <div className="flex p-4 gap-4">
                                    <div className="w-32 h-24 rounded-lg bg-secondary/50 overflow-hidden relative">
                                        {/* Image placeholder or removed gradient overlay */}
                                    </div>
                                    <div className="flex-1 py-1">
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Yazılım</span>
                                        <h3 className="text-lg font-bold text-foreground mt-2 group-hover:text-primary transition-colors">Full Stack Web Geliştirme Kampı</h3>
                                        <div className="mt-3 w-full bg-secondary rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">%65 Tamamlandı</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground">Yaklaşan Dersler</h2>
                    <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                        <CardContent className="p-4 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-secondary rounded-lg border border-white/5">
                                        <span className="text-xs font-bold text-muted-foreground">EKI</span>
                                        <span className="text-lg font-bold text-foreground">{20 + i}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-sm">React İleri Seviye</h4>
                                        <p className="text-xs text-muted-foreground">10:00 - 11:30</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ icon: Icon, title, value, trend, color }: { icon: any, title: string, value: string, trend: string, color: string }) {
    return (
        <Card className="hover:border-primary/50 transition-colors duration-300 border-border bg-card shadow-sm hover:shadow-md group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-secondary/50 group-hover:bg-primary/20 transition-colors ${color}`}>
                    <Icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {trend}
                </p>
            </CardContent>
        </Card>
    )
}
