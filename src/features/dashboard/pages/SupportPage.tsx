import React, { useState } from 'react';
import {
   Search, ChevronDown, ChevronUp,
   FileText, Upload,
   CheckCircle2, Clock, Activity, Send,
   HelpCircle, Lock, Bug, Lightbulb,
   MessageSquare, Phone, ExternalLink, LifeBuoy, X, Minimize2
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

// --- MOCK DATA ---
const CATEGORIES = [
   { id: 'account', label: 'Account & Login', icon: <Lock />, desc: 'Password, 2FA, Profile settings' },
   { id: 'billing', label: 'Billing & Plans', icon: <FileText />, desc: 'Invoices, methods, upgrades' },
   { id: 'courses', label: 'Courses & Lessons', icon: <Lightbulb />, desc: 'Progress, certificates, content' },
   { id: 'tech', label: 'Technical Support', icon: <Bug />, desc: 'Bugs, errors, browser issues' },
];

const FAQS = [
   {
      category: 'Account & Login',
      items: [
         { id: 1, q: "How do I reset my password?", a: "Go to the Settings page > Security tab. Click on 'Change Password'. If you cannot log in, use the 'Forgot Password' link on the login screen." },
         { id: 2, q: "Can I change my email address?", a: "Yes, you can update your email address in the Profile settings. A verification link will be sent to your new email." }
      ]
   },
   {
      category: 'Courses & Lessons',
      items: [
         { id: 3, q: "Why is my course progress not updating?", a: "Ensure you have watched at least 90% of a video lesson for it to be marked as complete. Try refreshing the page if the status persists." },
         { id: 4, q: "How do I download course resources?", a: "Navigate to the 'Resources' tab within a specific lesson or the Course Details page sidebar to find downloadable materials." }
      ]
   },
];

const TICKET_HISTORY = [
   { id: 'T-1024', subject: 'Quiz submission error', status: 'resolved', date: 'Oct 20, 2024' },
   { id: 'T-1045', subject: 'Certificate typo request', status: 'in_progress', date: 'Yesterday' },
];

// --- COMPONENTS ---

const HeroSearch = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
   <div className="bg-novara-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden mb-12 shadow-2xl">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-novara-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Status Bar */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
         <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
         </span>
         <span className="text-[10px] font-bold text-white uppercase tracking-wider">Systems Normal</span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
         <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-novara-100 text-xs font-bold uppercase tracking-wider border border-white/5">
            <LifeBuoy size={12} /> Help Center
         </span>
         <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">How can we help you?</h1>
         <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-novara-500 transition-colors" size={24} />
            <input
               type="text"
               placeholder="Search for articles, guides, or troubleshooting..."
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-novara-500/30 text-lg transition-all placeholder:text-slate-400 text-slate-900"
            />
         </div>
         <p className="text-slate-400 text-sm">Popular: Reset Password, API Keys, Billing</p>
      </div>
   </div>
);

const CategoryGrid = () => (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {CATEGORIES.map((cat, i) => (
         <button key={i} className="flex flex-col items-center text-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-novara-200 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-novara-50 group-hover:text-novara-600 transition-colors mb-4">
               {React.cloneElement(cat.icon as React.ReactElement<{ size: number }>, { size: 24 })}
            </div>
            <h3 className="font-bold text-slate-900 mb-1">{cat.label}</h3>
            <p className="text-xs text-slate-500">{cat.desc}</p>
         </button>
      ))}
   </div>
);

