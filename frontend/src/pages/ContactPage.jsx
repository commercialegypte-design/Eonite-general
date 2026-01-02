import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  Building2,
  MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { companyInfo, categories } from '../data/mockData';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const productFromUrl = searchParams.get('product');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: productFromUrl ? 'devis' : '',
    category: '',
    message: productFromUrl ? `Bonjour,\n\nJe souhaite obtenir un devis pour le produit suivant :\n- ${productFromUrl}\n\nMerci de me recontacter.` : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.subject) newErrors.subject = 'Sujet requis';
    if (!formData.message.trim()) newErrors.message = 'Message requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-lg w-full border-0 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Message Envoyé !
            </h2>
            <p className="text-gray-600 mb-8">
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais, 
              généralement sous 24 heures ouvrées.
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '', lastName: '', email: '', phone: '',
                  company: '', subject: '', category: '', message: ''
                });
              }}
              className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white"
            >
              Envoyer un autre message
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6B6B4E] to-[#8B8B6E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Coordonnées</h2>
                <p className="text-gray-600">
                  N'hésitez pas à nous contacter par téléphone ou email. 
                  Nous répondons généralement sous 24h.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#6B6B4E]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a href={`mailto:${companyInfo.email}`} className="text-[#6B6B4E] hover:underline">
                        {companyInfo.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#6B6B4E]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Téléphone</h3>
                      <a href={`tel:${companyInfo.phone}`} className="text-[#6B6B4E] hover:underline">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#6B6B4E]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Adresse</h3>
                      <p className="text-gray-600">{companyInfo.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="text-[#6B6B4E]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Horaires</h3>
                      <p className="text-gray-600">Lun - Ven : 9h - 18h</p>
                      <p className="text-gray-500 text-sm">Sam - Dim : Fermé</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="text-[#6B6B4E]" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Envoyez-nous un message</h2>
                      <p className="text-gray-500">Nous vous répondrons rapidement</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          placeholder="Votre prénom"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          placeholder="Votre nom"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="votre@email.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+33 6 XX XX XX XX"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet *</Label>
                        <Select value={formData.subject} onValueChange={(value) => handleChange('subject', value)}>
                          <SelectTrigger className={errors.subject ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Choisir un sujet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="devis">Demande de devis</SelectItem>
                            <SelectItem value="info">Demande d'information</SelectItem>
                            <SelectItem value="commande">Suivi de commande</SelectItem>
                            <SelectItem value="partenariat">Partenariat</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                      </div>
                    </div>

                    {formData.subject === 'devis' && (
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie de produits</Label>
                        <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        className={errors.message ? 'border-red-500' : ''}
                      />
                      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#6B6B4E] hover:bg-[#5A5A40] text-white py-6 text-lg rounded-xl transition-all"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={20} />
                          Envoyer le message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
