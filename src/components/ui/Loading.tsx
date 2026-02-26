import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh] text-novara-500 animate-fade-in">
            <Loader2 className="animate-spin" size={48} />
        </div>
    );
};
