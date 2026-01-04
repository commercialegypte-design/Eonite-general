import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Video, Building2 } from 'lucide-react';
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
    { path: '/catalogue', label: 'Catalogue' },
    { path: '/vision', label: 'Vision' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F9F8EF]/95 backdrop-blur-md shadow-sm' 
          : 'bg-[#F9F8EF]'
      } border-b border-[#6B705C]/10`}
      data-testid="header"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="https://customer-assets.emergentagent.com/job_brutalist-biz/artifacts/1sxp8kqj_logo.png" 
              alt="Eonite" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-[#6B705C] font-semibold'
                    : 'text-[#1A1A1A]/70 hover:text-[#6B705C]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Grands Comptes + Prendre RDV */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/grands-comptes">
              <Button 
                variant="ghost" 
                className={`text-sm uppercase tracking-wider flex items-center gap-2 ${
                  isActive('/grands-comptes')
                    ? 'text-[#6B705C] font-semibold'
                    : 'text-[#1A1A1A]/70 hover:text-[#6B705C]'
                }`}
              >
                <Building2 size={16} />
                Grands Comptes
              </Button>
            </Link>
            
            <Link to="/reservation">
              <Button 
                className="bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] px-6 py-2.5 text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                data-testid="header-cta"
              >
                <Video size={16} />
                Prendre RDV
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#1A1A1A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-[400px] pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-[#6B705C]/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 uppercase tracking-wider text-sm ${
                  isActive(link.path)
                    ? 'text-[#6B705C] font-semibold bg-[#6B705C]/5'
                    : 'text-[#1A1A1A]/70 hover:text-[#6B705C]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-[#6B705C]/10 mt-4 pt-4 flex flex-col gap-2 px-4">
              <Link to="/grands-comptes" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-[#1A1A1A] gap-2">
                  <Building2 size={16} />
                  Grands Comptes
                </Button>
              </Link>
              <Link to="/reservation" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#1A1A1A] hover:bg-black text-[#F9F8EF] font-bold">
                  <Video size={16} className="mr-2" />
                  Prendre RDV
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
