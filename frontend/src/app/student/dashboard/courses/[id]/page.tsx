'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { lessonService } from '@/lib/api';
import { ArrowLeft, User, BookOpen, LayoutGrid } from "lucide-react";
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

interface Lesson {
    id: number;
    name: string;
    teacher_name: string;
}

export default function LessonDetailPage() {
    const params = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLesson = async () => {
            if (!params.id) return;
            try {
                const data = await lessonService.getLessonById(Number(params.id));
                setLesson(data);
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

            <Card className="border-border h-[75vh]!">
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

                <CardContent className="">

                    <div className="h-[60%] w-[40%] my-10 border-black/5 border-2 bg-primary/5 rounded-lg flex items-center justify-center ">
                        <LineChart width={500} height={300} data={data} className='mt-5 mr-5'>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tickCount={10} />
                            <YAxis tickCount={5} />
                            <Tooltip position={{ x: 380, y: 150 }} />
                            <Legend />
                            <Line type="natural" dataKey="net" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
