import React from 'react';

interface PolicyPagesProps {
  policyType: 'shipping' | 'returns' | 'privacy' | 'terms';
  onNavigate: (route: string, param?: string) => void;
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({
  policyType,
  onNavigate,
}) => {
  const titles = {
    shipping: 'Shipping & Delivery Policy',
    returns: 'Returns & Refunds Policy',
    privacy: 'Privacy & Data Policy',
    terms: 'Terms of Service & Commerce',
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation */}
        <div className="space-y-3 border-b border-[#242124]/10 pb-6">
          <nav className="flex items-center gap-2 text-xs text-[#242124]/60">
            <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#242124] font-medium">{titles[policyType]}</span>
          </nav>

          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold block">
            Brand Governance
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#242124]">
            {titles[policyType]}
          </h1>
          <p className="text-xs text-[#242124]/60">
            Last updated: March 2026 · Official Kathryn Lynne Storefront Policy
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-white border border-[#242124]/10 p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#242124]/80 leading-relaxed">
          
          {policyType === 'shipping' && (
            <>
              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  1. Domestic Delivery in Nigeria
                </h3>
                <p>
                  Kathryn Lynne processes orders within 24 to 48 hours of confirmation. We provide reliable courier delivery across Nigeria:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#242124]/75 pl-2">
                  <li><strong>Lagos State:</strong> 1 to 2 business days. Express same-day courier dispatch is available on select orders placed before 12:00 PM.</li>
                  <li><strong>Abuja (FCT):</strong> 1 to 2 business days.</li>
                  <li><strong>Other States across Nigeria:</strong> 2 to 4 business days via verified national logistics partners.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  2. International Shipping
                </h3>
                <p>
                  We proudly ship internationally to clients in the United Kingdom, United States, Canada, Ghana, and European Union destinations via DHL Express and FedEx International.
                </p>
                <p>
                  Standard transit times for international express packages are 3 to 6 business days. Tracking details are automatically provided upon package handover.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  3. Duties, Customs, and Inquiries
                </h3>
                <p>
                  International shipments may occasionally be subject to destination customs assessments. For questions regarding your consignment, email us directly at <strong>sandraamartens29@gmail.com</strong>.
                </p>
              </section>
            </>
          )}

          {policyType === 'returns' && (
            <>
              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  1. Return Eligibility
                </h3>
                <p>
                  Due to the hygienic nature of luxury personal care formulations, returned items must be unopened, sealed in their original protective packaging, and submitted within 14 days of delivery.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  2. Defective or Damaged In-Transit
                </h3>
                <p>
                  In the rare event that an item arrives compromised or damaged during transport, please notify us within 48 hours of receipt at <strong>sandraamartens29@gmail.com</strong> with your order number and photograph of the consignment. We will promptly issue an express replacement or refund.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  3. Refund Processing
                </h3>
                <p>
                  Approved refunds are processed back to the original method of payment via Shopify Payments, Paystack, or your issuing bank within 5 to 7 business days.
                </p>
              </section>
            </>
          )}

          {policyType === 'privacy' && (
            <>
              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  1. Data Collection & Usage
                </h3>
                <p>
                  Kathryn Lynne respects your privacy. We collect client contact details (name, shipping address, email, telephone) strictly to fulfill purchases, communicate shipping updates, and share opt-in newsletters.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  2. Payment Data Security
                </h3>
                <p>
                  We never store, inspect, or retain complete credit card numbers or banking secrets on this application. All transactions are securely tokenized and handled through Shopify's PCI-DSS Level 1 certified checkout environment.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  3. Unsubscribe & Data Inquiries
                </h3>
                <p>
                  You can unsubscribe from marketing correspondence at any time by clicking the link in any email or emailing <strong>sandraamartens29@gmail.com</strong>.
                </p>
              </section>
            </>
          )}

          {policyType === 'terms' && (
            <>
              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By browsing, shopping, or subscribing to Kathryn Lynne, you acknowledge and agree to abide by these Terms of Service and applicable commerce laws.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  2. Pricing & Currency
                </h3>
                <p>
                  All displayed prices are subject to accurate verification against Shopify catalog standards. Conversions between NGN (₦), USD ($), GBP (£), and EUR (€) reflect current merchant settings.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif-luxury text-xl text-[#242124]">
                  3. Merchant Correspondence
                </h3>
                <p>
                  All commercial operations and inquiries for Kathryn Lynne are administered by Sandra Martens (<strong>sandraamartens29@gmail.com</strong>).
                </p>
              </section>
            </>
          )}

        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs uppercase tracking-wider text-[#242124] hover:text-[#C6A56B] underline"
          >
            Return to Storefront
          </button>
        </div>

      </div>
    </div>
  );
};
