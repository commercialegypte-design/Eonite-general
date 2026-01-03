import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, ShoppingBag, Package, Coffee, Cake, Utensils, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';

// ============================================
// CATALOGUE DATA - Basé sur le PDF fournisseur
// ============================================

const CATEGORIES = [
  { id: 'all', label: 'Tous les produits', icon: Package },
  { id: 'sacs-kraft', label: 'Sacs Kraft avec Poignées', icon: ShoppingBag },
  { id: 'sacs-sos', label: 'Sacs SOS (sans poignée)', icon: Package },
  { id: 'sacs-shopping', label: 'Sacs Shopping', icon: ShoppingBag },
  { id: 'sacs-plats', label: 'Sacs Plats & Pochettes', icon: FileText },
  { id: 'pizza', label: 'Boîtes Pizza', icon: Utensils },
  { id: 'gobelets', label: 'Gobelets', icon: Coffee },
  { id: 'bols', label: 'Bols Kraft', icon: Cake },
  { id: 'serviettes', label: 'Serviettes & Papiers', icon: FileText },
];

const PRODUCTS = [
  // ============================================
  // SACS KRAFT AVEC POIGNÉES
  // ============================================
  {
    id: 'kraft-twisted-xsmall',
    category: 'sacs-kraft',
    name: 'Sac Kraft Poignées Torsadées - XSMALL',
    dimensions: '190 x 77 x 216 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '70-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'kraft-twisted-small',
    category: 'sacs-kraft',
    name: 'Sac Kraft Poignées Torsadées - SMALL',
    dimensions: '220 x 120 x 254 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '70-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'kraft-twisted-medium',
    category: 'sacs-kraft',
    name: 'Sac Kraft Poignées Torsadées - MEDIUM',
    dimensions: '280 x 160 x 300 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '70-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'kraft-twisted-large',
    category: 'sacs-kraft',
    name: 'Sac Kraft Poignées Torsadées - LARGE',
    dimensions: '350 x 220 x 350 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '90-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'kraft-twisted-xlarge',
    category: 'sacs-kraft',
    name: 'Sac Kraft Poignées Torsadées - XLARGE',
    dimensions: '450 x 220 x 450 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '90-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'kraft-twisted-xxlarge',
    category: 'sacs-kraft',
    name: 'Sac Kraft Poignées Torsadées - XXLARGE',
    dimensions: '470 x 260 x 480 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '90-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&h=400&fit=crop',
    featured: false,
  },
  
  // ============================================
  // SACS SOS (SANS POIGNÉE)
  // ============================================
  {
    id: 'sos-xxsmall',
    category: 'sacs-sos',
    name: 'Sac SOS - XXSMALL',
    dimensions: '75 x 45 x 165 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '50-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'sos-xsmall',
    category: 'sacs-sos',
    name: 'Sac SOS - XSMALL',
    dimensions: '100 x 57 x 180 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '50-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'sos-r4small',
    category: 'sacs-sos',
    name: 'Sac SOS - R4 SMALL',
    dimensions: '125 x 70 x 300 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '50-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'sos-r8small',
    category: 'sacs-sos',
    name: 'Sac SOS - R8 SMALL',
    dimensions: '150 x 95 x 360 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '50-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'sos-medium',
    category: 'sacs-sos',
    name: 'Sac SOS - MEDIUM',
    dimensions: '280 x 160 x 300 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '50-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'sos-large',
    category: 'sacs-sos',
    name: 'Sac SOS - LARGE',
    dimensions: '350 x 220 x 350 mm',
    material: 'Kraft Brun Recyclé / Blanc Vierge',
    grammage: '90-110 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    featured: false,
  },
  
  // ============================================
  // SACS SHOPPING
  // ============================================
  {
    id: 'shopping-medium',
    category: 'sacs-shopping',
    name: 'Sac Shopping - MEDIUM',
    dimensions: '280 x 160 x 320 mm (11" x 5.5" x 12.6")',
    material: 'Kraft Brun / Blanc',
    grammage: '70-100 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'shopping-large',
    category: 'sacs-shopping',
    name: 'Sac Shopping - LARGE',
    dimensions: '300 x 180 x 350 mm (11.8" x 7" x 13.7")',
    material: 'Kraft Brun / Blanc',
    grammage: '70-100 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'shopping-xlarge',
    category: 'sacs-shopping',
    name: 'Sac Shopping - XLARGE',
    dimensions: '450 x 150 x 370 mm (13.3" x 5.5" x 14.5")',
    material: 'Kraft Brun / Blanc',
    grammage: '70-100 GSM',
    quantity: '250 par carton',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    featured: false,
  },
  
  // ============================================
  // SACS PLATS & POCHETTES
  // ============================================
  {
    id: 'flat-small',
    category: 'sacs-plats',
    name: 'Sac Plat Satchel - 10" x 10"',
    dimensions: '254 x 254 mm',
    material: 'Kraft Brun / Blanc',
    grammage: '50-90 GSM',
    quantity: '1000 par carton',
    image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'flat-medium',
    category: 'sacs-plats',
    name: 'Sac Plat Satchel - 10" x 12"',
    dimensions: '254 x 305 mm',
    material: 'Kraft Brun / Blanc',
    grammage: '50-90 GSM',
    quantity: '1000 par carton',
    image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'grease-proof-small',
    category: 'sacs-plats',
    name: 'Sac Ingraissable - 6" x 4"',
    dimensions: '153 x 102 mm',
    material: 'Papier Ingraissable',
    grammage: '40-60 GSM',
    quantity: '1000 par carton',
    image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'grease-proof-medium',
    category: 'sacs-plats',
    name: 'Sac Ingraissable - 7" x 7"',
    dimensions: '178 x 178 mm',
    material: 'Papier Ingraissable',
    grammage: '40-60 GSM',
    quantity: '1000 par carton',
    image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'film-front',
    category: 'sacs-plats',
    name: 'Sac Film Front - 10" x 10"',
    dimensions: '254 x 254 mm',
    material: 'Kraft + Film Transparent',
    grammage: '50-80 GSM',
    quantity: '1000 par carton',
    image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400&h=400&fit=crop',
    featured: false,
  },
  
  // ============================================
  // BOÎTES PIZZA
  // ============================================
  {
    id: 'pizza-small',
    category: 'pizza',
    name: 'Boîte Pizza - SMALL (6")',
    dimensions: '153 x 153 x 89 mm (6" x 6" x 3.5")',
    material: 'Kraft Brun/Blanc',
    grammage: 'Carton ondulé',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'pizza-medium',
    category: 'pizza',
    name: 'Boîte Pizza - MEDIUM (10")',
    dimensions: '254 x 254 x 89 mm (10" x 10" x 3.5")',
    material: 'Kraft Brun/Blanc',
    grammage: 'Carton ondulé',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'pizza-large',
    category: 'pizza',
    name: 'Boîte Pizza - LARGE (12.5")',
    dimensions: '318 x 242 x 89 mm (12.5" x 9.5" x 3.5")',
    material: 'Kraft Brun/Blanc',
    grammage: 'Carton ondulé',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'pizza-xl',
    category: 'pizza',
    name: 'Boîte Pizza - XL (11" x 12")',
    dimensions: '280 x 305 x 38 mm (11" x 12" x 1.5")',
    material: 'Kraft Brun/Blanc',
    grammage: 'Carton ondulé',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'pizza-xxl',
    category: 'pizza',
    name: 'Boîte Pizza - XXL (13")',
    dimensions: '330 x 330 x 38 mm (13" x 13" x 1.5")',
    material: 'Kraft Brun/Blanc',
    grammage: 'Carton ondulé',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    featured: false,
  },
  
  // ============================================
  // GOBELETS
  // ============================================
  {
    id: 'cup-hd-8oz',
    category: 'gobelets',
    name: 'Gobelet Simple Paroi - 8oz (240ml)',
    dimensions: 'Ø 39.5 x H 76 mm',
    material: 'Carton PE',
    grammage: 'Simple Paroi HD',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'cup-hd-12oz',
    category: 'gobelets',
    name: 'Gobelet Simple Paroi - 12oz (350ml)',
    dimensions: 'Ø 45 x H 72 mm',
    material: 'Carton PE',
    grammage: 'Simple Paroi HD',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'cup-hd-16oz',
    category: 'gobelets',
    name: 'Gobelet Simple Paroi - 16oz (470ml)',
    dimensions: 'Ø 45 x H 84 mm',
    material: 'Carton PE',
    grammage: 'Simple Paroi HD',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'cup-double-8oz',
    category: 'gobelets',
    name: 'Gobelet Double Paroi - 8oz (240ml)',
    dimensions: 'Ø 39.5 x H 76 mm',
    material: 'Carton Double Couche',
    grammage: 'Double Paroi Isolant',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'cup-double-12oz',
    category: 'gobelets',
    name: 'Gobelet Double Paroi - 12oz (350ml)',
    dimensions: 'Ø 45 x H 72 mm',
    material: 'Carton Double Couche',
    grammage: 'Double Paroi Isolant',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'cup-ripple-12oz',
    category: 'gobelets',
    name: 'Gobelet Ripple Wall - 12oz (350ml)',
    dimensions: 'Ø 45 x H 50 mm',
    material: 'Carton Ondulé',
    grammage: 'Ripple Wall Premium',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    featured: true,
  },
  
  // ============================================
  // BOLS KRAFT
  // ============================================
  {
    id: 'bowl-20oz',
    category: 'bols',
    name: 'Bol Kraft - 20oz (591ml)',
    dimensions: 'Ø variable, H variable',
    material: 'Kraft Laminé',
    grammage: 'Étanche, Anti-fuite',
    quantity: '300 par carton',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    id: 'bowl-26oz',
    category: 'bols',
    name: 'Bol Kraft - 26oz (769ml)',
    dimensions: 'Ø variable, H variable',
    material: 'Kraft Laminé',
    grammage: 'Étanche, Anti-fuite',
    quantity: '300 par carton',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'bowl-36oz',
    category: 'bols',
    name: 'Bol Kraft - 36oz (1064ml)',
    dimensions: 'Ø variable, H variable',
    material: 'Kraft Laminé',
    grammage: 'Étanche, Anti-fuite',
    quantity: '300 par carton',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'bowl-40oz',
    category: 'bols',
    name: 'Bol Kraft - 40oz (1300ml)',
    dimensions: 'Ø variable, H variable',
    material: 'Kraft Laminé',
    grammage: 'Étanche, Anti-fuite',
    quantity: '300 par carton',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop',
    featured: false,
  },
  
  // ============================================
  // SERVIETTES & PAPIERS
  // ============================================
  {
    id: 'napkin-30x30',
    category: 'serviettes',
    name: 'Serviette Papier - 30x30cm',
    dimensions: '300 x 300 mm',
    material: 'Papier',
    grammage: '1 pli / 2 plis',
    quantity: '40 paquets x 100 pcs',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    featured: true,
  },
  {
    id: 'sandwich-paper',
    category: 'serviettes',
    name: 'Papier Sandwich - 25x25cm',
    dimensions: '250 x 250 mm',
    material: 'Papier Ingraissable',
    grammage: '30-40 GSM',
    quantity: '500 par carton',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    featured: false,
  },
];

