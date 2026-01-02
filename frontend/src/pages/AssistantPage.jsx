import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, Store, Coffee, Briefcase, ShoppingBag, Package, Palette, Leaf, Zap, Send, Loader2, Download, CheckCircle2, Calendar, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { assistantApi } from '../lib/api';

// ============================================
// STEP DATA
// ============================================

const BUSINESS_TYPES = [
  { id: 'restaurant', label: 'Restaurant', icon: Coffee, desc: 'Gastronomie, bistrot, fast-food' },
  { id: 'boulangerie', label: 'Boulangerie', icon: Store, desc: 'Pâtisserie, viennoiserie' },
  { id: 'cafe', label: 'Café', icon: Coffee, desc: 'Coffee shop, salon de thé' },
  { id: 'epicerie', label: 'Épicerie', icon: ShoppingBag, desc: 'Épicerie fine, caviste' },
  { id: 'franchise', label: 'Franchise', icon: Briefcase, desc: 'Multi-sites, chaîne' },
  { id: 'retail', label: 'Retail', icon: ShoppingBag, desc: 'Boutique, mode, lifestyle' },
];

const PRODUCT_TYPES = [
  { id: 'sac_kraft', label: 'Sac Kraft', desc: 'Vente à emporter' },
  { id: 'sac_luxe', label: 'Sac Luxe', desc: 'Shopping premium' },
  { id: 'boite', label: 'Boîte', desc: 'Burger, pâtisserie' },
  { id: 'gobelet', label: 'Gobelet', desc: 'Boissons chaudes/froides' },
];

const VOLUME_OPTIONS = [
  { id: '<5k', label: 'Moins de 5 000', desc: 'Test ou petit commerce' },
  { id: '5k-10k', label: '5 000 - 10 000', desc: 'Commerce établi' },
  { id: '10k-50k', label: '10 000 - 50 000', desc: 'Multi-points de vente' },
  { id: '50k+', label: 'Plus de 50 000', desc: 'Franchise / Industriel' },
];

const STYLE_OPTIONS = [
  { id: 'minimaliste', label: 'Minimaliste', icon: Zap, desc: 'Épuré, moderne' },
  { id: 'luxe', label: 'Luxe', icon: Sparkles, desc: 'Premium, raffiné' },
  { id: 'fun', label: 'Fun', icon: Palette, desc: 'Coloré, dynamique' },
  { id: 'eco', label: 'Éco', icon: Leaf, desc: 'Nature, responsable' },
];

// ============================================
// STEP COMPONENTS
// ============================================

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div 
        key={i}
        className={`h-1 w-12 transition-all duration-300 ${
          i <= currentStep ? 'bg-[#6B705C]' : 'bg-[#CDCEBD]'
        }`}
      />
    ))}
  </div>
);

