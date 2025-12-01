import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

const STATS = [
    {
        name: "Total Revenue",
        value: "KSh 4,523,189",
        change: "+20.1%",
        icon: DollarSign,
    },
    {
        name: "Active Orders",
        value: "12",
        change: "+4",
        icon: ShoppingBag,
    },
    {
        name: "Total Customers",
        value: "2,345",
        change: "+180",
        icon: Users,
    },
    {
        name: "Growth",
        value: "+12.5%",
        change: "+4.1%",
        icon: TrendingUp,
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-heading">Dashboard</h1>
                <p className="text-white/60">Overview of your restaurant's performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat) => (
                    <div key={stat.name} className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white/60">{stat.name}</p>
                                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                            </div>
                            <div className="rounded-full bg-white/10 p-3 text-fuchsia-dream">
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-400 font-medium">{stat.change}</span>
                            <span className="ml-2 text-white/40">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="glass-card rounded-2xl p-6 h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
                    <div className="flex items-center justify-center h-full text-white/40">
                        Chart Placeholder
                    </div>
                </div>
                <div className="glass-card rounded-2xl p-6 h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-4">Popular Items</h3>
                    <div className="flex items-center justify-center h-full text-white/40">
                        Chart Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
