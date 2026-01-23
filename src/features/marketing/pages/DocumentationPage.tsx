import React, { useState } from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { Search, Book, Terminal, FileText, ChevronRight, Zap, Shield, Database, Globe } from 'lucide-react';

const DOCS_NAV = [
    {
        title: "Getting Started",
        items: [
            { id: "intro", label: "Introduction" },
            { id: "install", label: "Installation" },
            { id: "arch", label: "Architecture Overview" },
            { id: "quickstart", label: "Quickstart Guide" }
        ]
    },
    {
        title: "Core Concepts",
        items: [
            { id: "auth", label: "Authentication" },
            { id: "users", label: "User Management" },
            { id: "courses", label: "Course Structure" },
            { id: "analytics", label: "Analytics Engine" }
        ]
    },
    {
        title: "API Reference",
        items: [
            { id: "rest", label: "REST API" },
            { id: "graphql", label: "GraphQL API" },
            { id: "webhooks", label: "Webhooks" },
            { id: "errors", label: "Error Codes" }
        ]
    }
];

export const DocumentationPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState("intro");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-600">
            <Navbar />

            {/* Docs Header */}
            <div className="bg-[#0F2A44] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2 opacity-80">
                            <Book size={20} className="text-novara-400" />
                            <span className="font-bold tracking-wide uppercase text-xs">Developer Hub</span>
                        </div>
                        <h1 className="text-3xl font-bold">Documentation</h1>
                    </div>
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search docs (e.g. 'Webhooks')..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-novara-500 backdrop-blur-sm transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-[10px] text-slate-400 font-mono">CTRL</kbd>
                            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-[10px] text-slate-400 font-mono">K</kbd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8 md:gap-12">

                {/* Sidebar Navigation */}
                <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                    {DOCS_NAV.map((section, idx) => (
                        <div key={idx} className="mb-8">
                            <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">{section.title}</h3>
                            <ul className="space-y-1">
                                {section.items.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveSection(item.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === item.id
                                                ? "bg-novara-50 text-novara-700 border-l-2 border-novara-500"
                                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* API Status Widget */}
                    <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">API Status</div>
                        <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            All Systems Operational
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 mb-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                            <span>Docs</span>
                            <ChevronRight size={14} />
                            <span>Getting Started</span>
                            <ChevronRight size={14} />
                            <span className="text-novara-600 font-bold">Introduction</span> // Dynamic in real app
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <h1 className="text-4xl font-bold text-slate-900 mb-6">Introduction to Novara LMS</h1>
                            <p className="lead text-xl text-slate-500 mb-8">
                                Novara is a headless, API-first Learning Management System designed for scalability and flexibility.
                                This documentation will guide you through integrating Novara into your application.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 not-prose mb-12">
                                <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-novara-200 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-lg bg-novara-100 flex items-center justify-center text-novara-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Zap size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">Quickstart</h3>
                                    <p className="text-sm text-slate-500">Deploy your first course in under 5 minutes.</p>
                                </div>
                                <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-novara-200 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Database size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">Data Models</h3>
                                    <p className="text-sm text-slate-500">Understanding Users, Courses, and Progress.</p>
                                </div>
                            </div>

                            <h2>Authentication</h2>
                            <p>
                                All API requests must be authenticated using a Bearer Token. You can generate API keys in your dashboard settings.
                            </p>

                            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg my-8 not-prose">
                                <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-xs text-slate-400 font-mono">bash</div>
                                </div>
                                <div className="p-6 overflow-x-auto">
                                    <pre className="text-sm font-mono text-slate-300">
                                        <span className="text-purple-400">curl</span> -X GET https://api.novara.com/v1/courses \<br />
                                        -H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span> \<br />
                                        -H <span className="text-green-400">"Content-Type: application/json"</span>
                                    </pre>
                                </div>
                            </div>

                            <h2>Core Features</h2>
                            <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0 not-prose">
                                {[
                                    { icon: <Shield size={18} />, text: "Role-Based Access Control" },
                                    { icon: <Globe size={18} />, text: "Multi-Tenancy Support" },
                                    { icon: <FileText size={18} />, text: "SCORM 1.2 & 2004 Compliant" },
                                    { icon: <Terminal size={18} />, text: "Webhooks & Events" },
                                ].map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 text-sm font-medium text-slate-700">
                                        <span className="text-novara-500">{f.icon}</span> {f.text}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>

                    {/* Feedback Widget */}
                    <div className="flex items-center justify-between p-6 bg-slate-100 rounded-xl border border-slate-200">
                        <div className="text-sm font-bold text-slate-600">Was this page helpful?</div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-novara-300 hover:text-novara-600 transition-all">Yes</button>
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-red-300 hover:text-red-600 transition-all">No</button>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};
