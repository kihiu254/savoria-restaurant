"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const COMPLAINT_CATEGORIES = [
    "Food Quality",
    "Service",
    "Cleanliness",
    "Pricing",
    "Reservation Issues",
    "Staff Behavior",
    "Order Accuracy",
    "Other"
];

export default function ComplaintsPage() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        orderNumber: "",
        date: "",
        description: "",
        urgency: "medium"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Complaint submitted:", formData);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                category: "",
                orderNumber: "",
                date: "",
                description: "",
                urgency: "medium"
            });
        }, 3000);
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-fuchsia-dream/20 rounded-2xl mb-6">
                        <MessageSquare className="h-8 w-8 text-fuchsia-dream" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                        We Value Your <span className="text-gradient">Feedback</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-white/60">
                        Your satisfaction is our priority. If you experienced any issues during your visit,
                        please let us know so we can make it right.
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <Clock className="h-5 w-5 text-fuchsia-dream mx-auto mb-2" />
                        <p className="text-white/60 text-sm">Response within 24 hours</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <AlertCircle className="h-5 w-5 text-fuchsia-dream mx-auto mb-2" />
                        <p className="text-white/60 text-sm">Confidential & secure</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <CheckCircle2 className="h-5 w-5 text-fuchsia-dream mx-auto mb-2" />
                        <p className="text-white/60 text-sm">Resolution guarantee</p>
                    </div>
                </div>

                {/* Complaint Form */}
                <div className="glass-card p-8 md:p-10 rounded-3xl">
                    {submitted ? (
                        <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                            <p className="text-white/60 mb-2">
                                Your complaint has been received and is being reviewed by our team.
                            </p>
                            <p className="text-white/60">
                                We'll contact you within 24 hours with a response.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Submit a Complaint</h2>
                            </div>

                            {/* Contact Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Full Name *</label>
                                    <Input
                                        required
                                        placeholder="Your name"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Email *</label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="your@email.com"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Phone Number</label>
                                    <Input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Date of Visit</label>
                                    <Input
                                        type="date"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream [&::-webkit-calendar-picker-indicator]:invert"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Complaint Details */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Category *</label>
                                <select
                                    required
                                    className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-fuchsia-dream [&>option]:bg-midnight-purple"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select a category</option>
                                    {COMPLAINT_CATEGORIES.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Order Number (if applicable)</label>
                                <Input
                                    placeholder="e.g., ORD-12345"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                    value={formData.orderNumber}
                                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Urgency Level *</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { value: "low", label: "Low", color: "green" },
                                        { value: "medium", label: "Medium", color: "yellow" },
                                        { value: "high", label: "High", color: "red" }
                                    ].map(({ value, label, color }) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, urgency: value })}
                                            className={`p-3 rounded-xl border-2 transition-all ${formData.urgency === value
                                                    ? `border-${color}-500 bg-${color}-500/20`
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <span className={`text-sm font-medium ${formData.urgency === value ? `text-${color}-400` : 'text-white/60'
                                                }`}>
                                                {label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Description *</label>
                                <textarea
                                    required
                                    className="w-full min-h-[200px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-fuchsia-dream"
                                    placeholder="Please provide detailed information about your complaint. Include any relevant details such as staff names, specific items, or timing of the incident..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            {/* Privacy Notice */}
                            <div className="glass-panel p-4 rounded-xl">
                                <p className="text-white/60 text-sm">
                                    <AlertCircle className="inline h-4 w-4 mr-2 text-fuchsia-dream" />
                                    All complaints are handled confidentially and will be reviewed by our management team within 24 hours.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl py-6 font-medium shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all"
                            >
                                Submit Complaint
                            </Button>
                        </form>
                    )}
                </div>

                {/* Contact Alternative */}
                <div className="mt-8 text-center">
                    <p className="text-white/60 text-sm">
                        Prefer to speak directly? Call us at{' '}
                        <a href="tel:+15551234567" className="text-fuchsia-dream hover:underline">
                            +1 (555) 123-4567
                        </a>
                        {' '}or email{' '}
                        <a href="mailto:support@savoria.com" className="text-fuchsia-dream hover:underline">
                            support@savoria.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
