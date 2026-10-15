import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { Mail, MessageCircle, Send, CheckCircle2, Shield } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { addToast } = useShopify();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+2348000000000';
  const prefilledMessage = encodeURIComponent('Hello Kathryn Lynne, I would like to know more about your products.');
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${prefilledMessage}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      addToast({
        type: 'error',
        title: 'Fields Required',
        description: 'Please provide both email and message.',
      });
      return;
    }

    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Inquiry Received',
      description: 'Your message has been forwarded to sandraamartens29@gmail.com.',
    });
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <nav className="flex items-center justify-center gap-2 text-xs text-[#242124]/60">
            <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#242124] font-medium">Contact Us</span>
          </nav>

          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold block">
            Client Concierge
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#242124]">
            Connect with Kathryn Lynne
          </h1>
          <p className="text-xs sm:text-sm text-[#242124]/75 leading-relaxed">
            Whether you need bespoke routine recommendations, order assistance, or international wholesale inquiries, we are delighted to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & WhatsApp */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 bg-white border border-[#242124]/10 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#C6A56B] font-semibold">
                  Primary Email
                </span>
                <p className="font-serif-luxury text-lg text-[#242124]">
                  sandraamartens29@gmail.com
                </p>
                <p className="text-xs text-[#242124]/60 leading-relaxed">
                  Direct responses typically within 24 business hours.
                </p>
              </div>

              <div className="pt-4 border-t border-[#242124]/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#C6A56B] font-semibold block">
                  Instant Messaging
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
                <p className="text-[11px] text-[#242124]/60 text-center">
                  Available for Nigerian & international clients.
                </p>
              </div>

              <div className="pt-4 border-t border-[#242124]/10 text-xs text-[#242124]/70 space-y-2">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                  <span>
                    Official correspondence for the brand is handled directly by Sandra Martens.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="md:col-span-7 bg-white border border-[#242124]/10 p-6 sm:p-8 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C6A56B] mx-auto" />
                <h3 className="font-serif-luxury text-2xl text-[#242124]">
                  Thank You for Reaching Out
                </h3>
                <p className="text-xs text-[#242124]/70 max-w-sm mx-auto leading-relaxed">
                  Your message has been delivered to <strong>sandraamartens29@gmail.com</strong>. Our concierge will review and reply shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3d383d] transition-colors mt-2"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif-luxury text-xl text-[#242124] border-b border-[#242124]/10 pb-3">
                  Send a Direct Note
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#242124] font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Sandra"
                      className="w-full bg-[#FFFDF8] border border-[#242124]/15 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#242124] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="you@domain.com"
                      className="w-full bg-[#FFFDF8] border border-[#242124]/15 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#242124] font-semibold mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#242124]/15 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
                  >
                    <option value="Product Inquiry">Product & Formulation Advice</option>
                    <option value="Order Status">Order & Shipping Status</option>
                    <option value="Wholesale">Wholesale & Stockist Inquiries</option>
                    <option value="Press">Editorial & Press</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#242124] font-semibold mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    placeholder="How can we assist your skincare journey?"
                    className="w-full bg-[#FFFDF8] border border-[#242124]/15 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d383d] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
