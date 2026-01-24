'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

interface User {
    email: string;
    full_name: string;
    role: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                // Fallback for visual testing if backend fails
                setUser({ email: 'demo@example.com', full_name: 'Demo Student', role: 'student' });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-full text-muted-foreground">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-card p-10 border border-border">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-3 text-foreground">
                        Welcome back, <span className="text-primary">{user?.full_name || 'Student'}</span>!
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Ready to continue your learning journey? You have 3 pending assignments and 2 upcoming classes today.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-sm hover:bg-primary/90 transition-all hover:translate-y-0">
                        Resume Learning
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    icon={BookOpen}
                    title="Enrolled Courses"
                    value="4"
                    trend="+1 this month"
                    color="text-blue-500"
                />
                <DashboardCard
                    icon={Clock}
                    title="Hours Spent"
                    value="12.5"
                    trend="+2.4h vs last week"
                    color="text-orange-500"
                />
                <DashboardCard
                    icon={Award}
                    title="Certificates"
                    value="2"
                    trend="New!"
                    color="text-purple-500"
                />
                <DashboardCard
                    icon={TrendingUp}
                    title="Avg. Score"
                    value="88%"
                    trend="+5% improvement"
                    color="text-green-500"
                />
            </div>

            {/* Recent Activity & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-foreground">Continue Learning</h2>
                    <div className="grid gap-4">
                        {[1, 2].map((i) => (
                            <Card key={i} className="group hover:border-primary/50 transition-all cursor-pointer bg-card/50 backdrop-blur-sm border-white/5">
                                <div className="flex p-4 gap-4">
                                    <div className="w-32 h-24 rounded-lg bg-secondary/50 overflow-hidden relative">
                                        {/* Image placeholder or removed gradient overlay */}
                                    </div>
                                    <div className="flex-1 py-1">
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Development</span>
                                        <h3 className="text-lg font-bold text-foreground mt-2 group-hover:text-primary transition-colors">Full Stack Web Development Bootcamp</h3>
                                        <div className="mt-3 w-full bg-secondary rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">65% Completed</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground">Upcoming Schedule</h2>
                    <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                        <CardContent className="p-4 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-secondary rounded-lg border border-white/5">
                                        <span className="text-xs font-bold text-muted-foreground">OCT</span>
                                        <span className="text-lg font-bold text-foreground">{20 + i}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-sm">React Advanced Patterns</h4>
                                        <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
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
