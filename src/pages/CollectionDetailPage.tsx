import React from 'react';
import { useShopify } from '../context/ShopifyContext';
import { ProductCard } from '../components/common/ProductCard';
import { ArrowLeft } from 'lucide-react';

interface CollectionDetailPageProps {
  collectionHandle: string;
  onSelectProduct: (handle: string) => void;
  onNavigate: (route: string, param?: string) => void;
}

export const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({
  collectionHandle,
  onSelectProduct,
  onNavigate,
}) => {
  const { collections, products } = useShopify();

  const collection = collections.find(c => c.handle === collectionHandle) || collections[0];

  // Match products by category or tags
  const collectionProducts = products.filter(p => {
    if (collection.handle === 'serums') return p.category === 'Serums';
    if (collection.handle === 'cleansers') return p.category === 'Cleansers';
    if (collection.handle === 'moisturizers') return p.category === 'Moisturizers';
    if (collection.handle === 'body-care') return p.category === 'Body Care';
    return true;
  });

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#242124]/60">
          <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-[#242124]">
            Shop
          </button>
          <span>/</span>
          <span className="text-[#242124] font-medium">{collection.title}</span>
        </div>

        {/* Collection Editorial Banner */}
        <div className="bg-white border border-[#242124]/10 p-6 sm:p-12 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
              Curated Category
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#242124] tracking-tight">
              {collection.title}
            </h1>
            <p className="text-sm text-[#242124]/75 max-w-xl leading-relaxed">
              {collection.description}
            </p>
          </div>

          {collection.image?.url && (
            <div className="md:col-span-4 aspect-4/3 overflow-hidden bg-[#EAE1D7] border border-[#242124]/10">
              <img
                src={collection.image.url}
                alt={collection.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Products in Collection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#242124]/10 pb-4">
            <span className="text-xs uppercase tracking-wider text-[#242124]/70 font-semibold tabular-nums">
              Showing {collectionProducts.length} Formulations
            </span>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-wider text-[#242124] hover:text-[#C6A56B] flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Collections</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map(product => (
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
