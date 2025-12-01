"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const STATUS_COLORS: Record<string, string> = {
    Pending: "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20",
    Preparing: "bg-blue-400/10 text-blue-400 ring-blue-400/20",
    Ready: "bg-green-400/10 text-green-400 ring-green-400/20",
    Delivered: "bg-white/10 text-white/60 ring-white/20",
    Cancelled: "bg-red-400/10 text-red-400 ring-red-400/20",
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchOrders();

        // Subscribe to new orders
        const channel = supabase
            .channel('orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
                fetchOrders();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          profiles:user_id (full_name, email),
          order_items (
            quantity,
            menu_items (name)
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedOrders = data?.map(order => ({
                id: order.id.slice(0, 8).toUpperCase(), // Short ID
                customer: order.profiles?.full_name || order.profiles?.email || "Guest",
                items: order.order_items?.map((oi: any) => `${oi.quantity}x ${oi.menu_items?.name}`).join(", "),
                total: `$${order.total_amount}`,
                status: order.status,
                time: new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                raw_status: order.status
            })) || [];

            setOrders(formattedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        // Implementation for status update would go here
        // We need the full UUID for update, but we are displaying short ID
        // Ideally we keep the full ID in the state object
    };

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-heading">Orders</h1>
                    <p className="text-white/60">Track and manage customer orders.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button className="bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-lg">
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                            placeholder="Search orders..."
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-white/80">
                        <thead className="border-b border-white/10 text-xs uppercase text-white/40">
                            <tr>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Items</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-white/40">Loading orders...</td>
                                </tr>
                            ) : filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-white/40">No orders found.</td>
                                </tr>
                            ) : (
                                filteredItems.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4 font-medium text-white">{order.id}</td>
                                        <td className="px-4 py-4">{order.customer}</td>
                                        <td className="px-4 py-4 text-white/60 truncate max-w-[200px]">{order.items}</td>
                                        <td className="px-4 py-4 font-medium text-white">{order.total}</td>
                                        <td className="px-4 py-4">
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                                STATUS_COLORS[order.raw_status] || STATUS_COLORS.Pending
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-white/40">{order.time}</td>
                                        <td className="px-4 py-4 text-right">
                                            <Button variant="ghost" size="sm" className="text-fuchsia-dream hover:text-fuchsia-dream hover:bg-fuchsia-dream/10">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
