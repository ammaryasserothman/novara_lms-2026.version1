import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
   Mail, Lock, Eye, EyeOff, Check,
   Globe, HelpCircle, Loader2, Play, MousePointer2
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Logo } from '../../../components/ui/Logo';
import { Input } from '../../../components/ui/Input';
import { SocialAuth } from '../components/SocialAuth';
import { AUTH_ERRORS } from '../constants/errors';
import loginImage from '../../../assets/images/login-student.png';

export const LoginPage: React.FC = () => {
   const navigate = useNavigate();
   const { login, isLoading, error, isAuthenticated } = useAuth();

   // Redirect if already logged in
   React.useEffect(() => {
      if (isAuthenticated) {
         navigate('/dashboard');
      }
   }, [isAuthenticated, navigate]);

   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
      email: '',
      password: '',
      rememberMe: false
   });
   const [localError, setLocalError] = useState<string | null>(null);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLocalError(null);

      if (!formData.email || !formData.password) {
         setLocalError(AUTH_ERRORS.INVALID_CREDENTIALS);
         return;
      }

      try {
         await login(formData.email, formData.password);
         navigate('/dashboard');
      } catch {
         setLocalError(AUTH_ERRORS.INVALID_CREDENTIALS);
      }
   };

   return (
      <div className="min-h-screen w-full flex bg-white font-sans text-slate-600">

         {/* --- LEFT SIDE: ILLUSTRATION (Split Screen Style) --- */}
         {/* استخدمت خلفية بنفسجية فاتحة جداً لتمييز الدخول عن التسجيل الأزرق */}
         <div className="hidden lg:flex w-1/2 bg-[#F5F3FF] relative items-center justify-center overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/50 rounded-full blur-3xl opacity-60"></div>
               <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-indigo-200/50 rounded-full blur-3xl opacity-60"></div>

               {/* Floating Icons specific to 'Welcome Back' */}
               <div className="absolute top-1/4 left-10 text-purple-300 animate-float">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                     <span className="text-2xl">👋</span>
                  </div>
               </div>
            </div>

            {/* Main Composition */}
            <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center">

               {/* Tilted Image Frame (Matching Signup Style) */}
               <div className="relative w-full aspect-square max-w-md mx-auto mb-12">
                  <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl shadow-purple-900/10 transform rotate-6"></div>
                  <div className="absolute inset-0 bg-purple-50 rounded-[3rem] transform -rotate-3 overflow-hidden border-8 border-white shadow-xl">
                     <img
                        src={loginImage}
                        alt="Student learning online"
                        className="w-full h-full object-cover object-top opacity-95 hover:scale-105 transition-transform duration-700"
                     />
                  </div>

                  {/* Floating Video Badge (Unique to Login) */}
                  <div className="absolute bottom-8 -right-4 animate-float-delayed z-20">
                     <div className="bg-[#334155] text-white p-3 rounded-xl shadow-xl flex items-center gap-3 w-40 border-2 border-white transform rotate-[-5deg]">
                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center shrink-0">
                           <Play size={12} fill="currentColor" />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                           <div className="h-1.5 w-full bg-slate-600 rounded-full"></div>
                           <div className="h-1.5 w-2/3 bg-slate-600 rounded-full"></div>
                        </div>
                     </div>
                     {/* Cursor */}
                     <div className="absolute -bottom-6 -right-6 drop-shadow-md">
                        <MousePointer2 size={32} fill="#F1F5F9" className="text-slate-400 rotate-[-15deg]" />
                     </div>
                  </div>
               </div>

               <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-slate-800">Welcome Back!</h2>
                  <p className="text-slate-500 max-w-sm mx-auto text-lg leading-relaxed">
                     Pick up right where you left off. Your courses are waiting for you.
                  </p>
               </div>
            </div>
         </div>

         {/* --- RIGHT SIDE: LOGIN FORM --- */}
         <div className="w-full lg:w-1/2 flex flex-col relative bg-white overflow-y-auto">

            {/* Top Navigation (Consistent with Signup) */}
            <div className="w-full p-6 md:px-12 md:py-8 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                  <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                     <Logo className="w-full h-full text-novara-600" />
                  </div>
                  <span className="text-2xl font-bold text-novara-600 tracking-tight font-sans">NOVARA</span>
               </div>

               <div className="flex items-center gap-3">
                  <button
                     className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-novara-500"
                     title="Select Language"
                     aria-label="Select Language"
                  >
                     <Globe size={18} />
                  </button>
                  <button
                     className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-novara-500"
                     title="Help"
                     aria-label="Help"
                  >
                     <HelpCircle size={18} />
                  </button>
               </div>
            </div>

            {/* Form Container */}
            <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-20 justify-center max-w-2xl mx-auto w-full pb-12">

               <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                     Log in to your account
                  </h1>
                  <p className="text-lg text-slate-500">
                     Welcome back! Please enter your details.
                  </p>
               </div>

               <form onSubmit={handleLogin} className="space-y-6">
                  {(localError || error) && (
                     <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2 animate-fade-in">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        {localError || error}
                     </div>
                  )}

                  {/* Email Input */}
                  <Input
                     label="Email"
                     type="email"
                     placeholder="What is your e-mail?"
                     icon={<Mail size={18} />}
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     required
                     autoFocus
                  />

                  {/* Password Input */}
                  <div className="space-y-1">
                     <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        icon={<Lock size={18} />}
                        rightElement={
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-novara-500 rounded-full p-1 transition-colors"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                           >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                           </button>
                        }
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                     />
                  </div>

                  {/* Remember & Forgot Row */}
                  <div className="flex items-center justify-between">
                     <label className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="relative flex items-center">
                           <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={formData.rememberMe}
                              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                           />
                           <div className="w-5 h-5 border-2 border-slate-300 rounded bg-white peer-checked:bg-novara-500 peer-checked:border-novara-500 transition-all group-hover:border-novara-400"></div>
                           <Check size={12} className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 select-none">Remember for 30 days</span>
                     </label>
                     <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-sm font-bold text-novara-600 hover:text-novara-700 hover:underline transition-colors"
                     >
                        Forgot password?
                     </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                     type="submit"
                     size="lg"
                     className="w-full h-14 text-lg rounded-xl bg-novara-600 hover:bg-novara-700 shadow-lg shadow-novara-500/25 font-bold tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                           <Loader2 className="animate-spin" size={20} />
                           Logging in...
                        </span>
                     ) : (
                        'Log In'
                     )}
                  </Button>
               </form>

               <SocialAuth mode="login" />

               <div className="text-center text-sm mt-8">
                  <span className="text-slate-500">Don't have an account? </span>
                  <button onClick={() => navigate('/signup')} className="font-bold text-novara-600 hover:text-novara-700 hover:underline transition-colors">
                     Sign up
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};