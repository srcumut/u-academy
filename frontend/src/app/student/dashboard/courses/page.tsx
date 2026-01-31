'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";
import Link from 'next/link';
import { lessonService } from '@/lib/api';

interface Lesson {
    id: number;
    name: string;
    teacher_name: string;
}

export default function CoursesPage() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await lessonService.getMyLessons();
                setLessons(data);
            } catch (error) {
                console.error("Dersler yüklenirken hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) {
        return <div className="p-8">Yükleniyor...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Derslerim</h1>
                    <p className="text-muted-foreground">Kayıtlı olduğunuz derslerin listesi.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                    <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border group">
                        <div className="h-32 bg-primary/10 relative flex items-center justify-center">
                            <BookOpen size={48} className="text-primary/40" />
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h3 className="font-bold text-lg text-foreground line-clamp-1">{lesson.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                    <User size={16} />
                                    <span>{lesson.teacher_name || "Öğretmen Atanmamış"}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <Link href={`/student/dashboard/courses/${lesson.id}`}>
                                    <Button className="w-full">
                                        Derse Git
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {lessons.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                    Henüz kayıtlı olduğunuz bir ders bulunmamaktadır.
                </div>
            )}
        </div>
    );
}
