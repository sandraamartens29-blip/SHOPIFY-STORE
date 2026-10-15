import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  // Business number: configurable via env or merchant config
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+2348000000000';
  const prefilledMessage = encodeURIComponent('Hello Kathryn Lynne, I would like to know more about your products.');
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${prefilledMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col items-start gap-2">
      {isOpenTooltip && (
        <div className="bg-[#242124] text-white p-3.5 shadow-xl border border-[#C6A56B]/30 max-w-xs text-xs space-y-2 relative animate-fade-in">
          <button
            onClick={() => setIsOpenTooltip(false)}
            className="absolute top-2 right-2 text-white/50 hover:text-white"
            aria-label="Dismiss WhatsApp note"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-semibold text-[#C6A56B] flex items-center gap-1.5">
            <span>Direct Client Concierge</span>
          </div>
          <p className="text-white/80 leading-relaxed text-[11px]">
            Have questions about skincare formulations, custom orders, or delivery in Nigeria? Chat with our team.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-1.5 px-3 bg-[#25D366] text-white font-semibold text-[11px] rounded-xs hover:bg-[#20ba59] transition-colors"
          >
            Open WhatsApp
          </a>
        </div>
      )}

      <div className="flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsOpenTooltip(true)}
          className="w-12 h-12 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
          aria-label="Chat with Kathryn Lynne on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
        </a>
      </div>
    </div>
  );
};
