import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   Mail, Lock, Eye, EyeOff, User,
   Globe, HelpCircle, BookOpen, GraduationCap, Lightbulb,
   AlertCircle, Sparkles, Check, Loader2
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { Logo } from '../../../components/ui/Logo';
import { PasswordStrengthMeter } from '../../../components/ui/PasswordStrengthMeter';
import { cn } from '../../../utils/cn';
import { Input } from '../../../components/ui/Input';
import { SocialAuth } from '../components/SocialAuth';
import { AUTH_ERRORS } from '../constants/errors';
import signupImage from '../../../assets/images/signup-students.png';

type UserRole = 'student' | 'instructor'; // Removed 'admin' from frontend selection

export const SignupPage: React.FC = () => {
   const navigate = useNavigate();
   const { signup, isLoading, error: contextError } = useAuth();

   // Redirect if already logged in
   const { isAuthenticated } = useAuth();
   useEffect(() => {
      if (isAuthenticated) navigate('/dashboard');
   }, [isAuthenticated, navigate]);

   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student' as UserRole,
      agreedToTerms: false
   });

   // Live Password Validation - Derived State (No Effect needed)
   // Check password strength logic matches the meter's requirements
   const isPasswordWeak =
      formData.password.length < 8 ||
      !/\d/.test(formData.password) ||
      !/[A-Z]/.test(formData.password);


   const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Validation
      if (isPasswordWeak) {
         setError(AUTH_ERRORS.WEAK_PASSWORD);
         return;
      }

      if (formData.password !== formData.confirmPassword) {
         setError(AUTH_ERRORS.PASSWORD_MISMATCH);
         return;
      }

      if (!formData.agreedToTerms) {
         setError(AUTH_ERRORS.TERMS_REQUIRED);
         return;
      }

      try {
         await signup({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role, // Only student or instructor
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=0FA4A6&color=fff`,
            bio: `New ${formData.role} ready to start exploring Novara.`,
            title: formData.role === 'instructor' ? 'Instructor' : 'Student',
            phone: '',
            address: ''
         });
         // Navigation handled by auth context or useEffect
      } catch {
         // Error handled by context
      }
   };

   // Disable submit if form is invalid (Enterprise UX pattern: visual feedback)
   const isFormValid =
      formData.fullName &&
      formData.email &&
      !isPasswordWeak &&
      formData.password === formData.confirmPassword &&
      formData.agreedToTerms;

   return (
      <div className="min-h-screen w-full flex bg-white font-sans text-slate-600">

         {/* --- LEFT SIDE: ILLUSTRATION --- */}
         <div className="hidden lg:flex w-1/2 bg-[#F0FDFA] relative items-center justify-center overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
               <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-100/50 rounded-full blur-3xl opacity-60"></div>
               <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>

               {/* Floating Icons Pattern */}
               <div className="absolute top-20 left-20 text-teal-200 animate-float-delayed"><BookOpen size={48} /></div>
               <div className="absolute bottom-40 right-20 text-blue-200 animate-float"><Lightbulb size={40} /></div>
               <div className="absolute top-1/3 right-10 text-teal-200/50"><GraduationCap size={64} /></div>
            </div>

            {/* Main Composition */}
            <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center">
               {/* Image Frame */}
               <div className="relative w-full aspect-square max-w-md mx-auto mb-12">
                  <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl shadow-teal-900/5 transform -rotate-6"></div>
                  <div className="absolute inset-0 bg-teal-50 rounded-[3rem] transform rotate-3 overflow-hidden border-8 border-white shadow-xl">
                     <img
                        src={signupImage}
                        alt="Students studying together"
                        className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                     />
                  </div>

                  {/* Floating Badge 1 */}
                  <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg shadow-teal-900/10 animate-float border border-slate-50">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                           <Sparkles size={20} fill="currentColor" />
                        </div>
                        <div>
                           <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Community</div>
                           <div className="text-sm font-bold text-slate-800">Top Rated 5.0</div>
                        </div>
                     </div>
                  </div>

                  {/* Floating Badge 2 */}
                  <div className="absolute -bottom-8 -left-4 bg-white p-4 rounded-2xl shadow-lg shadow-teal-900/10 animate-float-delayed border border-slate-50">
                     <div className="flex -space-x-3 mb-2">
                        {[1, 2, 3, 4].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" style={{ backgroundImage: `url(https://randomuser.me/api/portraits/thumb/men/${i + 10}.jpg)`, backgroundSize: 'cover' }}></div>
                        ))}
                     </div>
                     <div className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg text-center">
                        +12k Joined this week
                     </div>
                  </div>
               </div>

               <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-slate-800">Learn Together, Grow Faster</h2>
                  <p className="text-slate-500 max-w-sm mx-auto text-lg leading-relaxed">
                     Join a community of ambitious learners and expert instructors on Novara.
                  </p>
               </div>
            </div>
         </div>

         {/* --- RIGHT SIDE: SIGN UP FORM --- */}
         <div className="w-full lg:w-1/2 flex flex-col relative bg-white overflow-y-auto">

            {/* Top Navigation */}
            <div className="w-full p-6 md:px-12 md:py-8 flex justify-between items-center shrink-0">
               {/* Logo */}
               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                  <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                     <Logo className="w-full h-full" />
                  </div>
                  <span className="text-2xl font-bold text-novara-600 tracking-tight font-sans">NOVARA</span>
               </div>

               {/* Right Icons */}
               <div className="flex items-center gap-3">
                  <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors" title="Select Language">
                     <Globe size={18} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors" title="Help">
                     <HelpCircle size={18} />
                  </button>
               </div>
            </div>

            {/* Form Container */}
            <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-20 pb-12 max-w-2xl mx-auto w-full">

               <div className="mb-8 mt-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                     Create your NOVARA <br /> Learning Account 👋
                  </h1>
                  <p className="text-lg text-slate-500">
                     Join thousands of learners and start your educational journey.
                  </p>
               </div>

               {(error || contextError) && (
                  <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
                     <AlertCircle size={18} className="shrink-0" />
                     {error || contextError}
                  </div>
               )}

               <form onSubmit={handleSignup} className="space-y-6">

                  {/* Role Selection - SECURE: No Admin Option */}
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">I am a...</label>
                     <div className="grid grid-cols-2 gap-4">
                        {['Student', 'Instructor'].map((roleLabel) => {
                           const roleValue = roleLabel.toLowerCase() as UserRole;
                           const isSelected = formData.role === roleValue;
                           return (
                              <label
                                 key={roleValue}
                                 className={cn(
                                    "cursor-pointer relative flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 transition-all duration-200",
                                    isSelected
                                       ? "border-novara-500 bg-novara-50 text-novara-700 shadow-md transform scale-[1.02]"
                                       : "border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                                 )}
                              >
                                 <input
                                    type="radio"
                                    name="role"
                                    className="sr-only"
                                    value={roleValue}
                                    checked={isSelected}
                                    onChange={() => setFormData({ ...formData, role: roleValue })}
                                 />
                                 <span className="text-sm font-bold">{roleLabel}</span>
                                 {isSelected && (
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-novara-500 rounded-full flex items-center justify-center animate-scale-in">
                                       <Check size={12} className="text-white" />
                                    </div>
                                 )}
                              </label>
                           );
                        })}
                     </div>
                  </div>

                  {/* Full Name - AutoFocus */}
                  <Input
                     label="Full Name"
                     type="text"
                     placeholder="Enter your full name"
                     icon={<User size={18} />}
                     value={formData.fullName}
                     onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                     required
                     autoFocus
                  />

                  {/* Email */}
                  <Input
                     label="Email"
                     type="email"
                     placeholder="Enter your e-mail"
                     icon={<Mail size={18} />}
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     required
                  />

                  {/* Password Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Password */}
                     <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create Password"
                        icon={<Lock size={18} />}
                        rightElement={
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                           >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                           </button>
                        }
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                     />

                     {/* Confirm Password */}
                     <Input
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        icon={<Lock size={18} />}
                        error={formData.confirmPassword && formData.password !== formData.confirmPassword ? AUTH_ERRORS.PASSWORD_MISMATCH : undefined}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                     />
                  </div>

                  {/* Strength Meter - Always visible if password exists */}
                  <div className={cn("transition-all duration-300 overflow-hidden", formData.password ? "max-h-48 opacity-100" : "max-h-0 opacity-0")}>
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <PasswordStrengthMeter password={formData.password} />
                     </div>
                  </div>

                  {/* Agreements */}
                  <label className="flex items-start gap-3 py-2 cursor-pointer group">
                     <div className="relative flex items-center mt-0.5">
                        <input
                           type="checkbox"
                           className="peer sr-only"
                           checked={formData.agreedToTerms}
                           onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                           required
                        />
                        <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-novara-500 peer-checked:border-novara-500 transition-all bg-white group-hover:border-novara-400"></div>
                        <Check size={12} className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                     </div>
                     <span className="text-sm text-slate-500 leading-tight select-none">
                        I agree to the <a href="/TermsPage" className="text-novara-600 font-bold hover:underline" onClick={(e) => { e.preventDefault(); navigate('/TermsPage'); }}>Terms of Service</a> and <a href="/PrivacyPage" className="text-novara-600 font-bold hover:underline" onClick={(e) => { e.preventDefault(); navigate('/PrivacyPage'); }}>Privacy Policy</a>.
                     </span>
                  </label>

                  {/* Submit Button with Loading State */}
                  <Button
                     type="submit"
                     size="lg"
                     className="w-full h-14 text-base rounded-xl bg-novara-600 hover:bg-novara-700 shadow-lg shadow-novara-500/25 font-bold tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                     disabled={isLoading || !isFormValid}
                  >
                     {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                           <Loader2 className="animate-spin" size={20} />
                           Creating Account...
                        </span>
                     ) : (
                        'Sign Up & Start Learning'
                     )}
                  </Button>
               </form>

               <SocialAuth mode="signup" />

               {/* Footer */}
               <div className="text-center text-sm mt-8">
                  <span className="text-slate-500">Already have an account? </span>
                  <button onClick={() => navigate('/login')} className="font-bold text-novara-600 hover:underline hover:text-novara-700 transition-colors">
                     Log in
                  </button>
               </div>

            </div>
         </div>

      </div>
   );
};
