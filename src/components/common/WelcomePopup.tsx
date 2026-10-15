import React, { useState, useEffect } from 'react';
import { useShopify } from '../../context/ShopifyContext';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import creamImg from '../../assets/images/product_restorative_cream_1791897806024.jpg';

const STORAGE_KEY_POPUP = 'kathryn_lynne_welcome_seen';

export const WelcomePopup: React.FC = () => {
  const { addToast } = useShopify();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = localStorage.getItem(STORAGE_KEY_POPUP);
    if (seen) return;

    // Wait 10 seconds of user dwell before presenting as required by design rules
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_POPUP, 'dismissed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Valid Email Required',
        description: 'Please provide a valid email address.',
      });
      return;
    }

    setIsSuccess(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_POPUP, 'subscribed');
    }

    addToast({
      type: 'success',
      title: 'Welcome Code: WELCOME10',
      description: 'Your 10% welcome discount code is unlocked. Apply it in your bag!',
    });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Kathryn Lynne"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFDF8] max-w-2xl w-full shadow-2xl border border-[#242124]/10 overflow-hidden grid grid-cols-1 md:grid-cols-2 z-10">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-1.5 text-[#242124]/70 hover:text-[#242124] bg-white/80 rounded-full transition-colors"
          aria-label="Close welcome message"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Visual Editorial Column */}
        <div className="hidden md:block relative bg-[#EAE1D7] overflow-hidden">
          <img
            src={creamImg}
            alt="Kathryn Lynne Luxury Skincare Essentials"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-wider uppercase">
            <span>Botanical Radiance · Formulated with Care</span>
          </div>
        </div>

        {/* Content & Form Column */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-[#C6A56B] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privileged Access</span>
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#242124] tracking-tight">
              Welcome to Kathryn Lynne.
            </h3>
            <p className="text-xs text-[#242124]/70 leading-relaxed">
              Discover new arrivals, curated collections, and updates from our community. Enjoy 10% savings on your first order.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-4 bg-[#F3DDE2]/40 border border-[#F3DDE2] space-y-3 text-center">
              <CheckCircle2 className="w-8 h-8 text-[#C6A56B] mx-auto" />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#242124]">
                  Your Welcome Privilege
                </p>
                <p className="text-xs text-[#242124]/80">Use code at checkout:</p>
                <div className="inline-block px-3 py-1 bg-white border border-[#C6A56B] font-mono font-bold text-sm tracking-widest text-[#242124]">
                  WELCOME10
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#393439] transition-colors"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#242124]/70 mb-1">
                  First Name (Optional)
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="e.g. Sandra"
                  className="w-full bg-white border border-[#242124]/15 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#242124]/70 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@domain.com"
                  className="w-full bg-white border border-[#242124]/15 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#393439] transition-colors shadow-xs"
              >
                Join the Community
              </button>

              <p className="text-[10px] text-[#242124]/50 text-center leading-normal">
                No spam. You can unsubscribe at any time with one click.
              </p>
            </form>
          )}

          <div className="pt-2 text-center">
            <button
              onClick={handleClose}
              className="text-[11px] text-[#242124]/60 hover:text-[#242124] underline"
            >
              Continue without subscribing
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
