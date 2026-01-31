'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TeacherPerformancePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Kurs Performansı</h1>
                <p className="text-muted-foreground">Öğrenci katılımı ve kurs gelir istatistikleri.</p>
            </div>

            <div className="p-10 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-4">Grafik verileri hazırlanıyor...</p>
                <p className="text-sm text-muted-foreground">Bu panelde yakında öğrencilerin kurs tamamlama oranları ve sınav başarıları gösterilecektir.</p>
            </div>
        </div>
    );
}
