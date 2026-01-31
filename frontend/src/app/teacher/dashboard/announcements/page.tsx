'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherAnnouncementsPage() {
    const announcements = [
        { title: "React Kursu Güncellemesi", content: "Mufredata 'React Server Components' bolumu eklendi. Lutfen kontrol ediniz.", author: "Sistem", date: "Bugun", important: true },
        { title: "Yeni Özellik: Soru-Cevap Paneli", content: "Artık öğrencilerinizin sorularını daha hızlı yanıtlayabileceğiniz yeni bir panelimiz var.", author: "Yönetici", date: "3 Gün önce", important: false },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Duyurular & Bildirimler</h1>
                    <p className="text-muted-foreground">Platformdan gelen duyurular ve öğrenci bildirimleri.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2 cursor-pointer">
                    <PlusCircle size={18} /> Yeni Duyuru Yayınla
                </Button>
            </div>

            <div className="space-y-4">
                {announcements.map((item, index) => (
                    <Card key={index} className={`bg-card border-border hover:shadow-md transition-shadow ${item.important ? 'border-l-4 border-l-primary' : ''}`}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                        {item.important && <Badge className="text-xs bg-primary text-white">Sistem</Badge>}
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
