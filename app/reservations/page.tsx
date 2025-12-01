"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Users, CheckCircle, DollarSign } from "lucide-react";
import Link from "next/link";

const BOOKING_FEE = 10; // Booking fee in dollars

export default function ReservationsPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("2");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");

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

    // Check if the time slot is available (simulated)
    const checkTimeAvailability = async (bookingDate: string, bookingTime: string) => {
        // Simulate API call to check availability
        await new Promise(resolve => setTimeout(resolve, 500));

        // For demo purposes, make certain times "unavailable"
        // In a real app, this would check against a database
        const unavailableTimes = ["18:00", "19:30"];
        const dateTimeKey = `${bookingDate}-${bookingTime}`;

        // Simulate some random unavailability
        if (unavailableTimes.includes(bookingTime) && Math.random() > 0.5) {
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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

        // Simulate API call for booking
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStep(2);
        setLoading(false);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        validateDate(selectedDate);
        // Re-validate time when date changes
        if (time) {
            validateTime(time, selectedDate);
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTime = e.target.value;
        setTime(selectedTime);
        setTimeError("");
        validateTime(selectedTime, date);
    };

    // Validate that the selected time is in the future for same-day bookings
    const validateTime = (selectedTime: string, selectedDate: string) => {
        if (!selectedTime || !selectedDate) return false;

        const selected = new Date(selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if the selected date is today
        const isToday = selected.getTime() === today.getTime();

        if (isToday) {
            // Parse the selected time
            const [hours, minutes] = selectedTime.split(':').map(Number);
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();

            // Check if the selected time has already passed
            if (hours < currentHours || (hours === currentHours && minutes <= currentMinutes)) {
                setTimeError("Selected time has already passed. Please choose a future time.");
                return false;
            }

            // Check if there's enough buffer time (e.g., at least 30 minutes from now)
            const selectedDateTime = new Date();
            selectedDateTime.setHours(hours, minutes, 0, 0);
            const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60000);

            if (selectedDateTime < thirtyMinutesFromNow) {
                setTimeError("Please book at least 30 minutes in advance.");
                return false;
            }
        }

        setTimeError("");
        return true;
    };

    return (
        <div className="min-h-screen py-20 px-4 flex items-center justify-center">
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">

                {/* Left Side: Content */}
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading">
                        Book a Table
                    </h1>
                    <p className="text-white/60 text-lg leading-relaxed">
                        Reserve your spot at Savoria and prepare for a culinary journey like no other. We recommend booking at least 24 hours in advance.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-fuchsia-dream/10 text-fuchsia-dream">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Dining Times</h3>
                                <p className="text-white/60 text-sm">5:00 PM - 10:00 PM Daily</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-fuchsia-dream/10 text-fuchsia-dream">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Group Bookings</h3>
                                <p className="text-white/60 text-sm">For parties of 8+, please contact us directly.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-fuchsia-dream/10 text-fuchsia-dream">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Booking Fee</h3>
                                <p className="text-white/60 text-sm">${BOOKING_FEE} per reservation (credited to your bill)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden">
                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                    <Input
                                        type="date"
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream [&::-webkit-calendar-picker-indicator]:invert"
                                        required
                                        min={getTodayDate()}
                                        value={date}
                                        onChange={handleDateChange}
                                    />
                                </div>
                                {dateError && (
                                    <p className="text-red-400 text-xs mt-1">{dateError}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 z-10 pointer-events-none" />
                                        <Input
                                            type="time"
                                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream [&::-webkit-calendar-picker-indicator]:invert"
                                            required
                                            min="17:00"
                                            max="22:00"
                                            value={time}
                                            onChange={handleTimeChange}
                                        />
                                    </div>
                                    {timeError && (
                                        <p className="text-red-400 text-xs mt-1">{timeError}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Guests</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                        <select
                                            className="w-full h-10 pl-10 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-fuchsia-dream [&>option]:bg-midnight-purple"
                                            required
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Name</label>
                                <Input
                                    placeholder="Your Name"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Email</label>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Special Requests</label>
                                <textarea
                                    placeholder="Allergies, special occasions, etc."
                                    className="w-full min-h-[100px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-fuchsia-dream"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                />
                            </div>

                            {/* Booking Fee Display */}
                            <div className="glass-panel p-4 rounded-xl border border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/80 text-sm">Booking Fee:</span>
                                    <span className="text-white font-semibold">${BOOKING_FEE}.00</span>
                                </div>
                                <p className="text-white/50 text-xs mt-2">
                                    This fee will be credited to your final bill upon arrival.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl py-6 font-medium shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all"
                                disabled={loading}
                            >
                                {loading ? "Checking Availability..." : "Confirm Reservation"}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Reservation Confirmed!</h2>
                            <div className="space-y-2">
                                <p className="text-white/60">
                                    We've sent a confirmation email to <strong className="text-white">{email}</strong>.
                                </p>
                                <p className="text-white/60">
                                    We look forward to hosting you on <strong className="text-white">{date}</strong> at <strong className="text-white">{time}</strong>.
                                </p>
                                <div className="glass-panel p-4 rounded-xl mt-4 border border-white/10">
                                    <p className="text-white/80 text-sm">
                                        Booking fee charged: <span className="text-fuchsia-dream font-semibold">${BOOKING_FEE}.00</span>
                                    </p>
                                    <p className="text-white/50 text-xs mt-1">
                                        This amount will be deducted from your final bill.
                                    </p>
                                </div>
                            </div>
                            <Link href="/">
                                <Button variant="outline" className="mt-4 border-white/10 text-white hover:bg-white/5">
                                    Return Home
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
