import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ChevronDown, Package, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { categories, products } from '../data/mockData';

const CataloguePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6B6B4E] to-[#8B8B6E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Notre Catalogue
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Découvrez notre gamme complète d'emballages alimentaires professionnels. 
            Plus de 200 références disponibles.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[200px] h-11">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-11">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'all' || searchTerm) && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="bg-[#6B6B4E]/10 text-[#6B6B4E] px-3 py-1">
                  {getCategoryName(selectedCategory)}
                  <button onClick={() => handleCategoryChange('all')} className="ml-2">
                    <X size={14} />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="bg-[#6B6B4E]/10 text-[#6B6B4E] px-3 py-1">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-2">
                    <X size={14} />
                  </button>
                </Badge>
              )}
              <button 
                onClick={() => { handleCategoryChange('all'); setSearchTerm(''); }}
                className="text-sm text-gray-500 hover:text-[#6B6B4E] underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produit(s) trouvé(s)
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#F5F5F0] to-[#E8E8DC] flex items-center justify-center">
                    <Package className="text-[#6B6B4E]/30 group-hover:text-[#6B6B4E]/50 transition-colors" size={64} />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#6B6B4E] text-white text-xs">
                        {product.type}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#6B6B4E] transition-colors line-clamp-2 min-h-[48px]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400">Dimensions</p>
                      <p className="text-sm font-medium text-gray-700">{product.specs}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-[#6B6B4E] text-[#6B6B4E] hover:bg-[#6B6B4E] hover:text-white transition-all"
                    >
                      <Info size={16} className="mr-2" />
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500 mb-6">Essayez de modifier vos critères de recherche</p>
              <Button 
                variant="outline"
                onClick={() => { handleCategoryChange('all'); setSearchTerm(''); }}
              >
                Voir tous les produits
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-[#F5F5F0] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="text-[#6B6B4E]" size={40} />
                  </div>
                  <div>
                    <Badge className="bg-[#6B6B4E] text-white mb-2">
                      {selectedProduct.type}
                    </Badge>
                    <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>
              
              <DialogDescription asChild>
                <div className="space-y-6 mt-4">
                  <p className="text-gray-600">{selectedProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Dimensions / Grammage</p>
                      <p className="font-semibold text-gray-900 mt-1">{selectedProduct.specs}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Conditionnement</p>
                      <p className="font-semibold text-gray-900 mt-1">{selectedProduct.packaging}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Matériau</p>
                      <p className="font-semibold text-gray-900 mt-1">{selectedProduct.material}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Catégorie</p>
                      <p className="font-semibold text-gray-900 mt-1">{getCategoryName(selectedProduct.category)}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="flex-1 bg-[#6B6B4E] hover:bg-[#5A5A40] text-white"
                      onClick={() => {
                        setSelectedProduct(null);
                        window.location.href = `/contact?product=${encodeURIComponent(selectedProduct.name)}`;
                      }}
                    >
                      Demander un Devis
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedProduct(null)}
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CataloguePage;
