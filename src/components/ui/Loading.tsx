import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px] text-slate-500">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
};
