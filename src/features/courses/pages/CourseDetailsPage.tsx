import React, { useCallback, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
   Clock,
   BookOpen,
   Star,
   CheckCircle,
   PlayCircle,
   Play,
   Globe,
   Award,
   Users,
   ChevronDown,
   ChevronUp,
   Lock,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { PageHeader } from '../components/PageHeader';
import { useGlobal } from '../../../context/GlobalContext';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { cn } from '../../../utils/cn';
import { Course, Module } from '../../../types';

/*
  Architecture note:
  UI is decomposed into small presentational components (CourseHero, CourseTabs, CourseOverview, CourseSyllabus,
  CourseReviews, CourseSidebar) while the parent component (CourseDetailsPage) retains all business/state logic.
  This keeps components pure and easy to test while avoiding prop drilling by keeping only explicit props.
*/



type CourseHeroProps = {
   course: Course;
};

function CourseHero({ course }: CourseHeroProps) {
   return (
      <PageHeader
         variant="hero"
         title={course.title}
         description={course.description}
         breadcrumbs={[
            { label: 'Courses', path: '/courses' },
            { label: course.title },
         ]}
         className="mb-8"
         actions={
            <div className="hidden md:flex gap-4 text-sm font-medium text-novara-100">
               <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current" size={16} /> {course.rating}{' '}
                  Rating
               </div>
               <div className="flex items-center gap-2">
                  <Users size={16} /> {(course.studentsCount || 0).toLocaleString()} Students
               </div>
               <div className="flex items-center gap-2">
                  <Globe size={16} /> Also available in Spanish
               </div>
            </div>
         }
      />
   );
}

type TabsKey = 'overview' | 'syllabus' | 'reviews';

type CourseTabsProps = {
   activeTab: TabsKey;
   setActiveTab: (t: TabsKey) => void;
   className?: string;
};

function CourseTabs({ activeTab, setActiveTab, className }: CourseTabsProps) {
   const tabs: TabsKey[] = ['overview', 'syllabus', 'reviews'];

   // keyboard navigation for tabs (left/right arrows)
   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const idx = tabs.indexOf(activeTab);
      if (e.key === 'ArrowRight') {
         setActiveTab(tabs[(idx + 1) % tabs.length]);
      } else if (e.key === 'ArrowLeft') {
         setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length]);
      }
   };

   return (
      <div
         role="tablist"
         aria-label="Course sections"
         className={cn("bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex gap-2", className)}
         onKeyDown={handleKeyDown}
      >
         {tabs.map((tab) => {
            const isSelected = activeTab === tab;
            const tabId = `tab-${tab}`;
            const panelId = `tabpanel-${tab}`;
            return (
               <button
                  key={tab}
                  id={tabId}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                     'flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all',
                     isSelected
                        ? 'bg-novara-50 text-novara-700 shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  )}
                  type="button"
               >
                  {tab}
               </button>
            );
         })}
      </div>
   );
}

type CourseOverviewProps = {
   course: Course;
};

function CourseOverview({ course }: CourseOverviewProps) {
   return (
      <div className="space-y-8 animate-fade-in" role="tabpanel" id="tabpanel-overview" aria-labelledby="tab-overview">
         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">What you'll learn</h3>
            <div className="grid md:grid-cols-2 gap-4">
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3 items-start">
                     <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                     <span className="text-slate-600 text-sm leading-relaxed">
                        Master advanced concepts and apply them in real-world scenarios.
                     </span>
                  </div>
               ))}
            </div>
         </div>

         <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-500 leading-relaxed">
               {course.description ||
                  'No description available for this course. The instructor will provide more details soon.'}
               {' '}This comprehensive course captures the essence of modern development practices. Designed for professionals who want to scale their skills.
            </p>
         </div>

         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
               <li>Basic understanding of the subject matter.</li>
               <li>No prior advanced knowledge required.</li>
               <li>A computer with internet access.</li>
            </ul>
         </div>
      </div>
   );
}

type CourseSyllabusProps = {
   syllabus?: Module[];
   expandedModuleIndex: number | null;
   onToggleModule: (index: number) => void;
   isEnrolled: boolean;
   onLessonClick: (lessonId: string, isLocked: boolean) => void;
};

