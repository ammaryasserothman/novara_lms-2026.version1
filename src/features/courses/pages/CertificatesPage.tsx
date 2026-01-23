import React, { useState } from 'react';
import {
   Award, Download, Share2, Eye, Lock,
   QrCode, Printer, X, ChevronRight, Search, ShieldCheck
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { useGlobal } from '../../../context/GlobalContext';

export const CertificatesPage: React.FC = () => {
   const { user } = useAuth();
   const { courses, enrollments } = useGlobal();
   const navigate = useNavigate();

   // Derive earned certificates from completed enrollments
   const earnedCertificates = Object.values(enrollments)
      .filter(enrollment => enrollment.status === 'completed')
      .map(enrollment => {
         const course = courses.find(c => c.id === enrollment.courseId);
         if (!course) return null;

         const completedDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
         });

         return {
            id: enrollment.certificateId || `CERT-${enrollment.courseId}`,
            courseId: enrollment.courseId,
            title: course.title,
            instructor: course.instructor,
            issueDate: completedDate,
            grade: '100%', // Since we don't track grades yet
            skills: ['Mastery', 'Completion'],
            verified: true
         };
      })
      .filter((cert): cert is NonNullable<typeof cert> => cert !== null);

   // Derive locked certificates from in-progress enrollments
   const lockedCertificates = Object.values(enrollments)
      .filter(enrollment => enrollment.status === 'in_progress')
      .map(enrollment => {
         const course = courses.find(c => c.id === enrollment.courseId);
         if (!course) return null;

         const totalLessons = course.syllabus.reduce((acc, m) => acc + m.lessons.length, 0);
         const completedCount = enrollment.completedLessons.length;

         return {
            id: `lock-${enrollment.courseId}`,
            courseId: enrollment.courseId,
            title: course.title,
            progress: enrollment.progress,
            totalModules: course.totalModules,
            // Approximate modules based on lesson count logic or use raw lessons
            completedModules: Math.floor((completedCount / totalLessons) * course.totalModules),
            estimatedDate: 'Ongoing'
         };
      })
      .filter((cert): cert is NonNullable<typeof cert> => cert !== null);

   const [selectedCert, setSelectedCert] = useState<typeof earnedCertificates[0] | null>(null);
   const [searchQuery, setSearchQuery] = useState('');

   const filteredCertificates = earnedCertificates.filter(cert =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.instructor.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <div className="space-y-8 font-sans text-slate-600 max-w-7xl mx-auto min-h-screen pb-20">

         {/* --- HEADER --- */}
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-slate-200 pb-8">
            <div>
               <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span className="hover:text-novara-600 cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</span>
                  <ChevronRight size={14} />
                  <span className="font-semibold text-slate-800">Certificates</span>
               </div>
               <h1 className="text-3xl font-bold text-slate-900">My Certificates</h1>
               <p className="text-lg text-slate-500 mt-1">
                  Manage and verify your professional learning achievements.
               </p>
            </div>

            <div className="flex items-center gap-4 bg-white border border-slate-200 p-2 pr-6 rounded-2xl shadow-sm">
               <div className="w-12 h-12 bg-novara-50 text-novara-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <div className="text-2xl font-bold text-slate-900 leading-none">{earnedCertificates.length}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Verified Credentials</div>
               </div>
            </div>
         </div>

         {/* --- EARNED CERTIFICATES SECTION --- */}
         <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
               <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Award className="text-novara-600" size={20} /> Earned Certificates
               </h2>

               {/* Search */}
               <div className="relative group w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-novara-500 transition-colors" size={16} />
                  <input
                     type="text"
                     placeholder="Search certificates..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-novara-500 transition-all shadow-sm"
                  />
               </div>
            </div>

            {filteredCertificates.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.map(cert => (
                     <Card key={cert.id} padding="none" className="overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full border-slate-200">
                        {/* Certificate Preview Thumbnail */}
                        <div
                           className="aspect-[1.4/1] bg-slate-100 relative cursor-pointer overflow-hidden border-b border-slate-100"
                           onClick={() => setSelectedCert(cert)}
                        >
                           <div className="absolute inset-4 bg-white border-4 border-slate-200 shadow-sm flex flex-col items-center justify-center text-center p-4 group-hover:scale-105 transition-transform duration-500">
                              <div className="w-8 h-8 rounded-full bg-novara-50 text-novara-600 flex items-center justify-center mb-2">
                                 <Award size={16} />
                              </div>
                              <div className="w-16 h-1 bg-slate-100 mb-2"></div>
                              <div className="w-24 h-1 bg-slate-100 mb-4"></div>
                              <div className="w-10 h-10 rounded-full bg-yellow-400/20 border-2 border-yellow-400/40"></div>
                           </div>

                           {/* Overlay on hover */}
                           <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <Button size="sm" variant="secondary" icon={<Eye size={16} />} className="shadow-lg pointer-events-none">
                                 Quick View
                              </Button>
                           </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-slate-900 leading-tight line-clamp-2 hover:text-novara-700 transition-colors cursor-pointer" onClick={() => setSelectedCert(cert)}>
                                 {cert.title}
                              </h3>
                           </div>

                           <div className="text-xs text-slate-500 space-y-1 mb-6">
                              <p>Issued: <span className="font-medium text-slate-700">{cert.issueDate}</span></p>
                              <p>ID: <span className="font-mono text-slate-400">{cert.id}</span></p>
                           </div>

                           <div className="mt-auto flex gap-2">
                              <Button
                                 variant="outline"
                                 className="flex-1 text-xs h-8 px-2 border-slate-200 text-slate-600 hover:text-novara-600"
                                 onClick={() => setSelectedCert(cert)}
                              >
                                 <Eye size={14} className="mr-2" /> View
                              </Button>
                              <Button
                                 variant="outline"
                                 className="flex-1 text-xs h-8 px-2 border-slate-200 text-slate-600 hover:text-novara-600"
                              >
                                 <Download size={14} className="mr-2" /> PDF
                              </Button>
                           </div>
                        </div>
                     </Card>
                  ))}
               </div>
            ) : (
               <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                  <ShieldCheck size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">No certificates match your search.</p>
               </div>
            )}
         </section>

         {/* --- LOCKED CERTIFICATES SECTION --- */}
         <section className="space-y-6 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 opacity-80">
               <Lock className="text-slate-400" size={20} /> In Progress (Locked)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {lockedCertificates.map(cert => (
                  <Card key={cert.id} className="flex gap-4 opacity-80 hover:opacity-100 transition-opacity border-slate-200 bg-slate-50">
                     <div className="w-20 h-20 bg-slate-200 rounded-xl flex items-center justify-center shrink-0">
                        <Lock size={24} className="text-slate-400" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-700 truncate">{cert.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                           <span>{cert.completedModules}/{cert.totalModules} Modules</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                           <span>Est: {cert.estimatedDate}</span>
                        </div>

                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                           <div className="bg-slate-400 h-2 rounded-full" style={{ width: `${cert.progress}%` }}></div>
                        </div>
                        <button
                           className="text-xs font-bold text-novara-600 hover:underline"
                           onClick={() => navigate(`/courses/${cert.courseId}`)}
                        >
                           Continue Course
                        </button>
                     </div>
                  </Card>
               ))}
            </div>
         </section>

         {/* --- VERIFICATION FOOTER --- */}
         <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl shadow-slate-200">
            <div className="flex items-center gap-6">
               <div className="hidden md:block bg-white p-2 rounded-lg">
                  <QrCode size={48} className="text-slate-900" />
               </div>
               <div>
                  <h3 className="text-lg font-bold mb-1">Verify Authenticity</h3>
                  <p className="text-slate-400 text-sm max-w-md">
                     Employers and institutions can verify your credentials using the unique Certificate ID located on each document or by scanning the QR code.
                  </p>
               </div>
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white whitespace-nowrap">
               Copy Verification Link
            </Button>
         </div>

         {/* --- CERTIFICATE VIEWER MODAL --- */}
         {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
               <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">

                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-4 border-b border-slate-100">
                     <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-green-500" /> Verified Certificate
                     </h3>
                     <button
                        onClick={() => setSelectedCert(null)}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                     >
                        <X size={20} />
                     </button>
                  </div>

                  {/* Certificate Preview (CSS Based) */}
                  <div className="p-8 bg-slate-50 flex justify-center overflow-x-auto">
                     <div className="bg-white w-[800px] h-[560px] border-[16px] border-double border-slate-200 p-12 shadow-xl relative shrink-0">
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                           <Award size={400} />
                        </div>

                        {/* Content */}
                        <div className="h-full border border-slate-200 flex flex-col items-center justify-between py-12 px-16 text-center relative z-10">

                           {/* Header */}
                           <div className="space-y-4">
                              <div className="flex items-center justify-center gap-2 text-novara-600 mb-4">
                                 <Award size={32} />
                                 <span className="text-xl font-bold tracking-widest uppercase">Novara LMS</span>
                              </div>
                              <h2 className="text-4xl font-serif font-bold text-slate-900">Certificate of Completion</h2>
                              <p className="text-slate-500 uppercase tracking-widest text-sm">This is to certify that</p>
                           </div>

                           {/* Name */}
                           <div>
                              <h3 className="text-4xl font-serif italic text-novara-700 mb-4 px-8 border-b border-slate-300 pb-2 inline-block min-w-[300px]">
                                 {user?.name || 'Student'}
                              </h3>
                              <p className="text-slate-500 uppercase tracking-widest text-xs mt-2">Has successfully completed the course</p>
                              <h4 className="text-2xl font-bold text-slate-800 mt-2">{selectedCert.title}</h4>
                           </div>

                           {/* Footer / Signatures */}
                           <div className="w-full flex justify-between items-end mt-8">
                              <div className="text-center">
                                 <div className="font-script text-2xl text-slate-800 mb-2">{selectedCert.instructor}</div>
                                 <div className="border-t border-slate-300 w-40 mx-auto pt-1">
                                    <p className="text-[10px] font-bold uppercase text-slate-400">Instructor</p>
                                 </div>
                              </div>

                              {/* Seal */}
                              <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center shadow-inner relative">
                                 <div className="w-20 h-20 border-2 border-yellow-600 rounded-full border-dashed opacity-50"></div>
                                 <Award className="absolute text-yellow-700 opacity-80" size={40} />
                              </div>

                              <div className="text-center">
                                 <div className="font-mono text-sm text-slate-800 mb-4">{selectedCert.issueDate}</div>
                                 <div className="border-t border-slate-300 w-40 mx-auto pt-1">
                                    <p className="text-[10px] font-bold uppercase text-slate-400">Date Issued</p>
                                 </div>
                              </div>
                           </div>

                           <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-300">
                              ID: {selectedCert.id}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div className="text-xs text-slate-400">
                        Authenticity can be verified at <span className="underline cursor-pointer hover:text-novara-600">novara.edu/verify</span>
                     </div>
                     <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none">
                           <Share2 size={16} className="mr-2" /> Share
                        </Button>
                        <Button variant="outline" className="flex-1 sm:flex-none">
                           <Printer size={16} className="mr-2" /> Print
                        </Button>
                        <Button className="flex-1 sm:flex-none">
                           <Download size={16} className="mr-2" /> Download PDF
                        </Button>
                     </div>
                  </div>

               </div>
            </div>
         )}

      </div>
   );
};