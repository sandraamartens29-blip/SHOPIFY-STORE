import React from 'react';
import { ArrowRight, Instagram, MessageCircle, Share2 } from 'lucide-react';

interface FinalCtaSectionProps {
  onShopClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onShopClick,
}) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+2348000000000';
  const prefilledMessage = encodeURIComponent('Hello Kathryn Lynne, I would like to know more about your products.');
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${prefilledMessage}`;

  return (
    <section className="py-20 sm:py-28 bg-[#FFFDF8] text-center border-b border-[#242124]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Conversion Closer */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
            Begin Your Routine
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#242124] tracking-tight">
            Find Your Next Favorite.
          </h2>
          <p className="text-sm sm:text-base text-[#242124]/75 max-w-xl mx-auto leading-relaxed">
            Explore the collection and discover products selected with your everyday needs in mind.
          </p>
          <div className="pt-4">
            <button
              onClick={onShopClick}
              className="px-10 py-4 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#383338] transition-colors inline-flex items-center gap-3 shadow-md group"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4 text-[#C6A56B] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Social Connection Section */}
        <div className="pt-12 border-t border-[#242124]/10 space-y-4">
          <h3 className="font-serif-luxury text-2xl text-[#242124]">
            Stay Connected with Kathryn Lynne.
          </h3>
          <p className="text-xs text-[#242124]/60 max-w-md mx-auto">
            Follow our daily formulations, client journeys, and editorial skincare guides across social platforms.
          </p>
          
          <div className="flex items-center justify-center gap-6 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#FFFDF8] border border-[#242124]/10 text-[#242124] hover:text-[#C6A56B] hover:border-[#C6A56B] transition-colors"
              aria-label="Instagram Kathryn Lynne"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#FFFDF8] border border-[#242124]/10 text-[#242124] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
              aria-label="WhatsApp Kathryn Lynne"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="mailto:sandraamartens29@gmail.com"
              className="p-3 bg-[#FFFDF8] border border-[#242124]/10 text-[#242124] hover:text-[#C6A56B] hover:border-[#C6A56B] transition-colors"
              aria-label="Direct Email"
            >
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
