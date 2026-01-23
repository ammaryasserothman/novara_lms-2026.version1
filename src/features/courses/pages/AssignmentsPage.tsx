import React, { useState } from 'react';
import {
   Layout, List, Plus, CheckCircle2, Clock,
   MoreVertical, Calendar
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { PageHeader } from '../components/PageHeader';
import { cn } from '../../../utils/cn';

interface Assignment {
   id: string;
   title: string;
   course: string;
   dueDate: string;
   status: 'pending' | 'submitted' | 'graded';
   grade?: string;
   description: string;
}

const MOCK_ASSIGNMENTS: Assignment[] = [
   { id: '1', title: 'React Component Architecture', course: 'Advanced React Patterns', dueDate: 'Oct 24, 2024', status: 'pending', description: 'Build a reusable Modal component with Portals.' },
   { id: '2', title: 'API Integration Project', course: 'Next.js 14 Masterclass', dueDate: 'Oct 28, 2024', status: 'submitted', description: 'Connect the dashboard to the real backend API.' },
   { id: '3', title: 'Database Schema Design', course: 'Backend Fundamentals', dueDate: 'Oct 15, 2024', status: 'graded', grade: '95/100', description: 'Design a normalized schema for an E-commerce app.' },
   { id: '4', title: 'UI Animation Challenge', course: 'CSS Animation Mastery', dueDate: 'Nov 02, 2024', status: 'pending', description: 'Recreate the stripe landing page animation.' },
];

export const AssignmentsPage: React.FC = () => {
   const [view, setView] = useState<'kanban' | 'list'>('kanban');

   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">
         <PageHeader
            title="Assignments"
            description="Track your tasks, submissions, and grades."
            breadcrumbs={[
               { label: 'Dashboard', path: '/dashboard' },
               { label: 'Assignments' }
            ]}
            actions={
               <div className="flex gap-4">
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                     <button
                        onClick={() => setView('kanban')}
                        className={cn("p-2 rounded-md transition-all", view === 'kanban' ? "bg-white shadow text-novara-600" : "text-slate-500 hover:text-slate-700")}
                     >
                        <Layout size={18} />
                     </button>
                     <button
                        onClick={() => setView('list')}
                        className={cn("p-2 rounded-md transition-all", view === 'list' ? "bg-white shadow text-novara-600" : "text-slate-500 hover:text-slate-700")}
                     >
                        <List size={18} />
                     </button>
                  </div>
                  <Button icon={<Plus size={18} />}>Submit New</Button>
               </div>
            }
         />

         {view === 'kanban' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* TODO COLUMN */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-500 px-2 uppercase tracking-wide">
                     <span>To Do</span>
                     <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                        {MOCK_ASSIGNMENTS.filter(a => a.status === 'pending').length}
                     </span>
                  </div>
                  <div className="space-y-4">
                     {MOCK_ASSIGNMENTS.filter(a => a.status === 'pending').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                     ))}
                  </div>
               </div>

               {/* SUBMITTED COLUMN */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-500 px-2 uppercase tracking-wide">
                     <span>Submitted</span>
                     <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                        {MOCK_ASSIGNMENTS.filter(a => a.status === 'submitted').length}
                     </span>
                  </div>
                  <div className="space-y-4">
                     {MOCK_ASSIGNMENTS.filter(a => a.status === 'submitted').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                     ))}
                  </div>
               </div>

               {/* GRADED COLUMN */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-500 px-2 uppercase tracking-wide">
                     <span>Graded</span>
                     <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-xs">
                        {MOCK_ASSIGNMENTS.filter(a => a.status === 'graded').length}
                     </span>
                  </div>
                  <div className="space-y-4">
                     {MOCK_ASSIGNMENTS.filter(a => a.status === 'graded').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                     ))}
                  </div>
               </div>
            </div>
         ) : (
            <Card className="divide-y divide-slate-100">
               {MOCK_ASSIGNMENTS.map(assignment => (
                  <div key={assignment.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                     <div className="flex items-center gap-4">
                        <div className={cn(
                           "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                           assignment.status === 'pending' ? "bg-slate-100 text-slate-500" :
                              assignment.status === 'submitted' ? "bg-blue-50 text-blue-500" :
                                 "bg-green-50 text-green-500"
                        )}>
                           {assignment.status === 'pending' ? <Clock size={20} /> :
                              assignment.status === 'submitted' ? <CheckCircle2 size={20} /> :
                                 <CheckCircle2 size={20} />}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900">{assignment.title}</h4>
                           <div className="text-sm text-slate-500">{assignment.course}</div>
                        </div>
                     </div>

                     <div className="flex items-center gap-8">
                        <div className="text-sm text-slate-500 flex items-center gap-2">
                           <Calendar size={14} /> {assignment.dueDate}
                        </div>
                        <div className="w-24 text-right">
                           {assignment.status === 'graded' ? (
                              <span className="font-bold text-green-600">{assignment.grade}</span>
                           ) : (
                              <span className={cn(
                                 "px-2 py-1 rounded-full text-xs font-bold uppercase",
                                 assignment.status === 'pending' ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-blue-600"
                              )}>
                                 {assignment.status}
                              </span>
                           )}
                        </div>
                        <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400">
                           <MoreVertical size={16} />
                        </button>
                     </div>
                  </div>
               ))}
            </Card>
         )}
      </div>
   );
};

const AssignmentCard: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
   return (
      <Card className="hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-novara-500 cursor-pointer group">
         <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase text-slate-400">{assignment.course}</span>
            {assignment.status === 'pending' && <Clock size={14} className="text-amber-500" />}
         </div>
         <h3 className="font-bold text-slate-900 mb-2 group-hover:text-novara-600 transition-colors">{assignment.title}</h3>
         <p className="text-xs text-slate-500 mb-4 line-clamp-2">{assignment.description}</p>

         <div className="flex justify-between items-center text-xs">
            <span className={cn(
               "font-medium flex items-center gap-1",
               assignment.status === 'pending' ? "text-amber-600" :
                  assignment.status === 'submitted' ? "text-blue-600" : "text-green-600"
            )}>
               {assignment.dueDate}
            </span>
            {assignment.grade && <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{assignment.grade}</span>}
         </div>
      </Card>
   );
}