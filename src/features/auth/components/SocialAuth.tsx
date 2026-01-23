import React from 'react';

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.35 11.1H12v2.8h5.35c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.8-4.1 2.8-6.9 0-.7-.1-1.3-.2-1.9z" fill="currentColor" />
        <path d="M12 21c2.6 0 4.8-.9 6.4-2.3l-3.1-2.4c-.8.6-1.9 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H3.3v2.5C4.9 18.9 8.2 21 12 21z" fill="currentColor" />
        <path d="M6.5 13.2c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2V6.3H3.3C2.5 7.9 2 9.9 2 12s.5 4.1 1.3 5.7l3.2-2.5z" fill="currentColor" />
        <path d="M12 5.4c1.4 0 2.7.5 3.7 1.4l2.7-2.7C16.8 2.5 14.6 1.6 12 1.6 8.2 1.6 4.9 3.7 3.3 6.3l3.2 2.5c.8-2.3 2.9-4 5.5-4z" fill="currentColor" />
    </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 3.75-1.62 1.54.01 2.94.81 3.86 2.16-3.3 1.83-2.61 5.92.74 7.23-.55 1.56-1.57 3.33-3.43 4.46zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

interface SocialAuthProps {
    mode?: 'login' | 'signup';
}

export const SocialAuth: React.FC<SocialAuthProps> = ({ mode = 'login' }) => {
    return (
        <>
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs text-slate-400 font-medium">
                    <span className="px-4 bg-white">Or {mode === 'signup' ? 'sign up' : 'sign in'} with</span>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                {[
                    { icon: <GoogleIcon className="w-5 h-5" />, label: "Google" },
                    { icon: <LinkedInIcon className="w-5 h-5" />, label: "LinkedIn" },
                    { icon: <AppleIcon className="w-5 h-5" />, label: "Apple" }
                ].map((social, i) => (
                    <button
                        key={i}
                        type="button"
                        className="w-14 h-14 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 hover:scale-105 transition-all shadow-sm"
                        title={social.label}
                    >
                        {social.icon}
                    </button>
                ))}
            </div>
        </>
    );
};
