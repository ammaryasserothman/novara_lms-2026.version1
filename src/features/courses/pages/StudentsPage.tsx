import React, { useState } from 'react';
import {
    Search,
    ChevronLeft, ChevronRight, Mail,
    MoreHorizontal, Shield, Award
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { PageHeader } from '../components/PageHeader';
import { cn } from '../../../utils/cn';
import { RecentTimeline } from '../../../components/dashboard/RecentTimeline';

const DownloadIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);

const InviteIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
);

interface Student {
    id: string;
    name: string;
    email: string;
    role: 'Student' | 'Instructor' | 'Admin';
    status: 'Active' | 'Inactive';
    courses: number;
    lastLogin: string;
    avatar: string;
    progress: number;
}

const MOCK_STUDENTS: Student[] = [
    { id: '1', name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'Student', status: 'Active', courses: 4, lastLogin: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100', progress: 75 },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'Student', status: 'Active', courses: 2, lastLogin: '1 day ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', progress: 32 },
    { id: '3', name: 'Michael Chen', email: 'm.chen@example.com', role: 'Instructor', status: 'Active', courses: 8, lastLogin: '5 mins ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', progress: 100 },
    { id: '4', name: 'Emily Davis', email: 'emily.d@example.com', role: 'Student', status: 'Inactive', courses: 1, lastLogin: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', progress: 12 },
    { id: '5', name: 'James Wilson', email: 'j.wilson@example.com', role: 'Admin', status: 'Active', courses: 0, lastLogin: '1 hour ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', progress: 0 },
];

export const StudentsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'All' | 'Student' | 'Instructor' | 'Admin'>('All');

    const filteredStudents = MOCK_STUDENTS.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'All' || student.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">
            <PageHeader
                title="Students & Users"
                description="Manage users, track engagement, and view performance."
                breadcrumbs={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Students' }
                ]}
                actions={
                    <div className="flex gap-4">
                        <Button variant="outline" icon={<DownloadIcon size={16} />}>Export CSV</Button>
                        <Button icon={<InviteIcon size={16} />}>Invite User</Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* --- MAIN CONTENT (List) --- */}
                <div className="xl:col-span-8">
                    <Card padding="none" className="overflow-hidden">
                        {/* --- TABLE CONTROLS --- */}
                        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-novara-500"
                                />
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                                {(['All', 'Student', 'Instructor', 'Admin'] as const).map(role => (
                                    <button
                                        key={role}
                                        onClick={() => setRoleFilter(role)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border",
                                            roleFilter === role
                                                ? "bg-slate-800 text-white border-slate-800"
                                                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                                        )}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- DATA TABLE --- */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">User</th>
                                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Role</th>
                                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Status</th>
                                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Progress</th>
                                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredStudents.map(student => (
                                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                                    <div>
                                                        <div className="font-bold text-slate-900">{student.name}</div>
                                                        <div className="text-xs text-slate-500">{student.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {student.role === 'Admin' && <Shield size={14} className="text-purple-500" />}
                                                    {student.role === 'Instructor' && <Award size={14} className="text-blue-500" />}
                                                    <span className={cn(
                                                        "font-medium",
                                                        student.role === 'Admin' ? "text-purple-700" :
                                                            student.role === 'Instructor' ? "text-blue-700" :
                                                                "text-slate-600"
                                                    )}>
                                                        {student.role}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                    student.status === 'Active' ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    {student.status}
                                                </span>
                                                <div className="text-[10px] text-slate-400 mt-1">Last: {student.lastLogin}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.role === 'Student' ? (
                                                    <div className="w-32">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span className="text-slate-500">{student.courses} Courses</span>
                                                            <span className="font-bold text-slate-700">{student.progress}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-novara-500 rounded-full" style={{ width: `${student.progress}%` }} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 text-xs italic">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600" title="Email User">
                                                        <Mail size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                                                        <MoreHorizontal size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* --- PAGINATION --- */}
                        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                            <div>
                                Showing <span className="font-bold text-slate-900">1</span> to <span className="font-bold text-slate-900">{filteredStudents.length}</span> of <span className="font-bold text-slate-900">1,248</span> results
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" disabled><ChevronLeft size={16} /> Previous</Button>
                                <Button size="sm" variant="outline">Next <ChevronRight size={16} /></Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* --- SIDEBAR --- */}
                <div className="xl:col-span-4 space-y-6">
                    <RecentTimeline />
                </div>
            </div>
        </div>
    );
};

