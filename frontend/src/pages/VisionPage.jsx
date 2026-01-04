import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Video, Clock, Bell, MessageSquare, BarChart3, Package, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const VisionPage = () => {
  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-20">
      
      {/* ============================================ */}
      {/* SECTION 1 - HERO (LA THÈSE) */}
      {/* ============================================ */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Accroche H0 */}
          <p className="text-[#6B705C] font-medium text-lg mb-6">
            Le neutre est une erreur de gestion.
          </p>
          
          {/* Titre H1 */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1A1A1A] leading-[0.95] mb-8">
            On arrête d&apos;acheter<br />du neutre.
          </h1>
          
          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed mb-12">
            EONITE rend le packaging personnalisé aussi évident que le neutre.<br />
            <span className="font-semibold text-[#1A1A1A]">Même prix. Même simplicité.</span><br />
            Mais chaque emballage devient un actif marketing.
          </p>
          
          {/* Bullets */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
            {[
              'Personnalisé au prix du neutre.',
              'Petites séries adaptées à la vraie vie des restos.',
              'Logistique prise en charge de A à Z.'
            ].map((bullet, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#6B705C] rounded-full" />
                <span className="text-[#1A1A1A]/80 font-medium">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2 - 01. L'IDÉE (Agent ION) */}
      {/* ============================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texte */}
            <div>
              <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
                01. L&apos;idée
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4 leading-tight mb-8">
                Infrastructure<br />créative.
              </h2>
              
              <div className="space-y-6 text-lg text-[#1A1A1A]/70 leading-relaxed">
                <p>
                  <span className="font-semibold text-[#1A1A1A]">Agent ION</span> brise la page blanche en générant vos visuels en 10 secondes.
                  Vous voyez vos sacs, boîtes et gobelets prendre forme en direct.
                </p>
                <p>
                  En 30 minutes de visio, le BAT est validé et le devis est ferme.
                </p>
                <p>
                  Zéro aller-retour mail. Zéro fichier qui se perd.
                </p>
              </div>

              {/* Outils */}
              <div className="mt-10 space-y-4">
                {[
                  { icon: Package, title: 'Catalogue EONITE', desc: 'Formats et grammages qui couvrent l\'essentiel des besoins de la restauration.' },
                  { icon: Zap, title: 'Sélecteur de Force', desc: 'Choix du bon sac selon le poids réel des produits.' },
                  { icon: BarChart3, title: 'Configurateur', desc: 'Quantités, prix et contraintes techniques cadrés en quelques minutes.' },
                ].map((tool, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-[#FAF9F6] border border-[#6B705C]/10">
                    <div className="w-10 h-10 bg-[#6B705C] flex items-center justify-center flex-shrink-0">
                      <tool.icon size={20} className="text-[#FAF9F6]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A1A]">{tool.title}</h4>
                      <p className="text-sm text-[#1A1A1A]/60">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visuel ION - Mockup Interface */}
            <div className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl border border-[#333]">
              {/* Window Header */}
              <div className="bg-[#2A2A2A] px-4 py-3 flex items-center gap-2 border-b border-[#333]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
                <span className="ml-4 text-[#888] text-sm font-mono">Agent ION — Générateur</span>
              </div>
              
              {/* Interface Content */}
              <div className="p-6">
                {/* Prompt Input */}
                <div className="bg-[#2A2A2A] rounded-lg p-4 mb-6 border border-[#444]">
                  <p className="text-[#888] text-sm mb-2 font-mono">Prompt</p>
                  <p className="text-[#FAF9F6] font-medium">
                    Sac kraft brun, logo "La Bonne Baguette", style artisanal, poignées torsadées
                  </p>
                </div>
                
                {/* Generated Preview */}
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#8B7355] to-[#6B5344] rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Animated Kraft Bag */}
                    <div className="relative animate-fade-in-up">
                      {/* Bag Shape */}
                      <div className="w-40 h-52 bg-[#C4A574] rounded-t-lg relative shadow-lg">
                        {/* Bag Fold Top */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#D4B584] rounded-t-lg" />
                        {/* Handle */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-8 border-4 border-[#8B7355] rounded-t-full" />
                        {/* Logo Area */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
                          <div className="w-24 h-24 border-2 border-[#6B5344]/50 rounded-lg flex items-center justify-center bg-[#D4B584]/30">
                            <span className="text-[#5C4934] font-black text-xs text-center leading-tight">
                              LA BONNE<br/>BAGUETTE
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Generation Progress */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-[#1A1A1A]/90 backdrop-blur rounded-lg px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#27CA40] rounded-full animate-pulse" />
                        <span className="text-[#FAF9F6] text-sm font-medium">Généré en 8 secondes</span>
                      </div>
                      <span className="text-[#6B705C] text-sm font-bold">✓ Prêt</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-[#6B705C] text-[#FAF9F6] py-3 rounded-lg font-bold text-sm hover:bg-[#5A5F4D] transition-colors">
                    Valider ce design
                  </button>
                  <button className="flex-1 bg-[#2A2A2A] text-[#FAF9F6] py-3 rounded-lg font-bold text-sm border border-[#444] hover:bg-[#333] transition-colors">
                    Régénérer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3 - 02. LA GESTION (Dashboard) */}
      {/* ============================================ */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Vidéo Dashboard */}
            <div className="relative aspect-video bg-[#2A2A2A] rounded-lg overflow-hidden border border-white/10">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source 
                  src="https://customer-assets.emergentagent.com/job_780ddc4c-407d-468a-a02d-0542c62b1336/artifacts/jqan2j9s_video%20dash%20bord%20%E2%80%90%20R%C3%A9alis%C3%A9e%20avec%20Clipchamp.mp4" 
                  type="video/mp4" 
                />
              </video>
              {/* Tags animés */}
              <div className="absolute top-4 right-4 space-y-2">
                <div className="bg-[#6B705C] text-white text-xs font-bold px-3 py-1.5 rounded animate-pulse">
                  Réassort suggéré
                </div>
                <div className="bg-white text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded">
                  Nouvelle commande validée
                </div>
              </div>
            </div>

            {/* Texte */}
            <div>
              <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
                02. La gestion
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#FAF9F6] mt-4 leading-tight mb-8">
                Pilotage<br />opérationnel.
              </h2>
              
              <div className="space-y-6 text-lg text-[#FAF9F6]/70 leading-relaxed">
                <p>
                  Un tableau de bord unique pilote logistique, compta et SAV.
                  Toutes vos commandes, factures et livraisons au même endroit.
                </p>
                <p>
                  Zéro appel perdu. Zéro "où en est ma commande ?".
                </p>
                <p className="font-semibold text-[#FAF9F6]">
                  Un gestionnaire dédié configure votre espace dans votre langue dès le jour 1.
                </p>
              </div>

              {/* Bullets */}
              <div className="mt-10 space-y-4">
                {[
                  'Suivi en temps réel : "En production", "Expédié", "Livré".',
                  'Alertes de réassort avant la rupture, pas après.',
                  'Historique complet pour la comptabilité et les litiges en un clic.'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#6B705C] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FAF9F6] text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-[#FAF9F6]/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4 - 03. L'AVANTAGE (LISA) */}
      {/* ============================================ */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texte */}
            <div>
              <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
                03. L&apos;avantage
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4 leading-tight mb-8">
                Intelligence<br />LISA.
              </h2>
              
              <div className="space-y-6 text-lg text-[#1A1A1A]/70 leading-relaxed">
                <p>
                  <span className="font-semibold text-[#1A1A1A]">LISA n&apos;est pas notre vendeuse.</span><br />
                  C&apos;est votre secrétaire.
                </p>
                <p>
                  Elle compare les prix du marché et négocie pour vous.
                </p>
                <p>
                  Elle anticipe vos ruptures de stock avant qu&apos;elles n&apos;arrivent.
                  Elle analyse la concurrence pour vous donner un temps d&apos;avance.
                </p>
              </div>
            </div>

            {/* Visuel LISA - Chat Window */}
            <div className="bg-white border-2 border-[#6B705C]/20 rounded-lg overflow-hidden shadow-lg">
              {/* Header */}
              <div className="bg-[#6B705C] px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FAF9F6] rounded-full flex items-center justify-center">
                  <MessageSquare size={20} className="text-[#6B705C]" />
                </div>
                <div>
                  <p className="text-[#FAF9F6] font-bold">LISA</p>
                  <p className="text-[#FAF9F6]/70 text-sm">Intelligence Assistante</p>
                </div>
              </div>
              {/* Chat */}
              <div className="p-6 space-y-4">
                <div className="bg-[#FAF9F6] p-4 rounded-lg max-w-[80%]">
                  <p className="text-[#1A1A1A] text-sm">
                    J&apos;ai analysé les tarifs de vos concurrents.<br />
                    <span className="font-semibold">Voici votre avantage ce mois-ci.</span>
                  </p>
                </div>
                <div className="bg-[#6B705C]/10 p-4 rounded-lg max-w-[80%]">
                  <p className="text-[#1A1A1A] text-sm">
                    📊 Économie potentielle : <span className="font-bold text-[#6B705C]">-18%</span> sur vos sacs kraft vs. votre fournisseur actuel.
                  </p>
                </div>
                <div className="bg-[#FAF9F6] p-4 rounded-lg max-w-[80%]">
                  <p className="text-[#1A1A1A] text-sm">
                    ⚠️ Stock prévu : rupture dans 12 jours.<br />
                    Je vous suggère une commande de réassort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5 - CAS CONCRET (Design en 30 min) */}
      {/* ============================================ */}
      <section className="py-24 bg-[#FAF9F6] border-t border-[#6B705C]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Label */}
          <p className="text-[#6B705C] font-medium text-center mb-4">
            Cas concret : design live en 30 minutes.
          </p>
          
          {/* Titre */}
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] text-center leading-tight mb-6">
            Votre sac kraft<br />
            <span className="text-[#6B705C] italic">créé en direct</span><br />
            en 30 minutes
          </h2>
          
          {/* Sous-titre */}
          <p className="text-xl text-[#1A1A1A]/70 text-center max-w-2xl mx-auto mb-16">
            Fini l&apos;attente de 1 à 3 mois. Notre graphiste personnalise votre sac en visio 
            pendant que vous regardez. Vous validez, on produit.
          </p>

          {/* 3 Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {[
              { value: '30min', label: 'DESIGN VALIDÉ' },
              { value: '0€', label: 'MAQUETTE OFFERTE' },
              { value: '48h', label: 'PRODUCTION LANCÉE' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-black text-[#1A1A1A] italic">{stat.value}</p>
                <p className="text-[#6B705C] text-xs uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Cartes Sarah / Cynthia */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Sarah */}
            <div className="bg-white border-2 border-[#6B705C] rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#FFD699] rounded-full flex items-center justify-center text-2xl">
                  👩
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">Sarah</p>
                  <p className="text-[#1A1A1A]/60 text-sm">Dir. Commerciale</p>
                </div>
              </div>
              <div className="bg-[#E8F5E9] text-[#2E7D32] text-sm font-medium px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#2E7D32] rounded-full" />
                Disponible maintenant
              </div>
              <Link to="/reservation">
                <Button className="w-full bg-[#6B705C] hover:bg-[#5A5F4D] text-white py-4 font-bold">
                  <Video size={18} className="mr-2" />
                  Rejoindre Sarah
                </Button>
              </Link>
            </div>

            {/* Cynthia */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#E1BEE7] rounded-full flex items-center justify-center text-2xl">
                  👩‍💼
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">Cynthia</p>
                  <p className="text-[#1A1A1A]/60 text-sm">Graphiste Design</p>
                </div>
              </div>
              <div className="bg-[#FFF3E0] text-[#E65100] text-sm font-medium px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#E65100] rounded-full" />
                En session client
              </div>
              <Button variant="outline" className="w-full border-[#E0E0E0] text-[#1A1A1A] py-4 font-bold">
                <Bell size={18} className="mr-2 text-[#FFC107]" />
                M&apos;avertir
              </Button>
              <p className="text-center text-[#1A1A1A]/50 text-sm mt-3">
                <Clock size={14} className="inline mr-1" />
                Environ 5 minutes
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-[#FAF9F6] border border-[#E0E0E0] rounded-full px-6 py-3 flex items-center gap-3">
              <span className="text-xl">📦</span>
              <span className="text-[#1A1A1A] font-medium">
                <span className="font-bold text-[#6B705C]">15 240</span> sacs en production
              </span>
            </div>
            <div className="bg-[#FAF9F6] border border-[#E0E0E0] rounded-full px-6 py-3 flex items-center gap-3">
              <span className="text-xl">📦</span>
              <span className="text-[#1A1A1A] font-medium">
                <span className="font-bold text-[#E65100]">3 places</span> restantes livraison 20/01
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6 - CONCLUSION / MANIFESTE */}
      {/* ============================================ */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#FAF9F6] leading-tight mb-8">
            Rendre l&apos;anonymat<br />irrationnel.
          </h2>
          
          <div className="space-y-6 text-xl text-[#FAF9F6]/70 leading-relaxed max-w-2xl mx-auto mb-12">
            <p>
              Nous industrialisons la technologie pour que chaque commerce reprenne le pouvoir sur sa marque.
            </p>
            <p>
              Du restaurant indépendant au réseau national, le neutre devient l&apos;exception.
            </p>
            <p className="font-semibold text-[#FAF9F6]">
              Le packaging personnalisé devient la nouvelle norme de gestion.
            </p>
          </div>

          <Link to="/assistant">
            <Button className="bg-[#6B705C] hover:bg-[#5A5F4D] text-white px-12 py-6 text-lg font-bold uppercase tracking-wider">
              Commencer maintenant
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* CSS Animation */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
};

export default VisionPage;
