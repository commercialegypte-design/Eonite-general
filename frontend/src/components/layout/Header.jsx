import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Bar - Urgency/Value prop */}
      <div className="bg-[#6B6B4E] text-white py-2.5 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-2">
          <Calendar size={14} />
          <span className="font-medium">Design de votre sac en 30 min · À partir de 0,10€/pièce</span>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/ws6x9cf4_eonite%20logo.png" 
                alt="Eonite - Sacs Kraft Personnalisés" 
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-[#6B6B4E]'
                      : 'text-gray-600 hover:text-[#6B6B4E]'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#6B6B4E] rounded-full" />
                  )}
                </Link>
              ))}
              
              <a href="tel:+33100000000" className="flex items-center gap-2 text-gray-600 hover:text-[#6B6B4E] transition-colors">
                <Phone size={16} />
                <span className="font-medium">+33 (0)1 XX XX XX XX</span>
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/contact?type=visio">
                <Button className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white px-6 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center gap-2">
                  <Calendar size={16} />
                  Réserver ma visio
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col gap-2 pt-4 border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#6B6B4E]/10 text-[#6B6B4E]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a 
                href="tel:+33100000000" 
                className="px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <Phone size={16} />
                +33 (0)1 XX XX XX XX
              </a>
              <Link to="/contact?type=visio" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full mt-2 bg-[#6B6B4E] hover:bg-[#5A5A40] text-white flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  Réserver ma visio
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
