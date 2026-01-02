import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Factory, 
  Truck, 
  Award, 
  Shield,
  Users,
  Globe,
  ChevronDown,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Configurator from '../components/home/Configurator';

const HomePage = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const stats = [
    { value: '500+', label: 'Clients B2B' },
    { value: '2-3', label: 'Semaines livraison' },
    { value: '100%', label: 'Production EU' },
    { value: '0,10€', label: 'Prix / pièce' },
  ];

  const proofs = [
    { icon: Factory, title: 'Production Européenne', desc: 'Usines certifiées ISO en Turquie et Europe' },
    { icon: Award, title: 'FSC Certifié', desc: 'Papier kraft issu de forêts gérées durablement' },
    { icon: Shield, title: 'Encres Alimentaires', desc: 'Conformité totale aux normes contact alimentaire' },
    { icon: Truck, title: 'Livraison Express', desc: '2-3 semaines partout en France métropolitaine' },
  ];

  const scrollToConfigurator = () => {
    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#0A0A0A]">
      {/* ============================================ */}
      {/* HERO SECTION - VIDEO BACKGROUND */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          poster="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/fxbbibta_logo%20Eonite%20base.jpeg"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/85rjobm7_video%20unine%20turquie.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
        
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 px-4 py-2 mb-8">
              <Zap size={16} className="text-[#FF6B00]" />
              <span className="text-[#FF6B00] font-medium text-sm uppercase tracking-wider">
                Emballages Industriels B2B
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-8">
              <span className="glitch-text">LE NEUTRE</span>
              <br />
              <span className="text-[#FF6B00]">EST UNE INSULTE</span>
              <br />
              <span className="text-white/80">À VOTRE CUISINE.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed">
              Sacs kraft personnalisés pour restaurateurs exigeants. 
              <span className="text-white font-semibold"> Production européenne, qualité industrielle.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button 
                onClick={scrollToConfigurator}
                className="btn-brutal px-10 py-6 text-lg"
              >
                Configurer mon devis
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Link to="/usine">
                <Button className="btn-brutal-outline px-10 py-6 text-lg">
                  <Play className="mr-2" size={20} />
                  Voir l'usine
                </Button>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <p className="text-3xl md:text-4xl font-black text-[#FF6B00]">{stat.value}</p>
                  <p className="text-white/50 text-sm uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToConfigurator}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-[#FF6B00] transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* ============================================ */}
      {/* CONFIGURATOR SECTION */}
      {/* ============================================ */}
      <section id="configurator" className="py-24 bg-[#0A0A0A] industrial-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text */}
            <div className="space-y-8">
              <div>
                <span className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest">
                  Configurateur de Prix
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mt-4 leading-tight">
                  VOTRE DEVIS<br />
                  <span className="text-white/40">EN 30 SECONDES</span>
                </h2>
              </div>
              
              <p className="text-white/60 text-lg leading-relaxed">
                Plus vous commandez, plus le prix fond. Notre logique tarifaire est transparente : 
                <span className="text-[#FF6B00] font-semibold"> de 0,35€ à 0,18€</span> l'unité selon le volume.
              </p>

              <div className="space-y-4">
                {[
                  { qty: '5 000', price: '0,35 €' },
                  { qty: '10 000', price: '0,28 €' },
                  { qty: '25 000', price: '0,22 €' },
                  { qty: '50 000', price: '0,18 €' },
                ].map((tier, i) => (
                  <div 
                    key={i} 
                    className="flex justify-between items-center p-4 bg-white/5 border-l-4 border-[#FF6B00]"
                  >
                    <span className="text-white font-medium">{tier.qty} pièces</span>
                    <span className="text-[#FF6B00] font-bold text-xl">{tier.price}</span>
                  </div>
                ))}
              </div>

              <p className="text-white/40 text-sm">
                * Prix indicatif HT pour sacs kraft standard, hors frais d'impression.
              </p>
            </div>

            {/* Right: Configurator Widget */}
            <Configurator />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INDUSTRIAL PROOFS SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest">
              Qualité Industrielle
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
              PRODUCTION<br />
              <span className="text-white/40">CERTIFIÉE</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proofs.map((proof, index) => (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 p-8 hover:border-[#FF6B00]/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-[#FF6B00] flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                  <proof.icon size={28} className="text-black" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{proof.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{proof.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VIDEO MANIFESTO SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Video */}
            <div className="relative aspect-video bg-black border border-white/10">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <Link to="/usine">
                  <button className="w-20 h-20 bg-[#FF6B00] hover:bg-white flex items-center justify-center transition-colors group">
                    <Play size={32} className="text-black ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Manifesto Text */}
            <div className="space-y-8">
              <span className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest">
                Notre Manifeste
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                L'EMBALLAGE<br />
                <span className="text-[#FF6B00]">EST VOTRE</span><br />
                <span className="text-white/40">PREMIER CONTACT</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Chaque sac qui quitte votre comptoir porte votre identité. 
                Un sac générique dit à vos clients que vous êtes générique. 
                <span className="text-white font-semibold"> Nous ne produisons pas de générique.</span>
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="btn-brutal px-8 py-4">
                    Créer mon identité
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GRANDS COMPTES TEASER */}
      {/* ============================================ */}
      <section className="py-24 bg-[#FF6B00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-black/60 font-bold text-sm uppercase tracking-widest">
                Franchises & Chaînes
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-black mt-4 leading-tight">
                +50 POINTS DE VENTE ?<br />
                ON A UN PROGRAMME.
              </h2>
              <p className="text-black/70 text-lg mt-6 leading-relaxed">
                Tarifs négociés, stockage dédié, livraisons échelonnées. 
                Contactez notre équipe Grands Comptes.
              </p>
            </div>
            <Link to="/grands-comptes">
              <Button className="bg-black text-white hover:bg-white hover:text-black px-10 py-6 text-lg font-bold uppercase tracking-wider transition-colors">
                Espace Grands Comptes
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-32 bg-[#0A0A0A] industrial-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B00]/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-8">
            PRÊT À<br />
            <span className="text-[#FF6B00]">MARQUER</span><br />
            <span className="text-white/40">VOS CLIENTS ?</span>
          </h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Demandez votre devis gratuit. Réponse sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-brutal px-12 py-6 text-lg">
                Demander un Devis
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <a href="tel:+33100000000">
              <Button className="btn-brutal-outline px-12 py-6 text-lg">
                Appeler Maintenant
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