const LiveChatWidget = () => {
   const [isOpen, setIsOpen] = useState(false);

   if (!isOpen) {
      return (
         <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-novara-600 hover:bg-novara-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50 group"
         >
            <MessageSquare size={28} className="fill-current" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</span>
            <div className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
               Chat with Support
            </div>
         </button>
      );
   }

   return (
      <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 animate-fade-in-up">
         {/* Header */}
         <div className="bg-novara-600 p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                     <LifeBuoy size={20} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-novara-600 rounded-full"></div>
               </div>
               <div>
                  <h3 className="font-bold text-sm">Support Team</h3>
                  <p className="text-xs text-novara-100">We typically reply in minutes</p>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <Minimize2 size={16} />
               </button>
               <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={16} />
               </button>
            </div>
         </div>

         {/* Chat Body */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <LifeBuoy size={16} className="text-slate-500" />
               </div>
               <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600 max-w-[80%]">
                  Hello! How can we help you today?
               </div>
            </div>
            <div className="text-center text-xs text-slate-400 my-4">Today, 2:30 PM</div>
         </div>

         {/* Input */}
         <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="relative">
               <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500 text-sm"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-novara-600 text-white rounded-lg hover:bg-novara-700 transition-colors">
                  <Send size={14} />
               </button>
            </div>
         </div>
      </div>
   );
};

const ContactPanel = ({ formStatus, setFormStatus }: { formStatus: 'idle' | 'submitting' | 'success', setFormStatus: (s: 'idle' | 'submitting' | 'success') => void }) => {
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormStatus('submitting');
      setTimeout(() => {
         setFormStatus('success');
         setTimeout(() => setFormStatus('idle'), 3000);
      }, 1500);
   };

   return (
      <Card className="border-t-4 border-t-novara-500 shadow-xl shadow-slate-200/50 h-fit sticky top-8">
         <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Contact Support</h2>
            <p className="text-sm text-slate-500 flex items-center gap-2">
               <Clock size={14} className="text-novara-600" />
               Avg. Response: <span className="font-bold text-slate-700">2 hours</span>
            </p>
         </div>

         {formStatus === 'success' ? (
            <div className="py-12 text-center animate-fade-in">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 size={32} />
               </div>
               <h3 className="text-lg font-bold text-slate-900">Message Sent!</h3>
               <p className="text-slate-500 text-sm mt-2">
                  Ticket #2048 created.<br />We'll get back to you shortly.
               </p>
               <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setFormStatus('idle')}
               >
                  Send Another
               </Button>
            </div>
         ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Issue Category</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all font-medium text-slate-600">
                     <option>General Inquiry</option>
                     <option>Technical Problem</option>
                     <option>Billing & Account</option>
                     <option>Course Content</option>
                  </select>
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Subject</label>
                  <input
                     required
                     type="text"
                     placeholder="Brief summary of the issue"
                     className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all placeholder:text-slate-400 font-medium"
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Description</label>
                  <textarea
                     required
                     rows={4}
                     placeholder="Please describe your issue in detail..."
                     className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all resize-none placeholder:text-slate-400 font-medium"
                  />
               </div>

               <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 cursor-pointer transition-colors group">
                  <Upload size={20} className="mx-auto text-slate-400 group-hover:text-novara-500 transition-colors mb-2" />
                  <span className="text-xs text-slate-500">
                     <span className="text-novara-600 font-bold hover:underline">Upload Screenshot</span> (Optional)
                  </span>
               </div>

               <Button
                  type="submit"
                  className="w-full justify-center py-3 font-bold"
                  disabled={formStatus === 'submitting'}
                  icon={formStatus === 'submitting' ? <Activity className="animate-spin" size={18} /> : <Send size={18} />}
               >
                  {formStatus === 'submitting' ? 'Sending...' : 'Submit Request'}
               </Button>
            </form>
         )}

         <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 text-center text-xs text-slate-500 gap-4">
            <a href="#" className="flex flex-col items-center hover:text-novara-600 transition-colors group">
               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-novara-50 group-hover:text-novara-600 transition-colors">
                  <MessageSquare size={16} />
               </div>
               Live Chat
            </a>
            <a href="#" className="flex flex-col items-center hover:text-novara-600 transition-colors group">
               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-novara-50 group-hover:text-novara-600 transition-colors">
                  <Phone size={16} />
               </div>
               +1 (555) 0123
            </a>
         </div>
      </Card>
   );
};

