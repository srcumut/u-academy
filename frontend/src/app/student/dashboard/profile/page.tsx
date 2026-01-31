'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Profil Ayarları</h1>
                <p className="text-muted-foreground">Kişisel bilgilerini ve tercihlerini yönet.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <div className="md:col-span-1">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <div className="w-24 h-24 mx-auto rounded-full border-2 border-border mb-4">
                                <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                    <span className="text-3xl font-bold text-foreground">Ö</span>
                                </div>
                            </div>
                            <CardTitle className="text-center">Öğrenci Adı</CardTitle>
                            <CardDescription className="text-center">Bilgisayar Mühendisliği</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full cursor-pointer">Avatarı Değiştir</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Details Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle>Kişisel Bilgiler</CardTitle>
                            <CardDescription>Kişisel bilgilerini buradan güncelle.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Ad</Label>
                                    <Input id="firstName" placeholder="Can" className="bg-secondary/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Soyad</Label>
                                    <Input id="lastName" placeholder="Yılmaz" className="bg-secondary/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Hakkında</Label>
                                <Input id="bio" placeholder="Kendinizden bahsedin" className="bg-secondary/50" />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Button className="bg-primary hover:bg-primary/90 text-white cursor-pointer">Değişiklikleri Kaydet</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
