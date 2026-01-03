import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Video, ShoppingBag, UtensilsCrossed, Cake, Coffee } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

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
  ];

  // Solutions Métiers submenu
  const solutionsMetiers = [
    { path: '/catalogue?category=retail', label: 'Retail', icon: ShoppingBag, desc: 'Sacs kraft personnalisés' },
    { path: '/catalogue?category=pizza', label: 'Pizza', icon: UtensilsCrossed, desc: 'Boîtes kraft & carton' },
    { path: '/catalogue?category=patisserie', label: 'Pâtisserie', icon: Cake, desc: 'Boîtes & emballages' },
    { path: '/catalogue?category=alimentation', label: 'Alimentation', icon: Coffee, desc: 'Bols & gobelets' },
  ];

  const otherLinks = [
    { path: '/vision', label: 'Vision' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-white'
      } border-b border-[#1A1A1A]/10`}
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
                    ? 'text-[#22C55E] font-semibold'
                    : 'text-[#1A1A1A]/70 hover:text-[#22C55E]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Solutions Métiers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#22C55E] transition-colors flex items-center gap-1">
                  Solutions Métiers
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white border-[#1A1A1A]/10 w-64 p-2">
                {solutionsMetiers.map((solution) => (
                  <DropdownMenuItem key={solution.path} asChild>
                    <Link 
                      to={solution.path} 
                      className="flex items-start gap-3 p-3 cursor-pointer hover:bg-[#22C55E]/5 rounded-md"
                    >
                      <div className="w-10 h-10 bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0 rounded">
                        <solution.icon size={20} className="text-[#22C55E]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">{solution.label}</p>
                        <p className="text-xs text-[#1A1A1A]/60">{solution.desc}</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {otherLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-[#22C55E] font-semibold'
                    : 'text-[#1A1A1A]/70 hover:text-[#22C55E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-[#1A1A1A] hover:text-[#22C55E] gap-2">
                    <User size={18} />
                    <span className="font-medium">{user?.company_name || 'Mon compte'}</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border-[#1A1A1A]/10">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer hover:text-[#22C55E]">
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/orders" className="cursor-pointer hover:text-[#22C55E]">
                      Mes commandes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#1A1A1A]/10" />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut size={16} className="mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-[#1A1A1A] hover:text-[#22C55E] font-medium uppercase tracking-wider text-sm">
                  Connexion
                </Button>
              </Link>
            )}
            
            <Link to="/reservation">
              <Button 
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider flex items-center gap-2"
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
            isMenuOpen ? 'max-h-[600px] pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-[#1A1A1A]/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 uppercase tracking-wider text-sm ${
                  isActive(link.path)
                    ? 'text-[#22C55E] font-semibold bg-[#22C55E]/5'
                    : 'text-[#1A1A1A]/70 hover:text-[#22C55E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Solutions Métiers Mobile */}
            <div className="px-4 py-2">
              <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Solutions Métiers</p>
              {solutionsMetiers.map((solution) => (
                <Link
                  key={solution.path}
                  to={solution.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-[#1A1A1A]/70 hover:text-[#22C55E]"
                >
                  <solution.icon size={18} className="text-[#22C55E]" />
                  <span>{solution.label}</span>
                </Link>
              ))}
            </div>

            {otherLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 uppercase tracking-wider text-sm ${
                  isActive(link.path)
                    ? 'text-[#22C55E] font-semibold bg-[#22C55E]/5'
                    : 'text-[#1A1A1A]/70 hover:text-[#22C55E]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-[#1A1A1A]/10 mt-4 pt-4 flex flex-col gap-2 px-4">
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-[#1A1A1A]">
                    Connexion
                  </Button>
                </Link>
              )}
              <Link to="/reservation" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold">
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
