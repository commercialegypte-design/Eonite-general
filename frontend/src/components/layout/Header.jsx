import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Sparkles } from 'lucide-react';
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
    { path: '/usine', label: 'Notre Usine' },
    { path: '/grands-comptes', label: 'Grands Comptes' },
    { path: '/vision', label: 'Vision' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F9F8EF]/95 backdrop-blur-md shadow-sm' 
          : 'bg-[#F9F8EF]'
      } border-b border-[#6B705C]/20`}
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

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-[#1A1A1A] hover:text-[#6B705C] gap-2">
                    <User size={18} />
                    <span className="font-medium">{user?.company_name || 'Mon compte'}</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#F9F8EF] border-[#6B705C]/20">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer hover:text-[#6B705C]">
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/orders" className="cursor-pointer hover:text-[#6B705C]">
                      Mes commandes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#6B705C]/20" />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut size={16} className="mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-[#1A1A1A] hover:text-[#6B705C] font-medium uppercase tracking-wider text-sm">
                  Connexion
                </Button>
              </Link>
            )}
            
            <Link to="/assistant">
              <Button className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
                <Sparkles size={16} />
                Lancer l'Assistant
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
            isMenuOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-[#6B705C]/20">
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
            <div className="border-t border-[#6B705C]/20 mt-4 pt-4 flex flex-col gap-2">
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-[#1A1A1A]">
                    Connexion
                  </Button>
                </Link>
              )}
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full btn-primary">
                  Démarrer mon design
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
