'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

interface User {
    full_name: string;
    role: string;
}
interface Announcement {
    id: number;
    title: string;
    content: string;
    created_at: string;
    teacher_name: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [annoucements, setAnnoucements] = useState<Announcement[]>([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    console.error("Yetkisiz erişim, giriş sayfasına yönlendiriliyor...");
                    localStorage.removeItem('token'); // Eski tokenı sil
                    window.location.href = '/login'; // Login'e at
                    return;
                }
                console.error('Kullanıcı bilgisi alınamadı:', error);
                // Demo verisi (İsteğe bağlı, veritabanı boşsa dursun)
                setUser({ full_name: 'Demo Öğrenci', role: 'student' });
            } finally {
                setLoading(false);
            }
        };
        const fetchAnnouncements = async () => {
            try {
                const response = await api.get('/announcements');
                setAnnoucements(response.data);
            }
            catch (error) {
                console.error("duyurular alınamadı:", error);
            }
        }
        fetchUser();
        fetchAnnouncements();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-full text-muted-foreground">Panel yükleniyor...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex relative overflow-hidden rounded-3xl bg-card p-10 border border-border">


                <div className=" w-1/2 relative z-10">
                    <div className='py-15'>
                        <h1 className="text-4xl font-bold mb-3 text-foreground">
                            Tekrar Hoş Geldin, <span className="text-primary">{user?.full_name || 'Öğrenci'}</span>!
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Öğrenme yolculuğuna devam etmeye hazır mısın? Bugün 3 bekleyen ödevin ve 2 yaklaşan dersin var.
                        </p>
                        <button className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-sm hover:bg-primary/90 transition-all hover:translate-y-0">
                            Öğrenmeye Devam Et
                        </button>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col h-full pl-6">
                    <h1 className='text-black text-3xl font-bold mb-3 text-foreground text-left'>Duyurular:</h1>
                    <div className="flex-1 bg-card/50 backdrop-blur-sm border border-black/10 
                    rounded-2xl p-4 overflow-y-auto max-h-[300px] space-y-4 shadow-inner 
                    custom-scrollbar">
                        {annoucements.length === 0 ? (
                            <p className='text-muted-foreground text-center py-10'>Henüz duyuru yok.</p>
                        ) : (
                            annoucements.map((announcement) => (
                                <div key={announcement.id} className='bg-card/50 backdrop-blur-sm border border-black/10 
                                rounded-2xl p-4 overflow-y-auto max-h-[300px] space-y-4 shadow-inner 
                                custom-scrollbar'>
                                    <h3 className='text-lg font-bold text-foreground'>
                                        {announcement.title}
                                        <span className="text-sm font-normal text-muted-foreground ml-2">
                                            - {announcement.teacher_name || "Sistem"}
                                        </span>
                                    </h3>
                                    <p className='text-muted-foreground'>{announcement.content}</p>
                                    <div className='text-muted-foreground text-sm'>
                                        {new Date(announcement.created_at).toLocaleDateString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
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
