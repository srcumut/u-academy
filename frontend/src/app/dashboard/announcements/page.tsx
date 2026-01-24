'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Calendar, User } from 'lucide-react';

export default function AnnouncementsPage() {
    const announcements = [
        { title: "System Maintenance Scheduled", content: "The platform will be undergoing scheduled maintenance on Sunday from 2 AM to 4 AM.", author: "Admin", date: "2 Hours ago", important: true },
        { title: "New Course Available: Advanced TypeScript", content: "We are excited to launch our latest course. Enroll now to master advanced types.", author: "Instructor John", date: "1 Day ago", important: false },
        { title: "Assignment Deadline Extended", content: "Due to popular request, the deadline for the React Assignment has been extended by 24 hours.", author: "Instructor Sarah", date: "2 Days ago", important: false },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
                <p className="text-muted-foreground">Updates, news, and important notifications.</p>
            </div>

            <div className="space-y-4">
                {announcements.map((announcement, index) => (
                    <Card key={index} className={`border-border bg-card/60 backdrop-blur-sm transition-all hover:bg-card ${announcement.important ? 'border-l-4 border-l-primary' : ''}`}>
                        <div className="p-6 flex flex-col md:flex-row gap-6">
                            <div className={`p-4 rounded-full h-fit w-fit flex-shrink-0 ${announcement.important ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                                <Megaphone size={24} />
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <h3 className="text-lg font-bold text-foreground">{announcement.title}</h3>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {announcement.date}</span>
                                        <span className="flex items-center gap-1"><User size={12} /> {announcement.author}</span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {announcement.content}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
