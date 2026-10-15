import React from 'react';
import { useShopify } from '../context/ShopifyContext';
import { ProductCard } from '../components/common/ProductCard';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/images/hero_editorial_model_1791897804556.jpg';

interface CampaignLandingPageProps {
  onSelectProduct: (handle: string) => void;
  onNavigate: (route: string, param?: string) => void;
}

export const CampaignLandingPage: React.FC<CampaignLandingPageProps> = ({
  onSelectProduct,
  onNavigate,
}) => {
  const { products, applyDiscountCode, addToCart } = useShopify();

  // Campaign products: Serums & Moisturizers bundle
  const campaignProducts = products.slice(0, 2);

  const handleClaimBundle = () => {
    applyDiscountCode('GLOW15');
    if (products[0]) addToCart(products[0]);
    if (products[1]) addToCart(products[1]);
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Campaign Hero Card */}
        <div className="bg-white border border-[#242124]/10 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Special Campaign Release</span>
            </span>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#242124] tracking-tight leading-tight">
              The Harmattan & Tropical Radiance Ritual.
            </h1>

            <p className="text-xs sm:text-sm text-[#242124]/80 leading-relaxed">
              Designed specifically for skin navigating warm tropical sunshine, air conditioning, and dry seasonal winds. Two synergistic formulations that seal moisture, restore vitality, and clarify uneven skin tone.
            </p>

            <div className="p-4 bg-[#F3DDE2]/40 border border-[#F3DDE2] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#242124]">
                <span>VIP Campaign Privilege: 15% Savings</span>
                <span className="font-mono text-sm bg-white px-2 py-0.5 border border-[#C6A56B]">
                  GLOW15
                </span>
              </div>
              <p className="text-[11px] text-[#242124]/70">
                Automatically activates 15% discount across the Radiance Duo when added together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleClaimBundle}
                className="px-8 py-3.5 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#393439] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Add Radiance Duo to Bag</span>
                <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3.5 bg-transparent border border-[#242124]/20 text-[#242124] text-xs uppercase tracking-widest font-semibold hover:bg-[#EAE1D7]/30 transition-colors text-center"
              >
                Explore Full Shop
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#242124]/60 pt-2">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Complimentary Delivery in Lagos & Abuja</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Shopify Secure Checkout</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-4/5 sm:aspect-1/1 bg-[#EAE1D7] overflow-hidden">
            <img
              src={heroImg}
              alt="Editorial model showcasing the Radiance Glow Routine"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Featured Campaign Products Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#242124]">
              The Core Ritual Components
            </h2>
            <p className="text-xs text-[#242124]/60 max-w-md mx-auto">
              Layered together for maximum cellular hydration and antioxidant defense.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {campaignProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
