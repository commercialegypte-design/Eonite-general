import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Factory, Award, Shield, Truck, Check, ArrowRight, Volume2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const UsinePage = () => {
  const videoRef = useRef(null);

  const certifications = [
    { icon: Award, title: 'FSC Certifié', desc: 'Papier issu de forêts gérées durablement' },
    { icon: Shield, title: 'ISO 9001', desc: 'Système de management qualité certifié' },
    { icon: Factory, title: 'ISO 14001', desc: 'Management environnemental' },
    { icon: Check, title: 'Contact Alimentaire', desc: 'Encres et matériaux conformes' },
  ];

  const steps = [
    { num: '01', title: 'Conception', desc: 'Validation du design avec votre équipe' },
    { num: '02', title: 'Prépresse', desc: 'Préparation des fichiers d\'impression' },
    { num: '03', title: 'Impression', desc: 'Impression offset ou flexographie' },
    { num: '04', title: 'Découpe', desc: 'Découpe et façonnage automatique' },
    { num: '05', title: 'Contrôle', desc: 'Contrôle qualité sur échantillons' },
    { num: '06', title: 'Expédition', desc: 'Conditionnement et livraison' },
  ];

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-20">
      {/* Hero Video */}
      <section className="relative h-[80vh] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/85rjobm7_video%20unine%20turquie.mp4" 
            type="video/mp4" 
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-black/30" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <span className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest">
              Notre Usine
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mt-4 leading-[0.9]">
              LÀ OÙ TOUT<br />
              <span className="text-[#FF6B00]">
                SE FABRIQUE
              </span>
            </h1>
            
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                }
              }}
              className="mt-8 flex items-center gap-2 text-white/60 hover:text-[#FF6B00] transition-colors"
            >
              <Volume2 size={20} />
              <span className="text-sm uppercase tracking-wider">Activer le son</span>
            </button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                PRODUCTION<br />
                <span className="text-white/40">EUROPÉENNE</span>
              </h2>
              <p className="text-white/60 text-lg mt-6 leading-relaxed">
                Nos partenaires de production sont situés en Turquie et en Europe de l'Est. 
                Des usines modernes, certifiées, avec des standards de qualité européens.
              </p>
              <p className="text-white/60 text-lg mt-4 leading-relaxed">
                Capacité de production : <span className="text-[#FF6B00] font-bold">10 millions</span> de 
                sacs par mois, avec une flexibilité pour les commandes de 500 à 500 000 pièces.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6">
                  <cert.icon size={32} className="text-[#FF6B00] mb-4" />
                  <h3 className="text-white font-bold mb-2">{cert.title}</h3>
                  <p className="text-white/50 text-sm">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production Steps */}
      <section className="py-24 bg-[#0A0A0A] industrial-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest">
              Processus
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
              DU DESIGN<br />
              <span className="text-white/40">À LA LIVRAISON</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div 
                key={i}
                className="bg-black border border-white/10 p-8 hover:border-[#FF6B00]/50 transition-colors group"
              >
                <span className="text-6xl font-black text-white/10 group-hover:text-[#FF6B00]/20 transition-colors">
                  {step.num}
                </span>
                <h3 className="text-white font-bold text-xl mt-4 mb-2">{step.title}</h3>
                <p className="text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-24 bg-[#FF6B00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-black leading-tight">
                CONTRÔLE<br />
                QUALITÉ
              </h2>
              <p className="text-black/70 text-lg mt-6 leading-relaxed">
                Chaque lot est contrôlé avant expédition. Nous vérifions l'impression, 
                les dimensions, la résistance et la conformité aux normes alimentaires.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Contrôle colorimétrique',
                  'Test de résistance à la déchirure',
                  'Vérification des dimensions',
                  'Certificat de conformité alimentaire'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-black">
                    <Check size={20} className="text-black" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black p-8">
              <div className="aspect-video bg-white/10 flex items-center justify-center">
                <Factory size={80} className="text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            VISITEZ NOTRE USINE
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Pour les commandes de plus de 100 000 pièces, nous organisons des visites d'usine.
          </p>
          <Link to="/contact?subject=visite">
            <Button className="btn-brutal px-10 py-6 text-lg">
              Demander une visite
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default UsinePage;
