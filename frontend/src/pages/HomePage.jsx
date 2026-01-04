import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Factory, 
  Truck, 
  Award, 
  Shield,
  ChevronDown,
  Sparkles,
  Clock,
  Check,
  Gift,
  Warehouse,
  Video,
  MessageCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Bandeau de réassurance
  const reassuranceItems = [
    { icon: Gift, label: 'Conception offerte' },
    { icon: Clock, label: 'Validation en 30 min' },
    { icon: Truck, label: 'Transport au prix coûtant' },
    { icon: Warehouse, label: 'Stockage France' },
  ];

  // Preuves qualité
  const proofs = [
    { icon: Factory, title: 'Direct Usine', desc: 'Pas d\'intermédiaire. Prix imbattables.' },
    { icon: Award, title: 'FSC Certifié', desc: 'Papier issu de forêts gérées durablement.' },
    { icon: Shield, title: 'Normes Alimentaires', desc: 'Encres et matériaux 100% conformes.' },
    { icon: Truck, title: 'Livraison DDP', desc: 'Dédouanement géré. Zéro frais cachés.' },
  ];

  // Étapes du tunnel
  const tunnelSteps = [
    { num: '01', icon: Sparkles, title: 'Choisissez votre produit', desc: 'Sacs, boîtes, gobelets... Trouvez le format adapté à votre activité.' },
    { num: '02', icon: Video, title: 'Créez en visio avec un expert', desc: 'Session de 30 min pour co-concevoir votre design en direct.' },
    { num: '03', icon: Truck, title: 'Recevez BAT + devis', desc: 'Validation immédiate. Vous repartez avec un devis final et un BAT.' },
  ];

  // WhatsApp handler
  const openWhatsApp = () => {
    const message = encodeURIComponent("👋 Bonjour ! J'aimerais un devis rapide pour mes emballages personnalisés. Pouvez-vous m'aider ?");
    window.open(`https://wa.me/33757598643?text=${message}`, '_blank');
  };

  return (
    <main className="bg-[#F9F8EF]">
      {/* ============================================ */}
      {/* HERO SECTION - VIDEO BACKGROUND */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/fxbbibta_logo%20Eonite%20base.jpeg"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/85rjobm7_video%20unine%20turquie.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Olive Overlay */}
        <div className="absolute inset-0 bg-[#6B705C]/50" />
        
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#F9F8EF]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-5xl">
            {/* Main Headline - H1 */}
            <h1 
              className="text-5xl md:text-7xl lg:text-[7rem] font-black text-[#F9F8EF] leading-[0.95] mb-8 tracking-tight"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)' }}
              data-testid="hero-h1"
            >
              Votre emballage<br />
              personnalisé<br />
              au prix du neutre.
            </h1>

            {/* Subheadline */}
            <p 
              className="text-xl md:text-2xl text-[#F9F8EF] max-w-2xl mb-10 leading-relaxed"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}
              data-testid="hero-subtitle"
            >
              Sacs kraft, boîtes pizza, pâtissières et bols.<br />
              <span className="font-semibold">Design offert et co-création en direct avec nos experts.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/assistant">
                <Button 
                  className="bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] px-10 py-7 text-lg font-bold uppercase tracking-wider border-0 shadow-2xl flex items-center"
                  data-testid="cta-primary"
                >
                  <Sparkles className="mr-3" size={22} />
                  Créer mon design gratuitement
                  <ArrowRight className="ml-3" size={22} />
                </Button>
              </Link>
              <Link to="/reservation">
                <Button 
                  className="bg-transparent text-[#F9F8EF] border-2 border-[#F9F8EF] hover:bg-[#F9F8EF] hover:text-[#1A1A1A] px-10 py-7 text-lg font-bold uppercase tracking-wider"
                  data-testid="cta-secondary"
                >
                  <Video className="mr-3" size={22} />
                  Prendre RDV en visio
                </Button>
              </Link>
            </div>

            {/* Bandeau de Réassurance */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#F9F8EF]/30">
              {reassuranceItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-[#F9F8EF]">
                  <div className="w-10 h-10 bg-[#6B705C] flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-[#F9F8EF]" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={() => document.getElementById('pourquoi-eonite')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F9F8EF]/70 hover:text-[#F9F8EF] transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* ============================================ */}
      {/* POURQUOI ÉONITE */}
      {/* ============================================ */}
      <section id="pourquoi-eonite" className="py-20 bg-[#1A1A1A]" data-testid="pourquoi-eonite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#CDCEBD] font-bold text-sm uppercase tracking-widest">
            Notre Différence
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#F9F8EF] mt-3 mb-8">
            POURQUOI ÉONITE ?
          </h2>
          <p className="text-xl md:text-2xl text-[#F9F8EF]/80 leading-relaxed max-w-3xl mx-auto">
            Nous avons supprimé les intermédiaires et les frais d&apos;agence. 
            Nous ne margeons que sur la production industrielle.
          </p>
          <p className="text-2xl md:text-3xl text-[#F9F8EF] font-bold mt-6">
            Résultat : vous payez votre emballage au prix du neutre,<br />
            <span className="text-[#CDCEBD]">sans frais de création graphique ni surcoût logistique caché.</span>
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[#F9F8EF]/10">
            <div>
              <p className="text-5xl font-black text-[#CDCEBD]">0€</p>
              <p className="text-[#F9F8EF]/60 text-sm uppercase tracking-wider mt-2">Frais de création</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#CDCEBD]">30min</p>
              <p className="text-[#F9F8EF]/60 text-sm uppercase tracking-wider mt-2">Pour valider votre design</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#CDCEBD]">Direct</p>
              <p className="text-[#F9F8EF]/60 text-sm uppercase tracking-wider mt-2">Usine sans intermédiaire</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PREUVES QUALITÉ */}
      {/* ============================================ */}
      <section className="py-20 bg-[#CDCEBD]" data-testid="preuves-qualite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Qualité Industrielle
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-3">
              LA PUISSANCE INDUSTRIELLE<br />
              <span className="text-[#1A1A1A]/40">AU SERVICE DU BEAU</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proofs.map((proof, index) => (
              <div 
                key={index}
                className="bg-[#F9F8EF] border border-[#6B705C] p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#6B705C] flex items-center justify-center mb-6">
                  <proof.icon size={28} className="text-[#F9F8EF]" />
                </div>
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-2">{proof.title}</h3>
                <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">{proof.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TUNNEL DE CONVERSION */}
      {/* ============================================ */}
      <section className="py-20 bg-[#F9F8EF]" data-testid="tunnel-conversion">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Comment ça marche
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-3">
              30 MINUTES<br />
              <span className="text-[#1A1A1A]/40">POUR TRANSFORMER</span><br />
              VOTRE IMAGE DE MARQUE
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tunnelSteps.map((step, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-px bg-[#6B705C]/20" />
                )}
                <div className="bg-[#CDCEBD] p-8">
                  <span className="text-6xl font-black text-[#6B705C]/20">{step.num}</span>
                  <div className="w-14 h-14 bg-[#6B705C] flex items-center justify-center mt-4 mb-4">
                    <step.icon size={28} className="text-[#F9F8EF]" />
                  </div>
                  <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-[#1A1A1A]/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/reservation">
              <Button className="bg-[#1A1A1A] hover:bg-black text-[#F9F8EF] px-12 py-6 text-lg font-bold uppercase tracking-wider">
                <Video className="mr-3" size={20} />
                Réserver ma session visio gratuite
                <ArrowRight className="ml-3" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VIDEO USINE */}
      {/* ============================================ */}
      <section className="py-20 bg-[#6B705C]" data-testid="video-usine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Video */}
            <div className="relative aspect-video border border-[#F9F8EF]/20 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source 
                  src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/85rjobm7_video%20unine%20turquie.mp4" 
                  type="video/mp4" 
                />
              </video>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Link to="/usine">
                  <button className="w-20 h-20 bg-[#F9F8EF] hover:bg-[#CDCEBD] flex items-center justify-center transition-colors">
                    <Play size={32} className="text-[#6B705C] ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <span className="text-[#F9F8EF]/70 font-bold text-sm uppercase tracking-widest">
                Production
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#F9F8EF] leading-tight">
                DIRECT USINE<br />
                <span className="text-[#F9F8EF]/50">ZÉRO INTERMÉDIAIRE</span>
              </h2>
              <p className="text-[#F9F8EF]/70 text-lg leading-relaxed">
                Notre usine partenaire produit pour les plus grandes enseignes européennes. 
                Vous bénéficiez des mêmes standards de qualité, sans les marges des importateurs.
              </p>
              <ul className="space-y-4">
                {['Certification FSC & normes alimentaires', 'Transport au prix coûtant', 'Stockage France inclus'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#F9F8EF]">
                    <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-[#F9F8EF]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA CATALOGUE */}
      {/* ============================================ */}
      <section className="py-20 bg-[#F9F8EF]" data-testid="cta-catalogue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <span className="text-[#CDCEBD] font-bold text-sm uppercase tracking-widest">
                  Notre Gamme
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#F9F8EF] mt-4 leading-tight">
                  DÉCOUVREZ LE CATALOGUE<br />
                  <span className="text-[#F9F8EF]/50">COMPLET</span>
                </h2>
                <p className="text-[#F9F8EF]/70 text-lg mt-6 leading-relaxed">
                  Sacs kraft, boîtes pizza, gobelets, bols... 
                  Toutes les solutions d&apos;emballage pour votre activité.
                </p>
              </div>
              <Link to="/catalogue">
                <Button className="bg-[#6B705C] text-[#F9F8EF] hover:bg-[#5A5F4D] px-10 py-6 text-lg font-bold uppercase tracking-wider">
                  Voir le catalogue
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-24 bg-[#CDCEBD]" data-testid="final-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-tight mb-6">
            PRÊT À PASSER<br />
            <span className="text-[#6B705C]">AU PRIX DU NEUTRE ?</span>
          </h2>
          <p className="text-[#1A1A1A]/70 text-xl mb-10 max-w-2xl mx-auto">
            Design gratuit, validation en 30 min, transport au prix coûtant. 
            Lancez votre projet maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assistant">
              <Button className="bg-[#1A1A1A] hover:bg-black text-[#F9F8EF] px-12 py-6 text-lg font-bold uppercase tracking-wider">
                <Sparkles className="mr-2" size={20} />
                Créer mon design
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/reservation">
              <Button className="bg-transparent text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F8EF] px-12 py-6 text-lg font-bold uppercase tracking-wider">
                <Video className="mr-2" size={20} />
                Prendre RDV
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHATSAPP FLOATING WIDGET */}
      {/* ============================================ */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 group"
        data-testid="whatsapp-widget"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
        
        {/* Tooltip */}
        <div className="absolute right-20 bottom-0 w-64 bg-white rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p className="text-[#1A1A1A] text-sm font-medium">
            👋 Besoin d&apos;un devis rapide ? Dites-moi quel produit vous intéresse !
          </p>
        </div>
      </button>
    </main>
  );
};

export default HomePage;
