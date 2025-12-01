import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-black/20 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold font-heading tracking-tight">
                            <span className="text-white">Savoria</span>
                            <span className="text-fuchsia-dream">.</span>
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Experience the extraordinary. A culinary journey through taste, texture, and time.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/menu" className="text-sm text-white/60 hover:text-fuchsia-dream transition-colors">Menu</Link></li>
                            <li><Link href="/reservations" className="text-sm text-white/60 hover:text-fuchsia-dream transition-colors">Reservations</Link></li>
                            <li><Link href="/about" className="text-sm text-white/60 hover:text-fuchsia-dream transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm text-white/60 hover:text-fuchsia-dream transition-colors">Contact</Link></li>
                            <li><Link href="/careers" className="text-sm text-white/60 hover:text-fuchsia-dream transition-colors">Careers</Link></li>
                            <li><Link href="/terms" className="text-sm text-white/60 hover:text-fuchsia-dream transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-sm text-white/60 hover:text-fuchsia-dream transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-white/60">123 Culinary Ave, Food City</li>
                            <li className="text-sm text-white/60">+1 (555) 123-4567</li>
                            <li className="text-sm text-white/60">hello@savoria.com</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Follow Us</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-fuchsia-dream hover:text-white transition-all">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-fuchsia-dream hover:text-white transition-all">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-fuchsia-dream hover:text-white transition-all">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 text-center">
                    <p className="text-xs text-white/40">
                        &copy; {new Date().getFullYear()} Savoria Restaurant. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