export const SupportPage: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [expandedFaq, setExpandedFaq] = useState<number | null>(1);
   const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

   const filteredFaqs = React.useMemo(() => {
      const query = searchQuery.toLowerCase();
      if (!query) return FAQS;

      return FAQS.map(cat => ({
         ...cat,
         items: cat.items.filter(item =>
            item.q.toLowerCase().includes(query) ||
            item.a.toLowerCase().includes(query)
         )
      })).filter(cat => cat.items.length > 0);
   }, [searchQuery]);

   return (
      <div className="font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">

         <HeroSearch value={searchQuery} onChange={setSearchQuery} />

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-0">
            {/* --- LEFT COLUMN: CONTENT --- */}
            <div className="lg:col-span-2">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Browse by Category</h2>
                  <a href="#" className="text-sm font-bold text-novara-600 hover:underline flex items-center gap-1">View all <ExternalLink size={14} /></a>
               </div>

               <CategoryGrid />

               <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>

                  {filteredFaqs.length > 0 ? (
                     filteredFaqs.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 px-1">
                              {section.category}
                           </h3>
                           <div className="space-y-3">
                              {section.items.map((item) => (
                                 <Card
                                    key={item.id}
                                    padding="none"
                                    className={cn(
                                       "border transition-all duration-300 overflow-hidden bg-white",
                                       expandedFaq === item.id ? "border-novara-200 shadow-md ring-1 ring-novara-500/10" : "border-slate-100 hover:border-slate-200"
                                    )}
                                 >
                                    <button
                                       onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                                       className="w-full flex items-center justify-between p-5 text-left bg-white focus:outline-none group"
                                    >
                                       <span className={cn("font-bold text-lg transition-colors group-hover:text-novara-700", expandedFaq === item.id ? "text-novara-700" : "text-slate-800")}>
                                          {item.q}
                                       </span>
                                       {expandedFaq === item.id ? <ChevronUp size={20} className="text-novara-500" /> : <ChevronDown size={20} className="text-slate-400 group-hover:text-novara-500 transition-colors" />}
                                    </button>

                                    <div className={cn(
                                       "px-6 bg-slate-50/50 text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-100",
                                       expandedFaq === item.id ? "max-h-96 py-6 opacity-100" : "max-h-0 py-0 opacity-0"
                                    )}>
                                       {item.a}
                                    </div>
                                 </Card>
                              ))}
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                        <HelpCircle size={48} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="font-bold text-slate-900">No results found</h3>
                        <p className="text-slate-500 text-sm">Try a different search term or category.</p>
                     </div>
                  )}
               </div>
            </div>

            {/* --- RIGHT COLUMN: SIDEBAR --- */}
            <div className="lg:col-span-1 space-y-8">
               <ContactPanel formStatus={formStatus} setFormStatus={setFormStatus} />

               {/* Ticket History */}
               <Card>
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Activity size={18} className="text-novara-600" /> Recent Tickets
                     </h3>
                  </div>
                  <div className="space-y-3">
                     {TICKET_HISTORY.map(ticket => (
                        <div key={ticket.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center group hover:border-novara-200 transition-colors cursor-pointer">
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <span className="text-xs font-mono font-bold text-slate-400">{ticket.id}</span>
                                 {ticket.status === 'resolved' ? (
                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded border border-green-200 uppercase">Resolved</span>
                                 ) : (
                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200 uppercase">In Progress</span>
                                 )}
                              </div>
                              <p className="text-sm font-bold text-slate-700 truncate max-w-[180px] group-hover:text-novara-700 transition-colors">{ticket.subject}</p>
                           </div>
                           <span className="text-xs text-slate-400">{ticket.date}</span>
                        </div>
                     ))}
                     <Button variant="ghost" size="sm" className="w-full text-xs mt-2 hover:bg-slate-100">View All History <ExternalLink size={12} className="ml-1" /></Button>
                  </div>
               </Card>
            </div>
         </div>

         {/* Floating Chat Widget */}
         <LiveChatWidget />
      </div>
   );
};