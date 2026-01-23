import React from 'react';
import { Card } from '../ui/Card';
import { Bell } from 'lucide-react';
import { UserSettings } from '../../types';

interface NotificationSettingsProps {
    settings: UserSettings;
    onUpdate: (updates: Partial<UserSettings>) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onUpdate }) => {
    const handleToggle = (key: string) => {
        onUpdate({
            notifications: {
                ...settings.notifications,
                [key]: !settings.notifications[key as keyof typeof settings.notifications]
            }
        });
    };

    return (
        <Card>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <Bell className="text-amber-500" size={20} />
                <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
            </div>

            <div className="space-y-4">
                {[
                    { id: 'email', label: 'Email Notifications', desc: 'Get daily summaries' },
                    { id: 'push', label: 'Push Notifications', desc: 'Real-time alerts' },
                    { id: 'sms', label: 'SMS Messages', desc: 'Urgent updates only' },
                    { id: 'updates', label: 'System Updates', desc: 'Maintenance & news' },
                ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-1">
                        <div>
                            <p className="text-sm font-bold text-slate-700">{item.label}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications[item.id as keyof typeof settings.notifications]}
                                onChange={() => handleToggle(item.id)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-novara-500"></div>
                        </label>
                    </div>
                ))}
            </div>
        </Card>
    );
};
