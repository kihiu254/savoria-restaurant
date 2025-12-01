"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";

const FEATURED_ITEMS = [
    {
        id: 1,
        name: "Truffle Mushroom Risotto",
        description: "Creamy arborio rice with wild mushrooms and black truffle oil.",
        price: "$24",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    },
    {
        id: 2,
        name: "Pan-Seared Scallops",
        description: "Jumbo scallops with cauliflower purée and lemon butter sauce.",
        price: "$32",
        image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&q=80",
    },
    {
        id: 3,
        name: "Wagyu Beef Burger",
        description: "Premium wagyu beef, caramelized onions, and truffle mayo.",
        price: "$28",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    },
];

export function FeaturedItems() {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <section className="px-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold font-heading text-white md:text-4xl">
                        Signature <span className="text-gradient">Creations</span>
                    </h2>
                    <p className="mt-4 text-white/60">Curated dishes that define our culinary excellence.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {FEATURED_ITEMS.map((item) => (
                        <div key={item.id} className="glass-card group relative overflow-hidden rounded-3xl p-4 transition-all hover:bg-white/15">
                            <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                                    {item.price}
                                </div>
                            </div>

                            <div className="mt-4 space-y-2 p-2">
                                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                <p className="text-sm text-white/60 line-clamp-2">{item.description}</p>

                                <div className="pt-4">
                                    <Button
                                        className="w-full rounded-xl bg-white/10 text-white hover:bg-fuchsia-dream hover:text-white transition-all"
                                        onClick={() => addItem(item)}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add to Order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center">
                <Link href="/menu">
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl px-8 py-6 text-lg">
                        View Full Menu
                    </Button>
                </Link>
            </div>
        </section>

    );
}
