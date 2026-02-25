import React from 'react';
import { Clock, BookOpen, Star, Award, PlayCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import { Course } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
    course: Course;
    progress?: number;
    layout?: 'grid' | 'list';
    showProgress?: boolean;
}

/**
 * Optimized CourseCard with memoization to prevent unnecessary re-renders
 * during search/filter operations in parent lists.
 */
export const CourseCard = React.memo<CourseCardProps>(({
    course,
    progress,
    layout = 'grid',
    showProgress = false
}) => {
    const navigate = useNavigate();

    // Helper to determine status color (moved outside to avoid recreation)
    const getStatusColor = (prog: number) => {
        if (prog === 100) return 'bg-green-500';
        if (prog > 0) return 'bg-novara-500';
        return 'bg-slate-200';
    };

    if (layout === 'list') {
        return (
            <div
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/courses/${course.id}`)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/courses/${course.id}`);
                    }
                }}
                className="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-novara-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-6 items-center focus:outline-none focus:ring-2 focus:ring-novara-500"
            >
                {/* Thumbnail */}
                <div className="relative w-48 h-32 rounded-xl overflow-hidden shrink-0">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                    <div
                        className="
                            absolute inset-0 flex items-center justify-center
                            invisible opacity-0 pointer-events-none
                            group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto
                            transition-all duration-300
                        "
                    >
                        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full
                                            flex items-center justify-center text-white
                                            border border-white/30">
                            <PlayCircle size={22} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 py-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-xs font-bold text-novara-600 uppercase tracking-wider mb-1">
                                {course.category}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 truncate group-hover:text-novara-700 transition-colors">
                                {course.title}
                            </h3>
                        </div>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                            <Star size={12} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-amber-700">{course.rating}</span>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 max-w-2xl">
                        {course.description}
                    </p>

                    <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                {course.instructor.charAt(0)}
                            </div>
                            <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-slate-400" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BookOpen size={14} className="text-slate-400" />
                            <span>{course.lessonsCount || 12} Lessons</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Award size={14} className="text-slate-400" />
                            <span>{course.level}</span>
                        </div>
                    </div>
                </div>

                {/* Action / Progress */}
                <div className="w-48 shrink-0 flex flex-col items-end gap-3 pl-6 border-l border-slate-100">
                    {showProgress && progress !== undefined ? (
                        <div className="w-full">
                            <div className="flex justify-between text-xs mb-2 font-semibold">
                                <span className="text-slate-700">{progress}% Complete</span>
                                {progress === 100 && <span className="text-green-600">Completed</span>}
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", getStatusColor(progress))}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <Button
                                className="w-full mt-4"
                                size="sm"
                                variant={progress === 100 ? "outline" : "primary"}
                            >
                                {progress === 0 ? "Start Course" : progress === 100 ? "Review Course" : "Continue"}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-slate-900">${course.price}</div>
                                <div className="text-xs text-slate-400 line-through">$499.00</div>
                            </div>
                            <Button className="w-full" size="sm">Enroll Now</Button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // GRID LAYOUT
    return (
        <Card padding="none" className="group h-full flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200">
            {/* Thumbnail */}
            <div
                className="h-48 relative overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-novara-500 inset-ring"
                onClick={() => navigate(`/courses/${course.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/courses/${course.id}`);
                    }
                }}
            >
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Status / Level Badge */}
                <div className="absolute top-4 left-4 z-10">
                    {showProgress && progress && progress > 0 && progress < 100 ? (
                        <span className="
                            inline-flex items-center justify-center
                            bg-white/90 backdrop-blur-sm
                            px-2.5 py-1
                            rounded-lg
                            text-xs font-bold text-slate-800
                            shadow-sm
                            border border-white/20
                        ">
                            In Progress
                        </span>
                    ) : course.level ? (
                        <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm border border-white/20">
                            {course.level}
                        </span>
                    ) : null}
                </div>

                {/* Play Button Overlay */}
                <div
                    className="
                        absolute inset-0 flex items-center justify-center
                        invisible opacity-0 pointer-events-none
                        group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto
                        transition-all duration-300
                    "
                >
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full
                                        flex items-center justify-center text-white
                                        border border-white/30">
                        <PlayCircle size={22} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <div className="text-xs font-bold text-novara-600 uppercase tracking-wider">
                        {course.category}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                    </div>
                </div>

                <h3
                    className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-novara-700 transition-colors cursor-pointer focus:outline-none focus:underline"
                    onClick={() => navigate(`/courses/${course.id}`)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigate(`/courses/${course.id}`);
                        }
                    }}
                >
                    {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} /> {course.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BookOpen size={14} /> {course.lessonsCount || 12} Lessons
                    </div>
                </div>

                {/* Progress or Price */}
                <div className="mt-auto pt-4 border-t border-slate-50">
                    {showProgress && progress !== undefined ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="font-semibold text-slate-700">{progress}% Complete</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", getStatusColor(progress))}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                    {course.instructor.charAt(0)}
                                </div>
                                <span className="text-xs font-medium text-slate-600 truncate max-w-[100px]">{course.instructor}</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm text-slate-500">$</span>
                                <span className="text-2xl font-bold text-slate-900">{course.price}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card >
    );
});

CourseCard.displayName = 'CourseCard';
