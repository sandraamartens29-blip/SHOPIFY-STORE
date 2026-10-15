import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/defaultCatalog';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <nav className="flex items-center justify-center gap-2 text-xs text-[#242124]/60">
            <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#242124] font-medium">FAQ</span>
          </nav>

          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold block">
            Client Assistance
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#242124]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#242124]/75 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Kathryn Lynne formulations, orders in Nigeria, international delivery, and skincare rituals.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#242124]/10 shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-[#242124]"
                >
                  <span className="font-serif-luxury text-base sm:text-lg">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#C6A56B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#242124]/50 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-[#242124]/80 leading-relaxed border-t border-[#242124]/5">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-8 bg-[#EAE1D7]/30 border border-[#242124]/10 text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-[#C6A56B] mx-auto" />
          <h3 className="font-serif-luxury text-xl text-[#242124]">
            Have a Specific Question?
          </h3>
          <p className="text-xs text-[#242124]/70 max-w-md mx-auto">
            Our team is available to assist you with order status or custom recommendations.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3d383d] transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
