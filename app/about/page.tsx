import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2874&auto=format&fit=crop"
                    alt="Restaurant Interior"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-midnight-purple" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="max-w-3xl px-4">
                        <h1 className="mb-6 text-5xl font-bold text-white font-heading md:text-7xl">
                            Our Story
                        </h1>
                        <p className="text-xl text-white/80 md:text-2xl">
                            Crafting culinary masterpieces since 2010.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-10 space-y-20">
                {/* The Vision */}
                <section className="glass-card p-8 md:p-12 rounded-3xl">
                    <div className="grid gap-12 md:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white font-heading">The Vision</h2>
                            <p className="text-white/70 leading-relaxed">
                                Savoria was born from a simple yet ambitious dream: to create a dining experience that transcends the ordinary. We believe that food is not just sustenance, but an art form that brings people together.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                Our philosophy is rooted in the "farm-to-table" movement, but with a modern, avant-garde twist. We source the freshest local ingredients and transform them using cutting-edge culinary techniques, all while maintaining the soul and warmth of traditional cooking.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874&auto=format&fit=crop"
                                alt="Chefs cooking"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Meet the Chef */}
                <section>
                    <h2 className="text-3xl font-bold text-white font-heading text-center mb-12">Meet the Chef</h2>
                    <div className="glass-card p-8 md:p-12 rounded-3xl">
                        <div className="grid gap-12 md:grid-cols-2 items-center">
                            <div className="relative h-[400px] rounded-2xl overflow-hidden order-2 md:order-1">
                                <Image
                                    src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2960&auto=format&fit=crop"
                                    alt="Head Chef"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-6 order-1 md:order-2">
                                <h3 className="text-2xl font-bold text-white">Chef Alexander Thorne</h3>
                                <p className="text-fuchsia-dream font-medium">Executive Head Chef</p>
                                <p className="text-white/70 leading-relaxed">
                                    With over 15 years of experience in Michelin-starred kitchens across Paris, Tokyo, and New York, Chef Thorne brings a global perspective to Savoria's menu. His signature style blends French precision with bold Asian flavors, creating dishes that are as visually stunning as they are delicious.
                                </p>
                                <p className="text-white/70 leading-relaxed">
                                    "I cook to tell a story," says Thorne. "Every plate is a chapter, and every bite is a word. I want our guests to leave feeling like they've just finished a great novel."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center space-y-8 py-12">
                    <h2 className="text-4xl font-bold text-white font-heading">Experience the Magic</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Join us for an unforgettable evening of gastronomy and elegance.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/menu">
                            <Button className="bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl px-8 py-6 text-lg shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all">
                                View Menu
                            </Button>
                        </Link>
                        <Link href="/reservations">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl px-8 py-6 text-lg">
                                Book a Table
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
