'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function TeacherSettingsPage() {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Eğitmen Ayarları</h1>
                <p className="text-muted-foreground">Hesap ve ödeme tercihlerinizi yönetin.</p>
            </div>

            <div className="space-y-6">
                {/* Teacher Specific Settings */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Görünürlük ve Gizlilik</CardTitle>
                        <CardDescription>Profilinizin kimler tarafından görüntülenebileceğini seçin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Herkese Açık Profil</Label>
                                <p className="text-sm text-muted-foreground">Profiliniz tüm öğrenciler tarafından görülebilir.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Bildirimler</CardTitle>
                        <CardDescription>Öğrenci soruları ve kurs güncellemeleri hakkında bildirim alın.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Yeni Soru Bildirimleri</Label>
                                <p className="text-sm text-muted-foreground">Öğrenciler soru sorduğunda e-posta alın.</p>
                            </div>
                            <Switch defaultChecked />
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
