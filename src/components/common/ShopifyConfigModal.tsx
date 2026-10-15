import React, { useState } from 'react';
import { useShopify } from '../../context/ShopifyContext';
import {
  X,
  Store,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Loader2,
  Info,
} from 'lucide-react';

export const ShopifyConfigModal: React.FC = () => {
  const {
    shopifyConfig,
    updateShopifyConfig,
    isShopifyConnected,
    connectedShopName,
    isConfigModalOpen,
    setIsConfigModalOpen,
  } = useShopify();

  const [domain, setDomain] = useState(shopifyConfig.shopDomain);
  const [token, setToken] = useState(shopifyConfig.storefrontToken);
  const [version, setVersion] = useState(shopifyConfig.apiVersion);
  const [isTesting, setIsTesting] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isConfigModalOpen) return null;

  const handleSaveAndTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setFeedback(null);

    const result = await updateShopifyConfig({
      shopDomain: domain.trim(),
      storefrontToken: token.trim(),
      apiVersion: version.trim() || '2024-10',
    });

    setIsTesting(false);
    setFeedback(result);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopify Storefront Integration Settings"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsConfigModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-[#FFFDF8] max-w-xl w-full shadow-2xl border border-[#242124]/10 max-h-[90vh] overflow-y-auto p-6 sm:p-8 z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-[#C6A56B]" />
            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#242124]">
                Shopify Storefront Integration
              </h2>
              <p className="text-xs text-[#242124]/70">
                Connect Kathryn Lynne’s live Shopify catalog and checkout
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsConfigModalOpen(false)}
            className="p-1.5 text-[#242124]/60 hover:text-[#242124] transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Box */}
        <div
          className={`p-4 border flex items-start gap-3 ${
            isShopifyConnected
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : 'bg-[#EAE1D7]/40 border-[#242124]/10 text-[#242124]'
          }`}
        >
          {isShopifyConnected ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-[#C6A56B] shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-1">
            <p className="font-semibold uppercase tracking-wider">
              {isShopifyConnected
                ? `Live Storefront Active: ${connectedShopName}`
                : 'Curated Fallback Catalog Active'}
            </p>
            <p className="leading-relaxed opacity-90">
              {isShopifyConnected
                ? 'Your storefront is directly querying products, inventory, and creating checkout sessions via Shopify Storefront GraphQL API.'
                : 'Presenting high-converting luxury skincare collection with real pricing and direct cart permalink redirect to Shopify checkout.'}
            </p>
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSaveAndTest} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#242124] font-semibold mb-1">
              Shopify Store Domain *
            </label>
            <input
              type="text"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="e.g. kathryn-lynne.myshopify.com or custom domain"
              required
              className="w-full bg-white border border-[#242124]/20 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
            />
            <p className="text-[11px] text-[#242124]/60 mt-1">
              Your myshopify.com URL or your verified custom domain.
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#242124] font-semibold mb-1">
              Storefront Access Token
            </label>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="shpat_... or public Storefront token"
              className="w-full bg-white border border-[#242124]/20 px-3 py-2 text-xs text-[#242124] font-mono focus:outline-none focus:border-[#C6A56B]"
            />
            <p className="text-[11px] text-[#242124]/60 mt-1">
              Found in Shopify Admin → Settings → Apps and sales channels → Develop apps → Storefront API.
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#242124] font-semibold mb-1">
              Storefront API Version
            </label>
            <input
              type="text"
              value={version}
              onChange={e => setVersion(e.target.value)}
              placeholder="2024-10"
              className="w-full bg-white border border-[#242124]/20 px-3 py-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
            />
          </div>

          {feedback && (
            <div
              className={`p-3 text-xs flex items-center gap-2 border ${
                feedback.success
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-rose-50 border-rose-300 text-rose-800'
              }`}
            >
              {feedback.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setIsConfigModalOpen(false)}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#242124]/70 hover:text-[#242124]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isTesting}
              className="px-6 py-2.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3f3a3f] transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Testing Connection...</span>
                </>
              ) : (
                <span>Save & Test Live API</span>
              )}
            </button>
          </div>
        </form>

        {/* Required Shopify Permissions Guide */}
        <div className="pt-4 border-t border-[#242124]/10 space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Required Shopify Storefront API Permissions</span>
          </h4>
          <div className="text-[11px] text-[#242124]/75 space-y-1.5 leading-relaxed bg-[#FFFDF8] border border-[#242124]/10 p-3">
            <p>1. <strong>unauthenticated_read_product_listings</strong> — Retrieve live collections & products</p>
            <p>2. <strong>unauthenticated_read_product_inventory</strong> — Live stock availability status</p>
            <p>3. <strong>unauthenticated_write_checkouts & unauthenticated_read_checkouts</strong> — Generate real Shopify checkout sessions</p>
            <p>4. <strong>unauthenticated_read_customer_tags</strong> (Optional) — Personalized customer pricing</p>
          </div>
        </div>

      </div>
    </div>
  );
};
