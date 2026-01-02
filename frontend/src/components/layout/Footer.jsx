import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Leaf, Calendar, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { companyInfo } from '../../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D2D24] text-white">
      {/* Pre-footer CTA */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold">Prêt à personnaliser vos sacs ?</h3>
              <p className="text-gray-400 mt-1">Visio design gratuite · Sans engagement</p>
            </div>
            <Link to="/contact?type=visio">
              <Button size="lg" className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white px-8 py-6 rounded-xl flex items-center gap-2">
                <Calendar size={18} />
                Réserver ma visio
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img 
              src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/ws6x9cf4_eonite%20logo.png" 
              alt="Eonite" 
              className="h-10 w-auto mb-6 brightness-0 invert opacity-90"
            />
            <p className="text-gray-400 leading-relaxed mb-6">
              Sacs kraft personnalisés pour restaurateurs, coffee shops et commerces alimentaires.
            </p>
            <div className="flex items-center gap-2 text-[#A8A87A]">
              <Leaf size={18} />
              <span className="text-sm">100% éco-responsable</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Contact', path: '/contact' },
                { label: 'Réserver une visio', path: '/contact?type=visio' },
                { label: 'Demander un devis', path: '/contact?type=devis' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-[#A8A87A] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantees */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Nos garanties</h3>
            <ul className="space-y-3">
              {[
                'Papier kraft certifié FSC',
                'Production européenne',
                'Encres alimentaires',
                'Livraison France entière',
                'Devis gratuit',
                'Paiement sécurisé'
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-400">
                  <Check size={14} className="text-[#A8A87A]" />
                  {item}
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
                  className="flex items-start gap-3 text-gray-400 hover:text-[#A8A87A] transition-colors"
                >
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-start gap-3 text-gray-400 hover:text-[#A8A87A] transition-colors"
                >
                  <Phone size={18} className="mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
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
            <p className="text-gray-500 text-sm">
              © {currentYear} Eonite. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/mentions-legales" className="text-gray-500 hover:text-[#A8A87A] transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-gray-500 hover:text-[#A8A87A] transition-colors">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-gray-500 hover:text-[#A8A87A] transition-colors">
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
