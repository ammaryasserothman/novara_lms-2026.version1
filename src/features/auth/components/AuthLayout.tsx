import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, HelpCircle } from 'lucide-react';
import { Logo } from '../../../components/ui/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  illustration: React.ReactNode;
  title: React.ReactNode;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  illustrationClassName?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  illustration,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
  illustrationClassName = '',
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-600">
      {/* --- LEFT SIDE: ILLUSTRATION --- */}
      <div className={`hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden ${illustrationClassName}`}>
        {illustration}
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="w-full lg:w-1/2 flex flex-col relative bg-white overflow-y-auto">
        {/* Top Navigation */}
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
              {title}
            </h1>
            <p className="text-lg text-slate-500">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="text-center text-sm mt-8">
            <span className="text-slate-500">{footerText} </span>
            <button
              onClick={() => navigate(footerLinkTo)}
              className="font-bold text-novara-600 hover:text-novara-700 hover:underline transition-colors"
            >
              {footerLinkText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
