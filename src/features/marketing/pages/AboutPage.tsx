import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { Zap, Users, Shield } from 'lucide-react';

const ValueCard = React.memo(({ icon, title, desc, index }: { icon: React.ReactElement, title: string, desc: string, index: number }) => (
    <div
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-lg hover:border-novara-100 transition-all duration-300 animate-fade-in-up group"
        style={{ animationDelay: `${index * 150}ms` }}
    >
        <div className="w-14 h-14 bg-novara-50 rounded-xl flex items-center justify-center text-novara-600 mb-6 group-hover:scale-110 group-hover:bg-novara-100 transition-all duration-300">
            {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 28 })}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-novara-700 transition-colors">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
));
ValueCard.displayName = 'ValueCard';

export const AboutPage = () => (
    <PageLayout title="About Us" subtitle="We're on a mission to democratize elite-level corporate training.">
        <div className="space-y-20">
            {/* Mission Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-up">
                    <h3 className="text-3xl font-bold text-slate-900 mb-6">Building the Operating System for Human Potential</h3>
                    <p className="text-lg text-slate-500 leading-relaxed mb-6">
                        Founded in 2024, Novara began with a simple question: Why is corporate learning so boring? We believe that education should be as engaging as your favorite app and as effective as a 1-on-1 tutor.
                    </p>
                    <p className="text-lg text-slate-500 leading-relaxed mb-8">
                        Today, we help over 500+ forward-thinking companies unlock the full potential of their workforce through data-driven, adaptive learning experiences.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 grayscale opacity-80" />
                            ))}
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-bold text-slate-900">Trusted by 500+ teams</span>
                            <span className="text-sm text-slate-500">From startups to enterprises</span>
                        </div>
                    </div>
                </div>
                <div className="relative h-[500px] bg-slate-50 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up delay-200 group">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Team brainstorming"
                        className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-novara-900/10 pointer-events-none" />
                </div>
            </div>

            {/* Values Section */}
            <div>
                <div className="text-center mb-12 animate-fade-in-up">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h3>
                    <p className="text-slate-500 max-w-2xl mx-auto">The principles that guide every decision we make.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Zap />, title: "Move with Urgency", desc: "We believe speed is a competitive advantage. We ship fast and iterate faster." },
                        { icon: <Users />, title: "Customer Obsession", desc: "We don't just build for our customers; we build with them." },
                        { icon: <Shield />, title: "Radical Transparency", desc: "We share information openly and honestly, even when it's uncomfortable." },
                    ].map((v, i) => (
                        <ValueCard key={i} index={i} icon={v.icon} title={v.title} desc={v.desc} />
                    ))}
                </div>
            </div>

        </div>
    </PageLayout>
);
