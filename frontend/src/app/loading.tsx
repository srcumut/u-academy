export default function Loading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Background Blob Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] animate-pulse delay-700"></div>

            {/* Loading Container */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Custom Spinner / Logo Animation */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

                    {/* Inner Ring */}
                    <div className="absolute inset-4 border-4 border-white/10 border-b-white/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

                    {/* Center Dot */}
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_20px_var(--color-primary)]"></div>
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-bold text-white tracking-wider animate-pulse">
                        U-ACADEMY
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium animate-fade-in">
                        Preparing your learning experience...
                    </p>
                </div>
            </div>

            {/* Decor Elements */}
            <div className="absolute bottom-10 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce delay-0"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce delay-300"></div>
            </div>
        </div>
    );
}
