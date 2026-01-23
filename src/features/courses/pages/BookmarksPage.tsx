import React, { useState } from 'react';
import {
   LayoutGrid, List, Search,
   MoreVertical, FileText, Video, Link as LinkIcon,
   Download, Trash2, ExternalLink, Bookmark as BookmarkIcon
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { PageHeader } from '../components/PageHeader';
import { cn } from '../../../utils/cn';

interface BookmarkItem {
   id: string;
   title: string;
   type: 'video' | 'article' | 'resource' | 'link';
   course: string;
   dateAdded: string;
   url: string;
   thumbnail?: string;
}

const MOCK_BOOKMARKS: BookmarkItem[] = [
   { id: '1', title: 'React Hooks Cheatsheet', type: 'resource', course: 'Advanced React Patterns', dateAdded: '2 days ago', url: '#', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400' },
   { id: '2', title: 'Understanding Server Actions', type: 'video', course: 'Next.js 14 Masterclass', dateAdded: '1 week ago', url: '#', thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400' },
   { id: '3', title: 'CSS Grid vs Flexbox Guide', type: 'article', course: 'Modern CSS Layouts', dateAdded: '2 weeks ago', url: '#' },
   { id: '4', title: 'Official Documentation', type: 'link', course: 'Backend Fundamentals', dateAdded: '1 month ago', url: '#' },
   { id: '5', title: 'State Management Patterns', type: 'video', course: 'Advanced React Patterns', dateAdded: '1 month ago', url: '#', thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400' },
];

export const BookmarksPage: React.FC = () => {
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
   const [filter, setFilter] = useState<'all' | 'video' | 'article' | 'resource' | 'link'>('all');
   const [searchQuery, setSearchQuery] = useState('');

   const filteredBookmarks = MOCK_BOOKMARKS.filter(item => {
      const matchesFilter = filter === 'all' || item.type === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.course.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
   });

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'video': return <Video size={16} />;
         case 'article': return <FileText size={16} />;
         case 'link': return <LinkIcon size={16} />;
         default: return <Download size={16} />;
      }
   };

   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">
         <PageHeader
            title="Bookmarks"
            description="Saved lessons, resources, and articles for quick access."
            breadcrumbs={[
               { label: 'Dashboard', path: '/dashboard' },
               { label: 'Bookmarks' }
            ]}
            actions={
               <div className="flex gap-4">
                  <div className="relative w-64">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                     <input
                        type="text"
                        placeholder="Search bookmarks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-novara-500"
                     />
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                     <button
                        onClick={() => setViewMode('grid')}
                        className={cn("p-2 rounded-md transition-all", viewMode === 'grid' ? "bg-white shadow text-novara-600" : "text-slate-500 hover:text-slate-700")}
                     >
                        <LayoutGrid size={18} />
                     </button>
                     <button
                        onClick={() => setViewMode('list')}
                        className={cn("p-2 rounded-md transition-all", viewMode === 'list' ? "bg-white shadow text-novara-600" : "text-slate-500 hover:text-slate-700")}
                     >
                        <List size={18} />
                     </button>
                  </div>
               </div>
            }
         />

         {/* --- FILTERS --- */}
         <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
            {['all', 'video', 'article', 'resource', 'link'].map(f => (
               <button
                  key={f}
                  onClick={() => setFilter(f as 'all' | 'video' | 'article' | 'resource' | 'link')}
                  className={cn(
                     "px-4 py-2 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap border",
                     filter === f
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
               >
                  {f}
               </button>
            ))}
         </div>

         {/* --- CONTENT --- */}
         {filteredBookmarks.length > 0 ? (
            <div className={cn("grid gap-6", viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
               {filteredBookmarks.map(item => (
                  <Card
                     key={item.id}
                     padding="none"
                     className="group hover:border-novara-300 transition-all hover:shadow-lg overflow-hidden flex flex-col"
                  >
                     {viewMode === 'grid' && (
                        <div className="h-40 bg-slate-100 relative overflow-hidden">
                           {item.thumbnail ? (
                              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                 <BookmarkIcon size={48} />
                              </div>
                           )}
                           <div className="absolute top-3 left-3">
                              <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                 {getTypeIcon(item.type)} {item.type}
                              </span>
                           </div>
                        </div>
                     )}

                     <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              {viewMode === 'list' && (
                                 <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-500 mb-2">
                                    {getTypeIcon(item.type)} {item.type}
                                 </span>
                              )}
                              <h3 className="font-bold text-slate-900 group-hover:text-novara-600 transition-colors line-clamp-2">{item.title}</h3>
                           </div>
                           <button className="text-slate-400 hover:text-slate-600 p-1">
                              <MoreVertical size={16} />
                           </button>
                        </div>

                        <div className="text-sm text-slate-500 mb-4">{item.course}</div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                           <span className="text-xs text-slate-400">Saved {item.dateAdded}</span>
                           <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="h-8 px-2 text-red-400 hover:text-red-500 hover:bg-red-50" title="Remove">
                                 <Trash2 size={14} />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 text-xs">
                                 View <ExternalLink size={12} className="ml-1" />
                              </Button>
                           </div>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <BookmarkIcon size={32} />
               </div>
               <h3 className="text-lg font-bold text-slate-900">No bookmarks found</h3>
               <p className="text-slate-500 mb-6">You haven't saved any items yet.</p>
               <Button variant="outline" onClick={() => { setFilter('all'); setSearchQuery(''); }}>Clear Filters</Button>
            </div>
         )}
      </div>
   );
};