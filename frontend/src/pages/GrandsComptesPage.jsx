import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Truck, Shield, Check, ArrowRight, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { quotes } from '../lib/api';

const GrandsComptesPage = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    locations: '',
    annual_consumption: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    { icon: Users, title: 'Interlocuteur Dédié', desc: 'Un account manager pour gérer tous vos sites' },
    { icon: Truck, title: 'Livraisons Échelonnées', desc: 'Planification mensuelle sur vos différents points de vente' },
    { icon: Shield, title: 'Stockage Tampon', desc: 'Nous stockons votre inventaire pour des livraisons rapides' },
    { icon: Building2, title: 'Tarifs Négociés', desc: 'Remises progressives sur le volume annuel global' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await quotes.create({
        ...formData,
        is_franchise: true,
        franchise_locations: parseInt(formData.locations) || 0,
        annual_consumption: parseInt(formData.annual_consumption) || 0,
        product_type: 'grands_comptes',
        size: 'custom',
        quantity: parseInt(formData.annual_consumption) || 0,
        print_type: '1_color',
        estimated_price: 0
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <main className="bg-[#F9F8EF] min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-[#6B705C] flex items-center justify-center mx-auto mb-8">
            <Check size={40} className="text-[#F9F8EF]" />
          </div>
          <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">DEMANDE ENVOYÉE</h2>
          <p className="text-[#1A1A1A]/70 mb-8">
            Notre équipe Grands Comptes vous contactera sous 24h pour étudier votre projet.
          </p>
          <Link to="/">
            <Button className="btn-primary">Retour à l'accueil</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F9F8EF] min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#6B705C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F9F8EF]/70 font-bold text-sm uppercase tracking-widest">
            Programme Entreprise
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-[#F9F8EF] mt-4 leading-[0.9]">
            GRANDS<br />COMPTES
          </h1>
          <p className="text-[#F9F8EF]/80 text-xl mt-6 max-w-2xl">
            Franchises, chaînes de restauration, groupes hôteliers. 
            Un programme adapté à vos volumes et votre organisation multi-sites.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#F9F8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-[#CDCEBD] border border-[#6B705C] p-8 card-hover">
                <benefit.icon size={32} className="text-[#6B705C] mb-6" />
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-[#1A1A1A]/60">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-[#CDCEBD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
              Contact Grands Comptes
            </span>
            <h2 className="text-4xl font-black text-[#1A1A1A] mt-4">
              PARLONS DE<br />
              <span className="text-[#1A1A1A]/40">VOTRE PROJET</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#F9F8EF] border border-[#6B705C] p-8 md:p-12 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 p-4 text-red-700">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Nom de l'enseigne *</Label>
                <Input
                  value={formData.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  required
                  className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                  placeholder="McDonald's, Paul, Starbucks..."
                />
              </div>
              <div>
                <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Votre nom *</Label>
                <Input
                  value={formData.contact_name}
                  onChange={(e) => handleChange('contact_name', e.target.value)}
                  required
                  className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Email professionnel *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                />
              </div>
              <div>
                <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Téléphone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Nombre de points de vente *</Label>
                <Input
                  type="number"
                  value={formData.locations}
                  onChange={(e) => handleChange('locations', e.target.value)}
                  required
                  className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                  placeholder="Ex: 50"
                />
              </div>
              <div>
                <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Volume annuel estimé (sacs)</Label>
                <Input
                  type="number"
                  value={formData.annual_consumption}
                  onChange={(e) => handleChange('annual_consumption', e.target.value)}
                  className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                  placeholder="Ex: 500000"
                />
              </div>
            </div>

            <div>
              <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Votre projet</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="bg-transparent border-[#6B705C]/30 focus:border-[#6B705C] min-h-[120px]"
                placeholder="Décrivez vos besoins, vos formats habituels, votre organisation logistique..."
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-6 text-lg"
            >
              {isSubmitting ? 'Envoi en cours...' : (
                <>
                  <Send className="mr-2" size={20} />
                  Envoyer ma demande
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default GrandsComptesPage;
