import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, ArrowRight, X } from 'lucide-react';
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
  { id: '1', name: 'Sac Kraft Poignées Plates', category: 'sacs_kraft', description: 'Sac kraft classique avec poignées plates. Idéal pour la vente à emporter.', priceFrom: '0.18', minQty: 500, sizes: ['S', 'M', 'L'], image: 'https://images.pexels.com/photos/6620965/pexels-photo-6620965.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: '2', name: 'Sac Kraft Poignées Torsadées', category: 'sacs_kraft', description: 'Sac kraft premium avec poignées torsadées. Look haut de gamme.', priceFrom: '0.22', minQty: 500, sizes: ['M', 'L'], image: 'https://images.pexels.com/photos/6620970/pexels-photo-6620970.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: '3', name: 'Boîte Burger Kraft', category: 'boites', description: 'Boîte burger en carton kraft. Résistante et éco-responsable.', priceFrom: '0.15', minQty: 1000, sizes: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1648587456176-4969b0124b12?auto=format&fit=crop&w=600&q=80' },
  { id: '4', name: 'Boîte Pizza', category: 'boites', description: 'Boîte pizza en carton ondulé. Plusieurs tailles disponibles.', priceFrom: '0.25', minQty: 500, sizes: ['26cm', '33cm', '40cm'], image: 'https://images.unsplash.com/photo-1532630571098-79a3d222b00d?auto=format&fit=crop&w=600&q=80' },
  { id: '5', name: 'Sac Shopping Luxe Côtelé', category: 'luxe', description: 'Sac shopping luxe avec finition côtelée. Impression premium.', priceFrom: '0.35', minQty: 500, sizes: ['Custom'], image: 'https://images.unsplash.com/photo-1532630174493-69e1fe9fead2?auto=format&fit=crop&w=600&q=80' },
  { id: '6', name: 'Gobelet Carton Simple Paroi', category: 'gobelets', description: 'Gobelet carton classique pour boissons chaudes.', priceFrom: '0.045', minQty: 1000, sizes: ['4oz', '8oz', '12oz'], image: 'https://images.pexels.com/photos/7233099/pexels-photo-7233099.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: '7', name: 'Gobelet Ripple Wall', category: 'gobelets', description: 'Gobelet triple paroi ondulé. Isolation maximale.', priceFrom: '0.08', minQty: 1000, sizes: ['8oz', '12oz'], image: 'https://images.pexels.com/photos/7232658/pexels-photo-7232658.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: '8', name: 'Sac Expédition Mailing', category: 'expedition', description: 'Sac d\'expédition auto-adhésif en LDPE co-extrudé.', priceFrom: '0.12', minQty: 500, sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1627618997007-6d81f1efb811?auto=format&fit=crop&w=600&q=80' },
];

const CataloguePage = () => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    let result = PRODUCTS;
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    }
    setFilteredProducts(result);
  }, [category, search]);

  return (
    <main className="bg-[#F9F8EF] min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-[#CDCEBD] border-b border-[#6B705C]/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">Catalogue</span>
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mt-4">NOS PRODUITS</h1>
          <p className="text-[#1A1A1A]/70 text-lg mt-4 max-w-2xl">Tous nos emballages sont personnalisables avec votre logo. Production européenne, qualité garantie.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-[#F9F8EF] border-b border-[#6B705C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" size={20} />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all border ${
                    category === cat.id
                      ? 'bg-[#6B705C] text-[#F9F8EF] border-[#6B705C]'
                      : 'bg-transparent text-[#1A1A1A] border-[#6B705C]/30 hover:border-[#6B705C]'
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
          <p className="text-[#1A1A1A]/60 mb-8">{filteredProducts.length} produit(s) trouvé(s)</p>
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-[#F9F8EF] border-2 border-[#6B705C] card-hover group">
                  <div className="aspect-square bg-[#CDCEBD] overflow-hidden">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={64} className="text-[#6B705C]/30 group-hover:text-[#6B705C]/50 transition-colors" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[#6B705C] text-xs font-bold uppercase tracking-wider mb-2">
                      {CATEGORIES.find(c => c.id === product.category)?.label}
                    </p>
                    <h3 className="text-[#1A1A1A] font-bold text-lg mb-2 group-hover:text-[#6B705C] transition-colors">{product.name}</h3>
                    <p className="text-[#1A1A1A]/60 text-sm line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#6B705C]/20">
                      <div>
                        <p className="text-[#1A1A1A]/50 text-xs">A partir de</p>
                        <p className="text-[#1A1A1A] font-black text-xl">{product.priceFrom} €</p>
                      </div>
                      <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>
                        <Button size="sm" className="btn-primary text-sm font-bold">Devis</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package size={64} className="text-[#6B705C]/30 mx-auto mb-4" />
              <p className="text-[#1A1A1A]/60 text-lg">Aucun produit trouvé</p>
              <Button onClick={() => { setCategory('all'); setSearch(''); }} className="mt-4 btn-outline">Voir tous les produits</Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#CDCEBD] border-t border-[#6B705C]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">BESOIN D'UN FORMAT SPÉCIFIQUE ?</h2>
          <p className="text-[#1A1A1A]/70 text-lg mb-8">Nous produisons des formats sur-mesure. Contactez-nous avec vos spécifications.</p>
          <Link to="/contact">
            <Button className="btn-primary px-10 py-6 text-lg">
              Démarrer mon design
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CataloguePage;
