import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { cn } from '../../utils/cn';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const NAV_LINKS = ['Features', 'UI Preview', 'Analytics', 'Testimonials', 'Programs'];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleLogin = () => navigate('/login');
    const handleSignup = () => navigate('/signup');

    return (
        <nav className={cn(
            "fixed w-full z-50 transition-all duration-300 border-b",
            isScrolled || mobileMenuOpen ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm" : "bg-transparent border-transparent py-5"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Logo className="w-full h-full" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">NOVARA</span>
                            <span className="text-[10px] font-semibold text-novara-600 uppercase tracking-widest">LMS Platform</span>
                        </div>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                                className="text-sm font-medium text-slate-500 hover:text-novara-600 transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Button variant="outline" onClick={handleSignup} className="border-novara-200 text-novara-700 hover:bg-novara-50">
                            Sign Up
                        </Button>
                        <Button onClick={handleLogin} className="bg-novara-600 hover:bg-novara-700 shadow-lg shadow-novara-500/25">
                            Log In
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="lg:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col p-4 gap-4 animate-fade-in">
                    {NAV_LINKS.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                scrollToSection(item.toLowerCase().replace(' ', '-'));
                                setMobileMenuOpen(false);
                            }}
                            className="text-lg font-medium text-slate-600 py-2 border-b border-slate-50 text-left"
                        >
                            {item}
                        </button>
                    ))}
                    <div className="flex flex-col gap-3 mt-2">
                        <Button variant="outline" onClick={handleSignup} className="w-full justify-center">Sign Up</Button>
                        <Button onClick={handleLogin} className="w-full justify-center">Log In</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};
