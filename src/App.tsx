import React, { useState, useEffect } from 'react';
import { ShopifyProvider } from './context/ShopifyContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { WelcomePopup } from './components/common/WelcomePopup';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ShopifyConfigModal } from './components/common/ShopifyConfigModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PolicyPages } from './pages/PolicyPages';
import { CampaignLandingPage } from './pages/CampaignLandingPage';
import { NotFoundPage } from './pages/NotFoundPage';

interface AppNavigationState {
  route: string;
  param?: string;
}

export default function App() {
  const [navState, setNavState] = useState<AppNavigationState>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash) {
        const parts = hash.split('/');
        return {
          route: parts[0] || 'home',
          param: parts[1],
        };
      }
    }
    return { route: 'home' };
  });

  const handleNavigate = (route: string, param?: string) => {
    setNavState({ route, param });
    if (typeof window !== 'undefined') {
      const hash = param ? `#${route}/${param}` : `#${route}`;
      window.history.pushState(null, '', hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash) {
        const parts = hash.split('/');
        setNavState({
          route: parts[0] || 'home',
          param: parts[1],
        });
      } else {
        setNavState({ route: 'home' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderCurrentPage = () => {
    switch (navState.route) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;

      case 'shop':
        return (
          <ShopPage
            onSelectProduct={handle => handleNavigate('product', handle)}
            onNavigate={handleNavigate}
          />
        );

      case 'collection':
        return (
          <CollectionDetailPage
            collectionHandle={navState.param || 'serums'}
            onSelectProduct={handle => handleNavigate('product', handle)}
            onNavigate={handleNavigate}
          />
        );

      case 'product':
        return (
          <ProductDetailPage
            productHandle={navState.param || 'botanical-glow-radiance-serum'}
            onSelectProduct={handle => handleNavigate('product', handle)}
            onNavigate={handleNavigate}
          />
        );

      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;

      case 'wishlist':
        return (
          <WishlistPage
            onSelectProduct={handle => handleNavigate('product', handle)}
            onNavigate={handleNavigate}
          />
        );

      case 'search':
        return (
          <SearchPage
            onSelectProduct={handle => handleNavigate('product', handle)}
            onNavigate={handleNavigate}
          />
        );

      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;

      case 'faq':
        return <FaqPage onNavigate={handleNavigate} />;

      case 'policy':
        return (
          <PolicyPages
            policyType={(navState.param as any) || 'shipping'}
            onNavigate={handleNavigate}
          />
        );

      case 'campaign':
        return (
          <CampaignLandingPage
            onSelectProduct={handle => handleNavigate('product', handle)}
            onNavigate={handleNavigate}
          />
        );

      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ShopifyProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-[#242124] selection:bg-[#F3DDE2] selection:text-[#242124]">
        {/* Global Navigation Header */}
        <Header
          onNavigate={handleNavigate}
          currentRoute={navState.route}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* Global Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Modals & Overlays */}
        <CartDrawer onNavigate={handleNavigate} />
        <WelcomePopup />
        <WhatsAppButton />
        <ShopifyConfigModal />
        <ToastContainer />
      </div>
    </ShopifyProvider>
  );
}