function CourseSyllabus({
   syllabus,
   expandedModuleIndex,
   onToggleModule,
   isEnrolled,
   onLessonClick,
}: CourseSyllabusProps) {
   if (!syllabus || syllabus.length === 0) {
      return (
         <div className="space-y-4 animate-fade-in" role="tabpanel" id="tabpanel-syllabus" aria-labelledby="tab-syllabus">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-bold text-slate-900">Course Content</h3>
               <span className="text-sm text-slate-500">No sections yet</span>
            </div>
            <div className="p-6 text-sm text-slate-500">This course does not yet have a syllabus. Check back later.</div>
         </div>
      );
   }

   return (
      <div className="space-y-4 animate-fade-in" role="tabpanel" id="tabpanel-syllabus" aria-labelledby="tab-syllabus">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-900">Course Content</h3>
            <span className="text-sm text-slate-500">{syllabus.length} Sections</span>
         </div>

         {syllabus.map((module, idx) => {
            const isExpanded = expandedModuleIndex === idx;
            const modulePanelId = `module-panel-${module.id}`;
            const moduleButtonId = `module-button-${module.id}`;

            return (
               <div key={module.id} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                     id={moduleButtonId}
                     aria-expanded={isExpanded}
                     aria-controls={modulePanelId}
                     onClick={() => onToggleModule(idx)}
                     className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                     type="button"
                  >
                     <div className="flex items-center gap-3">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        <span className="font-bold text-slate-800">{module.title}</span>
                     </div>
                     <span className="text-xs text-slate-500 font-medium">
                        {module.lessons.length} lessons • {module.duration}
                     </span>
                  </button>

                  {isExpanded && (
                     <div id={modulePanelId} className="bg-white divide-y divide-slate-100" role="region" aria-labelledby={moduleButtonId}>
                        {module.lessons.map((lesson) => {
                           const isLocked = !!lesson.locked && !isEnrolled;
                           return (
                              <div
                                 key={lesson.id}
                                 className={cn(
                                    "p-4 flex items-center justify-between group transition-colors",
                                    isLocked ? "opacity-75 cursor-not-allowed bg-slate-50/50" : "hover:bg-slate-50 cursor-pointer"
                                 )}
                                 onClick={() => onLessonClick(lesson.id, isLocked)}
                              >
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-novara-50 group-hover:text-novara-600 transition-colors">
                                       {lesson.type === 'video' ? <PlayCircle size={16} /> : <BookOpen size={16} />}
                                    </div>
                                    <span className={cn("text-sm font-medium", isLocked ? "text-slate-500" : "text-slate-700")}>{lesson.title}</span>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    {isLocked && <Lock size={14} className="text-slate-300" />}
                                    <span className="text-xs text-slate-400">{lesson.duration}</span>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  )}
               </div>
            );
         })}
      </div >
   );
}

type CourseReviewsProps = {
   rating?: number;
   // Placeholder reviews not typed from data source; we only show demo entries the same as before.
};

function CourseReviews({ rating }: CourseReviewsProps) {
   // In a real app, reviews would be passed in. For now preserve existing placeholder behavior.
   const reviewBars = useMemo(() => [5, 4, 3, 2, 1], []);
   const hasReviews = true; // keep previous behavior (placeholder reviews present)

   if (!hasReviews) {
      return (
         <div role="tabpanel" id="tabpanel-reviews" aria-labelledby="tab-reviews" className="p-6 text-sm text-slate-500">
            No reviews yet.
         </div>
      );
   }

   return (
      <div className="space-y-8 animate-fade-in" role="tabpanel" id="tabpanel-reviews" aria-labelledby="tab-reviews">
         <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="text-center">
               <div className="text-5xl font-bold text-slate-900">{rating ?? '—'}</div>
               <div className="flex gap-1 text-yellow-400 justify-center my-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                     <Star key={i} size={16} fill="currentColor" />
                  ))}
               </div>
               <div className="text-xs text-slate-500">Course Rating</div>
            </div>

            <div className="flex-1 space-y-2">
               {reviewBars.map((stars, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                     <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        {/* deterministic but harmless placeholder width */}
                        <div className="h-full bg-slate-400" style={{ width: `${20 * (5 - i)}%` }} />
                     </div>

                     <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, s) => (
                           <Star key={s} size={10} fill={s < stars ? 'currentColor' : 'none'} className={s >= stars ? 'text-slate-300' : ''} />
                        ))}
                     </div>

                     <span className="text-slate-400">{Math.floor((5 - i) * 10)}%</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            {[1, 2].map((i) => (
               <div key={i} className="border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-10 h-10 rounded-full bg-slate-200" />
                     <div>
                        <div className="font-bold text-slate-900">Student Name</div>
                        <div className="flex gap-2 text-xs text-slate-500">
                           <div className="flex gap-0.5 text-yellow-400">
                              {[...Array(5)].map((_, s) => (
                                 <Star key={s} size={10} fill="currentColor" />
                              ))}
                           </div>
                           <span>2 weeks ago</span>
                        </div>
                     </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                     This course was exactly what I needed. The instructor explains everything clearly and the projects are very practical.
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
}

import { Modal } from '../../../components/ui/Modal';

// ... existing imports

type CourseSidebarProps = {
   course: Course;
   isEnrolled: boolean;
   isInCart: boolean;
   onPrimaryAction: () => void;
   onPreview: () => void; // New prop
   totalResources: number;
   className?: string;
};

function CourseSidebar({ course, isEnrolled, isInCart, onPrimaryAction, onPreview, totalResources, className }: CourseSidebarProps) {
   return (
      <div className={cn("lg:col-span-1", className)}>
         <div>
            <Card className="p-0 overflow-hidden shadow-xl border-slate-200">
               <div className="relative h-48 bg-slate-900 group cursor-pointer overflow-hidden" onClick={onPreview}>
                  {course.thumbnail ? (
                     <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                     />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500">
                        <div className="text-center">
                           <div className="text-2xl font-bold">{course.title?.slice(0, 1) ?? 'C'}</div>
                           <div className="text-xs">No image</div>
                        </div>
                     </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                     <button
                        aria-label="Preview course"
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl border border-white/20"
                        type="button"
                        onClick={(e) => {
                           e.stopPropagation();
                           onPreview();
                        }}
                     >
                        <Play size={28} className="text-white fill-current ml-1" />
                     </button>
                     <span className="text-xs font-bold text-white tracking-widest uppercase opacity-90 drop-shadow-md"> Preview </span>
                  </div>
               </div>

               <div className="p-6 space-y-6">
                  {!isEnrolled && (
                     <div className="flex items-start gap-1">
                        <span className="text-xs text-slate-400 font-semibold relative top-1">$</span>
                        <span className="text-3xl font-extrabold text-slate-900">{course.price}</span>
                        {course.originalPrice && (
                           <span className="text-lg text-slate-400 line-through">${course.originalPrice}</span>
                        )}
                        {course.originalPrice && ( // Calculate discount percentage
                           <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                              {Math.round(((course.originalPrice - (course.price || 0)) / course.originalPrice) * 100)}% OFF
                           </span>
                        )}
                     </div>
                  )}

                  <div className="space-y-3">
                     <Button className="w-full text-lg font-bold py-6 shadow-glow" size="lg" onClick={onPrimaryAction}>
                        {isEnrolled ? 'Continue Learning' : isInCart ? 'Checkout Now' : 'Enroll Now'}
                     </Button>
                     {!isEnrolled && <p className="text-xs text-center text-slate-500">30-Day Money-Back Guarantee</p>}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-100">
                     <h4 className="font-bold text-slate-900 text-sm">This course includes:</h4>
                     <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-slate-600">
                           <Clock size={16} className="text-slate-400" />
                           <span>{course.duration ?? '—'} on-demand video</span>
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                           <BookOpen size={16} className="text-slate-400" />
                           <span>{totalResources} downloadable resources</span>
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                           <Award size={16} className="text-slate-400" />
                           <span>Certificate of completion</span>
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                           <Globe size={16} className="text-slate-400" />
                           <span>Full lifetime access</span>
                        </li>
                     </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                        {course.instructor ? course.instructor.charAt(0) : 'I'}
                     </div>
                     <div>
                        <div className="text-xs text-slate-400 font-bold uppercase">Instructor</div>
                        <div className="font-bold text-slate-900 text-sm">{course.instructor ?? '—'}</div>
                     </div>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   );
}

export const CourseDetailsPage: React.FC = () => {
   const { courseId } = useParams<{ courseId: string }>();
   const navigate = useNavigate();

   const { courses, enrollments } = useGlobal();
   const { addToCart, cartItems } = useCart();
   // const { user } = useAuth(); // unused

   // Business logic / data selectors
   const course: Course | undefined = useMemo(
      () => courses.find((c: Course) => c.id === courseId),
      [courses, courseId]
   );

   const enrollment = useMemo(() => enrollments[courseId || ''], [enrollments, courseId]);
   const isEnrolled = useMemo(() => !!enrollment, [enrollment]);

   const isInCart = useMemo(
      () => !!cartItems.some((item: { id: string }) => item.id === course?.id),
      [cartItems, course?.id]
   );

   // derived values
   // const totalLessons = useMemo(() => {
   //    if (!course?.syllabus) return 0;
   //    return course.syllabus.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
   // }, [course]);

   const totalResources = useMemo(() => {
      // maintain previous behaviour defaulting to 12 when unavailable
      if (!course?.syllabus) return 12;
      return course.syllabus.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 12;
   }, [course]);

   // UI state
   const [activeTab, setActiveTab] = useState<TabsKey>('overview');
   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
   // keep previous behavior where first module (index 0) is expanded by default; null = none
   const [expandedModuleIndex, setExpandedModuleIndex] = useState<number | null>(0);

   // Intention-revealing handlers
   const handleToggleModule = useCallback((index: number) => {
      setExpandedModuleIndex((prev) => (prev === index ? null : index));
   }, []);

   const navigateToFirstLesson = useCallback(
      (courseIdToUse: string) => {
         const firstModule = course?.syllabus?.[0];
         const firstLesson = firstModule?.lessons?.[0];
         if (firstLesson) {
            navigate(`/courses/${courseIdToUse}/lessons/${firstLesson.id}`);
         }
      },
      [navigate, course]
   );

   const handleLessonClick = useCallback((lessonId: string, isLocked: boolean) => {
      if (isLocked && !isEnrolled) return;
      navigate(`/courses/${courseId}/lessons/${lessonId}`);
   }, [navigate, courseId, isEnrolled]);

   const handleAddCourseToCart = useCallback(
      (courseToAdd: Course) => {
         addToCart(courseToAdd);
         navigate('/cart');
      },
      [addToCart, navigate]
   );

   // Primary action that decides intent based on enrollment/cart state
   const handlePrimaryAction = useCallback(() => {
      if (!course) return;
      if (isEnrolled) {
         navigateToFirstLesson(course.id);
      } else if (isInCart) {
         navigate('/cart');
      } else {
         handleAddCourseToCart(course);
      }
   }, [course, isEnrolled, isInCart, navigateToFirstLesson, handleAddCourseToCart, navigate]);

   if (!course) {
      return <div className="p-8 text-center">Course not found</div>;
   }

   return (
      <div className="min-h-screen bg-slate-50 font-sans pb-20">
         <CourseHero course={course} />

         <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-20 relative z-10">
            {/* --- LEFT COLUMN: CONTENT --- */}
            <div className="lg:col-span-2 relative">
               <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} className="sticky top-4 z-30 bg-white" />

               <section className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[400px]">
                  {/* OVERVIEW */}
                  {activeTab === 'overview' && <CourseOverview course={course} />}

                  {/* SYLLABUS */}
                  {activeTab === 'syllabus' && (
                     <CourseSyllabus
                        syllabus={course.syllabus}
                        expandedModuleIndex={expandedModuleIndex}
                        onToggleModule={handleToggleModule}
                        isEnrolled={isEnrolled}
                        onLessonClick={handleLessonClick}
                     />
                  )}

                  {/* REVIEWS */}
                  {activeTab === 'reviews' && <CourseReviews rating={course.rating} />}
               </section>
            </div>

            {/* --- RIGHT COLUMN: STICKY SIDEBAR --- */}
            <CourseSidebar
               course={course}
               isEnrolled={isEnrolled}
               isInCart={isInCart}
               onPrimaryAction={handlePrimaryAction}
               onPreview={() => setIsPreviewOpen(true)}
               totalResources={totalResources}
               className="sticky top-24 z-20"
            />
         </div>

         {/* PREVIEW MODAL */}
         <Modal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            title={`Preview: ${course.title}`}
            maxWidth="4xl"
            className="p-0 overflow-hidden bg-black"
         >
            <div className="relative aspect-video bg-black w-full">
               <iframe
                  width="100%"
                  height="100%"
                  src={course.previewVideoUrl || "https://www.youtube.com/embed/SqcY0GlETPk?autoplay=1"}
                  title="Course Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
               ></iframe>
            </div>
            <div className="p-4 bg-white">
               <h4 className="font-bold text-lg mb-2">Course Preview</h4>
               <p className="text-slate-600">Get a sneak peek into the course content. Watch the introduction to see if this course is right for you.</p>
               <div className="mt-4 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
                  <Button onClick={() => { setIsPreviewOpen(false); handlePrimaryAction(); }}>
                     {isEnrolled ? 'Continue Course' : 'Enroll Now'}
                  </Button>
               </div>
            </div>
         </Modal>
      </div>
   );
};