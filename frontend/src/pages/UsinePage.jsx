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
    { num: '06', title: 'Expédition', desc: 'Conditionnement et livraison DDP' },
  ];

  return (
    <main className="bg-[#F9F8EF] min-h-screen pt-20">
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8EF] via-[#6B705C]/40 to-[#6B705C]/30" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <span className="text-[#F9F8EF] font-bold text-sm uppercase tracking-widest">
              Notre Usine
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#F9F8EF] mt-4 leading-[0.9] drop-shadow-lg">
              LA PUISSANCE<br />
              <span className="text-[#F9F8EF]/80">INDUSTRIELLE</span><br />
              AU SERVICE DU BEAU
            </h1>
            
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                }
              }}
              className="mt-8 flex items-center gap-2 text-[#F9F8EF]/80 hover:text-[#F9F8EF] transition-colors"
            >
              <Volume2 size={20} />
              <span className="text-sm uppercase tracking-wider">Activer le son (ASMR industriel)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight">
                PRODUCTION<br />
                <span className="text-[#1A1A1A]/40">EUROPÉENNE</span>
              </h2>
              <p className="text-[#1A1A1A]/70 text-lg mt-6 leading-relaxed">
                Nos partenaires de production sont situés en Turquie et en Europe de l'Est. 
                Des usines modernes, certifiées, avec des standards de qualité européens.
              </p>
              <p className="text-[#1A1A1A]/70 text-lg mt-4 leading-relaxed">
                Capacité de production : <span className="text-[#6B705C] font-bold">10 millions</span> de 
                sacs par mois, avec une flexibilité pour les commandes de 500 à 500 000 pièces.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <div key={i} className="bg-[#CDCEBD] border border-[#6B705C] p-6">
                  <cert.icon size={32} className="text-[#6B705C] mb-4" />
                  <h3 className="text-[#1A1A1A] font-bold mb-2">{cert.title}</h3>
                  <p className="text-[#1A1A1A]/60 text-sm">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logistics Block */}
      <section className="py-16 bg-[#6B705C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Truck size={48} className="text-[#F9F8EF]" />
              <div>
                <h3 className="text-2xl font-bold text-[#F9F8EF]">Logistique Transparente</h3>
                <p className="text-[#F9F8EF]/70">Dédouanement géré, livraison DDP, zéro frais cachés.</p>
              </div>
            </div>
            <div className="flex gap-8">
              {[
                { value: 'DDP', label: 'Livraison incluse' },
                { value: '2-3', label: 'Semaines' },
                { value: '0€', label: 'Frais cachés' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-black text-[#F9F8EF]">{stat.value}</p>
                  <p className="text-[#F9F8EF]/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production Steps */}
      <section className="py-24 bg-[#CDCEBD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Processus
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-4">
              DU DESIGN<br />
              <span className="text-[#1A1A1A]/40">À LA LIVRAISON</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div 
                key={i}
                className="bg-[#F9F8EF] border border-[#6B705C] p-8 card-hover"
              >
                <span className="text-6xl font-black text-[#6B705C]/20">
                  {step.num}
                </span>
                <h3 className="text-[#1A1A1A] font-bold text-xl mt-4 mb-2">{step.title}</h3>
                <p className="text-[#1A1A1A]/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight">
                CONTRÔLE<br />
                <span className="text-[#1A1A1A]/40">QUALITÉ</span>
              </h2>
              <p className="text-[#1A1A1A]/70 text-lg mt-6 leading-relaxed">
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
                  <li key={i} className="flex items-center gap-3 text-[#1A1A1A]">
                    <div className="w-6 h-6 bg-[#6B705C] flex items-center justify-center">
                      <Check size={14} className="text-[#F9F8EF]" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#CDCEBD] border border-[#6B705C] p-8">
              <div className="aspect-video bg-[#F9F8EF] flex items-center justify-center border border-[#6B705C]/30">
                <Factory size={80} className="text-[#6B705C]/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#F9F8EF] mb-6">
            VISITEZ NOTRE USINE
          </h2>
          <p className="text-[#F9F8EF]/70 text-lg mb-8">
            Pour les commandes de plus de 100 000 pièces, nous organisons des visites d'usine.
          </p>
          <Link to="/contact?subject=visite">
            <Button className="btn-primary px-10 py-6 text-lg">
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
