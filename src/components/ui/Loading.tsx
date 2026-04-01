import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      <p className="mt-4 text-sm text-gray-500">Loading...</p>
    </div>
  );
};
