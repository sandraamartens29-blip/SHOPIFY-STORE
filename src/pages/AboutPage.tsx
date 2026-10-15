import React from 'react';
import { ArrowRight, Leaf, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import storyImg from '../assets/images/brand_story_artisan_1791897807910.jpg';
import heroImg from '../assets/images/hero_editorial_model_1791897804556.jpg';

interface AboutPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-[#242124]/60">
            <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#242124] font-medium">About Kathryn Lynne</span>
          </nav>

          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-semibold block">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#242124] tracking-tight">
            Crafted for Radiance. Rooted in Nature.
          </h1>
          <p className="text-sm sm:text-base text-[#242124]/75 leading-relaxed">
            Welcome to Kathryn Lynne. We curate high-potency skincare rituals that celebrate natural elegance, deep nourishment, and everyday confidence.
          </p>
        </div>

        {/* Story Section 1: The Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold">
              The Founder's Journey
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
              Skincare Formulated for Climate and Melanated Skin.
            </h2>
            <p className="text-xs sm:text-sm text-[#242124]/80 leading-relaxed">
              Living between diverse climates—from the vibrant tropical heat and humidity of coastal Nigeria to the dry harmattan winds and temperate international travels—traditional formulations often fell short. Heavy synthetic creams led to pore congestion, while light lotions failed to safeguard the lipid barrier.
            </p>
            <p className="text-xs sm:text-sm text-[#242124]/80 leading-relaxed">
              Kathryn Lynne was conceived to resolve this dilemma: harnessing indigenous African botanicals known for centuries—pure cold-pressed marula, unrefined shea butter, baobab seed, and hibiscus—and combining them with biocompatible clinical actives like tetrahexyldecyl ascorbate (stabilized Vitamin C), ceramides, and multi-molecular hyaluronic acid.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 bg-[#EAE1D7] overflow-hidden shadow-lg border border-[#242124]/10">
            <img
              src={storyImg}
              alt="Botanical apothecary and artisan formulation ingredients for Kathryn Lynne"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-white border border-[#242124]/10 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Our Formulation Standards
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#242124]">
              The Kathryn Lynne Commitment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-[#FFFDF8] border border-[#242124]/5">
              <Leaf className="w-6 h-6 text-[#C6A56B]" />
              <h4 className="font-serif-luxury text-lg text-[#242124]">
                Clean & Biocompatible
              </h4>
              <p className="text-xs text-[#242124]/70 leading-relaxed">
                Zero parabens, sulfates, synthetic fragrances, or bleaching agents. Only ingredients that your skin's cellular matrix readily recognizes.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FFFDF8] border border-[#242124]/5">
              <HeartHandshake className="w-6 h-6 text-[#C6A56B]" />
              <h4 className="font-serif-luxury text-lg text-[#242124]">
                Ethical African Sourcing
              </h4>
              <p className="text-xs text-[#242124]/70 leading-relaxed">
                We partner with fair-trade women's cooperatives in Nigeria and neighboring regions to harvest sustainable wild-crafted seeds and cold-press oils at peak freshness.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FFFDF8] border border-[#242124]/5">
              <ShieldCheck className="w-6 h-6 text-[#C6A56B]" />
              <h4 className="font-serif-luxury text-lg text-[#242124]">
                Barrier-First Longevity
              </h4>
              <p className="text-xs text-[#242124]/70 leading-relaxed">
                Rather than harsh surface stripping, every formula actively strengthens your natural moisture barrier against UV stress, environmental pollution, and climate shifts.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Direct Inquiries Box */}
        <div className="p-8 bg-[#EAE1D7]/30 border border-[#242124]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif-luxury text-xl text-[#242124]">
              Connect Directly with Our Founder
            </h4>
            <p className="text-xs text-[#242124]/70">
              For brand inquiries, custom formulation requests, or private consultation:
            </p>
            <p className="text-sm font-semibold text-[#242124]">
              sandraamartens29@gmail.com
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d383d] transition-colors"
          >
            Send an Inquiry
          </button>
        </div>

      </div>
    </div>
  );
};
