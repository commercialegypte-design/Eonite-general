import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Globe, Zap, Target, BarChart3, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

const VisionPage = () => {
  const kpis = [
    { value: '€2.4M', label: 'Marché adressable France', icon: Target },
    { value: '47%', label: 'Marge brute produits', icon: TrendingUp },
    { value: '500+', label: 'Clients actifs', icon: Users },
    { value: 'x3', label: 'Croissance annuelle', icon: BarChart3 },
  ];

  const pillars = [
    {
      title: 'Digitalisation du Sourcing',
      desc: 'Nous automatisons la chaîne de valeur entre le besoin client et la production industrielle. Notre plateforme réduit le temps de mise en production de 3 semaines à 72h.',
    },
    {
      title: 'Modèle Asset-Light',
      desc: 'Pas d\'usine en propre. Nous orchestrons un réseau de partenaires certifiés en Europe et Turquie. Scalabilité sans CAPEX lourd.',
    },
    {
      title: 'Verticalisation B2B',
      desc: 'Focus restauration et retail alimentaire. Un marché fragmenté avec des besoins récurrents (réassort) et une sensibilité croissante à l\'image de marque.',
    },
  ];

  return (
    <main className="bg-[#F9F8EF] min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
            Pour Investisseurs
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-[#F9F8EF] mt-4 leading-[0.9]">
            DIGITALISER<br />
            <span className="text-[#F9F8EF]/50">LE SOURCING</span><br />
            INDUSTRIEL
          </h1>
          <p className="text-[#F9F8EF]/70 text-xl mt-8 max-w-2xl leading-relaxed">
            EONITE est une plateforme B2B qui connecte les professionnels de la restauration 
            à la puissance de production industrielle, sans intermédiaires.
          </p>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-16 bg-[#6B705C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {kpis.map((kpi, i) => (
              <div key={i} className="text-center">
                <kpi.icon size={32} className="text-[#F9F8EF]/60 mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-black text-[#F9F8EF]">{kpi.value}</p>
                <p className="text-[#F9F8EF]/70 text-sm uppercase tracking-wider mt-2">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Notre Thèse
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4">
              L'EMBALLAGE B2B<br />
              <span className="text-[#1A1A1A]/40">EST SOUS-DIGITALISÉ</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-[#CDCEBD] p-8 border border-[#6B705C]">
                <span className="text-6xl font-black text-[#6B705C]/20">0{i + 1}</span>
                <h3 className="text-xl font-bold text-[#1A1A1A] mt-4 mb-4">{pillar.title}</h3>
                <p className="text-[#1A1A1A]/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market */}
      <section className="py-24 bg-[#CDCEBD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
                Opportunité
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4 leading-tight">
                UN MARCHÉ<br />
                <span className="text-[#1A1A1A]/40">FRAGMENTÉ</span>
              </h2>
              <p className="text-[#1A1A1A]/70 text-lg mt-6 leading-relaxed">
                Le marché de l'emballage alimentaire B2B en France représente plus de 2 milliards d'euros. 
                Il est dominé par des grossistes traditionnels et des importateurs sans valeur ajoutée digitale.
              </p>
              <p className="text-[#1A1A1A]/70 text-lg mt-4 leading-relaxed">
                Notre positionnement : capturer la valeur de la personnalisation 
                (marges plus élevées) avec une expérience client digitale supérieure.
              </p>
            </div>
            <div className="bg-[#F9F8EF] p-8 border border-[#6B705C]">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Avantages Compétitifs</h3>
              <ul className="space-y-4">
                {[
                  'Configurateur de prix en temps réel (vs. devis manuels)',
                  'Design en visio (30 min vs. 2 semaines d\'aller-retours)',
                  'Réseau de production multi-source (résilience)',
                  'Livraison DDP incluse (simplicité pour le client)',
                  'Plateforme de réassort automatique (LTV)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#6B705C] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#F9F8EF] text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-[#1A1A1A]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4">
              PROCHAINES<br />
              <span className="text-[#1A1A1A]/40">ÉTAPES</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { phase: 'Q1 2025', title: 'Série A', items: ['Expansion équipe Sales', 'Ouverture marché Benelux', 'Intégration ERP clients'] },
              { phase: 'Q3 2025', title: 'Scale-Up', items: ['Réseau production +5 usines', 'Plateforme self-service', 'API pour franchises'] },
              { phase: '2026', title: 'Europe', items: ['Présence 8 pays', 'Catégorie go-to-market B2B', 'Objectif €15M ARR'] },
            ].map((milestone, i) => (
              <div key={i} className="bg-[#1A1A1A] p-8">
                <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">{milestone.phase}</span>
                <h3 className="text-2xl font-bold text-[#F9F8EF] mt-2 mb-6">{milestone.title}</h3>
                <ul className="space-y-3">
                  {milestone.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-[#F9F8EF]/70">
                      <div className="w-1.5 h-1.5 bg-[#6B705C]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#6B705C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe size={48} className="text-[#F9F8EF]/60 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-[#F9F8EF] mb-6">
            INTÉRESSÉ ?
          </h2>
          <p className="text-[#F9F8EF]/80 text-xl mb-8">
            Contactez-nous pour recevoir notre pitch deck complet et nos projections financières.
          </p>
          <Link to="/contact?subject=investisseur">
            <Button className="bg-[#F9F8EF] text-[#6B705C] hover:bg-[#CDCEBD] px-10 py-6 text-lg font-bold uppercase tracking-wider">
              Demander le Pitch Deck
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default VisionPage;
