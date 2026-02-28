'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { lessonService } from '@/lib/api';
import { ArrowLeft, User, BookOpen, LayoutGrid, Megaphone } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts"
import { constants } from 'buffer';

interface Lesson {
    id: number;
    name: string;
    teacher_id?: number;
    teacher_name?: string;
}
interface announcement {
    id: number;
    title: string;
    content: string;
    created_at: string;
}


export default function LessonDetailPage() {
    const params = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [announcements, setAnnouncements] = useState<announcement[] | null>(null);
    useEffect(() => {
        const fetchLesson = async () => {
            if (!params.id) return;
            try {
                const data = await lessonService.getLessonById(Number(params.id));
                setLesson(data);
                if (data.teacher_id) {
                    const annData = await lessonService.getAnnouncementsByTeacherId(data.teacher_id);
                    setAnnouncements(annData);
                } else {
                    setAnnouncements([]);
                }
            } catch (err) {
                console.error("Ders detayı yüklenirken hata:", err);
                setError("Ders bulunamadı veya yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [params.id]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!lesson) return null;
    const data = [
        {
            name: "11 Ekim", net: 9
        },
        {
            name: "12 Ekim", net: 11
        },
        {
            name: "15 Ekim", net: 13
        },
        {
            name: "16 Ekim", net: 12.5
        },
        {
            name: "17 Ekim", net: 15
        },
        {
            name: "18 Ekim", net: 10
        },
        {
            name: "20 Ekim", net: 11.25
        },
        {
            name: "21 Ekim", net: 14
        },
        {
            name: "22 Ekim", net: 12
        },
        {
            name: "23 Ekim", net: 11
        },
    ]
    return (
        <div className="space-y-6">
            <Link href="/student/dashboard/courses">
                <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                    <ArrowLeft size={16} /> Derslere Dön
                </Button>
            </Link>

            <Card className="border-border h-[100vh]!">
                <CardHeader className="bg-primary/5 border-b border-border pb-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary">
                            <BookOpen size={24} />
                            <span className="font-semibold">Ders Detayı</span>
                        </div>
                        <CardTitle className="text-3xl font-bold">{lesson.name}</CardTitle>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <User size={18} />
                            <span>Öğretmen: {lesson.teacher_name || "Bilinmiyor"}</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col lg:flex-row gap-8 py-4">

                    <div className="h-[50vh] w-full border-black/5 border-2 bg-primary/5 rounded-lg flex items-center justify-center p-6">
                        <div className="w-full h-full">
                            <LineChart width={500} height={300} data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tickCount={10} />
                                <YAxis tickCount={5} />
                                <Tooltip />
                                <Legend />
                                <Line type="natural" dataKey="net" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </div>
                    </div>
                    <div className="w-full lg:w-[60%] flex flex-col gap-4 bg-primary/5 shadow-lg    ">
                        <div className="rounded-md border border-gray-200 h-[300px]">
                            <div className="flex flex-col h-full overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-200 bg-muted/20 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-foreground">Duyurular</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 ">
                                    {announcements && announcements.length > 0 ? (
                                        announcements.map((announcement: announcement, index: number) => (
                                            <div key={index} className="flex flex-col gap-2 p-4 rounded-lg border border-gray-300 bg-card/50 ">
                                                <div className="flex items-center justify-between gap-4">
                                                    <h4 className="text-sm font-bold text-primary truncate">
                                                        {announcement.title}
                                                    </h4>
                                                    <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
                                                        {new Date(announcement.created_at).toLocaleDateString('tr-TR')}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    {announcement.content}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                            <p className="text-sm italic text-center">Henüz bir duyuru yayınlanmadı.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
