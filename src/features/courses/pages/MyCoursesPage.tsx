import React, { useState, useEffect, useMemo } from 'react';
import {
   Search, LayoutGrid, List, BookOpen,
   Flame, Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { useGlobal } from '../../../context/GlobalContext';
// import { PageHeader } from '../components/PageHeader';
import { CourseCard } from '../components/CourseCard';
import { cn } from '../../../utils/cn';

// --- Types & Constants ---

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'in_progress' | 'completed';

const FILTERS: { id: FilterType; label: string }[] = [
   { id: 'all', label: 'All' },
   { id: 'in_progress', label: 'In Progress' },
   { id: 'completed', label: 'Completed' },
];

// --- Helper Components ---

/**
 * Skeleton Loader for the MyCourses Page
 * Simulates the layout of Hero + Grid to prevent layout shift.
 */
const LoadingSkeleton: React.FC = () => (
   <div className="max-w-7xl mx-auto space-y-8 min-h-screen pb-20" role="status" aria-label="Loading courses">
      {/* Hero Skeleton */}
      <div className="h-64 bg-slate-100 rounded-2xl animate-pulse mb-8" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
         {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 bg-white rounded-2xl border border-slate-200 overflow-hidden">
               <div className="h-48 bg-slate-200 animate-pulse" />
               <div className="p-6 space-y-4">
                  <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse" />
                  <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                  <div className="mt-8 h-10 w-full bg-slate-100 rounded animate-pulse" />
               </div>
            </div>
         ))}
      </div>
      <span className="sr-only">Loading content...</span>
   </div>
);

/**
 * Hero Section displaying the most active course.
 */
const HeroSection: React.FC<{ course: import('../../../types').Course & { progress: number }; onContinue: () => void; onViewSyllabus: () => void }> = ({
   course,
   onContinue,
   onViewSyllabus
}) => (
   <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl text-white p-8 md:p-12 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10" />
      <img
         src={course.thumbnail}
         alt="" /* Decorative background image */
         className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
      />

      <div className="relative z-20 max-w-2xl">
         <div className="flex items-center gap-2 text-novara-400 font-bold uppercase tracking-wider text-xs mb-3">
            <Flame size={14} aria-hidden="true" />
            <span>Don't lose your streak!</span>
         </div>
         <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome back, Alex. <br />
            <span className="text-slate-400">Ready to continue?</span>
         </h1>
         <p className="text-lg text-slate-300 mb-8 line-clamp-2">
            You were watching <strong>{course.title}</strong>.
            You've completed {course.progress}% of the course.
         </p>

         <div className="flex flex-wrap gap-4">
            <Button
               size="lg"
               onClick={onContinue}
               className="pl-6 pr-8 text-lg font-bold shadow-glow bg-novara-500 hover:bg-novara-600 text-white border-none focus:ring-4 focus:ring-novara-500/30"
               aria-label={`Continue watching ${course.title}`}
            >
               <Play size={20} fill="currentColor" className="mr-2" aria-hidden="true" />
               Continue Watching
            </Button>
            <Button
               size="lg"
               onClick={onViewSyllabus}
               className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 focus:ring-4 focus:ring-slate-500/30"
            >
               View Syllabus
            </Button>
         </div>
      </div>
   </div>
);

/**
 * Empty State component with contextual messaging.
 */
const EmptyState: React.FC<{ filter: FilterType; hasSearch: boolean; onClear: () => void }> = ({
   filter,
   hasSearch,
   onClear
}) => {
   const getMessage = () => {
      if (hasSearch) return "We couldn't find any courses matching your search.";
      if (filter === 'in_progress') return "You don't have any courses in progress yet.";
      if (filter === 'completed') return "You haven't completed any courses yet. Keep learning!";
      return "No courses found in your library.";
   };

   return (
      <div className="py-24 text-center animate-fade-in" role="alert">
         <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <BookOpen size={40} aria-hidden="true" />
         </div>
         <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
         <p className="text-slate-500 mb-8 max-w-md mx-auto">{getMessage()}</p>
         <Button variant="outline" onClick={onClear}>
            Clear all filters
         </Button>
      </div>
   );
};

// --- Main Page Component ---

