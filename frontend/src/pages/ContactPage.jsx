import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  Calendar,
  FileText,
  MessageSquare,
  Check,
  Video
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
import { companyInfo } from '../data/mockData';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    requestType: typeFromUrl || 'visio',
    quantity: '',
    format: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeFromUrl) {
      setFormData(prev => ({ ...prev, requestType: typeFromUrl }));
    }
  }, [typeFromUrl]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.company.trim()) newErrors.company = 'Nom de l\'établissement requis';
    
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
      <main className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4">
        <Card className="max-w-lg w-full border-0 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {formData.requestType === 'visio' ? 'Demande de visio envoyée !' : 'Demande de devis envoyée !'}
            </h2>
            <p className="text-gray-600 mb-8">
              {formData.requestType === 'visio' 
                ? 'Nous vous recontactons sous 24h pour fixer un créneau de visio design.'
                : 'Nous préparons votre devis personnalisé. Réponse sous 24h ouvrées.'
              }
            </p>
            <div className="bg-[#F8F7F4] rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Prochaines étapes :</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-600 mt-0.5" />
                  <span>Vérifiez votre boîte mail (et vos spams)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-600 mt-0.5" />
                  <span>On vous contacte sous 24h</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-600 mt-0.5" />
                  <span>Préparez votre logo si vous en avez un</span>
                </li>
              </ul>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '', lastName: '', email: '', phone: '',
                  company: '', requestType: 'visio', quantity: '', format: '', message: ''
                });
              }}
              className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white"
            >
              Nouvelle demande
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6B6B4E] via-[#7A7A5E] to-[#8B8B6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {typeFromUrl === 'visio' ? 'Réserver ma visio design' : 'Contactez-nous'}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {typeFromUrl === 'visio' 
              ? 'En 30 minutes, on crée ensemble le design de votre sac personnalisé.'
              : 'Une question ? Un projet ? On vous répond sous 24h.'
            }
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#6B6B4E] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Remplissez le formulaire</h3>
                      <p className="text-gray-600 text-sm">30 secondes suffisent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#6B6B4E] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">On vous recontacte</h3>
                      <p className="text-gray-600 text-sm">Sous 24h max</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#6B6B4E] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">On design en visio</h3>
                      <p className="text-gray-600 text-sm">30 min et c'est bouclé</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900">Ou contactez-nous directement</h3>
                
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center">
                      <Mail className="text-[#6B6B4E]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${companyInfo.email}`} className="font-medium text-gray-900 hover:text-[#6B6B4E]">
                        {companyInfo.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center">
                      <Phone className="text-[#6B6B4E]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <a href={`tel:${companyInfo.phone}`} className="font-medium text-gray-900 hover:text-[#6B6B4E]">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center">
                      <Clock className="text-[#6B6B4E]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horaires</p>
                      <p className="font-medium text-gray-900">Lun - Ven : 9h - 18h</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 md:p-10">
                  {/* Request Type Selector */}
                  <div className="flex gap-4 mb-8">
                    <button
                      type="button"
                      onClick={() => handleChange('requestType', 'visio')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        formData.requestType === 'visio'
                          ? 'border-[#6B6B4E] bg-[#6B6B4E]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Video className={`mx-auto mb-2 ${formData.requestType === 'visio' ? 'text-[#6B6B4E]' : 'text-gray-400'}`} size={28} />
                      <p className={`font-semibold ${formData.requestType === 'visio' ? 'text-[#6B6B4E]' : 'text-gray-600'}`}>
                        Visio Design
                      </p>
                      <p className="text-xs text-gray-500 mt-1">On crée ensemble</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('requestType', 'devis')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        formData.requestType === 'devis'
                          ? 'border-[#6B6B4E] bg-[#6B6B4E]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FileText className={`mx-auto mb-2 ${formData.requestType === 'devis' ? 'text-[#6B6B4E]' : 'text-gray-400'}`} size={28} />
                      <p className={`font-semibold ${formData.requestType === 'devis' ? 'text-[#6B6B4E]' : 'text-gray-600'}`}>
                        Demande de Devis
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Juste un prix</p>
                    </button>
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
                          className={`h-12 ${errors.firstName ? 'border-red-500' : ''}`}
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
                          className={`h-12 ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email professionnel *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="vous@votre-resto.fr"
                          className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
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
                          placeholder="06 XX XX XX XX"
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Nom de l'établissement *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Restaurant, coffee shop, boulangerie..."
                        className={`h-12 ${errors.company ? 'border-red-500' : ''}`}
                      />
                      {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantité estimée</Label>
                        <Select value={formData.quantity} onValueChange={(value) => handleChange('quantity', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Sélectionnez une quantité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500-1000">500 - 1 000 pièces</SelectItem>
                            <SelectItem value="1000-2500">1 000 - 2 500 pièces</SelectItem>
                            <SelectItem value="2500-5000">2 500 - 5 000 pièces</SelectItem>
                            <SelectItem value="5000-10000">5 000 - 10 000 pièces</SelectItem>
                            <SelectItem value="10000+">10 000+ pièces</SelectItem>
                            <SelectItem value="unsure">Je ne sais pas encore</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="format">Format souhaité</Label>
                        <Select value={formData.format} onValueChange={(value) => handleChange('format', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Sélectionnez un format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petit">Petit (viennoiseries, snacks)</SelectItem>
                            <SelectItem value="moyen">Moyen (repas à emporter)</SelectItem>
                            <SelectItem value="grand">Grand (commandes multiples)</SelectItem>
                            <SelectItem value="plusieurs">Plusieurs formats</SelectItem>
                            <SelectItem value="unsure">Je ne sais pas encore</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Précisions sur votre projet, vos besoins spécifiques..."
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#6B6B4E] hover:bg-[#5A5A40] text-white py-7 text-lg rounded-xl transition-all"
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
                        <span className="flex items-center gap-2 justify-center">
                          {formData.requestType === 'visio' ? (
                            <>
                              <Calendar size={20} />
                              Demander ma visio design
                            </>
                          ) : (
                            <>
                              <Send size={20} />
                              Demander mon devis gratuit
                            </>
                          )}
                        </span>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                      ✓ Sans engagement · ✓ Réponse sous 24h · ✓ 100% gratuit
                    </p>
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
