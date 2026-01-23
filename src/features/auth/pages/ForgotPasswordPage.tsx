import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Lock, HelpCircle, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Logo } from '../../../components/ui/Logo';
import { Input } from '../../../components/ui/Input';

export const ForgotPasswordPage: React.FC = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
         setIsLoading(false);
         setIsSubmitted(true);
      }, 1500);
   };

   return (
      <div className="min-h-screen w-full flex bg-white font-sans text-slate-600">

         {/* --- LEFT SIDE: ILLUSTRATION --- */}
         <div className="hidden lg:flex w-1/2 bg-slate-50 relative items-center justify-center overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>

            <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
               <div className="relative w-[450px] h-[450px] flex items-center justify-center">
                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
                     <path d="M100,150 Q200,50 350,100" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 6" />
                     <path d="M350,350 Q200,400 100,300" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 6" />
                  </svg>

                  {/* Main Circle Bg */}
                  <div className="absolute w-[380px] h-[380px] bg-white rounded-full shadow-2xl shadow-blue-900/5 opacity-90"></div>

                  {/* Image */}
                  <div className="absolute w-[300px] h-[300px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-[6px] md:border-8 border-white shadow-xl z-10 bg-slate-50">
                     <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/clueless-puzzled-thoughtful-man-forgot-password-access-denied-account-trying-log-remember_199628-437.jpg')" }}
                        role="img"
                        aria-label="Thinking person illustration"
                     />
                  </div>

                  {/* Floating Element 1: Lock */}
                  <div className="absolute top-10 right-10 z-20 bg-white p-4 rounded-2xl shadow-lg border border-slate-50 animate-float">
                     <div className="bg-blue-50 p-3 rounded-xl text-blue-500">
                        <Lock size={28} />
                     </div>
                  </div>

                  {/* Floating Element 2: Mail */}
                  <div className="absolute bottom-10 left-4 z-20 bg-white p-4 rounded-2xl shadow-lg border border-slate-50 animate-float-delayed flex items-center gap-3">
                     <div className="bg-green-50 p-2.5 rounded-xl text-green-600">
                        <Mail size={24} />
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</div>
                        <div className="text-sm font-bold text-slate-800">Check Inbox</div>
                     </div>
                  </div>

                  {/* Floating Element 3: Question */}
                  <div className="absolute top-20 left-8 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md border border-slate-100 animate-float-delayed">
                     <HelpCircle size={24} className="text-novara-400" />
                  </div>

                  {/* Floating Element 4: Shield */}
                  <div className="absolute bottom-24 right-0 z-20 bg-white p-2 rounded-xl shadow-lg border border-slate-50 animate-float">
                     <ShieldCheck size={24} className="text-slate-400" />
                  </div>
               </div>

               <div className="text-center mt-8 space-y-2 relative z-20">
                  <h2 className="text-2xl font-bold text-slate-800">Forgot your password?</h2>
                  <p className="text-slate-500 max-w-xs mx-auto text-lg">
                     Don't worry, we'll help you get back to your learning journey.
                  </p>
               </div>
            </div>
         </div>

         {/* --- RIGHT SIDE: FORM --- */}
         <div className="w-full lg:w-1/2 flex flex-col relative">
            <div className="w-full p-6 md:p-10 flex items-center">
               <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                  <div className="w-10 h-10 flex items-center justify-center text-novara-600">
                     <Logo className="w-full h-full" />
                  </div>
                  <span className="text-xl font-bold text-novara-700 tracking-tight font-sans">NOVARA</span>
               </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-2xl mx-auto w-full">

               {!isSubmitted ? (
                  <>
                     <div className="mb-8">
                        <button onClick={() => navigate('/login')} className="flex items-center text-sm font-bold text-slate-400 hover:text-slate-600 mb-6 transition-colors group">
                           <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Log In
                        </button>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password 🔒</h1>
                        <p className="text-slate-500 text-lg">Enter your email and we'll send you instructions to reset your password.</p>
                     </div>

                     <Card className="shadow-xl shadow-slate-200/60 border-slate-100 p-8 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <Input
                              label="Email Address"
                              type="email"
                              placeholder="Enter your registered email"
                              icon={<Mail size={20} />}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                           />

                           <Button
                              type="submit"
                              size="lg"
                              className="w-full py-4 text-lg rounded-xl bg-novara-600 hover:bg-novara-700 shadow-lg shadow-novara-500/25"
                              disabled={isLoading}
                           >
                              {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                           </Button>
                        </form>
                     </Card>
                  </>
               ) : (
                  <div className="text-center">
                     <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 animate-fade-in border-4 border-green-100">
                        <CheckCircle size={48} />
                     </div>
                     <h1 className="text-3xl font-bold text-slate-900 mb-2">Check your email 📧</h1>
                     <p className="text-slate-500 mb-8 max-w-sm mx-auto text-lg">
                        We have sent a password reset link to <span className="font-bold text-slate-800">{email}</span>. Please check your inbox and spam folder.
                     </p>

                     <div className="space-y-4 max-w-xs mx-auto">
                        <Button
                           className="w-full py-4 text-base rounded-xl bg-novara-600 hover:bg-novara-700 shadow-lg shadow-novara-500/25"
                           onClick={() => window.open('mailto:')}
                        >
                           Open Email App
                        </Button>

                        <button
                           onClick={() => navigate('/login')}
                           className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                        >
                           Skip, I'll confirm later
                        </button>
                     </div>

                     <div className="mt-12 text-sm text-slate-400">
                        Did not receive the email? <button onClick={() => setIsSubmitted(false)} className="text-novara-600 font-bold hover:underline">Click to resend</button>
                     </div>
                  </div>
               )}

            </div>
         </div>
      </div>
   );
};