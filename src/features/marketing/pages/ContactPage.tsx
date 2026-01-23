import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { CheckCircle, ArrowRight, Mail, Briefcase, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = React.useState({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-100 text-center animate-fade-in-up h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-8">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-novara-600 font-bold hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-bold text-slate-700">First Name</label>
                        <input
                            id="firstName"
                            required
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-novara-500 focus:outline-none transition-all placeholder:text-slate-400"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-bold text-slate-700">Last Name</label>
                        <input
                            id="lastName"
                            required
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-novara-500 focus:outline-none transition-all placeholder:text-slate-400"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-700">Work Email</label>
                    <input
                        id="email"
                        required
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-novara-500 focus:outline-none transition-all placeholder:text-slate-400"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-slate-700">Subject</label>
                    <div className="relative">
                        <select
                            id="subject"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-novara-500 focus:outline-none transition-all appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        >
                            <option>General Inquiry</option>
                            <option>Sales & Pricing</option>
                            <option>Partnership</option>
                            <option>Technical Support</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label>
                    <textarea
                        id="message"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-novara-500 focus:outline-none transition-all min-h-[150px] placeholder:text-slate-400 resize-y"
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                </div>
                <button
                    disabled={status === 'submitting'}
                    className="w-full bg-novara-600 text-white font-bold py-4 rounded-xl hover:bg-novara-700 transition-all shadow-lg shadow-novara-500/20 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === 'submitting' ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>Send Message <ArrowRight size={18} /></>
                    )}
                </button>
            </form>
        </div>
    );
};

const Newsletter = () => {
    const [email, setEmail] = React.useState('');
    const [subscribed, setSubscribed] = React.useState(false);

    const handleSubscribe = () => {
        if (!email) return;
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
        setEmail('');
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Join our Newsletter</h4>
                <p className="text-slate-400 text-sm mb-4">Get the latest updates directly to your inbox.</p>
                <div className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-novara-500 w-full placeholder:text-slate-500 transition-all"
                    />
                    <button
                        onClick={handleSubscribe}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                            ${subscribed ? 'bg-green-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'}
                        `}
                    >
                        {subscribed ? 'Joined!' : 'Join'}
                    </button>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-novara-500/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        </div>
    );
};

export const ContactPage = () => (
    <PageLayout title="Get in Touch" subtitle="Have questions? We'd love to hear from you.">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ContactForm />

            {/* Contact Info */}
            <div className="space-y-10 py-8 lg:pl-12">
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-novara-100 flex items-center justify-center text-novara-600 shrink-0 group-hover:bg-novara-600 group-hover:text-white transition-colors duration-300">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Email</h4>
                                <p className="text-slate-500 mb-1">Our friendly team is here to help.</p>
                                <a href="mailto:hello@novara.com" className="text-novara-600 font-bold hover:underline">hello@novara.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-novara-100 flex items-center justify-center text-novara-600 shrink-0 group-hover:bg-novara-600 group-hover:text-white transition-colors duration-300">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Office</h4>
                                <p className="text-slate-500 mb-1">Come say hello at our HQ.</p>
                                <address className="not-italic text-slate-700 font-medium">
                                    123 Innovation Drive, Suite 400<br />
                                    San Francisco, CA 94105
                                </address>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-novara-600 hover:border-novara-300 hover:shadow-md hover:-translate-y-1 transition-all"
                                aria-label="Social Link"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <Newsletter />
            </div>
        </div>
    </PageLayout>
);
