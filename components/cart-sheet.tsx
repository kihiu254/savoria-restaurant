"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export function CartSheet() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined' && !document.getElementById('paystack-script')) {
      const script = document.createElement('script');
      script.id = 'paystack-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const onSuccess = async (reference: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user?.id || null,
          total_amount: totalPrice(),
          status: 'Paid',
          payment_reference: reference.reference,
          payment_status: 'paid',
          customer_name: `${customerData.firstName} ${customerData.lastName}`,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          delivery_address: customerData.address,
          notes: customerData.notes
        }])
        .select()
        .single();

      if (orderError) {
        alert("Payment successful but order creation failed. Reference: " + reference.reference);
        return;
      }

      if (order) {
        const orderItems = items.map(item => ({
          order_id: order.id,
          menu_item_id: item.id,
          item_name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price.replace('$', ''))
        }));

        await supabase.from('order_items').insert(orderItems);
      }

      setOrderNumber(reference.reference);
      setPaymentSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Order error:", error);
    }
  };

  const handleCheckout = () => {
    if (!customerData.firstName || !customerData.lastName || !customerData.email || !customerData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (typeof window !== 'undefined') {
      // @ts-ignore
      const PaystackPop = window.PaystackPop;
      if (PaystackPop) {
        const handler = PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxx",
          email: customerData.email,
          amount: Math.round(totalPrice() * 100),
          currency: "KES",
          ref: `SAV-${Date.now()}`,
          metadata: {
            custom_fields: [{
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: `${customerData.firstName} ${customerData.lastName}`
            }]
          },
          onClose: () => console.log("Payment closed"),
          callback: (response: any) => onSuccess(response),
        });
        handler.openIframe();
      } else {
        alert("Payment system is loading. Please try again.");
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:text-fuchsia-dream">
          <ShoppingBag className="h-5 w-5" />
          {isMounted && totalItems() > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-dream text-[10px] font-bold text-white">
              {totalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full border-l border-white/10 bg-midnight-purple/95 backdrop-blur-xl sm:max-w-md">
        <SheetHeader className="border-b border-white/10 pb-6">
          <SheetTitle className="text-2xl font-bold text-white">
            {paymentSuccess ? "Order Confirmed!" : isCheckingOut ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsCheckingOut(false)} className="h-8 w-8 -ml-2 text-white hover:bg-white/10">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                Checkout
              </div>
            ) : "Your Order"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col justify-between pb-6">
          {paymentSuccess ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
                  <div className="glass-panel p-4 rounded-xl mt-4">
                    <p className="text-white/80 text-sm">
                      Order Reference: <span className="text-fuchsia-dream font-semibold">{orderNumber}</span>
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setPaymentSuccess(false);
                    setIsCheckingOut(false);
                  }}
                  className="bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : isCheckingOut ? (
            <ScrollArea className="flex-1 py-6">
              <div className="space-y-6 pr-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Delivery Details</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" value={customerData.firstName} onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })} />
                      <Input placeholder="Last Name" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" value={customerData.lastName} onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })} />
                    </div>
                    <Input type="email" placeholder="Email" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" value={customerData.email} onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })} />
                    <Input type="tel" placeholder="Phone Number" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" value={customerData.phone} onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} />
                    <textarea placeholder="Delivery Address" className="w-full min-h-[80px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-fuchsia-dream" value={customerData.address} onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })} />
                    <textarea placeholder="Special Instructions (Optional)" className="w-full min-h-[60px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-fuchsia-dream" value={customerData.notes} onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })} />
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-white mb-3">Order Summary</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">{item.name} x {item.quantity}</span>
                      <span className="text-white">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-fuchsia-dream">${totalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <ScrollArea className="flex-1 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-white/60">
                  <ShoppingBag className="h-16 w-16 opacity-20" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6 pr-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="font-medium text-white">{item.name}</h4>
                          <p className="text-sm text-fuchsia-dream">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center rounded-lg bg-white/5">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-red-400" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          )}

          {!paymentSuccess && items.length > 0 && (
            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <Button
                className="w-full rounded-xl bg-fuchsia-dream py-6 text-lg font-bold text-white hover:bg-fuchsia-dream/90"
                onClick={() => {
                  if (isCheckingOut) {
                    handleCheckout();
                  } else {
                    setIsCheckingOut(true);
                  }
                }}
              >
                {isCheckingOut ? "Pay with Paystack" : "Proceed to Checkout"}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
