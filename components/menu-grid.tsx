"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";

// Categories can be fetched or hardcoded for now
const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"];

// Fallback menu items if Supabase is not configured
const FALLBACK_MENU_ITEMS = [
    // STARTERS
    {
        id: 1,
        name: "Caprese Salad",
        description: "Fresh mozzarella, heirloom tomatoes, basil, and aged balsamic reduction.",
        price: "KSh 1,600",
        image_url: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
        category: "Starters"
    },
    {
        id: 2,
        name: "Lobster Bisque",
        description: "Rich and creamy soup with chunks of fresh lobster meat and a hint of sherry.",
        price: "KSh 1,800",
        image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
        category: "Starters"
    },
    {
        id: 3,
        name: "Bruschetta Trio",
        description: "Three varieties: classic tomato basil, mushroom truffle, and roasted red pepper.",
        price: "KSh 1,400",
        image_url: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
        category: "Starters"
    },
    {
        id: 4,
        name: "Tuna Tartare",
        description: "Fresh ahi tuna with avocado, cucumber, sesame, and soy-lime dressing.",
        price: "KSh 2,200",
        image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        category: "Starters"
    },
    {
        id: 5,
        name: "Calamari Fritti",
        description: "Crispy fried calamari with marinara sauce and lemon aioli.",
        price: "KSh 1,700",
        image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
        category: "Starters"
    },
    {
        id: 6,
        name: "French Onion Soup",
        description: "Classic caramelized onion soup with gruyere cheese and crusty bread.",
        price: "KSh 1,500",
        image_url: "https://images.unsplash.com/photo-1631709497146-a92a0e07f6e7?w=800&q=80",
        category: "Starters"
    },
    {
        id: 7,
        name: "Caesar Salad",
        description: "Crisp romaine, parmesan, croutons, and house-made Caesar dressing.",
        price: "KSh 1,300",
        image_url: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
        category: "Starters"
    },
    {
        id: 8,
        name: "Charcuterie Board",
        description: "Selection of artisan cured meats, cheeses, olives, and preserves.",
        price: "KSh 2,600",
        image_url: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800&q=80",
        category: "Starters"
    },

    // MAINS
    {
        id: 9,
        name: "Truffle Mushroom Risotto",
        description: "Creamy arborio rice with wild mushrooms and black truffle oil, finished with aged parmesan.",
        price: "KSh 2,400",
        image_url: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
        category: "Mains"
    },
    {
        id: 10,
        name: "Pan-Seared Scallops",
        description: "Jumbo scallops with cauliflower purée, crispy prosciutto, and lemon butter sauce.",
        price: "KSh 3,200",
        image_url: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&q=80",
        category: "Mains"
    },
    {
        id: 11,
        name: "Wagyu Beef Burger",
        description: "Premium wagyu beef, caramelized onions, aged cheddar, and truffle mayo on brioche bun.",
        price: "KSh 2,800",
        image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
        category: "Mains"
    },
    {
        id: 12,
        name: "Grilled Salmon",
        description: "Atlantic salmon with herb butter, roasted vegetables, and lemon couscous.",
        price: "KSh 2,900",
        image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
        category: "Mains"
    },
    {
        id: 13,
        name: "Filet Mignon",
        description: "8oz center-cut filet with truffle mashed potatoes and red wine reduction.",
        price: "KSh 4,200",
        image_url: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
        category: "Mains"
    },
    {
        id: 14,
        name: "Chicken Marsala",
        description: "Pan-seared chicken breast with marsala wine sauce, mushrooms, and garlic mashed potatoes.",
        price: "KSh 2,600",
        image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
        category: "Mains"
    },
    {
        id: 15,
        name: "Herb-Crusted Lamb Chops",
        description: "New Zealand lamb chops with rosemary, mint chimichurri, and roasted vegetables.",
        price: "KSh 3,800",
        image_url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
        category: "Mains"
    },
    {
        id: 16,
        name: "Seafood Paella",
        description: "Traditional Spanish rice with shrimp, mussels, calamari, and saffron.",
        price: "KSh 3,400",
        image_url: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
        category: "Mains"
    },
    {
        id: 17,
        name: "Duck Confit",
        description: "Slow-cooked duck leg with orange glaze, wild rice, and roasted Brussels sprouts.",
        price: "KSh 3,600",
        image_url: "https://images.unsplash.com/photo-1635321593217-40050ad13c74?w=800&q=80",
        category: "Mains"
    },
    {
        id: 18,
        name: "Vegetarian Lasagna",
        description: "Layers of pasta, roasted vegetables, ricotta, and marinara sauce.",
        price: "KSh 2,200",
        image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
        category: "Mains"
    },

    // DESSERTS
    {
        id: 19,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, served with vanilla bean ice cream.",
        price: "KSh 1,200",
        image_url: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
        category: "Desserts"
    },
    {
        id: 20,
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.",
        price: "KSh 1,100",
        image_url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
        category: "Desserts"
    },
    {
        id: 21,
        name: "Crème Brûlée",
        description: "Vanilla custard with caramelized sugar crust and fresh berries.",
        price: "KSh 1,000",
        image_url: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
        category: "Desserts"
    },
    {
        id: 22,
        name: "New York Cheesecake",
        description: "Rich and creamy cheesecake with graham cracker crust and berry compote.",
        price: "KSh 1,100",
        image_url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
        category: "Desserts"
    },
    {
        id: 23,
        name: "Panna Cotta",
        description: "Silky Italian custard with raspberry coulis and mint.",
        price: "KSh 900",
        image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
        category: "Desserts"
    },
    {
        id: 24,
        name: "Apple Tart",
        description: "Warm apple tart with cinnamon, served with vanilla ice cream.",
        price: "KSh 1,000",
        image_url: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
        category: "Desserts"
    },
    {
        id: 25,
        name: "Gelato Trio",
        description: "Three scoops of artisan gelato: pistachio, stracciatella, and salted caramel.",
        price: "KSh 800",
        image_url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
        category: "Desserts"
    },

    // DRINKS
    {
        id: 26,
        name: "Signature Cocktail",
        description: "House special blend of premium spirits with fresh herbs and citrus.",
        price: "KSh 1,500",
        image_url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
        category: "Drinks"
    },
    {
        id: 27,
        name: "Classic Mojito",
        description: "White rum, fresh mint, lime, sugar, and soda water.",
        price: "KSh 1,300",
        image_url: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
        category: "Drinks"
    },
    {
        id: 28,
        name: "Old Fashioned",
        description: "Bourbon, bitters, orange peel, and a sugar cube.",
        price: "KSh 1,400",
        image_url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
        category: "Drinks"
    },
    {
        id: 29,
        name: "Espresso Martini",
        description: "Vodka, coffee liqueur, and fresh espresso with a frothy top.",
        price: "KSh 1,500",
        image_url: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&q=80",
        category: "Drinks"
    },
    {
        id: 30,
        name: "House Red Wine",
        description: "Curated selection of full-bodied red wine, perfect with any meal.",
        price: "KSh 1,200",
        image_url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        category: "Drinks"
    },
    {
        id: 31,
        name: "House White Wine",
        description: "Crisp and refreshing white wine, ideal for seafood and light dishes.",
        price: "KSh 1,200",
        image_url: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80",
        category: "Drinks"
    },
    {
        id: 32,
        name: "Sparkling Water",
        description: "Premium Italian sparkling mineral water with lemon.",
        price: "KSh 500",
        image_url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
        category: "Drinks"
    },
    {
        id: 33,
        name: "Fresh Lemonade",
        description: "House-made lemonade with fresh lemons and a hint of mint.",
        price: "KSh 600",
        image_url: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&q=80",
        category: "Drinks"
    }
];

