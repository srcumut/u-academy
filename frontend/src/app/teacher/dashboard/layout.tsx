'use client';

import { ComponentType } from 'react';
import { Home, BookOpen, Bell, BarChart2, User, LogOut, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col flex-shrink-0">
                <div className="h-20 flex justify-center items-center px-8 border-b border-border">
                    <Link href="/teacher/dashboard" className="cursor-pointer">
                        <span className="text-2xl font-bold text-primary flex justify-center">
                            U-ACADEMY (Öğretmen)
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <SidebarItem icon={Home} label="Panel" href="/teacher/dashboard" active />
                    <SidebarItem icon={BookOpen} label="Kurslarım" href="/teacher/dashboard/courses" />
                    <SidebarItem icon={BarChart2} label="Performans" href="/teacher/dashboard/performance" />
                    <SidebarItem icon={Bell} label="Duyurular" href="/teacher/dashboard/announcements" />
                    <SidebarItem icon={User} label="Profil" href="/teacher/dashboard/profile" />
                    <SidebarItem icon={Settings} label="Ayarlar" href="/teacher/dashboard/settings" />
                </nav>

                <div className="p-4 border-t border-border mt-auto">
                    <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Pro'ya Yükselt</p>
                        <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-transform active:scale-95 cursor-pointer">
                            Premium Ol
                        </button>
                    </div>
                    <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer group">
                        <LogOut size={18} />
                        <span>Çıkış Yap</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
                {/* Header */}
                <header className="h-20 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-8 z-10 sticky top-0">
                    <div className="flex items-center text-muted-foreground w-1/3">
                        <div className="relative w-full max-w-md hidden lg:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="w-full bg-secondary/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/teacher/dashboard/announcements">
                            <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors relative cursor-pointer active:scale-95">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            </button>
                        </Link>
                        <Link href="/teacher/dashboard/profile">
                            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-foreground leading-none">Öğretmen</p>
                                    <p className="text-xs text-muted-foreground">Ücretsiz Plan</p>
                                </div>

                                <div className="w-10 h-10 rounded-full border border-border cursor-pointer shadow-sm group-hover:border-primary transition-all">
                                    <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                        <span className="font-bold text-foreground">S</span>
                                        {/* <img src="https://github.com/shadcn.png" alt="Profile" className="w-full h-full object-cover" /> */}
                                    </div>
                                </div>
                            </button>
                        </Link>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto p-8 relative scroll-smooth no-scrollbar">
                    {/* Background Blobs for depth */}
                    {/* Background Blobs for depth - REMOVED */}

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

function SidebarItem({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active?: boolean }) {
    return (
        <Link href={href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'text-muted-foreground hover:bg-secondary hover:text-foreground hover:translate-x-1'}`}>
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </Link>
    )
}
