import React from 'react';
import { cn } from '../../../utils/cn';
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Link } from 'react-router-dom';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'mention';

export interface NotificationItemProps {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    actionLink?: string;
    actionLabel?: string;
    onMarkAsRead?: (id: string) => void;
}

const icons = {
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    warning: { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
    mention: { icon: Bell, color: 'text-novara-500', bg: 'bg-novara-50' },
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
    id,
    type,
    title,
    message,
    timestamp,
    isRead,
    actionLink,
    actionLabel,
    onMarkAsRead
}) => {
    const { icon: Icon, color, bg } = icons[type] || icons.info;

    return (
        <div className={cn(
            "relative p-4 rounded-xl border transition-all duration-200 group animate-in slide-in-from-bottom-2 fade-in",
            isRead ? "bg-white border-slate-100" : "bg-white border-novara-100 shadow-sm ring-1 ring-novara-100/50"
        )}>
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", bg, color)}>
                    <Icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                        <h4 className={cn("font-bold text-sm", isRead ? "text-slate-700" : "text-slate-900")}>
                            {title}
                        </h4>
                        <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{timestamp}</span>
                    </div>

                    <p className={cn("text-sm leading-relaxed mb-3", isRead ? "text-slate-500" : "text-slate-600")}>
                        {message}
                    </p>

                    {(actionLink || !isRead) && (
                        <div className="flex items-center gap-4">
                            {actionLink && (
                                <Link
                                    to={actionLink}
                                    className="flex items-center gap-1 text-xs font-bold text-novara-600 hover:text-novara-700 transition-colors"
                                >
                                    {actionLabel || 'View Details'} <ArrowRight size={14} />
                                </Link>
                            )}

                            {!isRead && onMarkAsRead && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onMarkAsRead(id);
                                    }}
                                    className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Mark as read
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Unread Indicator */}
            {!isRead && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-novara-500 ring-4 ring-white" />
            )}
        </div>
    );
};
