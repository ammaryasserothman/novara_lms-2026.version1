import React, { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { NotificationItem, NotificationType } from '../components/NotificationItem';
import { cn } from '../../../utils/cn';

// --- MOCK DATA ---
const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        type: 'success' as NotificationType,
        title: 'Course Completed',
        message: 'Congratulations! You have successfully completed "Advanced React Patterns". Your certificate is ready to download.',
        timestamp: '2 hours ago',
        isRead: false,
        actionLink: '/certificates/react-patterns',
        actionLabel: 'View Certificate'
    },
    {
        id: '2',
        type: 'mention' as NotificationType,
        title: 'New Reply in Community',
        message: 'Sarah Jenkins replied to your post "Help with Module 2: Memoization".',
        timestamp: '5 hours ago',
        isRead: false,
        actionLink: '/community/t2',
        actionLabel: 'View Reply'
    },
    {
        id: '3',
        type: 'info' as NotificationType,
        title: 'New Module Available',
        message: 'Module 4: Performance Optimization has been unlocked in "Fullstack Next.js".',
        timestamp: '1 day ago',
        isRead: true,
        actionLink: '/courses/nextjs-mastery',
        actionLabel: 'Start Learning'
    },
    {
        id: '4',
        type: 'warning' as NotificationType,
        title: 'Assignment Due Soon',
        message: 'Reminder: "Capstone Project Proposal" is due in 24 hours.',
        timestamp: '1 day ago',
        isRead: true,
        actionLink: '/assignments/capstone',
        actionLabel: 'Submit Assignment'
    },
    {
        id: '5',
        type: 'error' as NotificationType,
        title: 'Payment Failed',
        message: 'We were unable to process your subscription renewal. Please update your payment method.',
        timestamp: '2 days ago',
        isRead: true,
        actionLink: '/settings/billing',
        actionLabel: 'Update Payment'
    }
];

export const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [filter, setFilter] = useState<'all' | 'unread' | 'mentions'>('all');

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    // Bolt Optimization: Calculate derived values (filter and unread count) in a single-pass useMemo
    const { filteredNotifications, unreadCount } = React.useMemo(() => {
        let unread = 0;
        const filtered = [];

        for (const n of notifications) {
            if (!n.isRead) unread++;

            if (filter === 'unread' && n.isRead) continue;
            if (filter === 'mentions' && n.type !== 'mention') continue;

            filtered.push(n);
        }

        return { filteredNotifications: filtered, unreadCount: unread };
    }, [notifications, filter]);

    return (
        <div className="font-sans text-slate-600 max-w-4xl mx-auto min-h-[calc(100vh-6rem)] py-8 px-4 md:px-0">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="bg-novara-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-full shadow-sm animate-pulse-slow">
                                {unreadCount}
                            </span>
                        )}
                    </h1>
                    <p className="text-slate-500 mt-1">Stay updated with your courses, community, and system alerts.</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                        icon={<Check size={16} />}
                    >
                        Mark all as read
                    </Button>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6 flex gap-2 overflow-x-auto no-scrollbar">
                {[
                    { id: 'all', label: 'All Notifications' },
                    { id: 'unread', label: 'Unread' },
                    { id: 'mentions', label: 'Mentions' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id as 'all' | 'unread' | 'mentions')}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                            filter === tab.id
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => (
                        <NotificationItem
                            key={notification.id}
                            {...notification}
                            onMarkAsRead={handleMarkAsRead}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4">
                            <Bell size={24} className="text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No notifications found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">
                            {filter === 'all'
                                ? "You're all caught up! Check back later for updates."
                                : `You have no ${filter} notifications at the moment.`}
                        </p>
                        {filter !== 'all' && (
                            <Button variant="ghost" size="sm" className="mt-4" onClick={() => setFilter('all')}>
                                View all notifications
                            </Button>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};
