import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PasswordStrengthMeter } from '../ui/PasswordStrengthMeter';
import { Lock, Check, AlertTriangle, Smartphone } from 'lucide-react';
import { cn } from '../../utils/cn';
import { UserSettings } from '../../types';

interface SecuritySettingsProps {
    settings: UserSettings;
    onUpdate: (updates: Partial<UserSettings>) => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ settings, onUpdate }) => {
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handlePasswordUpdate = () => {
        setSecurityMessage(null);

        // Basic validation
        if (!securityData.currentPassword || !securityData.newPassword) {
            setSecurityMessage({ type: 'error', text: 'Please fill in all password fields.' });
            return;
        }

        if (securityData.newPassword !== securityData.confirmPassword) {
            setSecurityMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        if (securityData.newPassword.length < 8) {
            setSecurityMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
            return;
        }

        setPasswordLoading(true);
        setTimeout(() => {
            setPasswordLoading(false);
            setSecurityMessage({ type: 'success', text: 'Password updated successfully.' });
            setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }, 1500);
    };

    return (
        <Card>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Lock size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Security</h2>
                    <p className="text-sm text-slate-500">Manage your password and 2-step verification.</p>
                </div>
            </div>

            <div className="space-y-6">
                {securityMessage && (
                    <div className={cn("p-3 rounded-lg text-sm font-medium flex items-center gap-2",
                        securityMessage.type === 'success' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                        {securityMessage.type === 'success' ? <Check size={16} /> : <AlertTriangle size={16} />}
                        {securityMessage.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Current Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={securityData.currentPassword}
                            onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={securityData.newPassword}
                            onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={securityData.confirmPassword}
                            onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                            className={cn(
                                "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500",
                                (securityData.confirmPassword && securityData.newPassword !== securityData.confirmPassword) && "border-red-300 focus:ring-red-200"
                            )}
                        />
                    </div>
                </div>

                {/* Password Strength Meter in Settings */}
                {securityData.newPassword && (
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <PasswordStrengthMeter password={securityData.newPassword} />
                    </div>
                )}

                <div className="flex justify-end pt-2">
                    <Button
                        variant="secondary"
                        className="text-xs h-9"
                        onClick={handlePasswordUpdate}
                        disabled={passwordLoading}
                    >
                        {passwordLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-full border border-slate-200 text-slate-600">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Two-Factor Authentication</h4>
                            <p className="text-xs text-slate-500">Secure your account with 2FA.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.twoFactor} onChange={() => onUpdate({ twoFactor: !settings.twoFactor })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-novara-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-novara-600"></div>
                    </label>
                </div>
            </div>
        </Card>
    );
};
