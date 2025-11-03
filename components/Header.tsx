
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Wanderlust Whispers
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Your Anonymous Travel Diary
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
