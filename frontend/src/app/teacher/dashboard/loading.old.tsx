import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">
            {/* Welcome Section Skeleton */}
            <div className="rounded-3xl p-10 border border-border h-64 w-full relative overflow-hidden bg-card/50">
                <Skeleton className="h-10 w-1/3 mb-4" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-12 w-40 mt-6 rounded-xl" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 rounded-xl border border-white/5 bg-card/60 p-6 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-8 w-16 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-32 rounded-xl border border-white/5 bg-card/50 p-4 flex gap-4">
                                <Skeleton className="w-32 h-24 rounded-lg" />
                                <div className="flex-1 space-y-2 py-1">
                                    <Skeleton className="h-4 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-2 w-full rounded-full mt-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <div className="h-64 rounded-xl border border-white/5 bg-card/50 p-4 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
