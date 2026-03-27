import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
   PlayCircle, ChevronLeft, ChevronRight,
   MessageCircle, FileText, Download, Maximize2,
   Minimize2, ChevronDown, ChevronUp, CheckCircle2, Play
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useGlobal } from '../../../context/GlobalContext';
import { cn } from '../../../utils/cn';
import { Module, Lesson } from '../../../types';

export const LessonPage: React.FC = () => {
   const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
   const navigate = useNavigate();
   const { courses, enrollments } = useGlobal();

   const [sidebarOpen, setSidebarOpen] = useState(true);
   const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'notes'>('overview');
   const [expandedModule, setExpandedModule] = useState<number | null>(0); // Default open first module

   const course = courses.find(c => c.id === courseId);
   const enrollment = enrollments[courseId || ''];

   // Find current lesson and module
   // Use flatMap/find to let TS infer types correctly
   const currentModule = course?.syllabus.find((m: Module) => m.lessons.some((l: Lesson) => l.id === lessonId));
   const currentModuleIdx = course?.syllabus.findIndex((m: Module) => m.lessons.some((l: Lesson) => l.id === lessonId)) ?? 0;
   const currentLesson = currentModule?.lessons.find((l: Lesson) => l.id === lessonId) || null;

   // Pre-calculate previous and next lessons in O(N) single pass without array allocations
   const { prevLessonId, nextLessonId } = useMemo(() => {
      let prevId: string | null = null;
      let nextId: string | null = null;
      let foundCurrent = false;

      if (!course) return { prevLessonId: null, nextLessonId: null };

      for (const module of course.syllabus) {
         for (const lesson of module.lessons) {
            if (foundCurrent) {
               nextId = lesson.id;
               break;
            }
            if (lesson.id === lessonId) {
               foundCurrent = true;
            } else {
               prevId = lesson.id;
            }
         }
         if (nextId) break;
      }

      return { prevLessonId: prevId, nextLessonId: nextId };
   }, [course, lessonId]);

   if (!course || !currentLesson) return <div>Lesson not found</div>;

   return (
      <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">

         {/* --- SIDEBAR NAVIGATION --- */}
         <div
            className={cn(
               "fixed inset-y-0 left-0 z-30 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col",
               sidebarOpen ? "translate-x-0" : "-translate-x-full",
               "md:relative md:translate-x-0",
               !sidebarOpen && "md:w-0 md:border-none overflow-hidden"
            )}
         >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 min-w-[320px]">
               <h3 className="font-bold text-slate-800 truncate pr-2">Course Content</h3>
               <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-slate-800">
                  <ChevronLeft size={20} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto min-w-[320px]">
               {course.syllabus.map((module, mIdx) => (
                  <div key={module.id} className="border-b border-slate-100">
                     <button
                        onClick={() => setExpandedModule(expandedModule === mIdx ? null : mIdx)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                     >
                        <div className="flex-1 min-w-0 pr-2">
                           <div className="text-xs font-bold text-slate-500 uppercase mb-1">Section {mIdx + 1}</div>
                           <div className="text-sm font-bold text-slate-800 truncate">{module.title}</div>
                        </div>
                        {expandedModule === mIdx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                     </button>

                     {expandedModule === mIdx && (
                        <div className="bg-white">
                           {module.lessons.map((lesson) => {
                              const isActive = lesson.id === lessonId;
                              const isCompleted = enrollment?.completedLessons.includes(lesson.id);

                              return (
                                 <div
                                    key={lesson.id}
                                    onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                                    className={cn(
                                       "p-3 pl-4 flex items-start gap-3 cursor-pointer transition-colors border-l-4",
                                       isActive
                                          ? "bg-novara-50 border-novara-500"
                                          : "border-transparent hover:bg-slate-50"
                                    )}
                                 >
                                    <div className="mt-0.5 shrink-0">
                                       {isActive ? (
                                          <PlayCircle size={16} className="text-novara-600 fill-novara-100" />
                                       ) : isCompleted ? (
                                          <CheckCircle2 size={16} className="text-green-500 fill-green-100" />
                                       ) : (
                                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                                       )}
                                    </div>
                                    <div className="flex-1">
                                       <div className={cn("text-sm", isActive ? "font-bold text-novara-700" : "text-slate-600")}>
                                          {lesson.title}
                                       </div>
                                       <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                          <PlayCircle size={10} /> {lesson.duration}
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>

         {/* --- MAIN CONTENT AREA --- */}
         <div className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">

            {/* Top Bar (Navigation + Title) */}
            <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
               <div className="flex items-center gap-4">
                  <button
                     onClick={() => setSidebarOpen(!sidebarOpen)}
                     className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                     title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                  >
                     {sidebarOpen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                  <div className="h-6 w-px bg-slate-200" />
                  <button
                     onClick={() => navigate(`/courses/${courseId}`)}
                     className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-novara-600 transition-colors"
                  >
                     <ChevronLeft size={16} />
                     Back to Course Home
                  </button>
               </div>

               {/* Progress Mini-bar */}
               <div className="flex items-center gap-4">
                  <div className="hidden md:block text-right">
                     <div className="text-xs font-bold text-slate-500 uppercase">Your Progress</div>
                     <div className="text-sm font-bold text-novara-600">{enrollment?.progress || 0}% Completed</div>
                  </div>
                  <div className="w-32 md:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-novara-500 transition-all duration-300" style={{ width: `${enrollment?.progress || 0}%` }} />
                  </div>
               </div>
            </div>

            {/* Scrolling Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
               <div className="max-w-4xl mx-auto space-y-8">

                  {/* Video Player */}
                  <div className="aspect-video bg-slate-900 rounded-2xl shadow-2xl relative overflow-hidden group">
                     {/* Placeholder Video Interface */}
                     <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover opacity-60" alt="Video Placeholder" />

                     <div className="absolute inset-0 flex items-center justify-center">
                        <button className="relative w-20 h-20 rounded-full bg-slate-400/40 backdrop-blur-md flex items-center justify-center shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:bg-slate-400/50">
                           <Play size={32} className="text-white ml-1 fill-current" />
                        </button>
                     </div>

                     {/* Fake Controls */}
                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-bold text-sm">{currentLesson.title}</div>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                           <div className="w-1/3 h-full bg-novara-500 relative">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm scale-0 group-hover:scale-100 transition-transform" />
                           </div>
                        </div>
                        <div className="text-xs font-mono">04:20 / {currentLesson.duration}</div>
                     </div>
                  </div>

                  {/* Lesson Header */}
                  <div className="flex justify-between items-start">
                     <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{currentLesson.title}</h1>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                           <span>Lesson {currentModuleIdx + 1}.{course.syllabus[currentModuleIdx].lessons.findIndex(l => l.id === lessonId) + 1}</span>
                           <span>•</span>
                           <span>Last updated Oct 2024</span>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <Button
                           variant="outline"
                           className="hidden sm:flex"
                           icon={<ChevronLeft size={16} />}
                           onClick={() => {
                              if (prevLessonId) {
                                 navigate(`/courses/${courseId}/lessons/${prevLessonId}`);
                              }
                           }}
                           disabled={!prevLessonId}
                        >
                           Previous
                        </Button>
                        <Button
                           className="bg-novara-600 hover:bg-novara-700 text-white"
                           icon={<ChevronRight size={16} />}
                           onClick={() => {
                              if (nextLessonId) {
                                 navigate(`/courses/${courseId}/lessons/${nextLessonId}`);
                              }
                           }}
                           disabled={!nextLessonId}
                        >
                           Next Lesson
                        </Button>
                     </div>
                  </div>

                  {/* Content Tabs */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
                     <div className="border-b border-slate-100 flex">
                        {[
                           { id: 'overview', label: 'Overview', icon: <FileText size={16} /> },
                           { id: 'qa', label: 'Q&A', icon: <MessageCircle size={16} /> },
                           { id: 'notes', label: 'Notes', icon: <FileText size={16} /> },
                           { id: 'resources', label: 'Resources', icon: <Download size={16} /> }
                        ].map(tab => (
                           <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as 'overview' | 'qa' | 'notes')}
                              className={cn(
                                 "px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors",
                                 activeTab === tab.id
                                    ? "border-novara-500 text-novara-600 bg-novara-50/10"
                                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                              )}
                           >
                              {tab.icon} {tab.label}
                           </button>
                        ))}
                     </div>

                     <div className="p-8">
                        {activeTab === 'overview' && (
                           <div className="prose prose-slate max-w-none">
                              <p>In this lesson, we will cover the fundamental aspects of <strong>{currentLesson.title}</strong>. By the end of this video, you will be able to:</p>
                              <ul>
                                 <li>Understand the core principles.</li>
                                 <li>Apply techniques in real-world scenarios.</li>
                                 <li>Debug common issues related to this topic.</li>
                              </ul>
                              <p>Make sure to download the attached resources for the starter code.</p>
                           </div>
                        )}
                        {activeTab === 'qa' && (
                           <div className="text-center py-12 text-slate-500">
                              <MessageCircle size={48} className="mx-auto mb-4 text-slate-200" />
                              <h3 className="text-lg font-bold text-slate-900">No questions yet</h3>
                              <p className="mb-6">Be the first to ask a question about this lesson.</p>
                              <Button variant="outline">Ask a Question</Button>
                           </div>
                        )}
                        {activeTab === 'notes' && (
                           <div className="text-center py-12 text-slate-500">
                              <p>You haven't taken any notes for this lesson yet.</p>
                              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-left max-w-lg mx-auto">
                                 <span className="font-bold text-yellow-800 block mb-1">Pro Tip:</span>
                                 Taking notes helps retention by 40%. Click the button below to start.
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

               </div>
            </div>

         </div>
      </div>
   );
};