import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const LoadingSpinner = ({ className }) => (
  <div className={cn("flex items-center justify-center", className)}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export const EmptyState = ({ message, icon }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
    {icon && <div className="mb-4 text-gray-400">{icon}</div>}
    <p className="text-gray-500 dark:text-gray-400">{message}</p>
  </div>
);
