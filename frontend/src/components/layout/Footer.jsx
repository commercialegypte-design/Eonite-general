import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Industrial Strip */}
      <div className="bg-[#22C55E] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-3 flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-bold text-sm uppercase tracking-widest mx-8">
              CONCEPTION OFFERTE • VALIDATION 30 MIN • TRANSPORT AU PRIX COÛTANT • STOCKAGE FRANCE •
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_brutalist-biz/artifacts/1sxp8kqj_logo.png" 
                alt="Eonite" 
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 leading-relaxed mb-6">
              Emballage personnalisé au prix du neutre. Direct usine, zéro intermédiaire.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/20 hover:bg-[#22C55E] hover:border-[#22C55E] flex items-center justify-center transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 hover:bg-[#22C55E] hover:border-[#22C55E] flex items-center justify-center transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#22C55E] mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Catalogue', path: '/catalogue' },
                { label: 'Vision', path: '/vision' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#22C55E]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Métiers */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#22C55E] mb-6">Solutions Métiers</h3>
            <ul className="space-y-3">
              {[
                { label: 'Retail', path: '/catalogue?category=retail' },
                { label: 'Pizza', path: '/catalogue?category=pizza' },
                { label: 'Pâtisserie', path: '/catalogue?category=patisserie' },
                { label: 'Alimentation', path: '/catalogue?category=alimentation' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.path}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#22C55E]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#22C55E] mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:contact@eonite.fr"
                  className="flex items-start gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Mail size={18} className="mt-0.5 flex-shrink-0 text-[#22C55E]" />
                  <span>contact@eonite.fr</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33100000000"
                  className="flex items-start gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={18} className="mt-0.5 flex-shrink-0 text-[#22C55E]" />
                  <span>+33 (0)1 XX XX XX XX</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#22C55E]" />
                <span>Stockage France<br />Production Europe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} EONITE. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/mentions-legales" className="text-white/40 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-white/40 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-white/40 hover:text-white transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
