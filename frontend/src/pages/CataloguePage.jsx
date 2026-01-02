import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Filter, ArrowRight, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'sacs_kraft', label: 'Sacs Kraft' },
  { id: 'boites', label: 'Boîtes Carton' },
  { id: 'luxe', label: 'Luxe' },
  { id: 'gobelets', label: 'Gobelets' },
  { id: 'expedition', label: 'Expédition' },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Sac Kraft Poignées Plates',
    category: 'sacs_kraft',
    description: 'Sac kraft classique avec poignées plates. Idéal pour la vente à emporter.',
    priceFrom: '0.18',
    minQty: 500,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '2',
    name: 'Sac Kraft Poignées Torsadées',
    category: 'sacs_kraft',
    description: 'Sac kraft premium avec poignées torsadées. Look haut de gamme.',
    priceFrom: '0.22',
    minQty: 500,
    sizes: ['M', 'L'],
  },
  {
    id: '3',
    name: 'Boîte Burger Kraft',
    category: 'boites',
    description: 'Boîte burger en carton kraft. Résistante et éco-responsable.',
    priceFrom: '0.15',
    minQty: 1000,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '4',
    name: 'Boîte Pizza',
    category: 'boites',
    description: 'Boîte pizza en carton ondulé. Plusieurs tailles disponibles.',
    priceFrom: '0.25',
    minQty: 500,
    sizes: ['26cm', '33cm', '40cm'],
  },
  {
    id: '5',
    name: 'Sac Shopping Luxe Côtelé',
    category: 'luxe',
    description: 'Sac shopping luxe avec finition côtelée. Impression premium.',
    priceFrom: '0.35',
    minQty: 500,
    sizes: ['Custom'],
  },
  {
    id: '6',
    name: 'Gobelet Carton Simple Paroi',
    category: 'gobelets',
    description: 'Gobelet carton classique pour boissons chaudes.',
    priceFrom: '0.045',
    minQty: 1000,
    sizes: ['4oz', '8oz', '12oz'],
  },
  {
    id: '7',
    name: 'Gobelet Ripple Wall',
    category: 'gobelets',
    description: 'Gobelet triple paroi ondulé. Isolation maximale.',
    priceFrom: '0.08',
    minQty: 1000,
    sizes: ['8oz', '12oz'],
  },
  {
    id: '8',
    name: 'Sac Expédition Mailing',
    category: 'expedition',
    description: 'Sac d\'expédition auto-adhésif en LDPE co-extrudé.',
    priceFrom: '0.12',
    minQty: 500,
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

const CataloguePage = () => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    let result = PRODUCTS;
    
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [category, search]);

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-black border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest">
            Catalogue
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            NOS PRODUITS
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Tous nos emballages sont personnalisables avec votre logo. 
            Production européenne, qualité garantie.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    category === cat.id
                      ? 'bg-[#FF6B00] text-black'
                      : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/50 mb-8">
            {filteredProducts.length} produit(s) trouvé(s)
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white/5 border border-white/10 hover:border-[#FF6B00]/50 transition-colors group"
                >
                  {/* Product Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <Package size={64} className="text-white/20 group-hover:text-[#FF6B00]/50 transition-colors" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-2">
                      {CATEGORIES.find(c => c.id === product.category)?.label}
                    </p>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF6B00] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <p className="text-white/40 text-xs">A partir de</p>
                        <p className="text-[#FF6B00] font-bold text-xl">{product.priceFrom} €</p>
                      </div>
                      <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>
                        <Button size="sm" className="btn-brutal text-sm">
                          Devis
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package size={64} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">Aucun produit trouvé</p>
              <Button 
                onClick={() => { setCategory('all'); setSearch(''); }}
                className="mt-4 btn-brutal-outline"
              >
                Voir tous les produits
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            BESOIN D'UN FORMAT SPÉCIFIQUE ?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Nous produisons des formats sur-mesure. Contactez-nous avec vos spécifications.
          </p>
          <Link to="/contact">
            <Button className="btn-brutal px-10 py-6 text-lg">
              Demander un devis sur-mesure
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CataloguePage;
