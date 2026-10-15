import React from 'react';
import { ArrowRight, Leaf, Shield, HeartHandshake } from 'lucide-react';
import storyImg from '../../assets/images/brand_story_artisan_1791897807910.jpg';

interface BrandStorySectionProps {
  onLearnMoreClick: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  onLearnMoreClick,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#EAE1D7]/30 border-b border-[#242124]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Visual */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="aspect-4/3 w-full bg-[#FFFDF8] overflow-hidden shadow-xl border border-[#242124]/10">
              <img
                src={storyImg}
                alt="Artisanal raw shea butter, golden marula seed oil and botanical formulation at Kathryn Lynne"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Editorial Caption */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#242124]/60 uppercase tracking-wider">
              <span>Pure Cold-Pressed Marula & West African Shea</span>
              <span>Lagos Formulation Suite</span>
            </div>
          </div>

          {/* Editorial Text */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
                Our Philosophy
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#242124] tracking-tight">
                Welcome to Kathryn Lynne.
              </h2>
              <p className="text-sm sm:text-base text-[#242124]/80 leading-relaxed font-serif-luxury italic">
                “Explore a thoughtfully curated shopping experience where quality, style, and everyday confidence come together.”
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#242124]/75 leading-relaxed">
              Founded with the conviction that luxury beauty should honor both skin and climate, Kathryn Lynne marries nutrient-dense African botanicals with proven clinical actives. We create multi-correctional formulas that thrive under the warmth of tropical sun, defend during dry Harmattan seasons, and deliver luminous glass-skin radiance worldwide.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#242124]/10">
              <div className="space-y-1">
                <Leaf className="w-4 h-4 text-[#C6A56B]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#242124]">
                  Bio-Compatible
                </h4>
                <p className="text-[11px] text-[#242124]/60 leading-normal">
                  Lipids that absorb without pore congestion.
                </p>
              </div>

              <div className="space-y-1">
                <Shield className="w-4 h-4 text-[#C6A56B]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#242124]">
                  True Barrier Care
                </h4>
                <p className="text-[11px] text-[#242124]/60 leading-normal">
                  Ceramides and unrefined botanical butters.
                </p>
              </div>

              <div className="space-y-1">
                <HeartHandshake className="w-4 h-4 text-[#C6A56B]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#242124]">
                  Ethical Sourcing
                </h4>
                <p className="text-[11px] text-[#242124]/60 leading-normal">
                  Fair trade seed harvests across West Africa.
                </p>
              </div>
            </div>

            {/* Read Story Button */}
            <div className="pt-2">
              <button
                onClick={onLearnMoreClick}
                className="px-6 py-3 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d383d] transition-colors inline-flex items-center gap-2"
              >
                <span>Read the Kathryn Lynne Story</span>
                <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
