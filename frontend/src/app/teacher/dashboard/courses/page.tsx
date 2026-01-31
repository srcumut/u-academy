'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, PlusCircle, Edit } from "lucide-react";

export default function TeacherCoursesPage() {
    // Demo Verisi (Öğretmen için farklı)
    const courses = [
        { title: "İleri Seviye React", category: "Yazılım", students: 124, rating: 4.8, status: "Yayında", image: "bg-blue-500" },
        { title: "Veri Bilimi Temelleri", category: "Veri Bilimi", students: 85, rating: 4.5, status: "Taslak", image: "bg-green-500" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Yönetilen Kurslar</h1>
                    <p className="text-muted-foreground">Verdiğin kursları ve içeriklerini buradan yönet.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2 cursor-pointer">
                    <PlusCircle size={18} /> Yeni Kurs Oluştur
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border group">
                        <div className={`h-32 ${course.image} relative`}>
                            <div className="absolute top-4 right-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-md ${course.status === 'Yayında' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                    {course.status}
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h3 className="font-bold text-lg text-foreground line-clamp-1">{course.title}</h3>
                                <p className="text-sm text-muted-foreground">{course.category}</p>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Users size={16} /> <span>{course.students} Öğrenci</span>
                                </div>
                                <div className="font-medium text-foreground">
                                    ⭐ {course.rating}
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-4 bg-secondary/30 border-t border-border flex gap-2">
                            <Button variant="outline" className="w-full gap-2 hover:text-primary">
                                <Edit size={16} /> Düzenle
                            </Button>
                            <Button className="w-full gap-2 bg-secondary hover:bg-secondary/80 text-foreground">
                                <BookOpen size={16} /> İçerik
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
