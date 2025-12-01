"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AdminMenuPage() {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [itemsResponse, categoriesResponse] = await Promise.all([
                supabase
                    .from('menu_items')
                    .select('*, categories(name)')
                    .order('category_id', { ascending: true }),
                supabase
                    .from('categories')
                    .select('*')
                    .order('id', { ascending: true })
            ]);

            if (itemsResponse.error) throw itemsResponse.error;
            if (categoriesResponse.error) throw categoriesResponse.error;

            setMenuItems(itemsResponse.data || []);
            setCategories(categoriesResponse.data || []);
        } catch (error) {
            console.error("Error fetching menu data:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAvailability = async (id: number, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('menu_items')
                .update({ is_available: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setMenuItems(menuItems.map(item =>
                item.id === id ? { ...item, is_available: !currentStatus } : item
            ));
        } catch (error) {
            console.error("Error updating item status:", error);
        }
    };

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.categories?.name === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-heading">Menu Management</h1>
                    <p className="text-white/60">Manage your restaurant's menu items and categories.</p>
                </div>
                <Button className="bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Item
                </Button>
            </div>

            <div className="glass-card rounded-2xl p-6">
                <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                            placeholder="Search menu items..."
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <Button
                            variant={selectedCategory === "All" ? "default" : "outline"}
                            className={cn(
                                "whitespace-nowrap",
                                selectedCategory === "All"
                                    ? "bg-fuchsia-dream text-white"
                                    : "border-white/10 text-white hover:bg-white/5"
                            )}
                            onClick={() => setSelectedCategory("All")}
                        >
                            All Items
                        </Button>
                        {categories.map(cat => (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.name ? "default" : "outline"}
                                className={cn(
                                    "whitespace-nowrap",
                                    selectedCategory === cat.name
                                        ? "bg-fuchsia-dream text-white"
                                        : "border-white/10 text-white hover:bg-white/5"
                                )}
                                onClick={() => setSelectedCategory(cat.name)}
                            >
                                {cat.name}
                            </Button>
                        ))}
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
                                    <td colSpan={5} className="px-4 py-8 text-center text-white/40">Loading menu items...</td>
                                </tr>
                            ) : filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-white/40">No menu items found.</td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-white/10 relative overflow-hidden flex-shrink-0">
                                                    {item.image_url ? (
                                                        <Image
                                                            src={item.image_url}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full w-full">
                                                            <ImageIcon className="h-5 w-5 text-white/20" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{item.name}</div>
                                                    <div className="text-xs text-white/40 truncate max-w-[200px]">{item.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-white/80 ring-1 ring-inset ring-white/10">
                                                {item.categories?.name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-white">KSh {item.price}</td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => toggleAvailability(item.id, item.is_available)}
                                                className={cn(
                                                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-all",
                                                    item.is_available
                                                        ? "bg-green-400/10 text-green-400 ring-green-400/20 hover:bg-green-400/20"
                                                        : "bg-red-400/10 text-red-400 ring-red-400/20 hover:bg-red-400/20"
                                                )}
                                            >
                                                {item.is_available ? "Available" : "Sold Out"}
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-red-400 hover:bg-red-400/10">
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
