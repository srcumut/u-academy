'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PerformancePage() {
    const data = [
        { name: 'Oca', Puan: 40, Tamamlanan: 24 },
        { name: 'Şub', Puan: 60, Tamamlanan: 45 },
        { name: 'Mar', Puan: 75, Tamamlanan: 60 },
        { name: 'Nis', Puan: 85, Tamamlanan: 70 },
        { name: 'May', Puan: 90, Tamamlanan: 80 },
        { name: 'Haz', Puan: 95, Tamamlanan: 85 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Performansım</h1>
                <p className="text-muted-foreground">Öğrenme istatistiklerini ve gelişimini takip et.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-1 md:col-span-2 bg-card border-border">
                    <CardHeader>
                        <CardTitle>Aylık Gelişim Grafiği</CardTitle>
                        <CardDescription>Son 6 aydaki performansın.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#888888" />
                                <YAxis stroke="#888888" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Legend />
                                <Bar dataKey="Puan" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Tamamlanan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
