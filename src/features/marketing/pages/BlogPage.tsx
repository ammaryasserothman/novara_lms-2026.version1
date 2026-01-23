import React, { useState } from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { Search, ArrowRight, User, Clock, Calendar } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// Mock Blog Data
const BLOG_POSTS = [
    {
        id: 1,
        category: "Thought Leadership",
        title: "The Future of AI in Enterprise Learning",
        excerpt: "How artificial intelligence is reshaping the way organizations approach mentorship, skill acquisition, and retention.",
        author: "Sarah Jenning",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        featured: true
    },
    {
        id: 2,
        category: "Product Updates",
        title: "Introducing Novara 3.0: A New Era",
        excerpt: "We've completely overhauled our analytics engine. Here's what you need to know about the new features.",
        author: "Alex Johnson",
        date: "Oct 20, 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        featured: false
    },
    {
        id: 3,
        category: "Engineering",
        title: "Scaling WebSocket Connections for 50k Users",
        excerpt: "A deep dive into the infrastructure challenges we faced during our latest peak traffic event.",
        author: "David Chen",
        date: "Oct 15, 2024",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        featured: false
    },
    {
        id: 4,
        category: "Customer Success",
        title: "How Acme Corp Reduced Onboarding Time by 60%",
        excerpt: "A case study on implementing automated learning paths for remote engineering teams.",
        author: "Emily Blunt",
        date: "Oct 10, 2024",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        featured: false
    },
    {
        id: 5,
        category: "Thought Leadership",
        title: "Building a Culture of Continuous Learning",
        excerpt: "Why certifications are just the beginning, and how to foster genuine curiosity in your workforce.",
        author: "Sarah Jenning",
        date: "Oct 05, 2024",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        featured: false
    }
];

export const BlogPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Thought Leadership", "Product Updates", "Engineering", "Customer Success"];

    const filteredPosts = selectedCategory === "All"
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === selectedCategory);

    const featuredPost = BLOG_POSTS.find(p => p.featured);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-600">
            <Navbar />

            {/* Header / Hero */}
            <header className="bg-[#0F2A44] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block px-3 py-1 bg-novara-500/10 border border-novara-500/30 rounded-full text-novara-400 text-xs font-bold tracking-widest uppercase mb-6">
                        The Novara Blog
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Insights for the Modern <br className="hidden md:block" /> Learning Organization
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Expert perspectives on ed-tech, corporate training, and the future of work. <br />
                        Stay ahead of the curve with our latest research.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mt-10 relative">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-novara-500 backdrop-blur-sm transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                                ? "bg-white text-novara-600 shadow-md"
                                : "bg-white/80 text-slate-500 hover:bg-white hover:text-slate-900"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured Post (Only show if 'All' or category matches) */}
                {featuredPost && (selectedCategory === "All" || selectedCategory === featuredPost.category) && (
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 mb-12 transform hover:-translate-y-1 transition-transform duration-500">
                        <div className="grid md:grid-cols-2">
                            <div className="h-[400px] relative overflow-hidden">
                                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                                    FEATURED
                                </div>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="text-novara-600 font-bold text-sm uppercase tracking-wider mb-3">{featuredPost.category}</div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{featuredPost.title}</h2>
                                <p className="text-lg text-slate-500 mb-8 leading-relaxed">{featuredPost.excerpt}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <User size={20} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{featuredPost.author}</div>
                                            <div className="text-xs text-slate-500">{featuredPost.date} · {featuredPost.readTime}</div>
                                        </div>
                                    </div>
                                    <Button className="rounded-full px-6">Read Article <ArrowRight size={16} className="ml-2" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.filter(p => !p.featured || (selectedCategory !== "All" && selectedCategory !== p.category)).map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                            <div className="h-56 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-novara-600 transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>

                                <div className="mt-auto border-t border-slate-50 pt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        {post.readTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <div className="mt-20 bg-novara-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
                        <p className="text-novara-100 mb-8 text-lg">
                            Get the latest insights on enterprise learning tailored for CTOs and HR leaders.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-novara-500"
                            />
                            <Button className="px-8 py-4 bg-white text-novara-900 hover:bg-novara-50 font-bold rounded-xl h-auto">
                                Subscribe
                            </Button>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">
                            We care about your data in our <span className="underline cursor-pointer">privacy policy</span>.
                        </p>
                    </div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-novara-500/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
                </div>

            </main>
            <Footer />
        </div>
    );
};
