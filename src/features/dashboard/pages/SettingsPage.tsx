import React, { useState } from 'react';
import { Save, ChevronRight, CheckCircle2, Shield, Bell, User, Layout, CreditCard } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { UserSettings } from '../../../types';
import { ProfileSettings } from '../../../components/settings/ProfileSettings';
import { SecuritySettings } from '../../../components/settings/SecuritySettings';
import { NotificationSettings } from '../../../components/settings/NotificationSettings';
import { PreferencesSettings } from '../../../components/settings/PreferencesSettings';
import { cn } from '../../../utils/cn';

const TABS = [
   { id: 'profile', label: 'Profile', icon: User },
   { id: 'security', label: 'Security', icon: Shield },
   { id: 'notifications', label: 'Notifications', icon: Bell },
   { id: 'preferences', label: 'Preferences', icon: Layout },
   { id: 'billing', label: 'Billing', icon: CreditCard },
];

export const SettingsPage: React.FC = () => {
   const { user, updateUser } = useAuth();
   const [isLoading, setIsLoading] = useState(false);
   const [activeTab, setActiveTab] = useState('profile');
   const [showToast, setShowToast] = useState(false);

   // Settings State
   const [settings, setSettings] = useState<UserSettings>(() => {
      // Initialize with default values if user is null (though we return null later)
      // This prevents hooks from crashing if user is temporarily null during render
      if (!user) return {
         fullName: '', email: '', language: 'English (US)', theme: 'light', twoFactor: false,
         notifications: { email: true, push: true, sms: false, updates: true },
         privacy: { publicProfile: true, showCourses: true }
      };
      return {
         fullName: user.name,
         email: user.email,
         language: 'English (US)',
         theme: 'light',
         twoFactor: true,
         notifications: {
            email: true,
            push: true,
            sms: false,
            updates: true,
         },
         privacy: {
            publicProfile: true,
            showCourses: true,
         }
      };
   });

   if (!user) return null;

   // Effect to update settings if user changes (optional, but good practice if user context updates)
   /* useEffect(() => {
     if (user) {
        setSettings(prev => ({ ...prev, fullName: user.name, email: user.email }));
     }
   }, [user]); */

   const handleUpdate = (updates: Partial<UserSettings>) => {
      setSettings(prev => ({ ...prev, ...updates }));
   };

   const handleSave = () => {
      setIsLoading(true);
      // Simulate API save
      setTimeout(() => {
         setIsLoading(false);
         updateUser({ name: settings.fullName, email: settings.email });
         setShowToast(true);
         setTimeout(() => setShowToast(false), 3000);
      }, 1500);
   };

   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20 relative">

         {/* --- TOAST NOTIFICATION --- */}
         <div className={cn(
            "fixed top-24 right-8 z-50 transition-all duration-500 transform",
            showToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
         )}>
            <div className="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
               <div className="bg-green-500 rounded-full p-1">
                  <CheckCircle2 size={16} className="text-white" />
               </div>
               <div>
                  <h4 className="font-bold text-sm">Settings Saved</h4>
                  <p className="text-xs text-slate-400">Your changes have been successfully updated.</p>
               </div>
            </div>
         </div>

         {/* --- HEADER SECTION --- */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
            <div>
               {/* Breadcrumbs */}
               <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span className="hover:text-novara-600 cursor-pointer transition-colors">Dashboard</span>
                  <ChevronRight size={14} />
                  <span className="font-semibold text-slate-800">Settings</span>
               </div>

               <div className="flex items-center gap-4">
                  <div className="relative">
                     <img src={user.avatar} alt="Avatar" className="w-14 h-14 rounded-full border-4 border-white shadow-lg" />
                     <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm" title="Active"></div>
                  </div>
                  <div>
                     <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">{user.name}</h1>
                     <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-wider border border-slate-200">
                        {user.role} Account
                     </span>
                  </div>
               </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
               <Button variant="ghost" className="flex-1 md:flex-none border border-slate-200 hover:border-slate-300 bg-white shadow-sm font-semibold text-slate-600">Cancel</Button>
               <Button
                  variant="primary"
                  icon={<Save size={18} />}
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 md:flex-none shadow-lg shadow-novara-500/20"
               >
                  {isLoading ? 'Saving Changes...' : 'Save Changes'}
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* --- LEFT SIDEBAR: TABS --- */}
            {/* --- LEFT SIDEBAR: TABS --- */}
            <div className="lg:col-span-3 space-y-2">
               <div className="sticky top-8 space-y-4 w-full lg:w-64">

                  {/* Sidebar */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 space-y-1">
                     {TABS.map(tab => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           type="button"
                           aria-current={activeTab === tab.id ? "page" : undefined}
                           className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
                              activeTab === tab.id
                                 ? "bg-novara-50 text-novara-700 shadow-sm focus:ring-novara-200"
                                 : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 focus:ring-slate-100"
                           )}
                        >
                           <tab.icon size={18} className={activeTab === tab.id ? "text-novara-500" : "text-slate-400"} />
                           <span>{tab.label}</span>
                           {activeTab === tab.id && <ChevronRight size={14} className="ml-auto text-novara-400" />}
                        </button>
                     ))}
                  </div>

                  {/* Need Help */}
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
                     <h4 className="font-bold text-sm mb-1">Need Help?</h4>
                     <p className="text-xs text-slate-400 mb-3">Check our knowledge base or contact support.</p>
                     <Button size="sm" variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-white hover:text-slate-900 border-dashed">
                        Visit Support
                     </Button>
                  </div>

               </div>
            </div>

            {/* --- RIGHT CONTENT: SETTINGS FORMS --- */}
            <div className="lg:col-span-9 space-y-8 animate-fade-in">
               {activeTab === 'profile' && (
                  <div className="space-y-8 animate-fade-in-up">
                     <ProfileSettings settings={settings} onUpdate={handleUpdate} />
                  </div>
               )}
               {activeTab === 'security' && (
                  <div className="space-y-8 animate-fade-in-up">
                     <SecuritySettings settings={settings} onUpdate={handleUpdate} />
                  </div>
               )}
               {activeTab === 'notifications' && (
                  <div className="space-y-8 animate-fade-in-up">
                     <NotificationSettings settings={settings} onUpdate={handleUpdate} />
                  </div>
               )}
               {activeTab === 'preferences' && (
                  <div className="space-y-8 animate-fade-in-up">
                     <PreferencesSettings settings={settings} onUpdate={handleUpdate} />
                  </div>
               )}
               {activeTab === 'billing' && (
                  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-slate-200 text-center animate-fade-in-up">
                     <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <CreditCard size={32} className="text-slate-300" />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 mb-1">Billing & Invoices</h3>
                     <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                        Seamlessly manage your subscription, payment methods, and download past invoices.
                     </p>
                     <Button variant="outline">Manage Subscription</Button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};