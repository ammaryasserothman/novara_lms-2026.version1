import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BookOpen, Video } from 'lucide-react';
import { Course, Enrollment } from '../../types';
import { useNavigate } from 'react-router-dom';

interface ActiveCourseHeroProps {
    activeCourse: Course | undefined;
    activeEnrollment: Enrollment | null;
}

export const ActiveCourseHero: React.FC<ActiveCourseHeroProps> = ({ activeCourse, activeEnrollment }) => {
    const navigate = useNavigate();

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
            </div>
            {activeCourse && activeEnrollment ? (
                <Card className="p-0 overflow-hidden border-novara-100 hover:shadow-lg transition-shadow group relative cursor-pointer" onClick={() => navigate(`/courses/${activeCourse.id}`)}>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden">
                            <img src={activeCourse.thumbnail} alt={activeCourse.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                <Video size={12} /> Unit 2.2
                            </div>
                        </div>

                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-novara-600 uppercase tracking-wider">{activeCourse.category}</span>
                                <span className="text-sm text-slate-400 font-medium">{activeEnrollment.progress === 100 ? 'Completed' : 'In Progress'}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-novara-700 transition-colors">
                                {activeCourse.title}
                            </h3>

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-sm font-semibold text-slate-700">
                                    <span>Progress</span>
                                    <span>{activeEnrollment.progress}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-novara-500 to-teal-400 rounded-full shadow-[0_0_10px_rgba(15,164,166,0.5)] transition-all duration-1000"
                                        style={{ width: `${activeEnrollment.progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click
                                        navigate(`/courses/${activeCourse.id}/lessons/${activeEnrollment.completedLessons[activeEnrollment.completedLessons.length - 1] || '1-1'}`);
                                    }}
                                    className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-teal-500 text-white hover:bg-teal-600 px-4 py-2 text-base shadow-md shadow-teal-500/30 hover:shadow-teal-500/40 relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center">
                                        {activeEnrollment.progress === 100 ? 'Review Course' : 'Resume Course'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                            <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
                                            <circle cx="12" cy="12" r="10" />
                                        </svg>
                                    </span>

                                    {activeEnrollment.progress < 100 && (
                                        <span aria-hidden="true" className="absolute right-3 z-0 flex items-center">
                                            <span className="w-4 h-4 rounded-full bg-white/20 shadow-sm animate-pulse"></span>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className="text-center py-12 border-dashed">
                    <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-bold">No active courses</h3>
                    <Button variant="outline" className="mt-4" onClick={() => navigate('/courses')}>Browse Catalog</Button>
                </Card>
            )}
        </section>
    );
};
