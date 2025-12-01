"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, Clock, ChevronRight, Upload } from "lucide-react";

const JOB_OPENINGS = [
    {
        id: 1,
        title: "Executive Chef",
        department: "Kitchen",
        location: "Main Location",
        type: "Full-time",
        description: "Lead our culinary team in creating extraordinary dining experiences. Requires 8+ years of fine dining experience.",
        requirements: [
            "8+ years of culinary experience in fine dining",
            "Culinary degree or equivalent experience",
            "Strong leadership and team management skills",
            "Creative menu development expertise"
        ]
    },
    {
        id: 2,
        title: "Sous Chef",
        department: "Kitchen",
        location: "Main Location",
        type: "Full-time",
        description: "Support the Executive Chef in daily kitchen operations and menu execution.",
        requirements: [
            "5+ years of culinary experience",
            "Experience in fine dining establishments",
            "Strong organizational skills",
            "Ability to work in fast-paced environment"
        ]
    },
    {
        id: 3,
        title: "Server",
        department: "Front of House",
        location: "Main Location",
        type: "Full-time / Part-time",
        description: "Provide exceptional service to our guests and create memorable dining experiences.",
        requirements: [
            "2+ years of service experience",
            "Excellent communication skills",
            "Wine and food pairing knowledge",
            "Professional and friendly demeanor"
        ]
    },
    {
        id: 4,
        title: "Bartender",
        department: "Bar",
        location: "Main Location",
        type: "Full-time",
        description: "Craft signature cocktails and provide outstanding bar service.",
        requirements: [
            "3+ years of bartending experience",
            "Mixology expertise",
            "Knowledge of spirits and cocktails",
            "Customer service excellence"
        ]
    },
    {
        id: 5,
        title: "Restaurant Manager",
        department: "Management",
        location: "Main Location",
        type: "Full-time",
        description: "Oversee daily operations and ensure exceptional guest experiences.",
        requirements: [
            "5+ years of restaurant management experience",
            "Strong leadership and interpersonal skills",
            "Financial management expertise",
            "Problem-solving abilities"
        ]
    }
];

export default function CareersPage() {
    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [applicationData, setApplicationData] = useState({
        name: "",
        email: "",
        phone: "",
        resume: null as File | null
    });

    const handleApply = (jobId: number) => {
        setSelectedJob(jobId);
        window.scrollTo({ top: document.getElementById('application-form')?.offsetTop, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                        Join Our <span className="text-gradient">Team</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-white/60">
                        Be part of a culinary team that's passionate about creating extraordinary dining experiences.
                        We're always looking for talented individuals who share our commitment to excellence.
                    </p>
                </div>

                {/* Benefits Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="w-12 h-12 bg-fuchsia-dream/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="h-6 w-6 text-fuchsia-dream" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Career Growth</h3>
                        <p className="text-white/60 text-sm">
                            Continuous learning and advancement opportunities
                        </p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="w-12 h-12 bg-fuchsia-dream/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-6 w-6 text-fuchsia-dream" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Great Location</h3>
                        <p className="text-white/60 text-sm">
                            Work in a premium restaurant environment
                        </p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="w-12 h-12 bg-fuchsia-dream/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-6 w-6 text-fuchsia-dream" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Flexible Hours</h3>
                        <p className="text-white/60 text-sm">
                            Work-life balance with competitive schedules
                        </p>
                    </div>
                </div>

                {/* Job Openings */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Current Openings</h2>
                    <div className="space-y-4">
                        {JOB_OPENINGS.map((job) => (
                            <div key={job.id} className="glass-card p-6 rounded-2xl hover:bg-white/15 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                                        <p className="text-white/70 mb-3">{job.description}</p>
                                        <div className="flex flex-wrap gap-3 text-sm">
                                            <span className="px-3 py-1 bg-fuchsia-dream/20 text-fuchsia-dream rounded-full">
                                                {job.department}
                                            </span>
                                            <span className="px-3 py-1 bg-white/10 text-white/60 rounded-full flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {job.location}
                                            </span>
                                            <span className="px-3 py-1 bg-white/10 text-white/60 rounded-full flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleApply(job.id)}
                                        className="bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl"
                                    >
                                        Apply Now
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form */}
                <div id="application-form" className="glass-card p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold text-white mb-6">Submit Your Application</h2>
                    {selectedJob && (
                        <div className="mb-6 p-4 bg-fuchsia-dream/10 border border-fuchsia-dream/20 rounded-xl">
                            <p className="text-white">
                                Applying for: <span className="font-semibold text-fuchsia-dream">
                                    {JOB_OPENINGS.find(j => j.id === selectedJob)?.title}
                                </span>
                            </p>
                        </div>
                    )}

                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Full Name</label>
                                <Input
                                    placeholder="John Doe"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                    value={applicationData.name}
                                    onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Email</label>
                                <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                    value={applicationData.email}
                                    onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Phone Number</label>
                            <Input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-dream"
                                value={applicationData.phone}
                                onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Position Applied For</label>
                            <select className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-fuchsia-dream [&>option]:bg-midnight-purple">
                                <option value="">Select a position</option>
                                {JOB_OPENINGS.map(job => (
                                    <option key={job.id} value={job.id}>{job.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Resume / CV</label>
                            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-fuchsia-dream/50 transition-colors cursor-pointer">
                                <Upload className="h-8 w-8 text-white/40 mx-auto mb-2" />
                                <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
                                <p className="text-white/40 text-xs mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Cover Letter</label>
                            <textarea
                                className="w-full min-h-[150px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-fuchsia-dream"
                                placeholder="Tell us why you'd be a great fit for our team..."
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-fuchsia-dream hover:bg-fuchsia-dream/90 text-white rounded-xl py-6 font-medium shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all"
                        >
                            Submit Application
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
