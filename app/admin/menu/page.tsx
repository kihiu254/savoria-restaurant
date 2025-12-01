"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function AdminMenuPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('menu_items')
                .select('*, categories(name)')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedItems = data?.map(item => ({
                ...item,
                category: item.categories?.name || 'Uncategorized',
                price: `$${item.price}`,
                status: item.is_available ? "Available" : "Unavailable"
            })) || [];

            setItems(formattedItems);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const { error } = await supabase
                .from('menu_items')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchItems(); // Refresh list
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item");
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-heading">Menu Management</h1>
                    <p className="text-white/60">Manage your dishes, prices, and availability.</p>
                </div>
                <Link href="/admin/menu/add">
                    <Button className="bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-lg">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Item
                    </Button>
                </Link>
            </div>

            <div className="glass-card rounded-2xl p-6">
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                            placeholder="Search items..."
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
                                <th className="px-4 py-3">Item</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-white/40">Loading items...</td>
                                </tr>
                            ) : filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-white/40">No items found.</td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white/5">
                                                    {item.image_url && (
                                                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-white">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">{item.category}</td>
                                        <td className="px-4 py-4">{item.price}</td>
                                        <td className="px-4 py-4">
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                                item.status === "Available"
                                                    ? "bg-green-400/10 text-green-400 ring-green-400/20"
                                                    : "bg-red-400/10 text-red-400 ring-red-400/20"
                                            )}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-white/60 hover:text-red-400 hover:bg-red-400/10"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
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
