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
  Leaf,
  Package,
  Clock,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Configurator from '../components/home/Configurator';

const HomePage = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const stats = [
    { value: '500+', label: 'Clients B2B' },
    { value: '30 min', label: 'Design validé' },
    { value: '100%', label: 'Production EU' },
    { value: 'DDP', label: 'Livraison incluse' },
  ];

  const proofs = [
    { icon: Factory, title: 'Direct Usine', desc: 'Pas d\'intermédiaire. Prix imbattables.' },
    { icon: Award, title: 'FSC Certifié', desc: 'Papier issu de forêts gérées durablement.' },
    { icon: Shield, title: 'Normes Alimentaires', desc: 'Encres et matériaux 100% conformes.' },
    { icon: Truck, title: 'Livraison DDP', desc: 'Dédouanement géré. Zéro frais cachés.' },
  ];

  const scrollToConfigurator = () => {
    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#F9F8EF]">
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
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/fxbbibta_logo%20Eonite%20base.jpeg"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/85rjobm7_video%20unine%20turquie.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Olive Overlay - 40% opacity as specified */}
        <div className="absolute inset-0 bg-[#6B705C]/40" />
        
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#F9F8EF]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#F9F8EF] leading-[0.9] mb-8 drop-shadow-lg">
              Le neutre est<br />
              <span className="text-[#F9F8EF]">une insulte</span><br />
              à votre cuisine.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-[#F9F8EF]/90 max-w-2xl mb-12 leading-relaxed drop-shadow">
              Obtenez vos emballages personnalisés au prix du neutre. 
              <span className="font-semibold"> Direct usine. Design validé en 30 min.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button 
                onClick={scrollToConfigurator}
                className="btn-primary px-10 py-6 text-lg"
              >
                Démarrer mon design
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Link to="/usine">
                <Button className="btn-outline bg-transparent text-[#F9F8EF] border-[#F9F8EF] hover:bg-[#F9F8EF] hover:text-[#6B705C] px-10 py-6 text-lg">
                  <Play className="mr-2" size={20} />
                  Voir l'usine
                </Button>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#F9F8EF]/30">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <p className="text-3xl md:text-4xl font-black text-[#F9F8EF]">{stat.value}</p>
                  <p className="text-[#F9F8EF]/70 text-sm uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToConfigurator}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F9F8EF]/70 hover:text-[#F9F8EF] transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* ============================================ */}
      {/* CONFIGURATOR SECTION */}
      {/* ============================================ */}
      <section id="configurator" className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text */}
            <div className="space-y-8">
              <div>
                <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
                  Prix Transparent
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4 leading-tight">
                  VOTRE DEVIS<br />
                  <span className="text-[#1A1A1A]/40">EN TEMPS RÉEL</span>
                </h2>
              </div>
              
              <p className="text-[#1A1A1A]/70 text-lg leading-relaxed">
                Plus vous commandez, plus le prix fond. Notre logique tarifaire est 100% transparente. 
                Pas de surprise, pas de frais cachés.
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
                    className="flex justify-between items-center p-4 bg-[#CDCEBD] border-l-4 border-[#6B705C]"
                  >
                    <span className="text-[#1A1A1A] font-medium">{tier.qty} pièces</span>
                    <span className="text-[#6B705C] font-bold text-xl">{tier.price}</span>
                  </div>
                ))}
              </div>

              <p className="text-[#1A1A1A]/50 text-sm">
                * Prix indicatif HT pour sacs kraft standard.
              </p>
            </div>

            {/* Right: Configurator Widget */}
            <Configurator />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRANSITION SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-[#CDCEBD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Qualité Industrielle
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4">
              LA PUISSANCE<br />
              <span className="text-[#1A1A1A]/40">INDUSTRIELLE</span><br />
              AU SERVICE DU BEAU
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proofs.map((proof, index) => (
              <div 
                key={index}
                className="bg-[#F9F8EF] border border-[#6B705C] p-8 card-hover"
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
      {/* HOW IT WORKS SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Simple & Rapide
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4">
              COMMENT<br />
              <span className="text-[#1A1A1A]/40">ÇA MARCHE ?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', icon: Clock, title: 'Configurez', desc: 'Choisissez votre produit, format et quantité. Prix calculé en temps réel.' },
              { num: '02', icon: Play, title: 'Designez en visio', desc: 'On crée ensemble votre design en 30 minutes. Vous validez en direct.' },
              { num: '03', icon: Truck, title: 'Recevez', desc: 'Production en 2-3 semaines. Livraison DDP, dédouanement inclus.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-px bg-[#6B705C]/20" />
                )}
                <div className="bg-[#CDCEBD] p-8">
                  <span className="text-6xl font-black text-[#6B705C]/20">{step.num}</span>
                  <div className="w-12 h-12 bg-[#6B705C] flex items-center justify-center mt-4 mb-4">
                    <step.icon size={24} className="text-[#F9F8EF]" />
                  </div>
                  <h3 className="text-[#1A1A1A] font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-[#1A1A1A]/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VIDEO MANIFESTO SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-[#6B705C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Video */}
            <div className="relative aspect-video border border-[#F9F8EF]/20">
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
                  <button className="w-20 h-20 bg-[#F9F8EF] hover:bg-[#CDCEBD] flex items-center justify-center transition-colors">
                    <Play size={32} className="text-[#6B705C] ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Manifesto Text */}
            <div className="space-y-8">
              <span className="text-[#F9F8EF]/70 font-bold text-sm uppercase tracking-widest">
                Notre Manifeste
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#F9F8EF] leading-tight">
                L'EMBALLAGE<br />
                <span className="text-[#F9F8EF]/60">EST VOTRE</span><br />
                PREMIER CONTACT
              </h2>
              <p className="text-[#F9F8EF]/80 text-lg leading-relaxed">
                Chaque sac qui quitte votre comptoir porte votre identité. 
                Un sac générique dit à vos clients que vous êtes générique. 
                <span className="text-[#F9F8EF] font-semibold"> Nous ne produisons pas de générique.</span>
              </p>
              <ul className="space-y-3">
                {['Design personnalisé inclus', 'Production européenne certifiée', 'Livraison DDP sans surprise'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#F9F8EF]">
                    <Check size={20} className="text-[#CDCEBD]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="bg-[#F9F8EF] text-[#6B705C] hover:bg-[#CDCEBD] px-8 py-4 font-semibold uppercase tracking-wider">
                  Démarrer mon design
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GRANDS COMPTES TEASER */}
      {/* ============================================ */}
      <section className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <span className="text-[#CDCEBD] font-bold text-sm uppercase tracking-widest">
                  Franchises & Chaînes
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#F9F8EF] mt-4 leading-tight">
                  +50 POINTS DE VENTE ?<br />
                  <span className="text-[#F9F8EF]/50">ON A UN PROGRAMME.</span>
                </h2>
                <p className="text-[#F9F8EF]/70 text-lg mt-6 leading-relaxed">
                  Tarifs négociés, stockage dédié, livraisons échelonnées. 
                  Contactez notre équipe Grands Comptes.
                </p>
              </div>
              <Link to="/grands-comptes">
                <Button className="bg-[#6B705C] text-[#F9F8EF] hover:bg-[#5A5F4D] px-10 py-6 text-lg font-bold uppercase tracking-wider">
                  Espace Grands Comptes
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
      <section className="py-32 bg-[#CDCEBD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[0.9] mb-8">
            PRÊT À<br />
            <span className="text-[#6B705C]">MARQUER</span><br />
            VOS CLIENTS ?
          </h2>
          <p className="text-[#1A1A1A]/70 text-xl mb-12 max-w-2xl mx-auto">
            Demandez votre devis gratuit. Design validé en 30 minutes. Réponse sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-primary px-12 py-6 text-lg">
                Démarrer mon design
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <a href="tel:+33100000000">
              <Button className="btn-outline px-12 py-6 text-lg">
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
