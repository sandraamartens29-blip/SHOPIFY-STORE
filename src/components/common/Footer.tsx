import React, { useState } from 'react';
import { useShopify } from '../../context/ShopifyContext';
import { ArrowRight, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { addToast } = useShopify();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    setIsSubscribed(true);
    addToast({
      type: 'success',
      title: 'Welcome to Kathryn Lynne',
      description: 'You have joined our private community. Check your inbox for updates.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#242124] text-[#FFFDF8] pt-16 pb-12 border-t border-[#C6A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif-luxury tracking-tight block text-white">
              Kathryn Lynne
            </span>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Thoughtfully curated luxury skincare formulated for radiance and everyday confidence. Serving discerning women in Nigeria and across the globe.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#C6A56B] block font-semibold mb-1">
                Direct Inquiries
              </span>
              <a
                href="mailto:sandraamartens29@gmail.com"
                className="text-sm text-white/90 hover:text-[#C6A56B] transition-colors underline decoration-[#C6A56B]/50 underline-offset-4"
              >
                sandraamartens29@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs text-white/60">
              <ShieldCheck className="w-4 h-4 text-[#C6A56B]" />
              <span>Shopify Verified Checkout · Multi-Currency · Secure Payments</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', 'serums')}
                  className="hover:text-white transition-colors"
                >
                  Radiance Serums
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', 'moisturizers')}
                  className="hover:text-white transition-colors"
                >
                  Restorative Creams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', 'cleansers')}
                  className="hover:text-white transition-colors"
                >
                  Clarifying Cleansers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', 'body-care')}
                  className="hover:text-white transition-colors"
                >
                  Nourishing Body Oils
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Client Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Kathryn Lynne
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', 'shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', 'returns')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Refunds
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Private Circle
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Receive private previews, skincare guides, and verified updates.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-white/5 border border-[#C6A56B]/30 flex items-center gap-2 text-xs text-[#C6A56B]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed. Welcome to Kathryn Lynne.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white/5 border border-white/20 px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C6A56B] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#C6A56B] text-[#242124] hover:bg-[#d5b67e] transition-colors flex items-center justify-center"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-white/50">
                  By subscribing, you agree to receive editorial updates. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Kathryn Lynne. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('policy', 'privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('policy', 'terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
