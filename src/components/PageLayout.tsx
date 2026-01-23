import React from 'react';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';

interface PageLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{title}</h1>
                <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
            </div>
            {children}
        </main>
        <Footer />
    </div>
);
