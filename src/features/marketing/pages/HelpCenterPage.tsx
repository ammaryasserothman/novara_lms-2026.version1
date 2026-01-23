import React from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { Search, HelpCircle, MessageCircle, FileText, Zap, Shield, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const HelpCenterPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-600">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#0F2A44] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-novara-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help you today?</h1>
                    <p className="text-xl text-slate-300 mb-10">Search our knowledge base or get in touch with our support team.</p>

                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                        <input
                            type="text"
                            placeholder="Describe your issue (e.g. 'Reset password', 'API rate limits')..."
                            className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 shadow-2xl focus:outline-none focus:ring-4 focus:ring-novara-500/30 text-lg"
                        />
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20">

                {/* Popuplar Topics Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: <Zap className="text-amber-500" />, title: "Getting Started", desc: "Account setup, billing, and onboarding guides." },
                        { icon: <Shield className="text-blue-500" />, title: "Security & Privacy", desc: "2FA, SSO configuration, and GDPR compliance." },
                        { icon: <FileText className="text-green-500" />, title: "Course Management", desc: "creating courses, grading, and enrollments." },
                        { icon: <MessageCircle className="text-purple-500" />, title: "Community & Social", desc: "Discussion boards, groups, and moderation." },
                        { icon: <HelpCircle className="text-red-500" />, title: "Troubleshooting", desc: "Common errors, status codes, and fixes." },
                        { icon: <Mail className="text-teal-500" />, title: "Billing & Plans", desc: "Invoices, upgrades, and subscription management." }
                    ].map((topic, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-novara-50 transition-colors">
                                {React.cloneElement(topic.icon as React.ReactElement<{ size: number }>, { size: 24 })}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-novara-600 transition-colors">{topic.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{topic.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                "How do I reset my password?",
                                "Can I change my subscription plan later?",
                                "Where can I find my API keys?",
                                "How do I export student data?",
                                "Is there a limit on the number of courses?"
                            ].map((q, i) => (
                                <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-novara-300 cursor-pointer flex justify-between items-center group transition-colors">
                                    <span className="font-bold text-slate-700 group-hover:text-novara-700">{q}</span>
                                    <ExternalLink size={16} className="text-slate-400 group-hover:text-novara-500" />
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="mt-6 text-novara-600 font-bold pl-0 hover:bg-transparent hover:underline">View all FAQs</Button>
                    </div>

                    <div className="bg-novara-900 rounded-3xl p-10 text-white relative overflow-hidden flex flex-col justify-center">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                            <p className="text-novara-200 mb-8 text-lg">Our support team is available 24/7 to assist you with any issues.</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/10">
                                    <Mail className="text-novara-300 shrink-0" />
                                    <div>
                                        <div className="text-xs text-novara-300 font-bold uppercase">Email Support</div>
                                        <div className="font-bold">support@novara.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/10">
                                    <Phone className="text-novara-300 shrink-0" />
                                    <div>
                                        <div className="text-xs text-novara-300 font-bold uppercase">Phone Support</div>
                                        <div className="font-bold">+1 (888) 123-4567</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-novara-500/20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">All Systems Operational</div>
                            <div className="text-xs text-slate-500">Last updated: Just now</div>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full md:w-auto">View System Status</Button>
                </div>

            </main>
            <Footer />
        </div>
    );
};
