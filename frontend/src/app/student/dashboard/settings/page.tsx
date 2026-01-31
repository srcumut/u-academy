'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Hesap Ayarları</h1>
                <p className="text-muted-foreground">Tercihlerini ve güvenliğini yönet.</p>
            </div>

            <div className="space-y-6">
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Bildirimler</CardTitle>
                        <CardDescription>Bildirim tercihlerini yapılandır.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>E-posta Bildirimleri</Label>
                                <p className="text-sm text-muted-foreground">Kurs ilerlemeniz hakkında güncellemeler alın.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Anlık Bildirimler</Label>
                                <p className="text-sm text-muted-foreground">Cihazınızda gerçek zamanlı bildirimler alın.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Güvenlik</CardTitle>
                        <CardDescription>Şifreni ve güvenlik ayarlarını güncelle.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg">
                            <div>
                                <p className="font-medium text-foreground">Şifre</p>
                                <p className="text-sm text-muted-foreground">Son değişiklik 3 ay önce</p>
                            </div>
                            <Button variant="outline" className="cursor-pointer">Şifreyi Güncelle</Button>
                        </div>
                        <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg">
                            <div>
                                <p className="font-medium text-foreground">İki Faktörlü Doğrulama</p>
                                <p className="text-sm text-muted-foreground">Ekstra güvenlik katmanı ekle.</p>
                            </div>
                            <Button variant="outline" className="cursor-pointer">2FA Etkinleştir</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button variant="destructive" className="cursor-pointer" onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}>
                        <span className="text-white">Çıkış Yap</span>
                    </Button>
                </div>
            </div>
        </div >
    );
}
