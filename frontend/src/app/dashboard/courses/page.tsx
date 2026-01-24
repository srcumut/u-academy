'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

export default function CoursesPage() {
    const courses = [
        { title: "Advanced React Patterns", category: "Development", progress: 75, totalModules: 12, completedModules: 9, image: "bg-blue-500" },
        { title: "UI/UX Design Fundamentals", category: "Design", progress: 45, totalModules: 8, completedModules: 3, image: "bg-purple-500" },
        { title: "Python for Data Science", category: "Data Science", progress: 10, totalModules: 15, completedModules: 1, image: "bg-green-500" },
        { title: "Digital Marketing Strategy", category: "Marketing", progress: 100, totalModules: 6, completedModules: 6, image: "bg-orange-500" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
                    <p className="text-muted-foreground">Manage your ongoing learning progress.</p>
                </div>
                <Button onClick={() => alert('Opening Library...')} className="bg-primary hover:bg-primary/90 text-white cursor-pointer">Browse Library</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <Card key={index} className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
                        <div className={`h-32 ${course.image} relative`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-medium text-white border border-white/10">
                                    {course.category}
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h3>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{course.completedModules}/{course.totalModules} Modules</span>
                                    <span className="font-bold text-primary">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-1">
                                    <Clock size={14} /> <span>12h 30m</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BookOpen size={14} /> <span>{course.totalModules} Lessons</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-white transition-colors" variant={course.progress === 100 ? "outline" : "default"}>
                                {course.progress === 100 ? 'View Certificate' : (
                                    <>
                                        <PlayCircle size={16} /> Continue Learning
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
