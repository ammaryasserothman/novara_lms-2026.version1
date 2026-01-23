import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Server, Cookie, Download, Printer, Share2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Logo } from '../../../components/ui/Logo';

const SECTIONS = [
   { id: 'collection', title: '1. Data Collection', icon: <Eye size={16} /> },
   { id: 'usage', title: '2. Data Usage', icon: <Server size={16} /> },
   { id: 'sharing', title: '3. Data Sharing', icon: <Share2 size={16} /> },
   { id: 'security', title: '4. Security Measures', icon: <Shield size={16} /> },
   { id: 'cookies', title: '5. Cookie Policy', icon: <Cookie size={16} /> },
   { id: 'rights', title: '6. Your Rights', icon: <Lock size={16} /> }
];

export const PrivacyPage: React.FC = () => {
   const navigate = useNavigate();
   const [activeSection, setActiveSection] = useState('collection');

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
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trust Center</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="hidden sm:flex text-sm text-slate-500 gap-6 mr-6">
                     <Link to="/TermsPage" className="hover:text-slate-900 cursor-pointer transition-colors">Terms</Link>
                     <span className="font-bold text-slate-900 cursor-pointer">Privacy</span>
                     <Link to="/security" className="hover:text-slate-900 cursor-pointer transition-colors">Security</Link>
                  </div>
                  <Button variant="outline" size="sm" icon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>Back</Button>
               </div>
            </div>
         </nav>

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Header */}
            <div className="mb-16 text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-xs font-bold uppercase tracking-wider mb-6">
                  <Shield size={14} /> Data Protection
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Privacy Policy</h1>
               <p className="text-lg text-slate-500 leading-relaxed">
                  Your privacy is non-negotiable. Learn how we protect, manage, and respect your data across the Novara platform.
               </p>
               <div className="mt-8 flex justify-center gap-3">
                  <span className="text-sm font-bold text-slate-400">Version 3.1 • Effective Date: November 1, 2024</span>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>

               {/* Left Column: TOC */}
               <aside className="lg:col-span-1 hidden lg:block sticky top-28">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4 pl-3">Table of Contents</h3>
                  <ul className="space-y-1 border-l-2 border-slate-100">
                     {SECTIONS.map(section => (
                        <li key={section.id}>
                           <button
                              onClick={() => scrollToSection(section.id)}
                              className={`text-sm py-2 pl-3 border-l-2 -ml-[2px] w-full text-left transition-all flex items-center gap-2 ${activeSection === section.id
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
                     <Button variant="outline" className="w-full justify-start text-xs" icon={<Download size={14} />}>Download Policy</Button>
                     <Button variant="outline" className="w-full justify-start text-xs" icon={<Printer size={14} />}>Print Version</Button>
                  </div>
               </aside>

               {/* Right Column: Content */}
               <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 lg:p-16">
                  <div className="space-y-16 max-w-none prose prose-slate prose-lg">

                     <section id="collection" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-novara-600"><Eye size={20} /></div>
                           1. Information We Collect
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                           We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                           {[
                              { t: "Identity Data", d: "Name, username, DOB" },
                              { t: "Contact Data", d: "Email, telephone, address" },
                              { t: "Financial Data", d: "Payment card details (encrypted)" },
                              { t: "Usage Data", d: "Course progress, quiz scores" }
                           ].map((item, i) => (
                              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                 <h4 className="font-bold text-slate-900 text-sm mb-1">{item.t}</h4>
                                 <p className="text-xs text-slate-500">{item.d}</p>
                              </div>
                           ))}
                        </div>
                     </section>

                     <section id="usage" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-novara-600"><Server size={20} /></div>
                           2. How We Use Your Information
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           We use the information we collect to provide, maintain, and improve our services, such as to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-600">
                           <li>Administer your account and visualize your learning progress.</li>
                           <li>Process payments and facilitate certificate generation.</li>
                           <li>Provide personalized course recommendations using AI modeling.</li>
                           <li>Send you technical notices, updates, security alerts, and support messages.</li>
                        </ul>
                     </section>

                     <section id="sharing" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-novara-600"><Share2 size={20} /></div>
                           3. Data Sharing & Third Parties
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           We do not sell your personal data. We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., AWS for hosting, Stripe for payments).
                        </p>
                     </section>

                     <section id="security" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-novara-600"><Shield size={20} /></div>
                           4. Security Measures
                        </h2>
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-6">
                           <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Lock size={16} /> Enterprise-Grade Encryption</h4>
                           <p className="text-blue-800 text-sm">All data is encrypted at rest using AES-256 and in transit using TLS 1.3 protocol. We undergo annual SOC 2 Type II audits.</p>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                           We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>
                     </section>

                     <section id="cookies" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-novara-600"><Cookie size={20} /></div>
                           5. Cookies & Tracking
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Services.
                        </p>
                     </section>

                     <section id="rights" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-novara-600"><Lock size={20} /></div>
                           6. Your Rights (GDPR & CCPA)
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                           Depending on your location, you may have rights including:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                           <div className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                              <div className="font-bold text-slate-900">Right to Access</div>
                              <div className="text-xs text-slate-500 mt-1">Request a copy of your data</div>
                           </div>
                           <div className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                              <div className="font-bold text-slate-900">Right to Erasure</div>
                              <div className="text-xs text-slate-500 mt-1">Request deletion of your account</div>
                           </div>
                        </div>
                     </section>

                  </div>

                  <div className="mt-16 pt-12 border-t border-slate-100">
                     <h4 className="font-bold text-slate-900 mb-4">Have questions about your privacy?</h4>
                     <p className="text-slate-500 mb-6">Our Data Protection Officer is available to address your concerns.</p>
                     <Button onClick={() => window.location.href = 'mailto:privacy@novara.com'}>Contact Privacy Team</Button>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};