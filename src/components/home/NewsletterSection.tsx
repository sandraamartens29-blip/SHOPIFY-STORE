import React, { useState } from 'react';
import { useShopify } from '../../context/ShopifyContext';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useShopify();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Valid Email Required',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    if (!agreed) {
      addToast({
        type: 'error',
        title: 'Consent Required',
        description: 'Please accept communication terms to subscribe.',
      });
      return;
    }

    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Subscription Confirmed',
      description: 'Thank you for joining the Kathryn Lynne community.',
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F3DDE2]/30 border-b border-[#242124]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>Exclusive Invitations</span>
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124] tracking-tight">
            Be First to Discover Something Beautiful.
          </h2>
          <p className="text-xs sm:text-sm text-[#242124]/75 max-w-xl mx-auto leading-relaxed">
            Join the Kathryn Lynne community for new arrivals, curated inspiration, product updates, and exclusive offers when available.
          </p>
        </div>

        {isSubmitted ? (
          <div className="max-w-md mx-auto p-6 bg-white border border-[#C6A56B]/30 shadow-xs space-y-3 text-center">
            <CheckCircle2 className="w-8 h-8 text-[#C6A56B] mx-auto" />
            <h3 className="font-serif-luxury text-xl text-[#242124]">
              Welcome to the Circle
            </h3>
            <p className="text-xs text-[#242124]/70 leading-relaxed">
              We have reserved your subscriber welcome gift. Enjoy 10% off your first ritual order with code <strong>WELCOME10</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name (optional)"
                className="w-full bg-white border border-[#242124]/15 px-4 py-3 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Email address *"
                className="w-full bg-white border border-[#242124]/15 px-4 py-3 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
              />
            </div>

            <div className="flex items-start gap-2 text-left">
              <input
                type="checkbox"
                id="consent-check"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 rounded-none text-[#242124] focus:ring-[#C6A56B]"
              />
              <label htmlFor="consent-check" className="text-[11px] text-[#242124]/70 leading-normal">
                I agree to receive communications from Kathryn Lynne regarding new formulations, skincare rituals, and private releases.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#393439] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Join the Community</span>
              <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
