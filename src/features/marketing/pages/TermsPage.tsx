import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Share2, ChevronRight, Scale } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Logo } from '../../../components/ui/Logo';

const SECTIONS = [
   { id: 'acceptance', title: '1. Acceptance of Terms' },
   { id: 'license', title: '2. Use License' },
   { id: 'accounts', title: '3. User Accounts' },
   { id: 'intellectual', title: '4. Intellectual Property' },
   { id: 'termination', title: '5. Termination' },
   { id: 'liability', title: '6. Limitation of Liability' },
   { id: 'governing', title: '7. Governing Law' }
];

export const TermsPage: React.FC = () => {
   const navigate = useNavigate();
   const [activeSection, setActiveSection] = useState('acceptance');

   // Scroll spy effect
   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               setActiveSection(entry.target.id);
            }
         });
      }, { rootMargin: '-100px 0px -60% 0px' });

      SECTIONS.forEach(section => {
         const element = document.getElementById(section.id);
         if (element) observer.observe(element);
      });

      return () => observer.disconnect();
   }, []);

   const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   };

   return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-600">
         {/* Navigation */}
         <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                  <div className="w-9 h-9 flex items-center justify-center text-novara-600 bg-novara-50 rounded-lg group-hover:scale-110 transition-transform">
                     <Logo className="w-6 h-6" />
                  </div>
                  <div>
                     <span className="text-lg font-bold text-slate-900 tracking-tight block leading-none">NOVARA</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Legal Center</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="hidden sm:flex text-sm text-slate-500 gap-6 mr-6">
                     <span className="font-bold text-slate-900 cursor-pointer">Terms</span>
                     <Link to="/PrivacyPage" className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</Link>
                     <Link to="/security" className="hover:text-slate-900 cursor-pointer transition-colors">Security</Link>
                  </div>
                  <Button variant="outline" size="sm" icon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>Back</Button>
               </div>
            </div>
         </nav>

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Header */}
            <div className="mb-16 text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold uppercase tracking-wider mb-6">
                  <Scale size={14} /> Legal Agreement
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Terms of Service</h1>
               <p className="text-lg text-slate-500 leading-relaxed">
                  Please read these terms carefully before using our platform. By using Novara LMS, you agree to these legal conditions.
               </p>
               <div className="mt-8 flex justify-center gap-3">
                  <span className="text-sm font-bold text-slate-400">Version 2.4 • Last updated: October 24, 2024</span>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>

               {/* Left Column: Sticky Table of Contents */}
               <aside className="lg:col-span-1 hidden lg:block sticky top-28">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4 pl-3">Table of Contents</h3>
                  <ul className="space-y-1 border-l-2 border-slate-100">
                     {SECTIONS.map(section => (
                        <li key={section.id}>
                           <button
                              onClick={() => scrollToSection(section.id)}
                              className={`text-sm py-2 pl-3 border-l-2 -ml-[2px] w-full text-left transition-all ${activeSection === section.id
                                 ? 'border-novara-500 text-novara-600 font-bold'
                                 : 'border-transparent text-slate-500 hover:text-slate-800'
                                 }`}
                           >
                              {section.title}
                           </button>
                        </li>
                     ))}
                  </ul>

                  <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
                     <Button variant="outline" className="w-full justify-start text-xs" icon={<Download size={14} />}>Download PDF</Button>
                     <Button variant="outline" className="w-full justify-start text-xs" icon={<Printer size={14} />}>Print Version</Button>
                     <Button variant="outline" className="w-full justify-start text-xs" icon={<Share2 size={14} />}>Share Link</Button>
                  </div>
               </aside>

               {/* Right Column: Content */}
               <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 lg:p-16">
                  <div className="space-y-16 max-w-none prose prose-slate prose-lg">

                     <section id="acceptance" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">01</span>
                           Acceptance of Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           By accessing and using the NOVARA LMS platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this platform's particular services, you shall be subject to any posted guidelines or rules applicable to such services. All such guidelines or rules are hereby incorporated by reference into the TOS.
                        </p>
                     </section>

                     <section id="license" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">02</span>
                           Use of License
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                           Permission is granted to temporarily download one copy of the materials (information or software) on NOVARA's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="space-y-2 bg-slate-50 p-6 rounded-xl border border-slate-100 text-base">
                           <li className="flex items-start gap-3">
                              <ChevronRight size={18} className="text-novara-500 shrink-0 mt-0.5" />
                              <span>Modify or copy the materials;</span>
                           </li>
                           <li className="flex items-start gap-3">
                              <ChevronRight size={18} className="text-novara-500 shrink-0 mt-0.5" />
                              <span>Use the materials for any commercial purpose, or for any public display;</span>
                           </li>
                           <li className="flex items-start gap-3">
                              <ChevronRight size={18} className="text-novara-500 shrink-0 mt-0.5" />
                              <span>Attempt to decompile or reverse engineer any software contained on NOVARA's website;</span>
                           </li>
                        </ul>
                     </section>

                     <section id="accounts" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">03</span>
                           User Accounts
                        </h2>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4 text-yellow-900 text-base">
                           <strong>Important:</strong> You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                           To access certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                        </p>
                     </section>

                     <section id="intellectual" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">04</span>
                           Intellectual Property
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           The Service and its original content, features, and functionality are and will remain the exclusive property of NOVARA and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NOVARA.
                        </p>
                     </section>

                     <section id="termination" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">05</span>
                           Termination
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
                        </p>
                     </section>

                     {/* --- Added Sections for Enterprise Completeness --- */}

                     <section id="liability" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">06</span>
                           Limitation of Liability
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           In no event shall NOVARA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, loss of goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                     </section>

                     <section id="governing" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">07</span>
                           Governing Law
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        </p>
                     </section>
                  </div>

                  <div className="mt-16 pt-12 border-t border-slate-100">
                     <h4 className="font-bold text-slate-900 mb-4">Have questions about these terms?</h4>
                     <p className="text-slate-500 mb-6">If you have any questions about these Terms, please contact our legal team.</p>
                     <Button onClick={() => window.location.href = 'mailto:legal@novara.com'}>Contact Legal Team</Button>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};