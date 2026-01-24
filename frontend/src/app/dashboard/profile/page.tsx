'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your personal information and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="space-y-6">
                    <Card className="bg-card border-border text-center">
                        <CardHeader>
                            <div className="w-24 h-24 mx-auto rounded-full border-2 border-border mb-4">
                                <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                    <span className="text-3xl font-bold text-foreground">S</span>
                                </div>
                            </div>
                            <CardTitle>Student Name</CardTitle>
                            <CardDescription>Computer Science Major</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">Change Avatar</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Details Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" className="bg-secondary/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" className="bg-secondary/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-secondary/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" placeholder="Tell us about yourself" className="bg-secondary/50" />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Button className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
