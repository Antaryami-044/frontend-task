import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sun, Moon, User, ShieldCheck, Menu } from 'lucide-react';

export const Header = ({ onMenuClick }) => {
  const { darkMode, setDarkMode, role, setRole } = useAppContext();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          FinTrack
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setRole('Viewer')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              role === 'Viewer' 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
                : 'text-gray-500'
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole('Admin')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              role === 'Admin' 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
                : 'text-gray-500'
            }`}
          >
            Admin
          </button>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {role === 'Admin' ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold dark:text-white">John Doe</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
