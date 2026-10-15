import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImg from '../../assets/images/hero_editorial_model_1791897804556.jpg';

interface HeroSectionProps {
  onShopClick: () => void;
  onAboutClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onAboutClick,
}) => {
  return (
    <section className="relative bg-[#FFFDF8] border-b border-[#242124]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#C6A56B] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Luxury Botanical Formulations</span>
              </span>
              
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#242124] tracking-tight leading-[1.1] max-w-2xl text-balance">
                Discover Your Signature Style.
              </h1>
              
              <p className="text-sm sm:text-base text-[#242124]/75 leading-relaxed max-w-xl">
                Thoughtfully selected essentials designed to complement your lifestyle, elevate your everyday experience, and help you feel confident in your choices.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="px-8 py-4 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#393439] transition-colors flex items-center justify-center gap-3 shadow-sm group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 text-[#C6A56B] group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onAboutClick}
                className="px-8 py-4 bg-transparent border border-[#242124]/30 text-[#242124] text-xs uppercase tracking-widest font-semibold hover:bg-[#EAE1D7]/40 transition-colors text-center"
              >
                Discover Kathryn Lynne
              </button>
            </div>

            {/* Quiet Editorial Proof Row */}
            <div className="pt-6 border-t border-[#242124]/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#242124]/70">
              <div>
                <span className="block font-semibold text-sm tabular-nums text-[#242124]">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-[#242124]/60">Clean Botanicals</span>
              </div>
              <div className="h-6 w-px bg-[#242124]/10" />
              <div>
                <span className="block font-semibold text-sm tabular-nums text-[#242124]">Lagos & Abuja</span>
                <span className="text-[11px] uppercase tracking-wider text-[#242124]/60">Express Delivery</span>
              </div>
              <div className="h-6 w-px bg-[#242124]/10" />
              <div>
                <span className="block font-semibold text-sm tabular-nums text-[#242124]">Worldwide</span>
                <span className="text-[11px] uppercase tracking-wider text-[#242124]/60">Shopify Secured</span>
              </div>
            </div>
          </div>

          {/* Editorial Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 sm:aspect-3/4 lg:aspect-4/5 w-full bg-[#EAE1D7] overflow-hidden shadow-xl border border-[#242124]/10">
              <img
                src={heroImg}
                alt="Radiant editorial beauty model for Kathryn Lynne luxury skincare"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#F3DDE2] font-semibold block">
                  The Radiance Ritual
                </span>
                <p className="font-serif-luxury text-lg text-white">
                  Formulated for tropical humidity & dry seasons.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
