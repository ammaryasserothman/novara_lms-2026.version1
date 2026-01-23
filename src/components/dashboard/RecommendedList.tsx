import React from 'react';
import { Card } from '../ui/Card';
import { Activity, Trophy, Flame } from 'lucide-react';
import { Course } from '../../types';
import { useNavigate } from 'react-router-dom';

interface RecommendedListProps {
    recommendations: Course[];
}

export const RecommendedList: React.FC<RecommendedListProps> = ({ recommendations }) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8">
            {/* Recommendations (AI) */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="text-novara-500" size={20} />
                    <h2 className="text-xl font-bold text-slate-900">Recommended</h2>
                </div>
                <div className="space-y-4">
                    {recommendations.map(course => (
                        <Card key={course.id} className="group hover:border-novara-200 transition-colors cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
                            <div className="flex gap-4">
                                <img src={course.thumbnail} className="w-16 h-16 rounded-lg object-cover" alt={course.title} />
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 group-hover:text-novara-600 transition-colors">{course.title}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-1">{course.category}</p>
                                    <div className="flex items-center gap-1 text-xs text-yellow-500 mt-1 font-bold">
                                        ★ {course.rating}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {recommendations.length === 0 && (
                        <div className="text-sm text-slate-400 italic">No recommendations available at the moment.</div>
                    )}
                </div>
            </section>

            {/* Achievements */}
            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Achievements</h2>
                <Card className="border-slate-100">
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        <div className="shrink-0 flex flex-col items-center gap-2 min-w-[80px]">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-yellow-50 text-yellow-600 ring-4 ring-white shadow-lg">
                                <Trophy size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 text-center">Fast Learner</span>
                        </div>
                        <div className="shrink-0 flex flex-col items-center gap-2 min-w-[80px]">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-50 text-orange-600 ring-4 ring-white shadow-lg">
                                <Flame size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 text-center">7 Day Streak</span>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
};
