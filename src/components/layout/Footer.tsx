import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

// Social Icons
const GoogleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.35 11.1H12v2.8h5.35c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.8-4.1 2.8-6.9 0-.7-.1-1.3-.2-1.9z" fill="currentColor" />
        <path d="M12 21c2.6 0 4.8-.9 6.4-2.3l-3.1-2.4c-.8.6-1.9 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H3.3v2.5C4.9 18.9 8.2 21 12 21z" fill="currentColor" />
        <path d="M6.5 13.2c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2V6.3H3.3C2.5 7.9 2 9.9 2 12s.5 4.1 1.3 5.7l3.2-2.5z" fill="currentColor" />
        <path d="M12 5.4c1.4 0 2.7.5 3.7 1.4l2.7-2.7C16.8 2.5 14.6 1.6 12 1.6 8.2 1.6 4.9 3.7 3.3 6.3l3.2 2.5c.8-2.3 2.9-4 5.5-4z" fill="currentColor" />
    </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 3.75-1.62 1.54.01 2.94.81 3.86 2.16-3.3 1.83-2.61 5.92.74 7.23-.55 1.56-1.57 3.33-3.43 4.46zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const MicrosoftIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
    </svg>
);

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0F2A44] text-slate-400 py-16 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Left Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4 text-white">
                            <Logo className="w-8 h-8" />
                            <span className="text-xl font-bold">NOVARA</span>
                        </div>
                        <p className="max-w-xs mb-6 text-slate-400 leading-relaxed">
                            The enterprise-grade learning management system designed for the future of education. Trusted, secure, and intelligent.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novara-500 hover:text-white transition-all cursor-pointer text-slate-300"
                                aria-label="Google"
                            >
                                <GoogleIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novara-500 hover:text-white transition-all cursor-pointer text-slate-300"
                                aria-label="LinkedIn"
                            >
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novara-500 hover:text-white transition-all cursor-pointer text-slate-300"
                                aria-label="Apple"
                            >
                                <AppleIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.microsoft.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novara-500 hover:text-white transition-all cursor-pointer text-slate-300"
                                aria-label="Microsoft"
                            >
                                <MicrosoftIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Middle Columns */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-3">
                            <li><Link to="/features" className="hover:text-novara-400 transition-colors">Features</Link></li>
                            <li><Link to="/analytics" className="hover:text-novara-400 transition-colors">Analytics</Link></li>
                            <li><Link to="/integrations" className="hover:text-novara-400 transition-colors">Integrations</Link></li>
                            <li><Link to="/security" className="hover:text-novara-400 transition-colors">Security</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="hover:text-novara-400 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-novara-400 transition-colors">Careers</Link></li>
                            <li><Link to="/customers" className="hover:text-novara-400 transition-colors">Customers</Link></li>
                            <li><Link to="/contact" className="hover:text-novara-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-3">
                            <li><Link to="/blog" className="hover:text-novara-400 transition-colors">Blog</Link></li>
                            <li><Link to="/documentation" className="hover:text-novara-400 transition-colors">Documentation</Link></li>
                            <li><Link to="/community" className="hover:text-novara-400 transition-colors">Community</Link></li>
                            <li><Link to="/help-center" className="hover:text-novara-400 transition-colors">Help Center</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>© {currentYear} NOVARA LMS. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/PrivacyPage" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/TermsPage" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
