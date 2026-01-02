import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar,
  Palette,
  Truck,
  Award,
  Heart,
  Share2,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  Package,
  ShoppingBag,
  Box,
  Ruler,
  Play,
  Clock,
  Euro,
  Leaf
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { steps, benefits, proofs, trustElements, faq, formats, testimonials, companyInfo } from '../data/mockData';

const iconMap = {
  Calendar, Palette, Truck, Award, Heart, Share2, Sparkles, ShieldCheck, TrendingDown,
  Package, ShoppingBag, Box, Ruler
};

const HomePage = () => {
  return (
    <main className="overflow-hidden">
      {/* ============================================ */}
      {/* SECTION 1: HERO */}
      {/* ============================================ */}
      <section className="relative bg-gradient-to-br from-[#F8F7F4] via-white to-[#F0EFE8] min-h-[90vh] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#6B6B4E]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#8B8B6E]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Mini proof badge */}
              <div className="inline-flex items-center gap-2 bg-[#6B6B4E]/10 px-4 py-2 rounded-full">
                <Clock size={16} className="text-[#6B6B4E]" />
                <span className="text-[#6B6B4E] font-medium text-sm">Design prêt en 30 minutes</span>
              </div>
              
              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
                Votre sac kraft
                <span className="text-[#6B6B4E]"> personnalisé</span>,
                <br />designé en visio.
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
                On crée ensemble le design de votre sac en direct. 
                <span className="font-semibold text-gray-800"> Vous validez, on produit.</span>
              </p>
              
              {/* Value props */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Check size={18} className="text-[#6B6B4E]" />
                  <span>À partir de <strong>0,10€/pièce</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check size={18} className="text-[#6B6B4E]" />
                  <span>Livré en <strong>2-3 semaines</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check size={18} className="text-[#6B6B4E]" />
                  <span><strong>100% Europe</strong></span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact?type=visio">
                  <Button size="lg" className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white px-8 py-7 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto">
                    <Calendar className="mr-2" size={20} />
                    Réserver ma visio design
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </Link>
                <Link to="/contact?type=devis">
                  <Button variant="outline" size="lg" className="border-2 border-[#6B6B4E] text-[#6B6B4E] hover:bg-[#6B6B4E] hover:text-white px-8 py-7 text-lg rounded-xl transition-all duration-300 w-full sm:w-auto">
                    Demander un devis gratuit
                  </Button>
                </Link>
              </div>

              {/* Trust micro-text */}
              <p className="text-sm text-gray-500">
                ✓ Sans engagement · ✓ Réponse sous 24h · ✓ Devis gratuit
              </p>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main visual container */}
                <div className="relative bg-gradient-to-br from-[#E8E6DC] to-[#D4D2C4] rounded-3xl p-8 aspect-square flex items-center justify-center shadow-2xl">
                  {/* Kraft bag illustration */}
                  <div className="relative w-64 h-80">
                    <div className="absolute inset-0 bg-[#C4A77D] rounded-t-lg shadow-xl transform -rotate-3">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#A68B5B] rounded-full" />
                      <div className="absolute inset-x-6 top-16 bottom-6 bg-[#D4BC94] rounded flex items-center justify-center">
                        <img 
                          src="https://customer-assets.emergentagent.com/job_crystal-designs/artifacts/ws6x9cf4_eonite%20logo.png" 
                          alt="Votre logo ici" 
                          className="w-24 h-auto opacity-60"
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-[#D4BC94] rounded-t-lg shadow-xl transform rotate-3 -z-10">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#B8A07A] rounded-full" />
                    </div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-[#6B6B4E] font-bold">VOTRE LOGO ICI</span>
                  </div>
                </div>

                {/* Floating stats cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center">
                      <Euro className="text-[#6B6B4E]" size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">0,10€</p>
                      <p className="text-sm text-gray-500">par sac</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Leaf className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Éco-responsable</p>
                      <p className="text-xs text-gray-500">FSC certifié</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof bar */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {proofs.map((proof, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-[#6B6B4E]">{proof.stat}</p>
                  <p className="text-gray-600 mt-1">{proof.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: COMMENT ÇA MARCHE */}
      {/* ============================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-semibold text-sm uppercase tracking-wider">Simple et rapide</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              3 étapes pour obtenir vos sacs personnalisés. Pas de brief compliqué, pas d'aller-retours interminables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#6B6B4E]/30 to-transparent" />
                  )}
                  
                  <div className="bg-[#F8F7F4] rounded-3xl p-8 h-full hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-5xl font-bold text-[#6B6B4E]/20">{step.number}</span>
                      <div className="w-14 h-14 bg-[#6B6B4E] rounded-2xl flex items-center justify-center">
                        {IconComponent && <IconComponent className="text-white" size={28} />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/contact?type=visio">
              <Button size="lg" className="bg-[#6B6B4E] hover:bg-[#5A5A40] text-white px-8 py-6 text-lg rounded-xl">
                <Calendar className="mr-2" size={20} />
                Réserver ma visio design
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: BÉNÉFICES */}
      {/* ============================================ */}
      <section className="py-24 bg-gradient-to-b from-[#F8F7F4] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-semibold text-sm uppercase tracking-wider">Pourquoi personnaliser ?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Bien plus qu'un simple sac
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Un emballage à votre image, c'est un investissement qui rapporte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#6B6B4E]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#6B6B4E] transition-colors">
                      {IconComponent && (
                        <IconComponent className="text-[#6B6B4E] group-hover:text-white transition-colors" size={24} />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: PREUVES / RÉASSURANCE */}
      {/* ============================================ */}
      <section className="py-24 bg-[#6B6B4E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#C4C4A0] font-semibold text-sm uppercase tracking-wider">Qualité garantie</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
                Production 100% européenne, qualité premium
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Vos sacs sont fabriqués dans nos ateliers partenaires en Europe, avec des matériaux certifiés et des encres conformes aux normes alimentaires.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {trustElements.map((element, index) => (
                  <div key={index} className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-sm">{element}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                      ))}
                    </div>
                    <p className="text-white mb-4">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-white/60 text-sm">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: FORMATS */}
      {/* ============================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-semibold text-sm uppercase tracking-wider">Tous les formats</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Un format pour chaque usage
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Du petit sac à viennoiseries au grand sac courses, on s'adapte à vos besoins.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formats.map((format, index) => {
              const IconComponent = iconMap[format.icon];
              return (
                <Card key={index} className="border-2 border-gray-100 hover:border-[#6B6B4E]/30 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-[#F8F7F4] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#6B6B4E]/10 transition-colors">
                      {IconComponent && <IconComponent className="text-[#6B6B4E]" size={32} />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{format.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{format.usage}</p>
                    <p className="text-[#6B6B4E] font-medium text-sm">{format.dimensions}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Vous avez un format spécifique en tête ?</p>
            <Link to="/contact">
              <Button variant="outline" className="border-2 border-[#6B6B4E] text-[#6B6B4E] hover:bg-[#6B6B4E] hover:text-white">
                Parlons-en en visio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: FAQ */}
      {/* ============================================ */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6B6B4E] font-semibold text-sm uppercase tracking-wider">Questions fréquentes</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Tout ce que vous devez savoir
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-2xl px-6 border-0 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Vous avez une autre question ?</p>
            <Link to="/contact">
              <Button variant="outline" className="border-2 border-[#6B6B4E] text-[#6B6B4E] hover:bg-[#6B6B4E] hover:text-white">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 7: CTA FINAL */}
      {/* ============================================ */}
      <section className="py-24 bg-gradient-to-br from-[#6B6B4E] to-[#5A5A40] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Prêt à créer votre sac personnalisé ?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Réservez votre visio design gratuite. En 30 minutes, votre sac est prêt pour la production.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/contact?type=visio">
              <Button size="lg" className="bg-white text-[#6B6B4E] hover:bg-gray-100 px-10 py-7 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all group">
                <Calendar className="mr-2" size={20} />
                Réserver ma visio design
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
            <Link to="/contact?type=devis">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-[#6B6B4E] px-10 py-7 text-lg rounded-xl transition-all">
                Demander un devis
              </Button>
            </Link>
          </div>
          
          {/* Final reassurance */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Check size={16} /> Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} /> Design gratuit
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} /> Réponse sous 24h
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
