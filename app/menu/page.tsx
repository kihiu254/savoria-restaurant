import { MenuGrid } from "@/components/menu-grid";

export default function MenuPage() {
    return (
        <div className="min-h-screen px-6 pb-20 pt-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                        Our <span className="text-gradient">Menu</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-white/60">
                        Explore our diverse selection of culinary masterpieces, crafted to delight your senses.
                    </p>
                </div>

                <MenuGrid />
            </div>
        </div>
    );
}