// ============================================
// CATALOGUE PAGE COMPONENT
// ============================================

const CataloguePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <main className="min-h-screen bg-[#F9F8EF] pt-24" data-testid="catalogue-page">
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#CDCEBD] font-bold text-sm uppercase tracking-widest">
            Notre Gamme
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#F9F8EF] mt-3 mb-6">
            CATALOGUE<br />
            <span className="text-[#F9F8EF]/50">EMBALLAGES</span>
          </h1>
          <p className="text-[#F9F8EF]/70 text-lg max-w-2xl">
            Sacs kraft, boîtes pizza, gobelets, bols... Tous nos emballages personnalisables 
            au prix du neutre. Design offert sur chaque commande.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-20 z-40 bg-[#CDCEBD] border-b border-[#6B705C]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  data-testid={`filter-${cat.id}`}
                  className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#6B705C] text-[#F9F8EF]'
                      : 'bg-[#F9F8EF] text-[#1A1A1A] hover:bg-[#6B705C]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#6B705C] text-[#F9F8EF] font-medium"
            >
              <Filter size={18} />
              Filtres
            </button>

            {/* Product Count */}
            <span className="text-[#1A1A1A]/60 text-sm">
              {filteredProducts.length} produits
            </span>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="lg:hidden pb-4 border-t border-[#6B705C]/20 pt-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#6B705C] text-[#F9F8EF]'
                        : 'bg-[#F9F8EF] text-[#1A1A1A]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products (only on 'all') */}
      {selectedCategory === 'all' && (
        <section className="py-12 bg-[#F9F8EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-6">
              PRODUITS POPULAIRES
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#1A1A1A] mb-6">
            {selectedCategory === 'all' 
              ? 'TOUS LES PRODUITS' 
              : CATEGORIES.find(c => c.id === selectedCategory)?.label.toUpperCase()
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6B705C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#F9F8EF] mb-4">
            BESOIN D&apos;UN DEVIS ?
          </h2>
          <p className="text-[#F9F8EF]/70 text-lg mb-8">
            Design offert + session visio de 30 min avec un expert pour créer votre emballage personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assistant">
              <Button className="bg-[#1A1A1A] text-[#F9F8EF] hover:bg-black px-8 py-6 text-lg font-bold uppercase">
                Créer mon design
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/reservation">
              <Button className="bg-transparent text-[#F9F8EF] border-2 border-[#F9F8EF] hover:bg-[#F9F8EF] hover:text-[#6B705C] px-8 py-6 text-lg font-bold uppercase">
                Prendre RDV
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// PRODUCT CARD COMPONENT
// ============================================

const ProductCard = ({ product, featured = false }) => {
  return (
    <div 
      className={`group bg-[#F9F8EF] border border-[#6B705C]/10 overflow-hidden transition-all hover:shadow-lg hover:border-[#6B705C]/30 ${
        featured ? 'ring-2 ring-[#6B705C]' : ''
      }`}
      data-testid={`product-${product.id}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#CDCEBD]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <span className="absolute top-3 left-3 bg-[#6B705C] text-[#F9F8EF] text-xs font-bold uppercase px-2 py-1">
            Populaire
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#1A1A1A] mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="space-y-1 text-sm text-[#1A1A1A]/60">
          <p><span className="font-medium">Dimensions :</span> {product.dimensions}</p>
          <p><span className="font-medium">Matériau :</span> {product.material}</p>
          <p><span className="font-medium">Grammage :</span> {product.grammage}</p>
          <p><span className="font-medium">Quantité :</span> {product.quantity}</p>
        </div>

        <Link to="/assistant" className="mt-4 block">
          <Button className="w-full bg-[#1A1A1A] hover:bg-black text-[#F9F8EF] text-sm font-bold">
            Personnaliser
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CataloguePage;
