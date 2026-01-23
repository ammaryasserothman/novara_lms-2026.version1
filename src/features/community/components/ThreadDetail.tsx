import React, { useState } from 'react';
import {
    ChevronLeft, CheckCircle2, ThumbsUp, MoreHorizontal,
    Reply, Paperclip, Send, MessageSquare
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Button } from '../../../components/ui/Button';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { COMMENTS } from '../constants/mockData';

interface ThreadDetailProps {
    activeThread: any; // Type strictly if possible, for now 'any' matches mock data structure
    isMobileOpen: boolean;
    onClose: () => void;
}

export const ThreadDetail: React.FC<ThreadDetailProps> = ({
    activeThread,
    isMobileOpen,
    onClose
}) => {
    const [replyText, setReplyText] = useState('');

    return (
        <div className={cn(
            "flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden absolute lg:relative inset-0 z-20 lg:z-0 transition-transform duration-300",
            isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}>
            {activeThread ? (
                <>
                    {/* Thread Header */}
                    <div className="p-6 border-b border-slate-100 flex-shrink-0 bg-white">
                        <div className="flex items-start gap-4">
                            {/* Mobile Back Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden -ml-2 text-slate-400"
                                onClick={onClose}
                                icon={<ChevronLeft size={20} />}
                            />

                            <div className="flex-1">
                                {/* Tags & Status */}
                                <div className="flex items-center gap-2 mb-4">
                                    {activeThread.tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="uppercase tracking-wide">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {activeThread.isResolved && (
                                        <Badge variant="success" className="gap-1 pl-1">
                                            <CheckCircle2 size={12} fill="currentColor" className="text-green-500" /> Solved
                                        </Badge>
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{activeThread.title}</h2>

                                {/* Author Metadata */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar name={activeThread.author.name} src={activeThread.author.avatar} size="md" role={activeThread.author.role} />
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{activeThread.author.name}</div>
                                            <div className="text-xs text-slate-500 font-medium">{activeThread.author.role} • {activeThread.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" icon={<ThumbsUp size={16} />}>Like ({activeThread.likes})</Button>
                                        <Button size="sm" variant="ghost" icon={<MoreHorizontal size={18} />} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-slate-700 leading-relaxed text-sm lg:text-base pl-0 lg:pl-14">
                            {activeThread.preview}
                            <br /><br />
                            <p>Any guidance would be appreciated!</p>
                        </div>
                    </div>

                    {/* Comments Area */}
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                            <span>{activeThread.replies} Replies</span>
                            <span>Sort by: Best</span>
                        </div>

                        {COMMENTS.map(comment => (
                            <div key={comment.id} className="group">
                                <div className={cn(
                                    "bg-white p-5 rounded-2xl border shadow-sm transition-all",
                                    comment.isAnswer ? "border-green-200 ring-1 ring-green-500/20" : "border-slate-200 hover:border-novara-200"
                                )}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={comment.author.name} src={comment.author.avatar} size="sm" role={comment.author.role as any} />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-900 text-sm">{comment.author.name}</span>
                                                    {comment.author.role === 'Instructor' && (
                                                        <Badge variant="accent" size="sm" className="bg-novara-500 text-white border-none">Instructor</Badge>
                                                    )}
                                                </div>
                                                <span className="text-xs text-slate-400 font-medium">{comment.date}</span>
                                            </div>
                                        </div>
                                        {comment.isAnswer && (
                                            <Badge variant="success" className="rounded-full gap-1 pl-1.5">
                                                <CheckCircle2 size={12} fill="currentColor" /> Best Answer
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="pl-11 text-slate-700 text-sm leading-relaxed mb-4">
                                        {comment.text}
                                    </div>

                                    <div className="pl-11 flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-novara-600 transition-colors">
                                            <ThumbsUp size={14} /> {comment.likes}
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-novara-600 transition-colors">
                                            <Reply size={14} /> Reply
                                        </button>
                                    </div>
                                </div>

                                {/* Nested Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="pl-8 pt-2 space-y-2 relative">
                                        <div className="absolute left-4 top-0 bottom-6 w-0.5 bg-slate-200"></div>
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm ml-4">
                                                <div className="absolute top-4 -left-4 w-4 h-0.5 bg-slate-200"></div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Avatar name={reply.author.name} src={reply.author.avatar} size="sm" />
                                                    <span className="font-bold text-slate-900 text-xs">{reply.author.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{reply.date}</span>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed">{reply.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Reply Input */}
                    <div className="p-4 bg-white border-t border-slate-200">
                        <div className="relative">
                            <textarea
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all text-sm resize-none"
                                placeholder="Write a reply..."
                                rows={2}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="absolute bottom-2 right-2 flex gap-2">
                                <button className="p-1.5 text-slate-400 hover:text-novara-600 transition-colors rounded-lg hover:bg-slate-100">
                                    <Paperclip size={18} />
                                </button>
                                <button className="p-1.5 bg-novara-600 text-white rounded-lg hover:bg-novara-700 transition-colors shadow-sm">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* Empty State (Desktop) */
                <div className="hidden lg:flex flex-col items-center justify-center h-full text-center p-8 bg-slate-50/50">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                        <MessageSquare size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Select a conversation</h3>
                    <p className="text-slate-500 max-w-xs">
                        Choose a thread from the list to view details or start a new discussion.
                    </p>
                </div>
            )}
        </div>
    );
};
