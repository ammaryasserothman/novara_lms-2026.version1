import React, { useState, useMemo } from 'react';
import {
   ChevronLeft, ChevronRight, Calendar as CalendarIcon,
   Clock, CheckCircle2, AlertCircle, Video, FileText,
   HelpCircle, MoreHorizontal, ArrowRight, Download,
   Filter, Plus, RefreshCw
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const EVENTS = [
   {
      id: 'e1',
      title: 'React Fundamentals Quiz',
      course: 'Advanced React Patterns',
      type: 'quiz', // quiz, assignment, live
      date: new Date(2024, 9, 24, 14, 0), // Oct 24, 2024
      duration: '45m',
      status: 'upcoming',
      attendees: ['https://i.pravatar.cc/150?u=1']
   },
   {
      id: 'e2',
      title: 'Component Library Project',
      course: 'UI Design Systems',
      type: 'assignment',
      date: new Date(2024, 9, 28, 23, 59), // Oct 28, 2024
      duration: 'Est. 3h',
      status: 'due_soon',
      attendees: []
   },
   {
      id: 'e3',
      title: 'Live Q&A: State Management',
      course: 'Advanced React Patterns',
      type: 'live',
      date: new Date(2024, 9, 26, 10, 0), // Oct 26, 2024
      duration: '1h 30m',
      status: 'upcoming',
      attendees: ['https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4']
   },
   {
      id: 'e4',
      title: 'UX Research Methods Essay',
      course: 'Digital Product Design',
      type: 'assignment',
      date: new Date(2024, 9, 15, 23, 59), // Oct 15, 2024
      duration: 'Est. 2h',
      status: 'overdue',
      attendees: []
   },
   {
      id: 'e5',
      title: 'Capstone Project Draft',
      course: 'Enterprise Project Management',
      type: 'assignment',
      date: new Date(2024, 10, 5, 12, 0), // Nov 5, 2024
      duration: 'Est. 5h',
      status: 'upcoming',
      attendees: []
   }
];

// Helper to get type styles
const getTypeStyles = (type: string) => {
   switch (type) {
      case 'quiz': return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', dot: 'bg-indigo-500', icon: HelpCircle };
      case 'assignment': return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-100', dot: 'bg-teal-500', icon: FileText };
      case 'live': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', dot: 'bg-orange-500', icon: Video };
      default: return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100', dot: 'bg-slate-500', icon: CalendarIcon };
   }
};

export const CalendarPage: React.FC = () => {
   const navigate = useNavigate();
   const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // Start at Oct 2024 for demo
   const [view, setView] = useState<'month' | 'week' | 'day'>('month');
   const [filter, setFilter] = useState<'all' | 'quiz' | 'assignment' | 'live'>('all');
   const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null);

   // Calendar Logic
   const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
   const startDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = Sun

   const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
   const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

   // Memoized Filtered Events
   const filteredEvents = useMemo(() => {
      return EVENTS.filter(e => filter === 'all' || e.type === filter);
   }, [filter]);

   // Memoized Events by Day Map for O(1) lookups during render
   const eventsByDay = useMemo(() => {
      const map = new Map<number, typeof EVENTS>();

      for (const event of filteredEvents) {
         if (
            event.date.getMonth() === currentDate.getMonth() &&
            event.date.getFullYear() === currentDate.getFullYear()
         ) {
            const day = event.date.getDate();
            const existing = map.get(day) || [];
            existing.push(event);
            map.set(day, existing);
         }
      }
      return map;
   }, [filteredEvents, currentDate]);

   // Memoized Upcoming Deadlines
   const upcomingDeadlines = useMemo(() => {
      // Mock "today" as Oct 20
      const todayMock = new Date(2024, 9, 20);
      return [...filteredEvents]
         .sort((a, b) => a.date.getTime() - b.date.getTime())
         .filter(e => e.date >= todayMock);
   }, [filteredEvents]);

   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">

         {/* --- HEADER --- */}
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-slate-200 pb-8">
            <div>
               <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span className="hover:text-novara-600 cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</span>
                  <ArrowRight size={14} />
                  <span className="font-semibold text-slate-800">Calendar</span>
               </div>
               <h1 className="text-3xl font-bold text-slate-900">Calendar & Deadlines</h1>
               <p className="text-lg text-slate-500 mt-1">
                  Stay on track with your learning schedule.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
               {/* View Toggles */}
               <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto shadow-inner">
                  {['month', 'week', 'day'].map((v) => (
                     <button
                        key={v}
                        onClick={() => setView(v as 'month' | 'week' | 'day')}
                        className={cn(
                           "flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                           view === v
                              ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                        )}
                     >
                        {v}
                     </button>
                  ))}
               </div>

               {/* Sync Button */}
               <Button variant="outline" icon={<RefreshCw size={16} />} className="hidden sm:flex border-slate-200 text-slate-600 hover:bg-slate-50">Sync</Button>
               <Button icon={<Plus size={18} />} className="shadow-lg shadow-novara-500/30">Add Event</Button>
            </div>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

            {/* --- LEFT COLUMN: CALENDAR GRID --- */}
            <div className="xl:col-span-3 space-y-6">

               {/* Toolbar */}
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronLeft size={20} /></button>
                        <h2 className="text-xl font-bold text-slate-900 min-w-[180px] text-center">
                           {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronRight size={20} /></button>
                     </div>
                     <button
                        className="text-sm font-bold text-novara-600 hover:text-novara-700 bg-novara-50 px-3 py-1.5 rounded-lg transition-colors border border-novara-100"
                        onClick={() => setCurrentDate(new Date(2024, 9, 1))} // Reset to mock today
                     >
                        Today
                     </button>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
                     <Filter size={16} className="text-slate-400 mr-2 shrink-0" />
                     {['all', 'quiz', 'assignment', 'live'].map(f => (
                        <button
                           key={f}
                           onClick={() => setFilter(f as 'all' | 'quiz' | 'assignment' | 'live')}
                           className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-bold capitalize border transition-all whitespace-nowrap",
                              filter === f
                                 ? "bg-slate-800 text-white border-slate-800 shadow-md transform scale-105"
                                 : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                           )}
                        >
                           {f}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Month Grid */}
               <Card padding="none" className="overflow-hidden min-h-[600px] flex flex-col shadow-xl shadow-slate-200/50 border-slate-200">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50 backdrop-blur-sm">
                     {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                           {day}
                        </div>
                     ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-slate-200 gap-px border-l border-slate-200">
                     {/* Empty padding days */}
                     {[...Array(startDayOfWeek)].map((_, i) => (
                        <div key={`empty-${i}`} className="bg-slate-50/30 min-h-[120px]" />
                     ))}

                     {/* Actual days */}
                     {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const isToday = day === 24 && currentDate.getMonth() === 9; // Mock today as Oct 24
                        const dayEvents = eventsByDay.get(day) || [];

                        return (
                           <div key={day} className={cn("bg-white p-2 min-h-[140px] group hover:bg-slate-50 transition-colors relative flex flex-col gap-1", isToday && "bg-novara-50/10")}>
                              <div className="flex justify-between items-start mb-1">
                                 <span className={cn(
                                    "text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full transition-all",
                                    isToday ? "bg-novara-600 text-white font-bold shadow-lg shadow-novara-500/30 scale-110" : "text-slate-700 group-hover:bg-slate-200"
                                 )}>
                                    {day}
                                 </span>
                                 {dayEvents.length > 0 && (
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">{dayEvents.length}</span>
                                 )}
                              </div>

                              <div className="space-y-1 overflow-y-auto max-h-[100px] pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                                 {dayEvents.map(event => {
                                    const styles = getTypeStyles(event.type);
                                    return (
                                       <button
                                          key={event.id}
                                          onClick={() => setSelectedEvent(event)}
                                          className={cn(
                                             "w-full text-left p-2 rounded-lg text-xs font-medium border truncate transition-all hover:shadow-md hover:-translate-y-0.5 group/event relative overflow-hidden",
                                             styles.bg, styles.text, styles.border
                                          )}
                                       >
                                          {/* Status Indicator Stripe */}
                                          <div className={cn("absolute left-0 top-0 bottom-0 w-1", styles.dot)} />
                                          <div className="pl-2 flex items-center gap-1.5">
                                             <span className="truncate">{event.title}</span>
                                             {event.attendees.length > 0 && (
                                                <div className="flex -space-x-1 shrink-0 ml-auto">
                                                   {event.attendees.slice(0, 3).map((src, idx) => (
                                                      <img key={idx} src={src} className="w-3 h-3 rounded-full ring-1 ring-white" alt="" />
                                                   ))}
                                                </div>
                                             )}
                                          </div>
                                       </button>
                                    );
                                 })}
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </Card>
            </div>

            {/* --- RIGHT COLUMN: UPCOMING DEADLINES --- */}
            <div className="xl:col-span-1 space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Upcoming</h2>
                  <Button variant="ghost" size="sm" className="text-xs">View All</Button>
               </div>

               <div className="space-y-4">
                  {upcomingDeadlines.length > 0 ? (
                     upcomingDeadlines.map((event) => {
                        const styles = getTypeStyles(event.type);
                        const isUrgent = event.status === 'due_soon' || event.status === 'overdue';

                        return (
                           <Card
                              key={event.id}
                              padding="sm"
                              className={cn(
                                 "border-l-4 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1 duration-300",
                                 isUrgent ? "border-l-red-500" : "border-l-slate-200 hover:border-l-novara-400"
                              )}
                              onClick={() => setSelectedEvent(event)}
                           >
                              <div className="flex justify-between items-start mb-3">
                                 <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded", styles.bg, styles.text)}>
                                    {event.type}
                                 </span>
                                 {isUrgent ? (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 uppercase animate-pulse">
                                       <AlertCircle size={10} /> {event.status === 'overdue' ? 'Overdue' : 'Due Soon'}
                                    </span>
                                 ) : (
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase">Upcoming</span>
                                 )}
                              </div>

                              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-novara-700 transition-colors line-clamp-2">
                                 {event.title}
                              </h3>
                              <p className="text-xs text-slate-500 mb-4 line-clamp-1">{event.course}</p>

                              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                                 <span className={cn("flex items-center gap-1.5 font-bold", isUrgent ? "text-red-500" : "text-slate-400")}>
                                    <Clock size={14} />
                                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                 </span>
                                 <span className="text-slate-400 font-medium">
                                    {event.duration}
                                 </span>
                              </div>
                           </Card>
                        );
                     })
                  ) : (
                     <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                        <CheckCircle2 size={40} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-slate-500 font-medium">All caught up!</p>
                        <p className="text-xs text-slate-400">No deadlines for the next 7 days.</p>
                     </div>
                  )}
               </div>

               {/* Sync Hint */}
               <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
                  <CalendarIcon className="mx-auto mb-3 text-novara-400" size={28} />
                  <h4 className="font-bold mb-1">Sync to Calendar</h4>
                  <p className="text-xs text-slate-400 mb-4">Get deadlines delivered to your Google or Apple Calendar.</p>
                  <Button size="sm" variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-white hover:text-slate-900 justify-center transition-all">
                     Connect Account
                  </Button>
               </div>
            </div>

         </div>

         {/* --- EVENT MODAL --- */}
         {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
                  <div className={cn("h-32 p-6 flex items-start justify-end transition-colors", getTypeStyles(selectedEvent.type).bg)}>
                     <button
                        onClick={() => setSelectedEvent(null)}
                        className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-slate-600 backdrop-blur-sm"
                     >
                        <ArrowRight size={20} className="rotate-45" /> {/* Close icon visual hack using rotate */}
                     </button>
                  </div>

                  <div className="px-8 pb-8 -mt-12 relative">
                     <div className={cn(
                        "w-24 h-24 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center mb-4 text-white text-3xl font-extrabold transform -rotate-3",
                        getTypeStyles(selectedEvent.type).dot
                     )}>
                        {selectedEvent.date.getDate()}
                     </div>

                     <span className={cn("text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 inline-block shadow-sm", getTypeStyles(selectedEvent.type).bg, getTypeStyles(selectedEvent.type).text)}>
                        {selectedEvent.type}
                     </span>

                     <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{selectedEvent.title}</h2>
                     <p className="text-slate-500 font-medium mb-8 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        {selectedEvent.course}
                     </p>

                     <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                           <CalendarIcon size={18} className="text-novara-500" />
                           <span className="font-medium">{selectedEvent.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                           <Clock size={18} className="text-novara-500" />
                           <span className="font-medium">Due at {selectedEvent.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} • Duration: {selectedEvent.duration}</span>
                        </div>
                        {selectedEvent.status === 'overdue' && (
                           <div className="flex items-center gap-3 text-sm text-red-600 font-bold bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm">
                              <AlertCircle size={18} />
                              <span>This item is overdue. Please submit ASAP.</span>
                           </div>
                        )}
                     </div>

                     <div className="flex gap-3">
                        <Button className="flex-1 justify-center shadow-lg shadow-novara-500/20 py-3 font-bold text-base" onClick={() => {
                           setSelectedEvent(null);
                           navigate(selectedEvent.type === 'assignment' ? `/courses/c1/assignments` : `/courses/c1`); // Mock navigation
                        }}>
                           Go to {selectedEvent.type === 'live' ? 'Session' : 'Assessment'}
                        </Button>
                        <Button variant="outline" className="px-4 border-slate-200 hover:bg-slate-50" icon={<Download size={20} />} />
                        <Button variant="outline" className="px-4 border-slate-200 hover:bg-slate-50" icon={<MoreHorizontal size={20} />} />
                     </div>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};