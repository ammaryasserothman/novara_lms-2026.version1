import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );
};
