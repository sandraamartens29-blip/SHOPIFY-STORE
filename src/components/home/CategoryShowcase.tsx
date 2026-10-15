import React from 'react';
import { useShopify } from '../../context/ShopifyContext';
import { ArrowUpRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCollection: (handle: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCollection,
}) => {
  const { collections } = useShopify();

  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#242124]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
              Curated Formulations
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
              Explore by Ritual
            </h2>
          </div>
          <p className="text-xs text-[#242124]/70 max-w-sm">
            Targeted solutions formulated with cold-pressed African oils, bio-identical ceramides, and clean actives.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => onSelectCollection(col.handle)}
              className="group relative flex flex-col text-left bg-white border border-[#242124]/10 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-4/3 w-full bg-[#EAE1D7] overflow-hidden">
                {col.image?.url && (
                  <img
                    src={col.image.url}
                    alt={col.image.altText || col.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-3 right-3 p-1.5 bg-white/90 text-[#242124] rounded-full group-hover:bg-[#242124] group-hover:text-white transition-colors shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-serif-luxury text-lg text-[#242124] group-hover:text-[#C6A56B] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#242124]/70 line-clamp-2 mt-1 leading-relaxed">
                    {col.description}
                  </p>
                </div>
                <div className="pt-2 text-[11px] uppercase tracking-wider text-[#C6A56B] font-semibold flex items-center gap-1">
                  <span>Explore Ritual</span>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
