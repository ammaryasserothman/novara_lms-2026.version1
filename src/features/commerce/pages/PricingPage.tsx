import React, { useState } from 'react';
import { useGlobal } from '../../../context/GlobalContext';
import { useCart } from '../../../context/CartContext';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Check, ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PricingPage: React.FC = () => {
    const { courses } = useGlobal();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    // Mock pricing data since it's not in the main data yet
    const PRICED_COURSES = courses.map(c => ({
        ...c,
        price: 49.99 + (c.totalModules * 5), // dynamic mock price
        originalPrice: 79.99 + (c.totalModules * 5),
        features: ['Certificate of Completion', 'Lifetime Access', `${c.totalModules} Modules`, 'Project Files']
    }));

    const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

    const filteredCourses = filter === 'All'
        ? PRICED_COURSES
        : PRICED_COURSES.filter(c => c.category === filter);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-600 pb-20">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Invest in Your Career</h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                    Choose from our library of expert-led courses. One-time payment, lifetime access.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat
                                ? 'bg-novara-500 text-white'
                                : 'bg-white/10 hover:bg-white/20 text-slate-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-7xl mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="relative group">
                            <Card className="h-full flex flex-col p-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                {/* Thumbnail */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1 text-xs font-bold text-slate-900 shadow-sm">
                                        <Star size={12} className="text-yellow-500 fill-yellow-500" /> {course.rating}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold text-novara-600 uppercase tracking-widest bg-novara-50 px-2 py-1 rounded">
                                            {course.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{course.description}</p>

                                    <div className="space-y-2 mb-6 flex-1">
                                        {course.features?.slice(0, 3).map((feat, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                <Check size={14} className="text-green-500" /> {feat}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer / Price */}
                                    <div className="pt-6 border-t border-slate-100 mt-auto">
                                        <div className="flex items-end justify-between mb-4">
                                            <div>
                                                <span className="text-slate-400 text-sm line-through block">${course.originalPrice?.toFixed(2)}</span>
                                                <span className="text-3xl font-bold text-slate-900">${course.price?.toFixed(2)}</span>
                                            </div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                                Save {Math.round((1 - (course.price! / course.originalPrice!)) * 100)}%
                                            </span>
                                        </div>

                                        <Button
                                            className="w-full justify-center"
                                            icon={<ShoppingCart size={18} />}
                                            onClick={() => {
                                                addToCart(course);
                                                // Using simple toast logic via global would be better, but for now simple alert or navigate
                                                navigate('/cart');
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
