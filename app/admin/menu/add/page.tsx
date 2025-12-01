"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AddMenuItemPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category_id: "",
        image_url: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('categories').select('*');
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('menu_items').insert([
                {
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category_id: parseInt(formData.category_id),
                    image_url: formData.image_url,
                    is_available: true,
                },
            ]);

            if (error) throw error;

            router.push("/admin/menu");
            router.refresh();
        } catch (error: any) {
            alert("Error adding item: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <Link href="/admin/menu" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Menu
                </Link>
                <h1 className="text-3xl font-bold text-white font-heading">Add New Item</h1>
                <p className="text-white/60">Create a new dish for your menu.</p>
            </div>

            <div className="glass-card rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Item Name</label>
                        <Input
                            placeholder="e.g. Truffle Mushroom Risotto"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Description</label>
                        <textarea
                            placeholder="Describe the dish..."
                            className="w-full min-h-[100px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-fuchsia-dream"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Price ($)</label>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Category</label>
                            <select
                                className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-fuchsia-dream [&>option]:bg-midnight-purple"
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Image URL</label>
                        <div className="flex gap-4">
                            <Input
                                placeholder="https://..."
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            />
                            <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                <Upload className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-white/40">Enter a direct image URL (e.g. from Unsplash).</p>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl py-4 font-medium shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all"
                            disabled={loading}
                        >
                            {loading ? "Creating Item..." : "Create Menu Item"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
