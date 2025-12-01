import Link from "next/link";
import { Menu, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart-sheet";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="mx-auto max-w-7xl rounded-2xl glass-panel px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-heading tracking-tight">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-dream/20 text-fuchsia-dream">
                        <UtensilsCrossed className="h-5 w-5" />
                    </div>
                    <span>
                        <span className="text-white">Savoria</span>
                        <span className="text-fuchsia-dream">.</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                        Home
                    </Link>
                    <Link href="/menu" className="text-sm font-medium text-white/80 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                        Menu
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                        Our Story
                    </Link>
                    <Link href="/careers" className="text-sm font-medium text-white/80 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                        Careers
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-white/80 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                        Contact
                    </Link>
                    <Link href="/complaints" className="text-sm font-medium text-white/80 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                        Feedback
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <CartSheet />
                    <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link href="/reservations">
                        <Button className="hidden md:flex bg-fuchsia-dream hover:bg-fuchsia-dream/80 text-white rounded-full px-6 font-medium shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all">
                            Book a Table
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
