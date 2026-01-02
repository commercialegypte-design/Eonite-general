import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Award, 
  Users, 
  Target, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Building2,
  Globe,
  Recycle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { companyInfo } from '../data/mockData';

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: 'Qualité',
      description: 'Nous sélectionnons rigoureusement nos fournisseurs et contrôlons chaque lot pour garantir une qualité constante.'
    },
    {
      icon: Leaf,
      title: 'Éco-Responsabilité',
      description: 'Engagés pour l\'environnement, nous privilégions les matériaux recyclables et biodégradables.'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Notre équipe dédiée vous accompagne dans le choix des emballages adaptés à vos besoins.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Nous recherchons constamment de nouvelles solutions pour répondre aux évolutions du marché.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Création', description: 'Lancement d\'Eonite avec une vision claire : proposer des emballages de qualité.' },
    { year: '2021', title: 'Développement', description: 'Extension de notre gamme et premiers partenariats avec des restaurateurs.' },
    { year: '2022', title: 'Croissance', description: 'Plus de 200 clients nous font confiance. Lancement de la gamme éco-responsable.' },
    { year: '2023', title: 'Expansion', description: 'Extension nationale et diversification de notre offre.' },
    { year: '2024', title: 'Aujourd\'hui', description: 'Leader régional avec plus de 500 clients et 200+ références.' }
  ];

  const commitments = [
    'Matériaux certifiés et traçables',
    'Emballages recyclables et compostables',
    'Réduction des plastiques à usage unique',
    'Partenariats avec des producteurs locaux',
    'Livraison optimisée pour réduire l\'empreinte carbone',
    'Recyclage des déchets de production'
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B6B4E] via-[#7A7A5E] to-[#8B8B6E] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white/90 text-sm mb-6">
              <Building2 size={16} />
              Notre Histoire
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              À Propos d'Eonite
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Depuis notre création, nous nous engageons à fournir des emballages alimentaires 
              de qualité supérieure, tout en respectant notre planète.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#6B6B4E] font-medium">Notre Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Accompagner les professionnels de l'alimentation
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Chez Eonite, nous croyons que l'emballage est bien plus qu'un simple contenant. 
                C'est le premier contact de vos clients avec vos produits, un vecteur de votre image de marque.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Notre mission est de vous fournir des solutions d'emballage qui valorisent vos créations culinaires, 
                tout en répondant aux exigences de durabilité et de respect de l'environnement.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-[#F5F5F0] rounded-2xl">
                  <p className="text-4xl font-bold text-[#6B6B4E]">{companyInfo.clients}</p>
                  <p className="text-gray-600 mt-2">Clients Satisfaits</p>
                </div>
                <div className="text-center p-6 bg-[#F5F5F0] rounded-2xl">
                  <p className="text-4xl font-bold text-[#6B6B4E]">{companyInfo.products}</p>
                  <p className="text-gray-600 mt-2">Références</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#F5F5F0] to-[#E8E8DC] rounded-3xl p-12 flex items-center justify-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/ws6x9cf4_eonite%20logo.png" 
                  alt="Eonite Logo" 
                  className="w-3/4 h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#6B6B4E] text-white p-6 rounded-2xl shadow-xl">
                <Leaf size={32} className="mb-2" />
                <p className="font-semibold">Engagé pour</p>
                <p className="text-white/80">l'environnement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-medium">Nos Valeurs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Ce Qui Nous Anime
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#6B6B4E]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-[#6B6B4E]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-medium">Notre Parcours</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              L'Histoire d'Eonite
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#6B6B4E]/20 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-[#F5F5F0] p-6 rounded-2xl inline-block">
                      <span className="text-3xl font-bold text-[#6B6B4E]">{milestone.year}</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-4 h-4 bg-[#6B6B4E] rounded-full hidden md:block" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eco Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-[#6B6B4E] to-[#5A5A40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Recycle size={16} />
                Engagement Écologique
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Notre Engagement pour l'Environnement
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Chez Eonite, nous sommes conscients de notre responsabilité environnementale. 
                C'est pourquoi nous nous engageons à proposer des solutions d'emballage durables 
                et respectueuses de notre planète.
              </p>
              
              <ul className="space-y-4">
                {commitments.map((commitment, index) => (
                  <li key={index} className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="text-[#A8A87A] flex-shrink-0 mt-0.5" size={20} />
                    <span>{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center">
                <Leaf className="text-white mx-auto mb-4" size={40} />
                <p className="text-3xl font-bold text-white">80%</p>
                <p className="text-white/80 mt-2">Produits recyclables</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center">
                <Globe className="text-white mx-auto mb-4" size={40} />
                <p className="text-3xl font-bold text-white">-30%</p>
                <p className="text-white/80 mt-2">Empreinte carbone</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center col-span-2">
                <Recycle className="text-white mx-auto mb-4" size={40} />
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-white/80 mt-2">Déchets de production recyclés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Travaillons Ensemble
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Vous souhaitez en savoir plus sur nos produits ou obtenir un devis personnalisé ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white px-8 py-6 text-lg rounded-xl">
                Nous Contacter
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/catalogue">
              <Button variant="outline" size="lg" className="border-2 border-[#6B6B4E] text-[#6B6B4E] hover:bg-[#6B6B4E] hover:text-white px-8 py-6 text-lg rounded-xl">
                Voir le Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
