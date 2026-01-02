import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShoppingBag, 
  Package, 
  Box, 
  Coffee, 
  Circle, 
  Truck,
  Award,
  Leaf,
  PiggyBank,
  Palette,
  Headphones,
  Star,
  CheckCircle2,
  Users,
  Globe
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { categories, advantages, testimonials, companyInfo } from '../data/mockData';

const iconMap = {
  ShoppingBag, Package, Box, Coffee, Circle, Truck,
  Award, Leaf, PiggyBank, Palette, HeadphonesIcon: Headphones
};

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F5F0] via-white to-[#E8E8DC] min-h-[85vh] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6B6B4E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B8B6E]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#6B6B4E]/10 px-4 py-2 rounded-full">
                <Leaf size={18} className="text-[#6B6B4E]" />
                <span className="text-[#6B6B4E] font-medium text-sm">Emballages Éco-Responsables</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Emballages 
                <span className="text-[#6B6B4E]"> Alimentaires</span>
                <br />Professionnels
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Sacs, boîtes, gobelets et solutions d'emballage de qualité pour la restauration, 
                la vente à emporter et l'expédition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/catalogue">
                  <Button size="lg" className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Découvrir le Catalogue
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-2 border-[#6B6B4E] text-[#6B6B4E] hover:bg-[#6B6B4E] hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300">
                    Demander un Devis
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#6B6B4E]">{companyInfo.clients}</p>
                  <p className="text-gray-500 text-sm">Clients Satisfaits</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#6B6B4E]">{companyInfo.products}</p>
                  <p className="text-gray-500 text-sm">Produits</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#6B6B4E]">24h</p>
                  <p className="text-gray-500 text-sm">Livraison Express</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main circle background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6B6B4E]/20 to-[#8B8B6E]/10 rounded-full" />
                
                {/* Floating product cards */}
                <div className="absolute top-8 left-8 bg-white p-4 rounded-2xl shadow-xl animate-float">
                  <ShoppingBag className="text-[#6B6B4E] mb-2" size={32} />
                  <p className="font-medium text-gray-800">Sacs Kraft</p>
                  <p className="text-sm text-gray-500">Premium Quality</p>
                </div>
                
                <div className="absolute top-1/4 right-4 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                  <Coffee className="text-[#6B6B4E] mb-2" size={32} />
                  <p className="font-medium text-gray-800">Gobelets</p>
                  <p className="text-sm text-gray-500">Eco-Friendly</p>
                </div>
                
                <div className="absolute bottom-1/4 left-4 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <Box className="text-[#6B6B4E] mb-2" size={32} />
                  <p className="font-medium text-gray-800">Boîtes Food</p>
                  <p className="text-sm text-gray-500">Personnalisable</p>
                </div>
                
                <div className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                  <Truck className="text-[#6B6B4E] mb-2" size={32} />
                  <p className="font-medium text-gray-800">Livraison</p>
                  <p className="text-sm text-gray-500">Express 24h</p>
                </div>

                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/ws6x9cf4_eonite%20logo.png" 
                      alt="Eonite" 
                      className="w-28 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-medium">Notre Catalogue</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Nos Catégories de Produits
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Découvrez notre gamme complète d'emballages alimentaires professionnels, 
              adaptés à tous vos besoins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon];
              return (
                <Link to={`/catalogue?category=${category.id}`} key={category.id}>
                  <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl">
                          {IconComponent && <IconComponent className="text-[#6B6B4E]" size={28} />}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#6B6B4E] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mt-2">{category.description}</p>
                      <div className="flex items-center gap-2 mt-4 text-[#6B6B4E] font-medium">
                        Voir les produits
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-medium">Pourquoi Nous Choisir</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Les Avantages Eonite
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = iconMap[advantage.icon];
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6B6B4E] transition-colors">
                    {IconComponent && (
                      <IconComponent 
                        className="text-[#6B6B4E] group-hover:text-white transition-colors" 
                        size={28} 
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-medium">Témoignages</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Ce Que Disent Nos Clients
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-[#6B6B4E] text-sm">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#6B6B4E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à Commander ?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour obtenir un devis personnalisé adapté à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#6B6B4E] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                Demander un Devis Gratuit
              </Button>
            </Link>
            <Link to="/catalogue">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-[#6B6B4E] px-8 py-6 text-lg rounded-xl transition-all">
                Voir le Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
