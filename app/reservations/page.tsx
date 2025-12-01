"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Users, CheckCircle, DollarSign, LogIn } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const BOOKING_FEE = 1000; // Booking fee in KSh

export default function ReservationsPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("2");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [user, setUser] = useState<any>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
            // Pre-fill details if user exists
            setName(user.user_metadata?.full_name || "");
            setEmail(user.email || "");
        }
        setCheckingAuth(false);
    };

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Validate that the selected date is not in the past
    const validateDate = (selectedDate: string) => {
        if (!selectedDate) return false;

        const selected = new Date(selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selected < today) {
            setDateError("Cannot book for past dates. Please select today or a future date.");
            return false;
        }

        setDateError("");
        return true;
    };

    // Check if the time slot is available (simulated for now, could be real later)
    const checkTimeAvailability = async (bookingDate: string, bookingTime: string) => {
        // In a real app, query Supabase for existing reservations at this time
        // const { data } = await supabase.from('reservations').select('*').eq('date', bookingDate).eq('time', bookingTime);
        // return data.length < MAX_TABLES;

        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            router.push("/login");
            return;
        }

        // Validate date
        if (!validateDate(date)) {
            return;
        }

        // Validate time
        if (!time) {
            setTimeError("Please select a time");
            return;
        }

        setTimeError("");
        setLoading(true);

        // Check time availability
        const isAvailable = await checkTimeAvailability(date, time);

        if (!isAvailable) {
            setTimeError("This time slot is not available. Please select a different time.");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('reservations')
                .insert([
                    {
                        user_id: user.id,
                        date,
                        time,
                        guests: parseInt(guests),
                        name,
                        email,
                        phone,
                        special_requests: specialRequests,
                        status: 'Confirmed'
                    }
                ]);

            if (error) throw error;

            setStep(2);
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("Failed to create reservation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        validateDate(selectedDate);
    };

    if (checkingAuth) {
        return <div className="min-h-screen pt-24 flex justify-center"><div className="text-white">Loading...</div></div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4">
                <div className="mx-auto max-w-md text-center space-y-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LogIn className="w-8 h-8 text-fuchsia-dream" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Login Required</h1>
                    <p className="text-white/60">You must be logged in to book a table at Savoria.</p>
                    <div className="pt-4">
                        <Link href="/login">
                            <Button className="w-full bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white h-12 text-lg">
                                Log In to Continue
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-white/40">
                        Don't have an account? <Link href="/signup" className="text-fuchsia-dream hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="mx-auto max-w-3xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                        Book a <span className="text-gradient">Table</span>
                    </h1>
                    <p className="text-white/60 text-lg">Reserve your spot for an unforgettable dining experience.</p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                        <Input
                                            type="date"
                                            className="pl-10 bg-white/5 border-white/10 text-white [color-scheme:dark]"
                                            value={date}
                                            min={getTodayDate()}
                                            onChange={handleDateChange}
                                            required
                                        />
                                    </div>
                                    {dateError && <p className="text-red-400 text-xs">{dateError}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                        <Input
                                            type="time"
                                            className="pl-10 bg-white/5 border-white/10 text-white [color-scheme:dark]"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            required
                                            min="17:00"
                                            max="22:00"
                                        />
                                    </div>
                                    <p className="text-xs text-white/40">Open daily 5:00 PM - 10:00 PM</p>
                                    {timeError && <p className="text-red-400 text-xs">{timeError}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Guests</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                        <select
                                            className="w-full h-10 rounded-md border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-dream/50"
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <option key={num} value={num} className="bg-gray-900">{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                            <option value="9+" className="bg-gray-900">9+ Guests (Contact Us)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Phone Number</label>
                                    <Input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className="bg-white/5 border-white/10 text-white"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Special Requests (Optional)</label>
                                <textarea
                                    className="w-full min-h-[100px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-dream/50"
                                    placeholder="Allergies, dietary restrictions, special occasion..."
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                />
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 flex items-start gap-3">
                                <DollarSign className="h-5 w-5 text-fuchsia-dream mt-0.5" />
                                <div className="text-sm">
                                    <p className="text-white font-medium mb-1">Booking Fee: KSh {BOOKING_FEE}</p>
                                    <p className="text-white/60">This fee will be deducted from your final bill. Cancellations made less than 24 hours in advance are non-refundable.</p>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white h-12 text-lg font-semibold"
                                disabled={loading}
                            >
                                {loading ? "Confirming..." : "Confirm Reservation"}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-12 space-y-6">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="h-10 w-10" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Reservation Confirmed!</h2>
                                <p className="text-white/60">We've sent a confirmation email to {email}</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 max-w-sm mx-auto text-left space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-white/60">Date</span>
                                    <span className="text-white font-medium">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Time</span>
                                    <span className="text-white font-medium">{time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Guests</span>
                                    <span className="text-white font-medium">{guests} People</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Name</span>
                                    <span className="text-white font-medium">{name}</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link href="/menu">
                                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 mr-4">
                                        View Menu
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button className="bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white">
                                        Back Home
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
