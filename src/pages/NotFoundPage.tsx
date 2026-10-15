import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FFFDF8] min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <Compass className="w-12 h-12 text-[#C6A56B] mx-auto animate-pulse" />
        
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
            Error 404
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#242124]/70 leading-relaxed">
            The formulation or page you are seeking might have been renamed or relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3d383d] transition-colors"
          >
            Return Home
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 border border-[#242124]/20 text-[#242124] text-xs uppercase tracking-wider font-semibold hover:bg-[#EAE1D7]/40 transition-colors"
          >
            Explore All Formulations
          </button>
        </div>
      </div>
    </div>
  );
};
