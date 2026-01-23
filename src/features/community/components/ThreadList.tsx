import React from 'react';
import { Search, Pin, MessageSquare, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { THREADS } from '../constants/mockData';

interface ThreadListProps {
    selectedThreadId: string | null;
    onSelectThread: (id: string) => void;
    activeTab: 'all' | 'content' | 'questions' | 'announcements';
    onTabChange: (tab: 'all' | 'content' | 'questions' | 'announcements') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isMobileOpen: boolean;
}

export const ThreadList: React.FC<ThreadListProps> = ({
    selectedThreadId,
    onSelectThread,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    isMobileOpen
}) => {
    const filteredThreads = THREADS.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.preview.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab =
            activeTab === 'all' ? true :
                activeTab === 'content' ? t.category === 'Course Content' :
                    activeTab === 'questions' ? t.tags.includes('Question') :
                        activeTab === 'announcements' ? t.tags.includes('Announcement') : true;

        return matchesSearch && matchesTab;
    });

    const tabs = ['all', 'content', 'questions', 'announcements'];

    return (
        <div className={cn(
            "flex flex-col w-full lg:w-96 xl:w-[450px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 absolute lg:relative inset-0 z-10 lg:z-0",
            isMobileOpen ? "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto" : "translate-x-0 opacity-100"
        )}>
            {/* List Header / Search */}
            <div className="p-4 border-b border-slate-100 space-y-3 bg-white z-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search discussions..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab as any)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-all border",
                                activeTab === tab
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-slate-50/50">
                {filteredThreads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                        <Search size={32} className="mb-2 opacity-50" />
                        <p className="text-sm font-medium">No discussions found</p>
                    </div>
                ) : (
                    filteredThreads.map(thread => (
                        <div
                            key={thread.id}
                            onClick={() => onSelectThread(thread.id)}
                            className={cn(
                                "p-4 rounded-xl cursor-pointer transition-all border text-left group relative",
                                selectedThreadId === thread.id
                                    ? "bg-white border-novara-500 shadow-md ring-1 ring-novara-500/10"
                                    : "bg-white border-slate-200 hover:border-novara-300 hover:shadow-sm"
                            )}
                        >
                            {thread.isPinned && (
                                <div className="absolute top-3 right-3 text-novara-600">
                                    <Pin size={14} fill="currentColor" />
                                </div>
                            )}

                            <div className="flex items-center gap-2.5 mb-2.5">
                                <Avatar name={thread.author.name} src={thread.author.avatar} size="sm" />
                                <div>
                                    <div className="text-xs font-bold text-slate-700">{thread.author.name}</div>
                                    <div className="text-[10px] text-slate-400 font-medium">{thread.date}</div>
                                </div>
                            </div>

                            <h3 className={cn("font-bold text-sm mb-1.5 line-clamp-2 pr-4", selectedThreadId === thread.id ? "text-novara-900" : "text-slate-800")}>
                                {thread.title}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                                {thread.preview}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    {thread.tags.map(tag => (
                                        <Badge key={tag} size="sm" variant="secondary" className="font-medium">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                    <span className="flex items-center gap-1"><MessageSquare size={12} /> {thread.replies}</span>
                                    {thread.isResolved && <CheckCircle2 size={14} className="text-green-500" />}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
