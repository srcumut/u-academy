'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

export default function AnnouncementsPage() {
    const announcements = [
        { title: "Sistem Bakım Çalışması", content: "Platformda Pazar günü 02:00 - 04:00 saatleri arasında bakım çalışması yapılacaktır.", author: "Yönetici", date: "2 Saat önce", important: true },
        { title: "Yeni Kurs Yayında: İleri Seviye TypeScript", content: "En yeni kursumuz yayına girdi. Hemen kaydolun ve uzmanlaşın.", author: "Eğitmen Can", date: "1 Gün önce", important: false },
        { title: "Ödev Teslim Süresi Uzatıldı", content: "Yoğun talep üzerine React Ödevi teslim süresi 24 saat uzatılmıştır.", author: "Eğitmen Ayşe", date: "2 Gün önce", important: false },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Duyurular</h1>
                <p className="text-muted-foreground">Güncellemeler, haberler ve önemli bildirimler.</p>
            </div>

            <div className="space-y-4">
                {announcements.map((item, index) => (
                    <Card key={index} className={`bg-card border-border hover:shadow-md transition-shadow ${item.important ? 'border-l-4 border-l-red-500' : ''}`}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                        {item.important && <Badge variant="destructive" className="text-xs">Önemli</Badge>}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground gap-4">
                                        <span className="flex items-center gap-1"><Bell size={12} /> {item.author}</span>
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/90 leading-relaxed">
                                {item.content}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
