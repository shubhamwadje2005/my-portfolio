import { Loader2 } from 'lucide-react';
import React from 'react';

interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({ message = "Loading" }: PageLoaderProps) {
  return (
    <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
      <div className="relative mb-6 animate-pulse-scale">
        {/* Customized brand loading indicator */}
        {/* <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse" /> */}
        <div className="relative w-16 h-16 mb-4">
          <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
        </div>
      </div>
      <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide flex items-center z-10">
        {message}
        <span className="inline-flex ml-1">
          <span className="animate-pulse-dot">.</span>
          <span className="animate-pulse-dot delay-150">.</span>
          <span className="animate-pulse-dot delay-300">.</span>
        </span>
      </p>
    </div>
  );
}
