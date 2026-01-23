import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { Shield, Globe, Zap, CheckCircle } from 'lucide-react';

const SecurityCard = ({ item, index }: { item: { title: string; desc: string; icon: React.ReactElement }; index: number }) => (
    <div
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-xl hover:border-novara-100 transition-all duration-300 group hover:-translate-y-1 animate-fade-in-up relative overflow-hidden"
        style={{ animationDelay: `${index * 150}ms` }}
        tabIndex={0}
        role="article"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-novara-50/[0.3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-novara-50 rounded-full flex items-center justify-center text-novara-600 group-hover:scale-110 group-hover:bg-novara-100 transition-all duration-300">
                {React.cloneElement(item.icon as any, { size: 32 })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-novara-700 transition-colors">{item.title}</h3>
            <p className="text-slate-500 group-hover:text-slate-600 transition-colors">{item.desc}</p>
        </div>
    </div>
);

const UptimeCounter = () => {
    const [uptime, setUptime] = React.useState(98.00);

    React.useEffect(() => {
        const target = 99.99;
        const start = 98.00; // Hardcoded start
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = (target - start) / steps;

        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setUptime(target);
                clearInterval(timer);
            } else {
                setUptime(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, []);

    return <span className="text-4xl font-mono font-bold text-green-500 tabular-nums">{uptime.toFixed(2)}%</span>;
};

const SECTIONS = [
    { id: 'compliance', title: '1. Compliance & Privacy', icon: <Shield size={16} /> },
    { id: 'infrastructure', title: '2. Infrastructure', icon: <Globe size={16} /> },
    { id: 'uptime', title: '3. System Uptime', icon: <Zap size={16} /> }
];

export const SecurityPage = () => {
    const [activeSection, setActiveSection] = React.useState('compliance');


    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, { rootMargin: '-100px 0px -60% 0px' });

        SECTIONS.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <PageLayout title="Enterprise-Grade Security" subtitle="Your data privacy and security are our top priorities.">
            <div className="relative">
                <div className="absolute top-0 right-1/3 w-96 h-96 bg-novara-500/5 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
                    {/* Left Column: TOC */}
                    <aside className="lg:col-span-1 hidden lg:block sticky top-32">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Quick Navigation</h3>
                            <ul className="space-y-1">
                                {SECTIONS.map(section => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className={`text-sm py-2 px-3 rounded-lg w-full text-left transition-all flex items-center gap-2 ${activeSection === section.id
                                                ? 'bg-novara-50 text-novara-700 font-bold'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            {section.icon}
                                            {section.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-3 space-y-16">

                        {/* Compliance Section */}
                        <section id="compliance" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Shield size={24} /></div>
                                Compliance & Standards
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: "SOC 2 Type II", desc: "Independently audited and verified for security compliance.", icon: <Shield /> },
                                    { title: "GDPR Compliant", desc: "Full data sovereignty and privacy controls for EU customers.", icon: <Globe /> },
                                    { title: "End-to-End Encryption", desc: "Data is encrypted at rest and in transit using industry standards.", icon: <Zap /> }
                                ].map((item, i) => (
                                    <SecurityCard key={i} item={item} index={i} />
                                ))}
                            </div>
                        </section>

                        {/* Reliability Section */}
                        <section id="infrastructure" className="scroll-mt-32">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                                <div className="p-8 md:p-12 relative overflow-hidden">
                                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><CheckCircle size={24} /></div>
                                            Global Infrastructure
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed mb-8 max-w-2xl">
                                            Our infrastructure is built on a distributed, redundant mesh of global servers ensuring your learning platform is always available when you need it.
                                        </p>
                                        <ul className="grid sm:grid-cols-2 gap-4">
                                            {['Real-time status monitoring', 'DDoS protection & Mitigation', 'Automated Hourly Backups', 'Multi-Region Failover'].map((li, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium group cursor-default">
                                                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                                    </div>
                                                    {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Uptime Section */}
                        <section id="uptime" className="scroll-mt-32">
                            <div className="h-64 bg-slate-900 rounded-3xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                {/* Animated Grid Background */}
                                <div className="absolute inset-0 flex items-end justify-center gap-1 opacity-20">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-2 bg-green-500 rounded-t-full"
                                            style={{
                                                height: `${(Math.sin(i * 0.5) * 0.5 + 0.5) * 60 + 20}%`,
                                                animation: `pulse ${(i % 3) + 1}s infinite`
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10 text-center">
                                    <div className="mb-4 text-xs font-bold text-green-400 uppercase tracking-[0.2em] animate-pulse">Live System Status</div>
                                    <UptimeCounter />
                                    <p className="text-slate-400 mt-4 text-sm">Operational • Last updated just now</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
