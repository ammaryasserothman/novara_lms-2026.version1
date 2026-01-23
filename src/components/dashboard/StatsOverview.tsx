import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { Course } from '../../types';

interface StatsOverviewProps {
    activeCourse: Course | undefined;
    enrolledCourseCount: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ activeCourse, enrolledCourseCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Insight */}
            <Card className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden border-none shadow-xl shadow-slate-900/10">
                <div className="absolute top-0 right-0 p-32 bg-novara-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                    <div className="flex items-center gap-2 text-novara-300 mb-2">
                        <Sparkles size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Top 5% Performer</h3>
                        <p className="text-slate-300 leading-relaxed max-w-md">
                            Your engagement score is higher than 85% of peers. {activeCourse ? `You're on track to finish ${activeCourse.title} this week.` : "Start a new course to boost your stats!"}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Stats - Hours */}
            <Card className="flex flex-col justify-between group hover:-translate-y-1 transition-transform border-slate-100">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Clock size={24} />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+2.5h this week</span>
                </div>
                <div>
                    <div className="text-3xl font-bold text-slate-900">124h</div>
                    <div className="text-sm text-slate-500 font-medium">Total Learning Hours</div>
                </div>
            </Card>

            {/* Stats - Active Courses */}
            <Card className="flex flex-col justify-between group hover:-translate-y-1 transition-transform border-slate-100">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-novara-50 text-novara-600 group-hover:bg-novara-500 group-hover:text-white transition-colors">
                        <CheckCircle2 size={24} />
                    </div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-slate-900">{enrolledCourseCount}</div>
                    <div className="text-sm text-slate-500 font-medium">Active Courses</div>
                </div>
            </Card>
        </div>
    );
};
