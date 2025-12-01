"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Message sent! We'll get back to you shortly.");
        setLoading(false);
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="container mx-auto max-w-6xl space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading">Get in Touch</h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Have a question or want to host an event? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="glass-card p-8 rounded-3xl space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-fuchsia-dream/10 text-fuchsia-dream">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                                    <p className="text-white/60">
                                        123 Culinary Avenue<br />
                                        Metropolis, NY 10012<br />
                                        United States
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-fuchsia-dream/10 text-fuchsia-dream">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                                    <p className="text-white/60">
                                        +1 (555) 123-4567
                                    </p>
                                    <p className="text-white/40 text-sm mt-1">
                                        Mon-Fri from 8am to 5pm
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-fuchsia-dream/10 text-fuchsia-dream">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                                    <p className="text-white/60">
                                        reservations@savoria.com<br />
                                        events@savoria.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-fuchsia-dream/10 text-fuchsia-dream">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Opening Hours</h3>
                                    <div className="space-y-1 text-white/60">
                                        <p className="flex justify-between gap-8">
                                            <span>Mon - Thu</span>
                                            <span>11:00 AM - 10:00 PM</span>
                                        </p>
                                        <p className="flex justify-between gap-8">
                                            <span>Fri - Sat</span>
                                            <span>11:00 AM - 11:00 PM</span>
                                        </p>
                                        <p className="flex justify-between gap-8">
                                            <span>Sunday</span>
                                            <span>10:00 AM - 9:00 PM</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="glass-card h-[300px] rounded-3xl overflow-hidden relative flex items-center justify-center bg-white/5">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
                            <Button variant="secondary" className="relative z-10 bg-white text-black hover:bg-white/90">
                                View on Google Maps
                            </Button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card p-8 md:p-12 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">First Name</label>
                                    <Input
                                        placeholder="John"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Last Name</label>
                                    <Input
                                        placeholder="Doe"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Email</label>
                                <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Subject</label>
                                <Input
                                    placeholder="General Inquiry"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Message</label>
                                <textarea
                                    placeholder="How can we help you?"
                                    className="w-full min-h-[150px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-fuchsia-dream"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl py-6 font-medium shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : (
                                    <span className="flex items-center">
                                        Send Message <Send className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