export const MyCoursesPage: React.FC = () => {
   const { enrollments, courses, getNextLesson } = useGlobal();
   const navigate = useNavigate();
   const [viewMode, setViewMode] = useState<ViewMode>('grid');
   const [filter, setFilter] = useState<FilterType>('all');
   const [searchQuery, setSearchQuery] = useState('');
   const [isLoading, setIsLoading] = useState(true);

   // Performance: Loading simulation (Mocking API call)
   useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
   }, []);

   // Performance: Derive MyCourses list only when enrollments/courses change
   const myCourses = useMemo(() => {
      return Object.values(enrollments).map(enrollment => {
         const course = courses.find(c => c.id === enrollment.courseId);
         if (!course) return null;
         return {
            ...course,
            progress: enrollment.progress,
            status: enrollment.status,
            lastAccessed: enrollment.lastAccessed
         };
      }).filter((c): c is NonNullable<typeof c> => c !== null);
   }, [enrollments, courses]);

   // Performance: Filter logic memoized to prevent re-calc on unrelated renders
   const filteredCourses = useMemo(() => {
      const lowerQuery = searchQuery.toLowerCase();
      return myCourses.filter(course => {
         const matchesSearch = !searchQuery ||
            course.title.toLowerCase().includes(lowerQuery) ||
            course.instructor.toLowerCase().includes(lowerQuery);
         const matchesFilter = filter === 'all' || course.status === filter;
         return matchesSearch && matchesFilter;
      });
   }, [myCourses, searchQuery, filter]);

   // Performance: Sort logic memoized. Find most active / recent course for Hero.
   const recentCourse = useMemo(() => {
      if (myCourses.length === 0) return null;
      // create a shallow copy before sorting to avoid mutating original array if reference shared
      return [...myCourses].sort((a, b) =>
         new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
      )[0];
   }, [myCourses]);

   // Handlers
   const handleContinue = (courseId: string) => {
      const nextLessonId = getNextLesson(courseId);
      if (nextLessonId) {
         navigate(`/courses/${courseId}/lessons/${nextLessonId}`);
      } else {
         // Fallback to course main page if fully complete or error
         navigate(`/courses/${courseId}`);
      }
   };

   const handleViewSyllabus = (courseId: string) => {
      navigate(`/courses/${courseId}`);
   };

   if (isLoading) {
      return <LoadingSkeleton />;
   }

   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">

         {/* Hero Section */}
         {recentCourse && (
            <HeroSection
               course={recentCourse}
               onContinue={() => handleContinue(recentCourse.id)}
               onViewSyllabus={() => handleViewSyllabus(recentCourse.id)}
            />
         )}

         <div className="flex flex-col md:flex-row justify-between items-end gap-2 px-2">
            <h2 className="text-2xl font-bold text-slate-900">All Courses</h2>
            <span className="text-sm text-slate-500" aria-live="polite">
               {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Enrolled
            </span>
         </div>

         {/* Controls Toolbar */}
         <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Filter Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl w-full md:w-auto" role="tablist">
               {FILTERS.map((tab) => (
                  <button
                     key={tab.id}
                     role="tab"
                     aria-selected={filter === tab.id}
                     onClick={() => setFilter(tab.id)}
                     className={cn(
                        "flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all capitalize focus:outline-none focus:ring-2 focus:ring-novara-500",
                        filter === tab.id
                           ? "bg-white text-novara-600 shadow-sm ring-1 ring-slate-200"
                           : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                     )}
                  >
                     {tab.label}
                  </button>
               ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
               {/* Search Input */}
               <div className="relative flex-1 md:w-72 group">
                  <Search
                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-novara-500 transition-colors"
                     size={18}
                     aria-hidden="true"
                  />
                  <input
                     type="text"
                     placeholder="Search your library..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent focus:bg-white focus:border-novara-500/50 focus:ring-4 focus:ring-novara-100 rounded-xl text-sm transition-all outline-none placeholder:text-slate-400 font-medium"
                     aria-label="Search courses"
                  />
               </div>

               {/* View Toggles */}
               <div className="flex bg-slate-100 p-1 rounded-xl shrink-0" role="group" aria-label="View mode">
                  <button
                     onClick={() => setViewMode('grid')}
                     className={cn(
                        "p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-novara-500",
                        viewMode === 'grid' ? "bg-white shadow-sm text-novara-600" : "text-slate-400 hover:text-slate-600"
                     )}
                     aria-label="Grid view"
                     aria-pressed={viewMode === 'grid'}
                  >
                     <LayoutGrid size={20} aria-hidden="true" />
                  </button>
                  <button
                     onClick={() => setViewMode('list')}
                     className={cn(
                        "p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-novara-500",
                        viewMode === 'list' ? "bg-white shadow-sm text-novara-600" : "text-slate-400 hover:text-slate-600"
                     )}
                     aria-label="List view"
                     aria-pressed={viewMode === 'list'}
                  >
                     <List size={20} aria-hidden="true" />
                  </button>
               </div>
            </div>
         </div>

         {/* Course List */}
         {filteredCourses.length > 0 ? (
            <div className={cn(
               "grid gap-6 animate-fade-in pb-12",
               viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}
               role="list"
            >
               {filteredCourses.map(course => (
                  <div key={course.id} role="listitem">
                     <CourseCard
                        course={course}
                        progress={course.progress}
                        layout={viewMode}
                        showProgress={true}
                     />
                  </div>
               ))}
            </div>
         ) : (
            <EmptyState
               filter={filter}
               hasSearch={!!searchQuery}
               onClear={() => { setFilter('all'); setSearchQuery(''); }}
            />
         )}
      </div>
   );
};