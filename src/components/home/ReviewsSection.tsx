import React from 'react';
import { AUTHENTIC_REVIEWS } from '../../data/defaultCatalog';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#242124]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
            Real Experiences
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
            Words from Our Community
          </h2>
          <p className="text-xs sm:text-sm text-[#242124]/70 leading-relaxed">
            Reflections from women across Nigeria, the United Kingdom, and beyond who have integrated Kathryn Lynne into their daily skin ritual.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AUTHENTIC_REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="bg-white border border-[#242124]/10 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs relative"
            >
              <Quote className="w-8 h-8 text-[#EAE1D7] absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#C6A56B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-[#242124]/85 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#242124]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-[#242124]">
                    {rev.author}
                  </h4>
                  {rev.verified && (
                    <span className="text-[10px] uppercase tracking-wider text-[#C6A56B] font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#C6A56B]" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#242124]/50">
                  <span>{rev.location}</span>
                  <span>{rev.productTitle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
