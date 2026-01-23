import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Globe, Monitor, Laptop, Smartphone, LogOut, Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { UserSettings } from '../../types';

interface PreferencesSettingsProps {
    settings: UserSettings;
    onUpdate: (updates: Partial<UserSettings>) => void;
}

export const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({ settings, onUpdate }) => {
    return (
        <div className="space-y-8">
            {/* Preferences */}
            <Card>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <Globe className="text-purple-500" size={20} />
                    <h2 className="text-lg font-bold text-slate-900">Preferences</h2>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Language</label>
                        <select
                            value={settings.language}
                            onChange={(e) => onUpdate({ language: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-novara-500"
                        >
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>

                    <div className="pt-2">
                        <label className="text-sm font-medium text-slate-700 block mb-2">Theme</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onUpdate({ theme: 'light' })}
                                className={cn(
                                    "flex items-center justify-center gap-2 p-2 rounded-lg border text-sm transition-all",
                                    settings.theme === 'light' ? "border-novara-500 bg-novara-50 text-novara-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                )}
                            >
                                <Sun size={16} /> Light
                            </button>
                            <button
                                onClick={() => onUpdate({ theme: 'dark' })}
                                className={cn(
                                    "flex items-center justify-center gap-2 p-2 rounded-lg border text-sm transition-all",
                                    settings.theme === 'dark' ? "border-slate-800 bg-slate-800 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                )}
                            >
                                <Moon size={16} /> Dark
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Active Sessions */}
            <Card>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <Monitor className="text-teal-500" size={20} />
                    <h2 className="text-lg font-bold text-slate-900">Sessions</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Laptop className="text-slate-400" size={20} />
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-700">MacBook Pro</p>
                            <p className="text-xs text-slate-500">San Francisco, US • Active now</p>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 opacity-60">
                        <Smartphone className="text-slate-400" size={20} />
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-700">iPhone 14</p>
                            <p className="text-xs text-slate-500">San Francisco, US • 2d ago</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full text-xs text-red-600 hover:text-red-700 hover:bg-red-50 mt-2">
                        <LogOut size={14} className="mr-2" /> Sign out all devices
                    </Button>
                </div>
            </Card>
        </div>
    );
};
