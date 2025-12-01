import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, LogOut, Settings, Calendar } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-midnight-purple">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="flex h-16 items-center px-6 border-b border-white/10">
                    <Link href="/admin" className="text-xl font-bold font-heading tracking-tight">
                        <span className="text-white">Savoria</span>
                        <span className="text-fuchsia-dream"> Admin</span>
                    </Link>
                </div>

                <nav className="space-y-1 p-4">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10 hover:text-fuchsia-dream transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/menu"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-fuchsia-dream transition-colors"
                    >
                        <UtensilsCrossed className="h-5 w-5" />
                        Menu Management
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-fuchsia-dream transition-colors"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        Orders
                    </Link>
                    <Link
                        href="/admin/reservations"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-fuchsia-dream transition-colors"
                    >
                        <Calendar className="h-5 w-5" />
                        Reservations
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-fuchsia-dream transition-colors"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
