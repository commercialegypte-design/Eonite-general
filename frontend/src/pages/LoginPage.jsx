import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  // Register form
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    company_name: '',
    contact_name: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await register(registerData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="text-3xl font-black tracking-tighter text-white">EONITE</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Espace Client</h1>
          <p className="text-white/60 mt-2">Connectez-vous pour gérer vos commandes</p>
        </div>

        <div className="bg-black border border-white/10 p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-8 bg-white/5">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-black">
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-black">
                Inscription
              </TabsTrigger>
            </TabsList>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 mb-6 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label className="text-white/80 mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white"
                      placeholder="vous@entreprise.fr"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80 mb-2 block">Mot de passe</Label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="h-12 pl-12 pr-12 bg-white/5 border-white/10 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full btn-brutal py-6">
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <Label className="text-white/80 mb-2 block">Nom de l'entreprise *</Label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <Input
                      value={registerData.company_name}
                      onChange={(e) => setRegisterData({ ...registerData, company_name: e.target.value })}
                      required
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white"
                      placeholder="Restaurant Le Gourmet"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80 mb-2 block">Votre nom</Label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <Input
                      value={registerData.contact_name}
                      onChange={(e) => setRegisterData({ ...registerData, contact_name: e.target.value })}
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80 mb-2 block">Email *</Label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <Input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80 mb-2 block">Mot de passe *</Label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      minLength={6}
                      className="h-12 pl-12 pr-12 bg-white/5 border-white/10 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full btn-brutal py-6">
                  {isLoading ? 'Inscription...' : 'Créer mon compte'}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          En vous inscrivant, vous acceptez nos{' '}
          <Link to="/cgv" className="text-[#FF6B00] hover:underline">CGV</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
