import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-black tracking-tighter text-white">
                EONITE
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed mb-6">
              Emballages industriels personnalisés pour la restauration et le retail.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#FF6B00] flex items-center justify-center transition-colors">
                <Linkedin size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#FF6B00] flex items-center justify-center transition-colors">
                <Instagram size={18} className="text-white" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Catalogue', path: '/catalogue' },
                { label: 'Notre Usine', path: '/usine' },
                { label: 'Grands Comptes', path: '/grands-comptes' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/60 hover:text-[#FF6B00] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#FF6B00]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Produits</h3>
            <ul className="space-y-3">
              {[
                'Sacs Kraft',
                'Boîtes Carton',
                'Emballages Luxe',
                'Gobelets',
                'Expédition'
              ].map((product) => (
                <li key={product}>
                  <Link 
                    to="/catalogue"
                    className="text-white/60 hover:text-[#FF6B00] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#FF6B00]" />
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:contact@eonite.fr"
                  className="flex items-start gap-3 text-white/60 hover:text-[#FF6B00] transition-colors"
                >
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <span>contact@eonite.fr</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33100000000"
                  className="flex items-start gap-3 text-white/60 hover:text-[#FF6B00] transition-colors"
                >
                  <Phone size={18} className="mt-0.5 flex-shrink-0" />
                  <span>+33 (0)1 XX XX XX XX</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>France / Europe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Industrial Strip */}
      <div className="bg-[#FF6B00] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-3 flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black font-bold text-sm uppercase tracking-widest mx-8">
              PRODUCTION EUROPE • FSC CERTIFIÉ • ISO 9001 • LIVRAISON 2-3 SEMAINES •
            </span>
          ))}
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
              <Link to="/mentions-legales" className="text-white/40 hover:text-[#FF6B00] transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-white/40 hover:text-[#FF6B00] transition-colors">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-white/40 hover:text-[#FF6B00] transition-colors">
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