const OptionCard = ({ option, selected, onClick, showIcon = true }) => {
  const Icon = option.icon;
  return (
    <button
      onClick={() => onClick(option.id)}
      className={`p-6 border-2 text-left transition-all duration-300 ${
        selected === option.id
          ? 'bg-[#6B705C] text-[#F9F8EF] border-[#6B705C] scale-[1.02]'
          : 'bg-transparent text-[#1A1A1A] border-[#6B705C]/30 hover:border-[#6B705C] hover:bg-[#6B705C]/5'
      }`}
    >
      <div className="flex items-start gap-4">
        {showIcon && Icon && (
          <Icon size={24} className={selected === option.id ? 'text-[#F9F8EF]' : 'text-[#6B705C]'} />
        )}
        <div>
          <h3 className="font-bold text-lg">{option.label}</h3>
          {option.desc && (
            <p className={`text-sm mt-1 ${selected === option.id ? 'text-[#F9F8EF]/80' : 'text-[#1A1A1A]/60'}`}>
              {option.desc}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

// ============================================
// LOADING / RESULT COMPONENTS
// ============================================

const LoadingState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
    <div className="w-20 h-20 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin mb-6" />
    <p className="text-[#6B705C] font-medium text-lg">{message}</p>
    <p className="text-[#1A1A1A]/50 text-sm mt-2">Cela peut prendre quelques secondes...</p>
  </div>
);

const AIResultDisplay = ({ result, onRetryImage, retrying }) => {
  const isGrosProfile = result.lead_score === 'gros_profil';
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Strategic Advice */}
      <div className="bg-[#1A1A1A] p-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-[#CDCEBD]" size={24} />
          <h3 className="text-[#F9F8EF] font-bold text-xl">Conseil Stratégique</h3>
        </div>
        <p className="text-[#F9F8EF]/90 text-lg leading-relaxed">
          {result.strategic_advice}
        </p>
      </div>

      {/* Generated Image or Placeholder */}
      <div className="bg-[#CDCEBD] border-2 border-[#6B705C] p-6">
        <h3 className="text-[#1A1A1A] font-bold text-lg mb-4">Aperçu de votre design</h3>
        
        {result.image_url ? (
          <div className="relative">
            <img 
              src={result.image_url.startsWith('/api') 
                ? `${process.env.REACT_APP_BACKEND_URL}${result.image_url}`
                : result.image_url
              }
              alt="Design généré"
              className="w-full max-w-md mx-auto border-2 border-[#6B705C]"
            />
            <a 
              href={result.image_url.startsWith('/api') 
                ? `${process.env.REACT_APP_BACKEND_URL}${result.image_url}`
                : result.image_url
              }
              download="eonite-design.png"
              className="mt-4 inline-flex items-center gap-2 text-[#6B705C] hover:text-[#1A1A1A] font-medium"
            >
              <Download size={18} />
              Télécharger l'aperçu
            </a>
          </div>
        ) : (
          <div className="bg-[#F9F8EF] border-2 border-dashed border-[#6B705C]/50 p-12 text-center">
            {result.image_error ? (
              <>
                <p className="text-[#1A1A1A]/60 mb-4">{result.image_error}</p>
                <Button 
                  onClick={onRetryImage}
                  disabled={retrying}
                  className="btn-primary"
                >
                  {retrying ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Génération...
                    </>
                  ) : (
                    'Réessayer la génération'
                  )}
                </Button>
              </>
            ) : (
              <>
                <Loader2 className="animate-spin mx-auto mb-4 text-[#6B705C]" size={32} />
                <p className="text-[#1A1A1A]/60">Génération de l'image en cours...</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Lead Score Badge */}
      <div className={`p-6 ${isGrosProfile ? 'bg-[#6B705C]' : 'bg-[#F9F8EF] border-2 border-[#6B705C]'}`}>
        <div className="flex items-center gap-3 mb-2">
          {isGrosProfile ? (
            <Calendar className="text-[#F9F8EF]" size={24} />
          ) : (
            <Mail className="text-[#6B705C]" size={24} />
          )}
          <span className={`text-sm font-bold uppercase tracking-wider ${isGrosProfile ? 'text-[#CDCEBD]' : 'text-[#6B705C]'}`}>
            {result.lead_info.badge}
          </span>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${isGrosProfile ? 'text-[#F9F8EF]' : 'text-[#1A1A1A]'}`}>
          {result.lead_info.title}
        </h3>
        <p className={`${isGrosProfile ? 'text-[#F9F8EF]/80' : 'text-[#1A1A1A]/70'}`}>
          {result.lead_info.message}
        </p>
      </div>
    </div>
  );
};

// ============================================
// FORMS (Visio / Quote)
// ============================================

const ContactForm = ({ type, designId, onSubmit, submitting }) => {
  const [formData, setFormData] = useState({
    nom_entreprise: '',
    nom_contact: '',
    email: '',
    telephone: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, ai_design_id: designId });
  };

  const isVisio = type === 'visio';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Entreprise *</Label>
          <Input
            name="nom_entreprise"
            value={formData.nom_entreprise}
            onChange={handleChange}
            required
            className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            placeholder="Restaurant Le Gourmet"
          />
        </div>
        <div>
          <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Votre nom *</Label>
          <Input
            name="nom_contact"
            value={formData.nom_contact}
            onChange={handleChange}
            required
            className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            placeholder="Jean Dupont"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Email *</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            placeholder="contact@entreprise.fr"
          />
        </div>
        <div>
          <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Téléphone</Label>
          <Input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <div>
        <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">
          {isVisio ? 'Questions pour la visio' : 'Notes complémentaires'}
        </Label>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="min-h-[100px] bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
          placeholder={isVisio 
            ? "Points que vous souhaitez aborder lors de la visio..."
            : "Détails supplémentaires pour votre devis..."
          }
        />
      </div>

      <Button 
        type="submit" 
        disabled={submitting}
        className="w-full bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] py-6 text-lg font-bold uppercase tracking-wider"
      >
        {submitting ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Envoi en cours...
          </>
        ) : (
          <>
            {isVisio ? 'Réserver ma visio design' : 'Recevoir mon devis'}
            <ArrowRight className="ml-2" size={20} />
          </>
        )}
      </Button>
    </form>
  );
};

const SuccessMessage = ({ type }) => {
  const isVisio = type === 'visio';
  
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-20 h-20 bg-[#6B705C] mx-auto flex items-center justify-center mb-6">
        <CheckCircle2 className="text-[#F9F8EF]" size={40} />
      </div>
      <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">
        {isVisio ? 'Visio réservée !' : 'Demande envoyée !'}
      </h2>
      <p className="text-[#1A1A1A]/70 text-lg max-w-md mx-auto">
        {isVisio 
          ? 'Un expert design vous contactera sous 24h pour planifier votre session.'
          : 'Vous recevrez un devis personnalisé par email sous 24h.'
        }
      </p>
    </div>
  );
};

// ============================================
// MAIN ASSISTANT PAGE
// ============================================

const AssistantPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [retryingImage, setRetryingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    business_type: '',
    product_type: '',
    volume_estimate: '',
    brand_style: '',
    text_on_bag: '',
    business_name: ''
  });
  
  const [aiResult, setAiResult] = useState(null);

  const steps = [
    { key: 'business_type', title: "Quel est votre secteur d'activité ?", options: BUSINESS_TYPES },
    { key: 'product_type', title: 'Quel produit souhaitez-vous personnaliser ?', options: PRODUCT_TYPES },
    { key: 'volume_estimate', title: 'Quelle quantité annuelle estimez-vous ?', options: VOLUME_OPTIONS },
    { key: 'brand_style', title: 'Quel style représente votre marque ?', options: STYLE_OPTIONS },
    { key: 'text_on_bag', title: 'Quel texte voulez-vous sur votre emballage ?', isText: true },
  ];

  const handleSelect = (value) => {
    const step = steps[currentStep];
    setFormData({ ...formData, [step.key]: value });
    
    // Auto-advance after selection (except for text input)
    if (!step.isText) {
      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }, 300);
    }
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, text_on_bag: e.target.value });
  };

  const handleBusinessNameChange = (e) => {
    setFormData({ ...formData, business_name: e.target.value });
  };

  const canProceed = () => {
    const step = steps[currentStep];
    return !!formData[step.key];
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await assistantApi.createDesign(formData);
      setAiResult(result);
    } catch (error) {
      console.error('Error generating design:', error);
      // Show error but continue with fallback
      setAiResult({
        design_id: 'error',
        strategic_advice: 'Une erreur est survenue. Notre équipe vous recontactera.',
        image_url: null,
        image_error: 'Génération temporairement indisponible',
        lead_score: formData.volume_estimate !== '<5k' || formData.business_type === 'franchise' 
          ? 'gros_profil' : 'petit_profil',
        lead_info: formData.volume_estimate !== '<5k' || formData.business_type === 'franchise'
          ? { badge: 'Accompagnement Premium', title: 'Projet stratégique', message: 'Une visio avec un expert serait idéale.', form_type: 'visio' }
          : { badge: 'Devis Express', title: 'Devis personnalisé', message: 'Nous vous envoyons un devis sous 24h.', form_type: 'quote' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetryImage = async () => {
    if (!aiResult?.design_id || aiResult.design_id === 'error') return;
    
    setRetryingImage(true);
    try {
      const result = await assistantApi.retryImage(aiResult.design_id);
      setAiResult({ ...aiResult, image_url: result.image_url, image_error: result.image_error });
    } catch (error) {
      console.error('Error retrying image:', error);
    } finally {
      setRetryingImage(false);
    }
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (aiResult.lead_info.form_type === 'visio') {
        await assistantApi.bookVisio(data);
      } else {
        await assistantApi.requestQuote(data);
      }
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Render current step
  const renderStep = () => {
    const step = steps[currentStep];
    
    if (step.isText) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">
              Texte principal (votre marque, slogan...)
            </Label>
            <Input
              value={formData.text_on_bag}
              onChange={handleTextChange}
              className="h-14 text-lg bg-transparent border-2 border-[#6B705C]/30 focus:border-[#6B705C]"
              placeholder="Ex: Le Petit Gourmet"
              autoFocus
            />
          </div>
          <div>
            <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">
              Nom de votre entreprise (optionnel)
            </Label>
            <Input
              value={formData.business_name}
              onChange={handleBusinessNameChange}
              className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
              placeholder="Pour personnaliser nos conseils"
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`grid gap-4 animate-fade-in ${step.options.length > 4 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
        {step.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={formData[step.key]}
            onClick={handleSelect}
            showIcon={!!option.icon}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#F9F8EF]">
      {/* Header */}
      <section className="bg-[#6B705C] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-[#CDCEBD]" size={32} />
            <h1 className="text-4xl md:text-5xl font-black text-[#F9F8EF]">
              Assistant Design IA
            </h1>
          </div>
          <p className="text-[#F9F8EF]/80 text-lg max-w-2xl mx-auto">
            En 5 questions, recevez un conseil stratégique personnalisé et un aperçu de votre emballage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Loading State */}
          {loading && (
            <LoadingState message="Notre IA analyse votre projet..." />
          )}

          {/* Success State */}
          {success && (
            <SuccessMessage type={aiResult?.lead_info?.form_type} />
          )}

          {/* AI Result State */}
          {!loading && !success && aiResult && (
            <>
              {!showForm ? (
                <>
                  <AIResultDisplay 
                    result={aiResult} 
                    onRetryImage={handleRetryImage}
                    retrying={retryingImage}
                  />
                  <div className="mt-8 text-center">
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] px-12 py-6 text-xl font-bold uppercase tracking-wider"
                    >
                      {aiResult.lead_info.cta_text}
                      <ArrowRight className="ml-3" size={24} />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="bg-white border-2 border-[#6B705C] p-8">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                    {aiResult.lead_score === 'gros_profil' 
                      ? 'Réservez votre session design'
                      : 'Recevez votre devis personnalisé'
                    }
                  </h2>
                  <ContactForm 
                    type={aiResult.lead_info.form_type}
                    designId={aiResult.design_id}
                    onSubmit={handleFormSubmit}
                    submitting={submitting}
                  />
                </div>
              )}
            </>
          )}

          {/* Steps State */}
          {!loading && !success && !aiResult && (
            <>
              <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
              
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-[#1A1A1A]/60">
                  Étape {currentStep + 1} sur {steps.length}
                </p>
              </div>

              {renderStep()}

              {/* Navigation */}
              <div className="flex justify-between mt-12">
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="border-[#6B705C] text-[#6B705C] hover:bg-[#6B705C] hover:text-[#F9F8EF] px-6 py-3"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Retour
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] px-8 py-3 font-bold"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Sparkles className="mr-2" size={18} />
                      Générer mon design
                    </>
                  ) : (
                    <>
                      Suivant
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </main>
  );
};

export default AssistantPage;
