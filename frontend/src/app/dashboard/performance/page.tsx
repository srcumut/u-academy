'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PerformancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Performance</h1>
                <p className="text-muted-foreground">Track your academic progress and analytics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium text-foreground">Overall Grade</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-primary">A-</div>
                        <p className="text-sm text-muted-foreground mt-2">GPA: 3.8/4.0</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium text-foreground">Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-green-500">95%</div>
                        <p className="text-sm text-muted-foreground mt-2">Missed: 2 classes</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium text-foreground">Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-blue-500">28</div>
                        <p className="text-sm text-muted-foreground mt-2">Submitted on time</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="grades" className="w-full">
                <TabsList className="bg-secondary/50">
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="grades" className="mt-6">
                    <Card className="bg-card border-border">
                        <CardContent className="p-0">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b [&_tr]:border-border">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Course</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Instructor</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Exam 1</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Exam 2</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Final Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        <tr className="border-b border-border transition-colors hover:bg-muted/10">
                                            <td className="p-4 align-middle font-medium text-foreground">Mathematics 101</td>
                                            <td className="p-4 align-middle text-muted-foreground">Dr. Smith</td>
                                            <td className="p-4 align-middle text-foreground">85</td>
                                            <td className="p-4 align-middle text-foreground">90</td>
                                            <td className="p-4 align-middle text-right font-bold text-primary">A</td>
                                        </tr>
                                        <tr className="border-b border-border transition-colors hover:bg-muted/10">
                                            <td className="p-4 align-middle font-medium text-foreground">History of Art</td>
                                            <td className="p-4 align-middle text-muted-foreground">Prof. Davis</td>
                                            <td className="p-4 align-middle text-foreground">78</td>
                                            <td className="p-4 align-middle text-foreground">82</td>
                                            <td className="p-4 align-middle text-right font-bold text-blue-500">B+</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="analytics" className="mt-6">
                    <Card className="bg-card border-border h-64 flex items-center justify-center border-dashed">
                        <p className="text-muted-foreground">Chart Visualization Placeholder</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
