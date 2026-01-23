import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { cn } from '../../utils/cn';

export const NetworkStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowBanner(true);
            // Hide "Back Online" message after 3 seconds
            setTimeout(() => setShowBanner(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowBanner(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!showBanner && isOnline) return null;

    return (
        <div className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg border flex items-center gap-3 backdrop-blur-md transition-all duration-300 animate-slide-up",
            isOnline
                ? "bg-green-500/90 border-green-400 text-white"
                : "bg-slate-900/90 border-slate-700 text-white"
        )}>
            {isOnline ? <Wifi size={18} /> : <WifiOff size={18} />}
            <span className="font-bold text-sm">
                {isOnline ? "You're back online!" : "You are currently offline."}
            </span>
        </div>
    );
};
