"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const STATUS_COLORS: Record<string, string> = {
    Confirmed: "bg-green-400/10 text-green-400 ring-green-400/20",
    Pending: "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20",
    Cancelled: "bg-red-400/10 text-red-400 ring-red-400/20",
};

export default function AdminReservationsPage() {
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchReservations();

        const channel = supabase
            .channel('reservations')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => {
                fetchReservations();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchReservations = async () => {
        try {
            const { data, error } = await supabase
                .from('reservations')
                .select('*')
                .order('date', { ascending: true })
                .order('time', { ascending: true });

            if (error) throw error;

            setReservations(data || []);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('reservations')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            // Optimistic update or wait for subscription
        } catch (error) {
            console.error("Error updating reservation:", error);
        }
    };

    const filteredReservations = reservations.filter(res =>
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-heading">Reservations</h1>
                    <p className="text-white/60">Manage table bookings and guest requests.</p>
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
                            placeholder="Search reservations..."
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
                                <th className="px-4 py-3">Date & Time</th>
                                <th className="px-4 py-3">Guest</th>
                                <th className="px-4 py-3">Party Size</th>
                                <th className="px-4 py-3">Contact</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-white/40">Loading reservations...</td>
                                </tr>
                            ) : filteredReservations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-white/40">No reservations found.</td>
                                </tr>
                            ) : (
                                filteredReservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white flex items-center gap-2">
                                                    <Calendar className="h-3 w-3 text-fuchsia-dream" />
                                                    {new Date(res.date).toLocaleDateString()}
                                                </span>
                                                <span className="text-white/60 text-xs flex items-center gap-2 mt-1">
                                                    <Clock className="h-3 w-3" />
                                                    {res.time}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-white">{res.name}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-white/40" />
                                                {res.guests}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col text-xs">
                                                <span className="text-white/80">{res.email}</span>
                                                <span className="text-white/60">{res.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                                STATUS_COLORS[res.status] || STATUS_COLORS.Pending
                                            )}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {res.status !== 'Confirmed' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-green-400 hover:bg-green-400/10"
                                                        onClick={() => updateStatus(res.id, 'Confirmed')}
                                                        title="Confirm"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {res.status !== 'Cancelled' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                                                        onClick={() => updateStatus(res.id, 'Cancelled')}
                                                        title="Cancel"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
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
