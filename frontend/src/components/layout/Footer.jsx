import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Leaf, ArrowRight } from 'lucide-react';
import { companyInfo } from '../../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D2D24] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img 
              src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/ws6x9cf4_eonite%20logo.png" 
              alt="Eonite" 
              className="h-12 w-auto mb-6 brightness-0 invert opacity-90"
            />
            <p className="text-gray-300 leading-relaxed mb-6">
              Votre partenaire de confiance pour des emballages alimentaires professionnels de qualité.
            </p>
            <div className="flex items-center gap-2 text-[#A8A87A]">
              <Leaf size={18} />
              <span className="text-sm">Engagé pour l'environnement</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Catalogue', path: '/catalogue' },
                { label: 'À Propos', path: '/a-propos' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-[#A8A87A] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Nos Produits</h3>
            <ul className="space-y-3">
              {[
                'Sacs Poignées',
                'Sacs SOS Kraft',
                'Boîtes Food',
                'Gobelets',
                'Bols Kraft',
                'Expédition'
              ].map((product) => (
                <li key={product}>
                  <Link 
                    to="/catalogue"
                    className="text-gray-300 hover:text-[#A8A87A] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-3 text-gray-300 hover:text-[#A8A87A] transition-colors"
                >
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-start gap-3 text-gray-300 hover:text-[#A8A87A] transition-colors"
                >
                  <Phone size={18} className="mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>{companyInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Eonite. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/mentions-legales" className="text-gray-400 hover:text-[#A8A87A] transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-gray-400 hover:text-[#A8A87A] transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/cgv" className="text-gray-400 hover:text-[#A8A87A] transition-colors">
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
