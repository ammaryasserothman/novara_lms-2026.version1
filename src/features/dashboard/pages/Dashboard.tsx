import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { useGlobal } from '../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../../types';
import { WelcomeBanner } from '../../../components/dashboard/WelcomeBanner';
import { StatsOverview } from '../../../components/dashboard/StatsOverview';
import { ActiveCourseHero } from '../../../components/dashboard/ActiveCourseHero';
import { RecommendedList } from '../../../components/dashboard/RecommendedList';
import { BookOpen, TrendingUp } from 'lucide-react';
import { RecentTimeline } from '../../../components/dashboard/RecentTimeline';

// --- MOCK ENTERPRISE WIDGETS ---

const AnalyticsWidget = () => (
   <Card className="p-6 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
         <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp size={18} className="text-green-500" /> Learning Velocity
         </h3>
         <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg p-1 focus:ring-0 cursor-pointer">
            <option>This Week</option>
            <option>Last Month</option>
         </select>
      </div>
      <div className="h-40 flex items-end justify-between gap-2 px-2">
         {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group-hover:bg-slate-200 transition-colors" style={{ height: '100%' }}>
               <div
                  className="absolute bottom-0 left-0 right-0 bg-novara-500 rounded-t-lg transition-all duration-1000 ease-out opacity-80 group-hover:opacity-100"
                  style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
               />
            </div>
         ))}
      </div>
      <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
         <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
   </Card>
);



export const Dashboard: React.FC = () => {
   const { user } = useAuth();
   const { courses, enrollments, getRecommendedCourses } = useGlobal();
   const navigate = useNavigate();

   // ⚡ Bolt Optimization: Memoize complex derived state to prevent recalculation
   // on every re-render (e.g. when header navigation or scroll state changes).
   // Using explicit fallback `|| {}` ensures safety if context data isn't fully ready.
   const {
      enrolledCourseIds,
      activeCourse,
      activeEnrollment,
      otherEnrolledCourses
   } = React.useMemo(() => {
      // Safety check inside useMemo because we moved the `if (!user) return null;` early return below
      // to obey the Rules of Hooks.
      if (!user || !courses || !enrollments) {
         return { enrolledCourseIds: [], activeCourse: undefined, activeEnrollment: null, otherEnrolledCourses: [] };
      }

      // Logic: Get Active Course (Most recently accessed or highest progress < 100)
      const enrolledCourseIds = Object.keys(enrollments || {});
      const activeEnrollmentKey = enrolledCourseIds.find(id => enrollments[id].status === 'in_progress') || enrolledCourseIds[0];
      const activeCourse = courses.find(c => c.id === activeEnrollmentKey);
      const activeEnrollment = activeEnrollmentKey ? enrollments[activeEnrollmentKey] : null;

      // Logic: Get other enrolled courses (Max 2 for display)
      const otherEnrolledCourses = enrolledCourseIds
         .filter(id => id !== activeEnrollmentKey)
         .map(id => {
            const course = courses.find(c => c.id === id);
            return course ? { ...course, progress: enrollments[id].progress } : null;
         })
         .filter((c): c is (Course & { progress: number }) => c !== null)
         .slice(0, 2);

      return { enrolledCourseIds, activeCourse, activeEnrollment, otherEnrolledCourses };
   }, [courses, enrollments, user]);

   // ⚡ Bolt Optimization: Memoize the AI recommendation engine output.
   // getRecommendedCourses creates new arrays internally, so calling it directly causes unnecessary
   // downstream renders of RecommendedList. We depend on courses and enrollments, NOT the function ref.
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const recommendations = React.useMemo(() => getRecommendedCourses(), [courses, enrollments]);

   if (!user) return null;

   return (
      <div className="space-y-8 font-sans text-slate-600 animate-fade-in">

         {/* --- HEADER --- */}
         <WelcomeBanner user={user} />

         {/* --- STATS ROW --- */}
         <StatsOverview activeCourse={activeCourse} enrolledCourseCount={enrolledCourseIds.length} />

         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

            {/* --- MAIN CONTENT (Left 8 cols) --- */}
            <div className="xl:col-span-8 space-y-8">

               {/* Active Course Hero */}
               <ActiveCourseHero activeCourse={activeCourse} activeEnrollment={activeEnrollment} />

               <div className="grid md:grid-cols-2 gap-8">
                  {/* Analytics Widget */}
                  <AnalyticsWidget />

                  {/* Enrolled Courses Mini-List (if any) */}
                  {otherEnrolledCourses.length > 0 ? (
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <h3 className="font-bold text-slate-900">Your Courses</h3>
                           <Button variant="ghost" size="sm" className="text-novara-600" onClick={() => navigate('/courses')}>View All</Button>
                        </div>
                        {otherEnrolledCourses.map((course) => (
                           <Card key={course.id} className="group hover:-translate-y-1 transition-all duration-300 border-slate-100 cursor-pointer p-4 flex gap-4 min-h-[100px]" onClick={() => navigate(`/courses/${course.id}`)}>
                              <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                                 <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              </div>
                              <div className="flex flex-col justify-between flex-grow">
                                 <div>
                                    <span className="text-[10px] font-bold text-novara-600 uppercase tracking-widest bg-novara-50 px-2 py-0.5 rounded-full">{course.category}</span>
                                    <h4 className="font-bold text-slate-900 mt-2 line-clamp-1 group-hover:text-novara-700">{course.title}</h4>
                                 </div>
                                 <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-slate-900 h-full rounded-full" style={{ width: `${course.progress}%` }} />
                                 </div>
                              </div>
                           </Card>
                        ))}
                     </div>
                  ) : (
                     /* Empty State Placeholder for 2nd Col */
                     <Card className="flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 border-dashed">
                        <BookOpen size={32} className="text-slate-300 mb-4" />
                        <p className="font-bold text-slate-500">No other active courses</p>
                        <Button variant="ghost" className="text-novara-600 hover:bg-novara-50" onClick={() => navigate('/courses')}>Browse library</Button>
                     </Card>
                  )}
               </div>

            </div>



            {/* --- SIDEBAR (Right 4 cols) --- */}
            <div className="xl:col-span-4 space-y-8">
               <RecentTimeline />
               <RecommendedList recommendations={recommendations} />
            </div>
         </div>
      </div>
   );
};