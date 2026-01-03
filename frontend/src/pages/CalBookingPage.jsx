import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const CalBookingPage = () => {
  const [searchParams] = useSearchParams();
  const designId = searchParams.get('design_id');
  const businessName = searchParams.get('business') || '';
  const calInitialized = React.useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (calInitialized.current) return;
    calInitialized.current = true;

    // Check if Cal is already loaded
    if (window.Cal) {
      initializeCal();
      return;
    }

    // Load Cal.com script
    const existingScript = document.querySelector('script[src*="cal.com/embed"]');
    if (existingScript) {
      initializeCal();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initializeCal();
    };

    function initializeCal() {
      if (!window.Cal) return;
      
      try {
        window.Cal('init', '30min', { origin: 'https://app.cal.com' });
        
        window.Cal.ns['30min']('inline', {
          elementOrSelector: '#cal-inline-30min',
          config: { layout: 'month_view' },
          calLink: 'eonite/30min',
        });

        window.Cal.ns['30min']('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
          styles: {
            branding: { brandColor: '#6B705C' }
          }
        });
      } catch (e) {
        console.log('Cal.com initialization:', e.message);
      }
    }
  }, []);

  const benefits = [
    { icon: Clock, text: '30 minutes chrono' },
    { icon: Video, text: 'Visio en ligne (Google Meet)' },
    { icon: CheckCircle2, text: 'BAT industriel validé ensemble' },
  ];

  return (
    <main className="min-h-screen bg-[#F9F8EF]">
      {/* Header */}
      <section className="bg-[#6B705C] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/assistant" className="inline-flex items-center text-[#F9F8EF]/70 hover:text-[#F9F8EF] mb-6 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Retour à EON
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center">
              <Calendar size={28} className="text-[#F9F8EF]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#F9F8EF]">
                Réserver une session design
              </h1>
              {businessName && (
                <p className="text-[#CDCEBD] mt-1">
                  Pour <span className="font-semibold">{businessName}</span>
                </p>
              )}
            </div>
          </div>
          <p className="text-[#F9F8EF]/80 text-lg max-w-2xl">
            Choisissez le créneau qui vous convient. En 30 minutes, un expert packaging validera votre concept et créera votre BAT industriel.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#1A1A1A] py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-[#F9F8EF]">
                <benefit.icon size={20} className="text-[#CDCEBD]" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cal.com Widget Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cal.com Container */}
          <div className="bg-white border-2 border-[#6B705C] overflow-hidden">
            <div className="bg-[#CDCEBD] px-6 py-4 border-b-2 border-[#6B705C]">
              <h2 className="text-[#1A1A1A] font-bold text-lg">
                Sélectionnez votre créneau
              </h2>
              <p className="text-[#1A1A1A]/60 text-sm">
                Fuseau horaire : Europe/Paris
              </p>
            </div>
            
            {/* Cal.com Inline Widget */}
            <div 
              id="cal-inline-30min" 
              style={{ 
                width: '100%', 
                minHeight: '600px',
                overflow: 'auto'
              }}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-[#CDCEBD] border-2 border-[#6B705C] p-6">
            <h3 className="text-[#1A1A1A] font-bold text-lg mb-4">
              Ce qui se passe pendant la session :
            </h3>
            <ul className="space-y-3">
              {[
                'Analyse de votre concept généré par EON',
                'Ajustements techniques (grammage, finitions, couleurs)',
                'Création du BAT (Bon À Tirer) industriel',
                'Devis définitif et planning de production'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#1A1A1A]">
                  <CheckCircle2 size={20} className="text-[#6B705C] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternative CTA */}
          <div className="mt-8 text-center">
            <p className="text-[#1A1A1A]/60 mb-4">
              Pas disponible sur ces créneaux ?
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-[#6B705C] text-[#6B705C] hover:bg-[#6B705C] hover:text-[#F9F8EF]">
                Nous contacter directement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#F9F8EF]/60 text-sm uppercase tracking-widest mb-4">
            Notre engagement
          </p>
          <p className="text-[#F9F8EF] text-xl font-medium max-w-2xl mx-auto">
            "Notre objectif est de décider du <span className="text-[#CDCEBD] font-bold">BON produit</span> pour votre client avant même de passer commande."
          </p>
        </div>
      </section>
    </main>
  );
};

export default CalBookingPage;
