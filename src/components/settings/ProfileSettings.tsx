import React from 'react';
import { Card } from '../ui/Card';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserSettings } from '../../types';

interface ProfileSettingsProps {
    settings: UserSettings;
    onUpdate: (updates: Partial<UserSettings>) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ settings, onUpdate }) => {
    return (
        <div className="space-y-8">
            {/* General Information */}
            <Card>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-novara-50 text-novara-600 rounded-lg">
                        <Shield size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Account Information</h2>
                        <p className="text-sm text-slate-500">Update your personal details and contact info.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                        <input
                            type="text"
                            value={settings.fullName}
                            onChange={(e) => onUpdate({ fullName: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all text-slate-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => onUpdate({ email: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all text-slate-700"
                        />
                    </div>
                </div>
            </Card>

            {/* Account Status */}
            <Card className="bg-red-50 border-red-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg text-red-500 shadow-sm">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-red-900">Deactivate Account</h4>
                            <p className="text-sm text-red-700 opacity-80">This will temporarily disable your account.</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300">Deactivate</Button>
                </div>
            </Card>
        </div>
    );
};
