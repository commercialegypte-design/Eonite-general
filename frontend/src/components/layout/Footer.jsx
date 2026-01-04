import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6B705C] text-[#F9F8EF]">
      {/* Industrial Strip */}
      <div className="bg-[#5A5F4D] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-3 flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[#F9F8EF]/80 font-medium text-sm uppercase tracking-widest mx-8">
              CONCEPTION OFFERTE • VALIDATION 30 MIN • TRANSPORT AU PRIX COÛTANT • STOCKAGE FRANCE •
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Colonne 1 - Marque */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_brutalist-biz/artifacts/1sxp8kqj_logo.png" 
                alt="Eonite" 
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-[#F9F8EF]/70 leading-relaxed">
              Emballage personnalisé au prix du neutre.<br />
              Direct usine, zéro intermédiaire.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F9F8EF] mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Catalogue', path: '/catalogue' },
                { label: 'Vision', path: '/vision' },
                { label: 'Grands Comptes', path: '/grands-comptes' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-[#F9F8EF]/70 hover:text-[#F9F8EF] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 2bis - Produits */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F9F8EF] mb-6">Produits</h3>
            <ul className="space-y-3">
              {[
                'Sacs kraft',
                'Sacs SOS',
                'Boîtes pizza',
                'Gobelets',
                'Bols kraft'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to="/catalogue"
                    className="text-[#F9F8EF]/70 hover:text-[#F9F8EF] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F9F8EF] mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+33972214885"
                  className="flex items-start gap-3 text-[#F9F8EF]/70 hover:text-[#F9F8EF] transition-colors"
                >
                  <Phone size={18} className="mt-0.5 flex-shrink-0" />
                  <span>09 72 21 48 85</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:client@eonite.fr"
                  className="flex items-start gap-3 text-[#F9F8EF]/70 hover:text-[#F9F8EF] transition-colors"
                >
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <span>client@eonite.fr</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.eonite.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#F9F8EF]/70 hover:text-[#F9F8EF] transition-colors"
                >
                  <Globe size={18} className="mt-0.5 flex-shrink-0" />
                  <span>www.eonite.fr</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#F9F8EF]/70">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>200 Rue de la Croix Nivert<br />75015 Paris</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F9F8EF]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F9F8EF]/50 text-sm">
              © {currentYear} EONITE. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/mentions-legales" className="text-[#F9F8EF]/50 hover:text-[#F9F8EF] transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-[#F9F8EF]/50 hover:text-[#F9F8EF] transition-colors">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-[#F9F8EF]/50 hover:text-[#F9F8EF] transition-colors">
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
