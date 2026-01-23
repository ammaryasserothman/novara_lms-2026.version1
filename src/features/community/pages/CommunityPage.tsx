import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { ThreadList, ThreadDetail, CreateThreadModal } from '../components';
import { THREADS } from '../constants/mockData';

export const CommunityPage: React.FC = () => {
   const { user } = useAuth();

   // State
   const [selectedThreadId, setSelectedThreadId] = useState<string | null>('t2'); // Default selection
   const [activeTab, setActiveTab] = useState<'all' | 'content' | 'questions' | 'announcements'>('all');
   const [searchQuery, setSearchQuery] = useState('');
   const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

   // Local threads state to verify "Add Post" works in UI
   const [threads, setThreads] = useState(THREADS);

   const activeThread = threads.find(t => t.id === selectedThreadId);

   const handleThreadClick = (id: string) => {
      setSelectedThreadId(id);
      setIsMobileDetailOpen(true);
   };

   const handleCreateThread = (data: { title: string; content: string; category: string; tags: string[] }) => {
      // Mock adding a new thread
      const newThread = {
         id: `t${Date.now()}`,
         title: data.title,
         author: {
            name: user?.name || 'You',
            avatar: user?.avatar || '',
            role: user?.role === 'instructor' ? 'Instructor' : 'Student'
         },
         date: 'Just now',
         preview: data.content,
         replies: 0,
         likes: 0,
         tags: data.tags.length > 0 ? data.tags : [data.category],
         isPinned: false,
         isResolved: false,
         category: data.category
      };

      setThreads([newThread, ...threads]);
      setSelectedThreadId(newThread.id);
      setIsMobileDetailOpen(true);
   };

   return (
      <div className="font-sans text-slate-600 max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col">

         {/* --- HEADER --- */}
         <div className="flex flex-col gap-6 mb-6 shrink-0 mt-8 px-4 md:px-0">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold text-slate-900">Community</h1>
                  <p className="text-slate-500 mt-1">Connect with {user?.role === 'instructor' ? 'students' : 'instructors'} and peers.</p>
               </div>
               <Button
                  icon={<Plus size={18} />}
                  className="shadow-lg shadow-novara-500/20"
                  onClick={() => setIsCreateModalOpen(true)}
               >
                  New Discussion
               </Button>
            </div>
         </div>

         {/* --- MAIN LAYOUT --- */}
         <div className="flex-1 flex gap-6 min-h-0 relative">

            {/* --- LEFT COLUMN: THREAD LIST --- */}
            <ThreadList
               selectedThreadId={selectedThreadId}
               onSelectThread={handleThreadClick}
               activeTab={activeTab}
               onTabChange={setActiveTab}
               searchQuery={searchQuery}
               onSearchChange={setSearchQuery}
               isMobileOpen={isMobileDetailOpen}
            />

            {/* --- RIGHT COLUMN: DISCUSSION DETAIL --- */}
            <ThreadDetail
               activeThread={activeThread}
               isMobileOpen={isMobileDetailOpen}
               onClose={() => setIsMobileDetailOpen(false)}
            />

         </div>

         {/* --- MODALS --- */}
         <CreateThreadModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateThread}
         />
      </div>
   );
};
