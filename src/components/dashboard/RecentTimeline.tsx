import React from 'react';
import { TrendingUp } from 'lucide-react';

export const RecentTimeline = () => {
    return (
        <div className="rounded-2xl transition-all duration-300 bg-white border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp size={18} className="text-teal-500" />
                    Recent Timeline
                </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">

                <div className="relative group">
                    <div className="absolute -left-[2.35rem] top-0 bg-white border-2 border-slate-100 p-1 rounded-full group-hover:border-teal-200 group-hover:scale-110 transition-all z-10">
                        <div className="text-teal-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors">Completed Module</span>
                        <span className="text-xs text-slate-500 font-medium">React Hooks Deep Dive</span>
                        <span className="text-[10px] text-slate-400 mt-1">2 hours ago</span>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -left-[2.35rem] top-0 bg-white border-2 border-slate-100 p-1 rounded-full group-hover:border-teal-200 group-hover:scale-110 transition-all z-10">
                        <div className="text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text" aria-hidden="true">
                                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                                <path d="M10 9H8"></path>
                                <path d="M16 13H8"></path>
                                <path d="M16 17H8"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors">Submitted Assignment</span>
                        <span className="text-xs text-slate-500 font-medium">UX Case Study</span>
                        <span className="text-[10px] text-slate-400 mt-1">1 day ago</span>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -left-[2.35rem] top-0 bg-white border-2 border-slate-100 p-1 rounded-full group-hover:border-teal-200 group-hover:scale-110 transition-all z-10">
                        <div className="text-purple-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity" aria-hidden="true">
                                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors">Joined Live Session</span>
                        <span className="text-xs text-slate-500 font-medium">System Design Q&A</span>
                        <span className="text-[10px] text-slate-400 mt-1">2 days ago</span>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -left-[2.35rem] top-0 bg-white border-2 border-slate-100 p-1 rounded-full group-hover:border-teal-200 group-hover:scale-110 transition-all z-10">
                        <div className="text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award" aria-hidden="true">
                                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                                <circle cx="12" cy="8" r="6"></circle>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors">Earned Badge</span>
                        <span className="text-xs text-slate-500 font-medium">Fast Learner</span><span className="text-[10px] text-slate-400 mt-1">3 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
