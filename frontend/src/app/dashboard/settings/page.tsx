'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
                <p className="text-muted-foreground">Manage your preferences and account security.</p>
            </div>

            <div className="space-y-6">
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Configure how you receive alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive updates about your course progress.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive real-time alerts on your device.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Marketing Emails</Label>
                                <p className="text-sm text-muted-foreground">Receive offers and new course announcements.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Update your password and security settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg">
                            <div>
                                <p className="font-medium text-foreground">Password</p>
                                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                            </div>
                            <Button variant="outline">Update Password</Button>
                        </div>
                        <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg">
                            <div>
                                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security.</p>
                            </div>
                            <Button variant="outline">Enable 2FA</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button variant="destructive" className="cursor-pointer" onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}> <p className="text-white"> Log Out</p></Button>
                </div>
            </div>
        </div >
    );
}
