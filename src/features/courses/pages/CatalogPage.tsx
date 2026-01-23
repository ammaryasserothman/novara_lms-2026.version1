import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../../context/GlobalContext';
import { CourseCard } from '../components/CourseCard';
import { PageHeader } from '../components/PageHeader';
import { cn } from '../../../utils/cn';

export const CatalogPage: React.FC = () => {
    const { courses, enrollments } = useGlobal();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Derive categories from courses
    const categories = useMemo(() => {
        const cats = new Set(courses.map(c => c.category));
        return ['All', ...Array.from(cats)];
    }, [courses]);

    // Filter courses
    const filteredCourses = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        return courses.filter(course => {
            const matchesSearch = !searchQuery ||
                course.title.toLowerCase().includes(lowerQuery) ||
                course.instructor.toLowerCase().includes(lowerQuery);
            const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [courses, searchQuery, selectedCategory]);

    return (
        <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">
            <PageHeader
                title="Browse Catalog"
                description="Explore our library of expert-led courses."
                breadcrumbs={[
                    { label: 'Courses', path: '/courses' },
                    { label: 'Catalog' }
                ]}
            />

            {/* Controls Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Categories */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                                selectedCategory === cat
                                    ? "bg-novara-500 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72 group">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-novara-500 transition-colors"
                        size={18}
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        placeholder="Search catalog..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent focus:bg-white focus:border-novara-500/50 focus:ring-4 focus:ring-novara-100 rounded-xl text-sm transition-all outline-none placeholder:text-slate-400 font-medium"
                    />
                </div>
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {filteredCourses.map(course => {
                        const enrollment = enrollments[course.id];
                        const isEnrolled = !!enrollment;
                        return (
                            <CourseCard
                                key={course.id}
                                course={course}
                                layout="grid"
                                showProgress={isEnrolled}
                                progress={enrollment?.progress}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="py-24 text-center">
                    <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <BookOpen size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};
