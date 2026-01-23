import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   Camera, Mail, Phone, MapPin, Shield,
   Save, Activity, Award,
   CheckCircle2, Globe, User, FileText, Zap
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { cn } from '../../../utils/cn';
import { RecentTimeline } from '../../../components/dashboard/RecentTimeline';

const ContributionGraph = () => {
   // Generate mock data for the last 365 days
   // Generate mock data for the last 365 days
   const days = 365;
   const data = React.useMemo(() => Array.from({ length: days }, (_, i) => {
      // Use pseudo-seed based on index to be deterministic even inside useMemo (optional, but cleaner)
      const seed = Math.sin(i) * 10000;
      const rand = seed - Math.floor(seed);
      const level = rand > 0.7 ? Math.floor(rand * 4) + 1 : 0; // 0-4 intensity
      return { date: i, level };
   }), []);

   const getColor = (level: number) => {
      switch (level) {
         case 1: return 'bg-teal-100';
         case 2: return 'bg-teal-300';
         case 3: return 'bg-teal-500';
         case 4: return 'bg-teal-700';
         default: return 'bg-slate-100';
      }
   };

   return (
      <div className="w-full overflow-x-auto pb-2">
         <div className="min-w-[700px]">
            <div className="flex gap-1 mb-2 text-xs text-slate-400">
               <span>Less</span>
               <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-slate-100" />
                  <div className="w-3 h-3 rounded-sm bg-teal-100" />
                  <div className="w-3 h-3 rounded-sm bg-teal-300" />
                  <div className="w-3 h-3 rounded-sm bg-teal-500" />
                  <div className="w-3 h-3 rounded-sm bg-teal-700" />
               </div>
               <span>More</span>
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-1 h-32">
               {data.map((d, i) => (
                  <div
                     key={i}
                     className={cn("w-3 h-3 rounded-sm transition-all hover:ring-2 hover:ring-slate-300 cursor-pointer", getColor(d.level))}
                     title={`Activity Level: ${d.level}`}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export const ProfilePage: React.FC = () => {
   const navigate = useNavigate();
   const { user, logout } = useAuth();
   const [isLoading, setIsLoading] = useState(false);

   // Initialize form state from global user context
   const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      bio: user?.bio || '',
      role: user?.title || user?.role || 'Student'
   });

   // Calculate completion percentage based on filled fields
   const calculateCompletion = () => {
      const fieldsToCheck = [
         formData.name,
         formData.email,
         formData.phone,
         formData.address,
         formData.bio
      ];
      const filledCount = fieldsToCheck.filter(val => val && val.trim().length > 0).length;
      return Math.round((filledCount / fieldsToCheck.length) * 100);
   };

   const completionPercentage = calculateCompletion();

   const handleSave = () => {
      setIsLoading(true);
      // Simulate API call and persist data to global context
      setTimeout(() => {
         setIsLoading(false);
         // updateUser({
         //    name: formData.name,
         //    phone: formData.phone,
         //    address: formData.address,
         //    bio: formData.bio
         // });
      }, 1000);
   };

   const handleLogout = () => {
      logout();
      navigate('/login');
   };



   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto">

         {/* --- HEADER SECTION --- */}
         <Card className="relative overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-white">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>

            <div className="relative pt-16 px-6 pb-6 flex flex-col md:flex-row items-end md:items-center gap-6">
               {/* Avatar */}
               <div className="relative group shrink-0">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-100 relative ring-4 ring-teal-500/20">
                     <img src={user?.avatar || 'https://ui-avatars.com/api/?name=User'} alt="Profile" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                        <Camera className="text-white" size={24} />
                     </div>
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-teal-500 border-4 border-white rounded-full shadow-sm" title="Online"></div>
               </div>

               {/* User Info */}
               <div className="flex-1 pb-2">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{formData.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 mt-2">
                     <span className="flex items-center gap-1.5 font-medium"><Mail size={16} className="text-slate-400" /> {formData.email}</span>
                     <span className="flex items-center gap-1.5 capitalize px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs font-bold border border-teal-100">
                        <Shield size={12} /> {user?.role || 'Guest'}
                     </span>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex gap-3 mb-2">
                  <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold" onClick={handleLogout}>
                     Sign Out
                  </Button>
                  <Button
                     className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/30"
                     icon={<Save size={18} />}
                     onClick={handleSave}
                     isLoading={isLoading}
                  >
                     {isLoading ? 'Saving...' : 'Save Profile'}
                  </Button>
               </div>
            </div>
         </Card>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* --- LEFT COLUMN: PERSONAL INFO --- */}
            <div className="lg:col-span-2 space-y-8">

               {/* Learning Activity Heatmap */}
               <Card>
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Zap size={20} className="text-teal-500 fill-current" /> Learning Activity
                     </h3>
                     <select className="text-xs font-bold bg-slate-50 border-none rounded-lg py-1 px-2 text-slate-500 cursor-pointer hover:text-slate-700">
                        <option>Last Year</option>
                        <option>Last 6 Months</option>
                     </select>
                  </div>
                  <ContributionGraph />
               </Card>

               {/* Edit Profile Form */}
               <Card>
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                     <User className="text-teal-500" size={20} />
                     <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                        <div className="relative group">
                           <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                           <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium placeholder:text-slate-400"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                        <div className="relative">
                           <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input
                              type="email"
                              value={formData.email}
                              disabled
                              className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number</label>
                        <div className="relative group">
                           <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                           <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium placeholder:text-slate-400"
                              placeholder="+1 (555) 000-0000"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Location</label>
                        <div className="relative group">
                           <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                           <input
                              type="text"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium placeholder:text-slate-400"
                              placeholder="City, Country"
                           />
                        </div>
                     </div>

                     <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Bio</label>
                        <textarea
                           rows={4}
                           value={formData.bio}
                           onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                           className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium resize-none placeholder:text-slate-400"
                           placeholder="Share a bit about your background and learning goals..."
                        />
                     </div>
                  </div>
               </Card>
            </div>

            {/* --- RIGHT COLUMN: ACTIVITY & STATS --- */}
            <div className="lg:col-span-1 space-y-8">

               {/* Profile Completion - Styled as a sticky widget */}
               <Card className="bg-gradient-to-br from-teal-50 to-white border-teal-100 shadow-lg shadow-teal-500/5">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-teal-900">Profile Completion</h3>
                     <span className="font-bold text-teal-600">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-teal-100 rounded-full h-2.5 mb-2 overflow-hidden">
                     <div
                        className="bg-teal-500 h-full rounded-full shadow-sm transition-all duration-1000 ease-out relative"
                        style={{ width: `${completionPercentage}%` }}
                     >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                     </div>
                  </div>
                  <p className="text-xs text-teal-700 font-medium">
                     {completionPercentage === 100
                        ? "Great job! Your profile is fully updated."
                        : "Complete your profile to unlock all features."}
                  </p>
               </Card>

               {/* Account Stats */}
               <div className="rounded-2xl transition-all duration-300 bg-white border border-slate-100 shadow-sm p-6">
                  <div className="mb-6">
                     <Globe size={18} className="text-teal-400" />
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-400 text-sm">Last Login</span>
                        <span className="font-mono text-sm font-bold text-slate-700">Today, 9:41 AM</span>
                     </div>

                     <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-400 text-sm">Member Since</span>
                        <span className="font-mono text-sm font-bold text-slate-700">Sep 2023</span>
                     </div>

                     <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-400 text-sm">Total Learning</span>
                        <span className="text-sm font-bold text-teal-500">124 Hours</span>
                     </div>
                  </div>
               </div>


               <RecentTimeline />


            </div>

         </div>
      </div>
   );
};