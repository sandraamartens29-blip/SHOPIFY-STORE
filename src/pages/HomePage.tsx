import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

interface HomePageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      <HeroSection
        onShopClick={() => onNavigate('shop')}
        onAboutClick={() => onNavigate('about')}
      />

      <CategoryShowcase
        onSelectCollection={handle => onNavigate('collection', handle)}
      />

      <FeaturedProducts
        onSelectProduct={handle => onNavigate('product', handle)}
        onViewAllClick={() => onNavigate('shop')}
      />

      <BrandStorySection
        onLearnMoreClick={() => onNavigate('about')}
      />

      <ReviewsSection />

      <NewsletterSection />

      <FinalCtaSection
        onShopClick={() => onNavigate('shop')}
      />
    </div>
  );
};
