import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6">
            {/* Video Background */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ opacity: 0.3 }}
                >
                    <source src="https://cdn.pixabay.com/video/2023/05/03/160887-822075542_large.mp4" type="video/mp4" />
                    <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
                {/* Gradient Overlay - reduced opacity to see video better */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* Aurora Background Effect (Subtle Overlay) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-fuchsia-dream/10 rounded-full blur-[120px] opacity-30 animate-pulse pointer-events-none" />

            <div className="mx-auto max-w-5xl text-center relative">
                <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-dream opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-dream"></span>
                    </span>
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider">New Menu Available</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight mb-8">
                    <span className="text-white">Taste the </span>
                    <span className="text-gradient">Extraordinary</span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
                    Experience a symphony of flavors crafted with passion. Where culinary art meets modern elegance in every dish.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/menu">
                        <Button size="lg" className="h-14 px-8 rounded-full bg-white text-midnight-purple hover:bg-white/90 font-semibold text-lg transition-all hover:scale-105">
                            View Menu
                        </Button>
                    </Link>
                    <Link href="/reservations">
                        <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10 font-semibold text-lg backdrop-blur-sm transition-all hover:scale-105 group">
                            Book a Table
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Floating Glass Cards Decoration */}
                <div className="absolute top-1/4 left-10 hidden lg:block animate-bounce duration-[3000ms] z-30">
                    <div className="glass-card p-4 rounded-2xl rotate-[-6deg]">
                        <div className="text-2xl font-bold text-white">4.9</div>
                        <div className="text-xs text-white/60">Average Rating</div>
                    </div>
                </div>

                <div className="absolute bottom-1/4 right-10 hidden lg:block animate-bounce duration-[4000ms] z-30">
                    <div className="glass-card p-4 rounded-2xl rotate-[6deg]">
                        <div className="text-2xl font-bold text-white">25+</div>
                        <div className="text-xs text-white/60">Signature Dishes</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
