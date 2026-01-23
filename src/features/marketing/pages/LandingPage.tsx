import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart,
    Layers, Users,
    PieChart, CheckCircle2,
    Play, Star, TrendingUp
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { cn } from '../../../utils/cn';

// --- ANIMATED COUNTER HELPER ---
const CountUp = ({ end, suffix = '', duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTime: number;
        let animationFrame: number;
        const update = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOut = 1 - Math.pow(2, -10 * percentage);
            setCount(Math.floor(end * easeOut));
            if (progress < duration) animationFrame = requestAnimationFrame(update);
            else setCount(end);
        };
        animationFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// --- DATA ---
const TESTIMONIALS = [
    {
        text: "Novara isn't just an LMS; it's a growth engine. We've seen a 300% ROI in our employee training efficiency since switching.",
        name: "Marcus Thorne",
        role: "CTO, Global Tech Solutions",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        text: "The student experience is unmatched. The AI recommendations keep our learners engaged way longer than our previous platform.",
        name: "Sarah Jenkins",
        role: "Director of Learning, EduCorp",
        img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        text: "Compliance training used to be a headache. Now it's automated, tracked, and—dare I say—enjoyable for our staff.",
        name: "David Chen",
        role: "HR VP, FinServe Inc",
        img: "https://randomuser.me/api/portraits/men/68.jpg"
    }
];

const PERSONAS = {
    Student: {
        title: "For Learners",
        heading: "Master New Skills at Your Own Pace",
        desc: "An intuitive learning environment that adapts to your style. Track your progress, earn certificates, and connect with peers.",
        features: ["Personalized AI Learning Paths", "Interactive Quizzes & Assignments", "Social Learning Communities"],
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    },
    Instructor: {
        title: "For Instructors",
        heading: "Create Impactful Content Effortlessly",
        desc: "Powerful tools to build rich courses, grade assessments automatically, and gain deep insights into learner performance.",
        features: ["Drag-and-Drop Course Builder", "Automated Grading Assistant", "Real-time Engagement Analytics"],
        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    },
    Admin: {
        title: "For Administrators",
        heading: "Scale Your Organization's Potential",
        desc: "Complete visibility and control over your entire learning ecosystem. Manage users, compliance, and reporting from one dashboard.",
        features: ["Universal User Management", "Enterprise-Grade Security (SOC 2)", "Custom API Integrations"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    }
};

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [activePersona, setActivePersona] = useState<'Student' | 'Instructor' | 'Admin'>('Student');

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-600 selection:bg-novara-100 selection:text-novara-900 overflow-x-hidden">
            <Navbar />

            {/* --- 1. HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-slate-50 overflow-hidden -z-20">
                    <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#EBF4FF] rounded-bl-full opacity-60 translate-x-1/4 -translate-y-1/4 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#F0F7FF] rounded-tr-full opacity-60 -translate-x-1/4 translate-y-1/4 blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-novara-100 text-novara-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-novara-500 animate-pulse" />
                            v2.0 is Live: AI-Powered Learning Paths
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 animate-fade-in-up delay-100">
                            The Education Platform <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-novara-600 to-blue-500">Built for the Future</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-8 animate-fade-in-up delay-200">
                            Empower your workforce, students, and customers with the world's most intuitive, scalable, and intelligent Learning Management System.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
                            <Button size="lg" className="h-14 px-8 text-lg bg-novara-600 hover:bg-novara-700 shadow-xl shadow-novara-500/20" onClick={() => navigate('/pricing')}>
                                View Plans & Pricing
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2">
                                <Play size={20} fill="currentColor" className="opacity-50" /> Watch Demo
                            </Button>
                        </div>
                    </div>

                    {/* Dashboard 3D Preview */}
                    <div id="ui-preview" className="relative mt-16 perspective-1000 group scroll-mt-28" onClick={() => navigate('/pricing')}>
                        <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-slate-200 border-4 border-white/50 backdrop-blur-sm overflow-hidden transform rotate-x-12 hover:rotate-x-0 transition-transform duration-1000 ease-out origin-center mx-auto max-w-6xl cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                                alt="Dashboard Interface"
                                className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                            />

                            {/* Floating Badge 1 */}
                            <div className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-lg animate-float hidden md:flex items-center gap-3">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle2 size={24} /></div>
                                <div>
                                    <div className="font-bold text-slate-900">Course Complete</div>
                                    <div className="text-xs text-slate-500">+1250 XP Gained</div>
                                </div>
                            </div>

                            {/* Floating Badge 2 */}
                            <div className="absolute bottom-10 left-10 bg-white p-4 rounded-xl shadow-lg animate-float-delayed hidden md:flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><TrendingUp size={24} /></div>
                                <div>
                                    <div className="font-bold text-slate-900">Engagement Up</div>
                                    <div className="text-xs text-slate-500">24% vs last week</div>
                                </div>
                            </div>
                        </div>
                        {/* Glow effect under dashboard */}
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-novara-500/20 blur-[100px] rounded-full z-0" />
                    </div>

                    {/* Trusted By Strip */}
                    <div className="mt-20 pt-10 border-t border-slate-200/60 text-center">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by industry leaders worldwide</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Acme Corp', 'Global Dynamics', 'Interstellar', 'Massive Dynamic', 'Cyberdyne'].map((logo, i) => (
                                <div key={i} className="text-xl md:text-2xl font-black font-serif text-slate-300 hover:text-slate-500 transition-colors cursor-default">{logo}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. BENTO GRID FEATURES --- */}
            <section id="features" className="py-24 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Start Teaching in Minutes.<br />Scale to Millions.</h2>
                        <p className="text-xl text-slate-500">Everything you need to build a world-class education program, right out of the box.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                        {/* Large Card 1: Course Builder */}
                        <div className="md:col-span-2 row-span-2 bg-[#F8FAFC] rounded-3xl p-8 md:p-10 border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
                            <div className="relative z-20 max-w-lg">
                                {/* Icon */}
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-novara-600 mb-6 shadow-sm border border-slate-50">
                                    <Layers size={28} />
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                                    Intuitive Course Builder
                                </h3>

                                {/* Description */}
                                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                                    Drag, drop, and deploy. Support for video, SCORM, quizzes, and live webinars.
                                    No coding required.
                                </p>

                                {/* Button */}
                                <button className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 bg-novara-500 text-white hover:bg-novara-600 px-5 py-3 text-base shadow-md shadow-novara-500/30">
                                    Try Builder Demo
                                </button>
                            </div>

                            {/* Image */}
                            <div className="absolute right-0 bottom-0 h-full w-[55%] lg:w-[60%] translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700 hidden md:block">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                                    alt="Builder UI"
                                    className="w-full h-full object-cover rounded-tl-3xl shadow-2xl border-t border-l border-slate-200/50"
                                />

                                {/* Smart overlay */}
                                <div className="absolute inset-0 bg-gradient-to-l from-white/60 via-white/20 to-transparent rounded-tl-3xl pointer-events-none" />
                            </div>
                        </div>

                        {/* Tail Card 1: Analytics */}
                        <div id="analytics" className="bg-[#0F2A44] rounded-3xl p-8 border border-slate-800 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform flex flex-col justify-between scroll-mt-28">
                            <div className="relative z-10 p-2">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-300 mb-6"><BarChart size={24} /></div>
                                <h3 className="text-2xl font-bold mb-2">Deep Analytics</h3>
                                <p className="text-slate-400 leading-relaxed">Track engagement, retention, and outcomes in real-time.</p>
                            </div>
                            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <PieChart size={180} />
                            </div>
                        </div>

                        {/* Tall Card 2: Mobile Ready */}
                        <div className="row-span-2 bg-gradient-to-b from-[#00C6CF] to-[#00A3AC] rounded-3xl p-8 border border-transparent text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Learn Anywhere, Anytime</h3>
                                <p className="text-white/90 mb-8 leading-relaxed">Fully responsive design ensures a seamless experience on mobile, tablet, and desktop.</p>
                            </div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[420px] bg-white rounded-t-[2.5rem] shadow-2xl translate-y-24 group-hover:translate-y-20 transition-transform duration-500 border-[8px] border-slate-900 overflow-hidden">
                                {/* Mobile Screen Mock content */}
                                <div className="bg-slate-50 w-full h-full">
                                    <div className="bg-slate-900 text-white p-4 pt-8 text-center text-sm font-bold">My Courses</div>
                                    <div className="p-4 space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
                                                <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0" />
                                                <div className="space-y-1 w-full">
                                                    <div className="h-2 w-3/4 bg-slate-200 rounded" />
                                                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Wide Card: Community */}
                        <div className="md:col-span-2 bg-white rounded-3xl p-8 px-10 border border-slate-200 flex flex-col md:flex-row items-center gap-8 group hover:border-novara-200 transition-colors shadow-sm">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Users size={20} /></div>
                                    <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Social Learning</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Built-in Community Features</h3>
                                <p className="text-slate-500 leading-relaxed">Foster collaboration with discussion boards, peer reviews, and group projects directly in the platform.</p>
                            </div>
                            <div className="flex -space-x-5 hover:space-x-1 transition-all duration-300">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/4${i}.jpg`} className="w-16 h-16 rounded-full border-4 border-white shadow-md relative z-10 transition-transform hover:scale-110 hover:z-20 cursor-pointer" alt="User" />
                                ))}
                                <div className="w-16 h-16 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-slate-500 font-bold z-0 relative shadow-sm">+2k</div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- 3. PERSONA TABS --- */}
            <section id="programs" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-novara-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-novara-400 font-bold uppercase tracking-wider text-sm mb-2 block">Why Choose Novara?</span>
                            <h2 className="text-4xl font-bold mb-8">A Platform Designed for <br /> Every Stakeholder</h2>

                            {/* Tabs */}
                            <div className="flex flex-col gap-4">
                                {(Object.keys(PERSONAS) as Array<keyof typeof PERSONAS>).map((persona) => (
                                    <button
                                        key={persona}
                                        onClick={() => setActivePersona(persona)}
                                        className={cn(
                                            "text-left p-6 rounded-xl transition-all border-l-4 group",
                                            activePersona === persona
                                                ? "bg-white/10 border-novara-500 shadow-lg"
                                                : "hover:bg-white/5 border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <h3 className={cn("text-xl font-bold mb-2 group-hover:text-white", activePersona === persona ? "text-white" : "text-slate-300")}>
                                            {PERSONAS[persona].title}
                                        </h3>
                                        {activePersona === persona && (
                                            <div className="animate-fade-in text-slate-300 text-sm leading-relaxed">
                                                {PERSONAS[persona].desc}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Content Display */}
                        <div className="relative h-[600px] bg-slate-800 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                            <img
                                src={PERSONAS[activePersona].image}
                                alt={PERSONAS[activePersona].title}
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-10 w-full">
                                <h3 className="text-3xl font-bold mb-6">{PERSONAS[activePersona].heading}</h3>
                                <ul className="space-y-4">
                                    {PERSONAS[activePersona].features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg text-slate-200">
                                            <div className="bg-novara-500 rounded-full p-1"><CheckCircle2 size={16} className="text-white" /></div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button className="inline-flex items-center justify-center w-full md:w-auto mt-8 px-6 py-3 rounded-xl font-bold text-white bg-novara-500 hover:bg-novara-600 shadow-md shadow-novara-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-novara-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Explore {activePersona} Features
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. GLOBAL SCALE (Abstract Map) --- */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-16">Powering Education Across the Globe</h2>

                    <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px]">
                        {/* Abstract Map Background */}
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-contain bg-no-repeat bg-center opacity-10" />

                        {/* Floating Stats Cards */}
                        <div className="absolute top-1/4 left-1/4 animate-bounce-slow">
                            <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex flex-col items-center">
                                <span className="text-3xl font-bold text-novara-600"><CountUp end={50} suffix="k+" /></span>
                                <span className="text-xs font-bold text-slate-400 uppercase">Active Learners</span>
                            </div>
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 animate-bounce-slow delay-700">
                            <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex flex-col items-center">
                                <span className="text-3xl font-bold text-blue-600"><CountUp end={120} /></span>
                                <span className="text-xs font-bold text-slate-400 uppercase">Countries</span>
                            </div>
                        </div>
                        <div className="absolute top-1/3 right-1/3 animate-bounce-slow delay-300">
                            <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex flex-col items-center">
                                <span className="text-3xl font-bold text-green-600"><CountUp end={99} suffix=".9%" /></span>
                                <span className="text-xs font-bold text-slate-400 uppercase">Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. TESTIMONIALS --- */}
            <section id="testimonials" className="py-24 bg-[#F8FAFC] scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Loved by Forward-Thinking Teams</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <div className="flex gap-1 text-amber-400 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-600 leading-relaxed mb-6 flex-1">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                                        <div className="text-xs text-slate-400">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 6. CTA SECTION --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-novara-900 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-novara-600/30 rounded-full blur-[128px] translate-x-1/3 -translate-y-1/3" />
                </div>

                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Training?</h2>
                    <p className="text-xl text-novara-100 mb-10 max-w-2xl mx-auto">Join the fastest growing learning platform and start seeing results in days, not months.</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-white !text-slate-900 hover:bg-slate-100 h-14 px-10 text-lg font-bold" onClick={() => navigate('/pricing')}>
                            Get Started for Free
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 h-14 px-10 text-lg">
                            Contact Sales
                        </Button>
                    </div>
                    <p className="mt-6 text-sm text-novara-300">No credit card required • 14-day free trial • cancel anytime</p>
                </div>
            </section>

            <Footer />
        </div>
    );
};
