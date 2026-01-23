import React from 'react';
import {
   TrendingUp, Clock, Award,
   CheckCircle, Target
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { PageHeader } from '../components/PageHeader';
import { useGlobal } from '../../../context/GlobalContext';

export const ProgressPage: React.FC = () => {
   const { enrollments, courses } = useGlobal();

   // Mock Data for "Activity Heatmap"
   // Mock Data for "Activity Heatmap"
   const weeks = 52;
   const days = 7;
   // Deterministic pseudo-random based on inputs
   const getActivityLevel = (w: number, d: number) => {
      const x = Math.sin(w * 7 + d) * 10000;
      return Math.floor((x - Math.floor(x)) * 5);
   };

   const getHeatmapColor = (level: number) => {
      if (level === 0) return 'bg-slate-100';
      if (level === 1) return 'bg-novara-100';
      if (level === 2) return 'bg-novara-300';
      if (level === 3) return 'bg-novara-500';
      return 'bg-novara-700';
   };

   // Derived Stats (Memoized)
   const stats = React.useMemo(() => {
      const all = Object.values(enrollments);
      return {
         total: Object.keys(enrollments).length,
         inProgress: all.filter(e => e.status === 'in_progress').length,
         completed: all.filter(e => e.status === 'completed').length,
         totalHours: 124, // Mock
         streak: 12 // Mock
      };
   }, [enrollments]);

   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">
         <PageHeader
            title="My Progress"
            description="Analytics and insights into your learning journey."
            breadcrumbs={[
               { label: 'Dashboard', path: '/dashboard' },
               { label: 'Progress' }
            ]}
         />

         {/* --- TOP STATS --- */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
               label="Current Streak"
               value={`${stats.streak} Days`}
               icon={<TrendingUp size={24} />}
               color="green"
               trend="+2 from last week"
            />
            <StatCard
               label="Total Learning Time"
               value={`${stats.totalHours}h 30m`}
               icon={<Clock size={24} />}
               color="blue"
            />
            <StatCard
               label="Courses Completed"
               value={stats.completed}
               icon={<Award size={24} />}
               color="amber"
            />
            <StatCard
               label="Certificates Earned"
               value={stats.completed}
               icon={<CheckCircle size={24} />}
               color="purple"
            />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* --- ACTIVITY HEATMAP (Simulated GitHub Style) --- */}
            <div className="lg:col-span-2 space-y-8">
               <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-slate-900">Learning Activity</h3>
                     <div className="flex gap-2 text-xs text-slate-400 items-center">
                        <span>Less</span>
                        <div className="flex gap-1">
                           {[0, 1, 2, 3, 4].map(l => (
                              <div key={l} className={`w-3 h-3 rounded-sm ${getHeatmapColor(l)}`} />
                           ))}
                        </div>
                        <span>More</span>
                     </div>
                  </div>

                  <div className="w-full overflow-x-auto pb-2 custom-scrollbar" tabIndex={0} role="grid" aria-label="Activity Heatmap">
                     <div className="flex gap-1 min-w-max">
                        {Array.from({ length: weeks }).map((_, w) => (
                           <div key={w} className="flex flex-col gap-1" role="row">
                              {Array.from({ length: days }).map((_, d) => {
                                 const level = getActivityLevel(w, d);
                                 const hours = level + 1; // Simplified mock hours
                                 return (
                                    <div
                                       key={d}
                                       role="gridcell"
                                       tabIndex={0}
                                       className={`w-3 h-3 rounded-sm ${getHeatmapColor(level)} hover:ring-2 focus:ring-2 focus:outline-none ring-novara-500/50 transition-all cursor-pointer`}
                                       aria-label={`Day ${d + 1}, Week ${w + 1}: ${hours} hours`}
                                    />
                                 );
                              })}
                           </div>
                        ))}
                     </div>
                  </div>
               </Card>

               {/* --- COURSE PROGRESS BARS --- */}
               <Card title="Course Progress">
                  <div className="space-y-6 mt-4">
                     {courses.slice(0, 3).map(course => {
                        const enrollment = enrollments[course.id];
                        const progress = enrollment?.progress || 0;

                        return (
                           <div key={course.id}>
                              <div className="flex justify-between items-end mb-2">
                                 <div>
                                    <h4 className="font-bold text-slate-900">{course.title}</h4>
                                    <span className="text-xs text-slate-500">{course.instructor}</span>
                                 </div>
                                 <span className="font-bold text-novara-600">{progress}%</span>
                              </div>
                              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                 <div
                                    className="h-full bg-novara-500 rounded-full"
                                    style={{ width: `${progress}%` }}
                                 />
                                 {/* Stripes effect */}
                                 <div
                                    className="h-full w-full -mt-3 animate-pulse opacity-10 pointer-events-none"
                                    style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 20px)' }}
                                 />
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </Card>
            </div>

            {/* --- RIGHT COLUMN STATS --- */}
            <div className="space-y-6">
               {/* Focus Areas */}
               <Card>
                  <h3 className="font-bold text-slate-900 mb-6">Focus Areas</h3>
                  <div className="space-y-4">
                     {[
                        { label: 'Frontend Dev', val: 65, color: 'bg-blue-500' },
                        { label: 'UI/UX Design', val: 25, color: 'bg-purple-500' },
                        { label: 'Backend', val: 10, color: 'bg-emerald-500' },
                     ].map(area => (
                        <div key={area.label} className="space-y-1">
                           <div className="flex justify-between text-xs font-bold text-slate-600">
                              <span>{area.label}</span>
                              <span>{area.val}%</span>
                           </div>
                           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${area.color}`} style={{ width: `${area.val}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </Card>

               {/* Weekly Goal */}
               <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
                  <div className="flex items-start justify-between mb-4">
                     <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Weekly Goal</div>
                        <h3 className="text-2xl font-bold">4/5 Days</h3>
                     </div>
                     <Target className="text-novara-400" size={24} />
                  </div>
                  <p className="text-slate-300 text-sm mb-4">You're on track! complete 1 more day to reach your weekly streak.</p>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-novara-500 w-[80%] shadow-[0_0_10px_rgba(15,164,166,0.5)]"></div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
};

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; color: string; trend?: string }> = ({ label, value, icon, color, trend }) => {
   const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      amber: 'bg-amber-50 text-amber-600',
      purple: 'bg-purple-50 text-purple-600',
   };

   return (
      <Card className="flex items-center gap-4 hover:shadow-md transition-shadow">
         <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClasses[color as keyof typeof colorClasses] || 'bg-slate-50 text-slate-600'}`}>
            {icon}
         </div>
         <div>
            <div className="text-sm font-medium text-slate-500">{label}</div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            {trend && <div className="text-xs font-bold text-green-600 mt-0.5">{trend}</div>}
         </div>
      </Card>
   );
}