export function MenuGrid() {
    const [activeCategory, setActiveCategory] = useState("All");
    const addItem = useCartStore((state) => state.addItem);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Check if Supabase is properly configured
                const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
                    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

                if (!isConfigured) {
                    // Use fallback data if Supabase is not configured
                    setMenuItems(FALLBACK_MENU_ITEMS);
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('menu_items')
                    .select('*, categories(name)');

                if (error) throw error;

                // Transform data to match our component structure if needed
                const formattedItems = data?.map(item => ({
                    ...item,
                    category: item.categories?.name || 'Uncategorized',
                    price: `KSh ${item.price}`
                })) || [];

                setMenuItems(formattedItems.length > 0 ? formattedItems : FALLBACK_MENU_ITEMS);
            } catch (error) {
                console.error("Error fetching menu items:", error);
                // Use fallback data on error
                setMenuItems(FALLBACK_MENU_ITEMS);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const filteredItems = activeCategory === "All"
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    if (loading) {
        return <div className="text-white text-center py-20">Loading menu...</div>;
    }

    return (
        <div className="space-y-10">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "rounded-full px-6 py-2 text-sm font-medium transition-all",
                            activeCategory === category
                                ? "bg-fuchsia-dream text-white shadow-[0_0_20px_rgba(217,70,239,0.5)]"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                    <div key={item.id} className="glass-card group relative overflow-hidden rounded-3xl p-4 transition-all hover:bg-white/15">
                        <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                            {item.image_url ? (
                                <Image
                                    src={item.image_url}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/40">
                                    No Image
                                </div>
                            )}
                            <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                                {item.price}
                            </div>
                        </div>

                        <div className="mt-4 space-y-2 p-2">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                            </div>
                            <p className="text-sm text-white/60 line-clamp-2">{item.description}</p>

                            <div className="pt-4">
                                <Button
                                    className="w-full rounded-xl bg-white/10 text-white hover:bg-fuchsia-dream hover:text-white transition-all"
                                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image_url })}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add to Order
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
