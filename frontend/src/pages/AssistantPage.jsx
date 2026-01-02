import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Send, Download, CheckCircle2, Calendar, Mail, Loader2, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { assistantApi } from '../lib/api';

// ============================================
// CHAT DATA
// ============================================

const BUSINESS_TYPES = [
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'boulangerie', label: 'Boulangerie' },
  { id: 'cafe', label: 'Coffee Shop' },
  { id: 'dark_kitchen', label: 'Dark Kitchen' },
  { id: 'epicerie', label: 'Épicerie Fine' },
  { id: 'franchise', label: 'Franchise' },
  { id: 'retail', label: 'Boutique / Retail' },
];

const PRODUCT_TYPES = [
  { id: 'sac_kraft', label: 'Sac Kraft' },
  { id: 'sac_luxe', label: 'Sac Luxe' },
  { id: 'boite', label: 'Boîte / Box' },
  { id: 'gobelet', label: 'Gobelet' },
];

const VOLUME_OPTIONS = [
  { id: '<5k', label: 'Moins de 5 000' },
  { id: '5k-10k', label: '5 000 - 10 000' },
  { id: '10k-50k', label: '10 000 - 50 000' },
  { id: '50k+', label: 'Plus de 50 000' },
];

const STYLE_OPTIONS = [
  { id: 'minimaliste', label: 'Minimaliste' },
  { id: 'luxe', label: 'Luxe / Premium' },
  { id: 'fun', label: 'Fun / Coloré' },
  { id: 'eco', label: 'Éco / Nature' },
];

// Oracle comments based on choices - WITH TECHNICAL EXPERTISE
const ORACLE_COMMENTS = {
  business_type: {
    restaurant: "Un restaurant ! Pour vos sacs à emporter, je recommande des poignées torsadées kraft renforcé – résistance jusqu'à 8kg. La qualité de vos emballages reflète directement celle de votre cuisine.",
    boulangerie: "Une boulangerie artisanale ! Pour les viennoiseries, un kraft 90-110 Gsm avec poignées plates suffit. Pour les gâteaux, on passe sur du carton SBS 250-300 Gsm avec fenêtre PET.",
    cafe: "Un Coffee Shop ! Je recommande nos gobelets Ripple Wall – l'ondulation offre grip + isolation sans manchon. C'est le standard Starbucks/Costa. Impression 1-2 couleurs recommandée pour le budget.",
    dark_kitchen: "Une Dark Kitchen ! C'est un secteur qui exige une solidité de sac irréprochable. Je recommande minimum 100 Gsm avec poignées torsadées, et surtout : un QR code pour collecter les avis clients (+30% d'avis en moyenne).",
    epicerie: "Une épicerie fine ! L'emballage doit être à la hauteur des produits d'exception. Je recommande du kraft nature FSC non blanchi pour l'authenticité, avec une impression quadri HD pour mettre en valeur votre identité.",
    franchise: "Une franchise ! Volume important, cohérence de marque sur tous les points de vente. On active le programme Grands Comptes : stockage dédié, livraisons échelonnées, tarifs négociés.",
    retail: "Du retail ! Votre sac va se promener dans la rue – c'est de la pub gratuite. Pour un effet 'Wow', je recommande le pelliculage soft-touch avec marquage à chaud sur le logo.",
  },
  product_type: {
    sac_kraft: "Le sac kraft poignées torsadées, grammage 100-120 Gsm. Un classique indémodable : robuste, éco-responsable, impression jusqu'à quadri HD. Résistance jusqu'à 8kg.",
    sac_luxe: "Le sac luxe avec poignées ruban satin ! Grammage 170-230 Gsm, pelliculage mat ou brillant disponible. Vos clients vont vouloir le garder – c'est de la publicité gratuite.",
    boite: "Les boîtes personnalisées ! Grammage 230-300 Gsm selon l'usage. Pour le chaud (burgers), j'exige minimum 280 Gsm avec aération intégrée pour éviter la condensation.",
    gobelet: "Les gobelets personnalisés ! Simple paroi pour le froid, double paroi ou Ripple Wall pour le chaud. Contenance de 4oz à 16oz. Chaque café devient une occasion de marquer les esprits.",
  },
  volume: {
    '<5k': "Moins de 5000 unités – parfait pour valider le concept. Notre approche Bespoke (sur-mesure) fonctionne même en quantités modérées. Vous n'êtes pas obligé de commander du générique.",
    '5k-10k': "5 à 10 000 unités, c'est le volume d'un commerce bien établi. À ce niveau, on optimise le prix unitaire et on peut proposer toutes les finitions premium.",
    '10k-50k': "10 à 50 000 ! Vous avez plusieurs points de vente ou une belle fréquentation. On parle stockage dédié et livraisons planifiées.",
    '50k+': "Plus de 50 000 unités ! Vous êtes dans la cour des grands. Programme Grands Comptes activé : tarifs industriels, chef de projet dédié, production prioritaire.",
  },
  style: {
    minimaliste: "Minimaliste ! L'élégance dans la simplicité. Peu d'encre = éco-responsable + économique. Typographie soignée sur kraft nature, c'est redoutablement efficace.",
    luxe: "Style luxe ! Pelliculage soft-touch, marquage à chaud, vernis sélectif... Vous voulez que chaque détail transpire la qualité. Le grammage 200+ Gsm est recommandé.",
    fun: "Fun et coloré ! Impression quadri HD pour des couleurs vibrantes. On peut aller jusqu'au pelliculage brillant pour un effet 'pop' maximum.",
    eco: "Style éco ! Kraft nature non blanchi, encres végétales, certification FSC. On ajoute un message 'Emballage 100% recyclable' pour rassurer vos clients engagés.",
  },
};

// ============================================
// MESSAGE COMPONENTS
// ============================================

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3 bg-[#6B705C] text-[#F9F8EF] rounded-2xl rounded-bl-none w-fit max-w-[80px] animate-fade-in">
    <span className="w-2 h-2 bg-[#F9F8EF]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 bg-[#F9F8EF]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-2 h-2 bg-[#F9F8EF]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

const AIMessage = ({ children, delay = 0 }) => (
  <div 
    className="flex items-start gap-3 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-10 h-10 bg-[#6B705C] flex items-center justify-center flex-shrink-0">
      <Sparkles size={20} className="text-[#F9F8EF]" />
    </div>
    <div className="bg-[#6B705C] text-[#F9F8EF] px-5 py-4 rounded-2xl rounded-bl-none max-w-[80%]">
      <p className="leading-relaxed">{children}</p>
    </div>
  </div>
);

const UserMessage = ({ children }) => (
  <div className="flex justify-end animate-fade-in">
    <div className="bg-[#CDCEBD] text-[#1A1A1A] px-5 py-4 rounded-2xl rounded-br-none max-w-[80%]">
      <p className="font-medium">{children}</p>
    </div>
  </div>
);

const QuickReplies = ({ options, onSelect, disabled }) => (
  <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
    {options.map((option) => (
      <button
        key={option.id}
        onClick={() => !disabled && onSelect(option)}
        disabled={disabled}
        className={`px-5 py-3 border-2 border-[#6B705C] text-[#1A1A1A] font-medium transition-all
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-[#6B705C] hover:text-[#F9F8EF] hover:scale-105'
          }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const TextInput = ({ placeholder, onSubmit, disabled }) => {
  const [value, setValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 animate-fade-in">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 h-12 bg-white border-2 border-[#6B705C]/30 focus:border-[#6B705C] text-lg"
        autoFocus
      />
      <Button 
        type="submit" 
        disabled={!value.trim() || disabled}
        className="h-12 px-6 bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF]"
      >
        <Send size={20} />
      </Button>
    </form>
  );
};

// ============================================
// LOADING SCREEN
// ============================================

const MagicLoadingScreen = ({ businessName }) => (
  <div className="fixed inset-0 bg-[#1A1A1A] z-50 flex items-center justify-center animate-fade-in">
    <div className="text-center max-w-lg px-8">
      <div className="mb-8">
        <div className="w-24 h-24 bg-[#6B705C] mx-auto flex items-center justify-center mb-6 animate-pulse">
          <Sparkles size={48} className="text-[#F9F8EF]" />
        </div>
        <div className="space-y-2">
          <div className="h-1 bg-[#6B705C]/30 rounded overflow-hidden">
            <div className="h-full bg-[#6B705C] animate-loading-bar" />
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-black text-[#F9F8EF] mb-4">
        Analyse de votre marque...
      </h2>
      <p className="text-[#F9F8EF]/60 text-lg mb-8">
        Génération de votre concept de design exclusif pour <span className="text-[#CDCEBD] font-semibold">{businessName || 'votre enseigne'}</span>
      </p>
      <div className="flex justify-center gap-2">
        {['Analyse du secteur', 'Création du style', 'Génération de l\'image'].map((step, i) => (
          <span 
            key={i}
            className="text-[#F9F8EF]/40 text-sm animate-pulse"
            style={{ animationDelay: `${i * 500}ms` }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// RESULT DISPLAY
// ============================================

const ResultDisplay = ({ result, onContinue }) => {
  const isGrosProfile = result.lead_score === 'gros_profil';
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Strategic Advice as AI Message */}
      <AIMessage>
        <span className="text-[#CDCEBD] font-semibold block mb-2">✨ Votre concept est prêt !</span>
        {result.strategic_advice}
      </AIMessage>

      {/* Generated Image */}
      {result.image_url && (
        <div className="ml-13 pl-13">
          <div className="bg-white border-2 border-[#6B705C] p-4 max-w-md animate-fade-in" style={{ animationDelay: '300ms' }}>
            <img 
              src={result.image_url.startsWith('/api') 
                ? `${process.env.REACT_APP_BACKEND_URL}${result.image_url}`
                : result.image_url
              }
              alt="Design généré"
              className="w-full"
            />
            <a 
              href={result.image_url.startsWith('/api') 
                ? `${process.env.REACT_APP_BACKEND_URL}${result.image_url}`
                : result.image_url
              }
              download="eonite-design.png"
              className="mt-3 inline-flex items-center gap-2 text-[#6B705C] hover:text-[#1A1A1A] font-medium text-sm"
            >
              <Download size={16} />
              Télécharger l'aperçu
            </a>
          </div>
        </div>
      )}

      {/* Lead Badge */}
      <div className={`ml-13 p-6 ${isGrosProfile ? 'bg-[#6B705C]' : 'bg-[#CDCEBD]'} max-w-md animate-fade-in`} style={{ animationDelay: '500ms' }}>
        <div className="flex items-center gap-2 mb-2">
          {isGrosProfile ? (
            <Calendar className="text-[#F9F8EF]" size={20} />
          ) : (
            <Mail className="text-[#6B705C]" size={20} />
          )}
          <span className={`text-xs font-bold uppercase tracking-wider ${isGrosProfile ? 'text-[#CDCEBD]' : 'text-[#6B705C]'}`}>
            {result.lead_info.badge}
          </span>
        </div>
        <p className={`font-bold ${isGrosProfile ? 'text-[#F9F8EF]' : 'text-[#1A1A1A]'}`}>
          {result.lead_info.message}
        </p>
      </div>

      {/* CTA */}
      <div className="ml-13 animate-fade-in" style={{ animationDelay: '700ms' }}>
        <Button 
          onClick={onContinue}
          className="bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] px-8 py-6 text-lg font-bold"
        >
          {result.lead_info.cta_text}
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

// ============================================
// CONTACT FORM
// ============================================

const ContactForm = ({ type, designId, businessName, onSubmit, submitting }) => {
  const [formData, setFormData] = useState({
    nom_entreprise: businessName || '',
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
    <div className="space-y-4 animate-fade-in">
      <AIMessage>
        {isVisio 
          ? "Parfait ! Pour réserver votre session design avec un expert, j'ai besoin de quelques informations."
          : "Très bien ! Pour vous envoyer un devis personnalisé, j'ai besoin de vos coordonnées."
        }
      </AIMessage>

      <div className="ml-13 max-w-md">
        <form onSubmit={handleSubmit} className="bg-white border-2 border-[#6B705C] p-6 space-y-4">
          <div>
            <Label className="text-[#1A1A1A]/80 mb-1 block text-sm font-semibold">Entreprise</Label>
            <Input
              name="nom_entreprise"
              value={formData.nom_entreprise}
              onChange={handleChange}
              required
              className="h-11 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            />
          </div>
          <div>
            <Label className="text-[#1A1A1A]/80 mb-1 block text-sm font-semibold">Votre nom</Label>
            <Input
              name="nom_contact"
              value={formData.nom_contact}
              onChange={handleChange}
              required
              className="h-11 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            />
          </div>
          <div>
            <Label className="text-[#1A1A1A]/80 mb-1 block text-sm font-semibold">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            />
          </div>
          <div>
            <Label className="text-[#1A1A1A]/80 mb-1 block text-sm font-semibold">Téléphone</Label>
            <Input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="h-11 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
            />
          </div>
          {isVisio && (
            <div>
              <Label className="text-[#1A1A1A]/80 mb-1 block text-sm font-semibold">Questions pour la visio</Label>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="min-h-[80px] bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                placeholder="Points à aborder..."
              />
            </div>
          )}
          <Button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] py-5 font-bold"
          >
            {submitting ? (
              <><Loader2 className="animate-spin mr-2" size={18} /> Envoi...</>
            ) : (
              <>{isVisio ? 'Réserver ma visio' : 'Recevoir mon devis'} <ArrowRight className="ml-2" size={18} /></>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

// ============================================
// SUCCESS MESSAGE
// ============================================

const SuccessMessage = ({ type }) => (
  <div className="space-y-4 animate-fade-in">
    <AIMessage>
      <span className="text-[#CDCEBD] text-2xl block mb-2">🎉</span>
      {type === 'visio' 
        ? "C'est noté ! Un expert design vous contactera dans les 24h pour planifier votre session. Préparez votre logo si vous en avez un !"
        : "Parfait ! Vous recevrez votre devis personnalisé par email dans les 24h. Gardez un œil sur votre boîte de réception !"
      }
    </AIMessage>
    <div className="ml-13 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <Link to="/">
        <Button className="bg-[#6B705C] hover:bg-[#5A5F4D] text-[#F9F8EF] px-6 py-4">
          Retour à l'accueil
        </Button>
      </Link>
    </div>
  </div>
);

// ============================================
// MAIN CHAT COMPONENT
// ============================================

const AssistantPage = () => {
  const chatRef = useRef(null);
  const initializedRef = useRef(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('intro');
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputType, setInputType] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    product_type: '',
    volume_estimate: '',
    brand_style: '',
    text_on_bag: '',
    competitor_inspiration: ''
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping, showInput]);

  // Initialize chat - only once using ref
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    startConversation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addMessage = (type, content, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { type, content, id: Date.now() }]);
        resolve();
      }, delay);
    });
  };

  const simulateTyping = async (duration = 1500) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, duration));
    setIsTyping(false);
  };

  const startConversation = async () => {
    await simulateTyping(1000);
    await addMessage('ai', "Bonjour ! 👋 Bienvenue chez Eonite, spécialiste des emballages personnalisés.");
    await simulateTyping(1500);
    await addMessage('ai', "Je suis votre assistant design. En quelques questions, je vais créer un concept exclusif pour votre marque.");
    await simulateTyping(1000);
    await addMessage('ai', "Pour commencer, quel est le nom de votre enseigne ?");
    setShowInput(true);
    setInputType('business_name');
    setCurrentStep('business_name');
  };

  const handleTextSubmit = async (value) => {
    setShowInput(false);
    await addMessage('user', value);
    
    if (currentStep === 'business_name') {
      setFormData(prev => ({ ...prev, business_name: value }));
      await simulateTyping(1200);
      await addMessage('ai', `Enchanté, ${value} ! 🎯`);
      await simulateTyping(1000);
      await addMessage('ai', "Quel type d'établissement gérez-vous ?");
      setShowInput(true);
      setInputType({ type: 'options', options: BUSINESS_TYPES, key: 'business_type' });
      setCurrentStep('business_type');
    } else if (currentStep === 'text_on_bag') {
      setFormData(prev => ({ ...prev, text_on_bag: value }));
      await simulateTyping(800);
      await addMessage('ai', `"${value}" - Excellent choix ! C'est accrocheur.`);
      // Start generation
      handleGenerate({ ...formData, text_on_bag: value });
    }
  };

  const handleOptionSelect = async (option) => {
    setShowInput(false);
    await addMessage('user', option.label);
    
    const key = inputType.key;
    const newFormData = { ...formData, [key]: option.id };
    setFormData(newFormData);

    // Oracle comment
    const oracleKey = key === 'volume_estimate' ? 'volume' : key;
    const oracleComment = ORACLE_COMMENTS[oracleKey]?.[option.id];
    
    if (oracleComment) {
      await simulateTyping(1500);
      await addMessage('ai', oracleComment);
    }

    // Next step
    await simulateTyping(1000);
    
    if (key === 'business_type') {
      await addMessage('ai', "Quel produit souhaitez-vous personnaliser ?");
      setShowInput(true);
      setInputType({ type: 'options', options: PRODUCT_TYPES, key: 'product_type' });
      setCurrentStep('product_type');
    } else if (key === 'product_type') {
      await addMessage('ai', "Quelle quantité annuelle estimez-vous avoir besoin ?");
      setShowInput(true);
      setInputType({ type: 'options', options: VOLUME_OPTIONS, key: 'volume_estimate' });
      setCurrentStep('volume_estimate');
    } else if (key === 'volume_estimate') {
      await addMessage('ai', "Quel style correspond le mieux à votre marque ?");
      setShowInput(true);
      setInputType({ type: 'options', options: STYLE_OPTIONS, key: 'brand_style' });
      setCurrentStep('brand_style');
    } else if (key === 'brand_style') {
      await addMessage('ai', `Dernière question : quel texte voulez-vous voir imprimé sur votre emballage ? (nom de marque, slogan...)`);
      setShowInput(true);
      setInputType('text_on_bag');
      setCurrentStep('text_on_bag');
    }
  };

  const handleGenerate = async (data) => {
    setShowInput(false);
    setIsGenerating(true);
    
    try {
      const result = await assistantApi.createDesign({
        business_type: data.business_type,
        product_type: data.product_type,
        volume_estimate: data.volume_estimate,
        brand_style: data.brand_style,
        text_on_bag: data.text_on_bag,
        business_name: data.business_name
      });
      
      setAiResult(result);
    } catch (error) {
      console.error('Error generating design:', error);
      setAiResult({
        design_id: 'error',
        strategic_advice: 'Une erreur est survenue, mais notre équipe va vous recontacter rapidement !',
        image_url: null,
        lead_score: data.volume_estimate !== '<5k' || data.business_type === 'franchise' 
          ? 'gros_profil' : 'petit_profil',
        lead_info: data.volume_estimate !== '<5k' || data.business_type === 'franchise'
          ? { badge: 'Accompagnement Premium', title: 'Projet stratégique', message: 'Une visio avec un expert serait idéale.', cta_text: 'Réserver ma visio', form_type: 'visio' }
          : { badge: 'Devis Express', title: 'Devis personnalisé', message: 'Nous vous envoyons un devis sous 24h.', cta_text: 'Recevoir mon devis', form_type: 'quote' }
      });
    } finally {
      setIsGenerating(false);
      setCurrentStep('result');
    }
  };

  const handleContinue = () => {
    setShowForm(true);
    setCurrentStep('form');
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
      setCurrentStep('success');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F8EF] flex flex-col">
      {/* Magic Loading Screen */}
      {isGenerating && <MagicLoadingScreen businessName={formData.business_name} />}

      {/* Header */}
      <div className="bg-[#6B705C] py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center">
            <Sparkles size={20} className="text-[#F9F8EF]" />
          </div>
          <div>
            <h1 className="text-[#F9F8EF] font-bold">Assistant Design Eonite</h1>
            <p className="text-[#F9F8EF]/60 text-sm">Conversation en cours...</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto py-8 px-4"
        style={{ maxHeight: 'calc(100vh - 180px)' }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Messages */}
          {messages.map((msg) => (
            msg.type === 'ai' 
              ? <AIMessage key={msg.id}>{msg.content}</AIMessage>
              : <UserMessage key={msg.id}>{msg.content}</UserMessage>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#6B705C] flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-[#F9F8EF]" />
              </div>
              <TypingIndicator />
            </div>
          )}

          {/* Result Display */}
          {currentStep === 'result' && aiResult && !showForm && (
            <ResultDisplay result={aiResult} onContinue={handleContinue} />
          )}

          {/* Contact Form */}
          {showForm && !success && (
            <ContactForm 
              type={aiResult.lead_info.form_type}
              designId={aiResult.design_id}
              businessName={formData.business_name}
              onSubmit={handleFormSubmit}
              submitting={submitting}
            />
          )}

          {/* Success */}
          {success && (
            <SuccessMessage type={aiResult.lead_info.form_type} />
          )}
        </div>
      </div>

      {/* Input Area */}
      {showInput && !isGenerating && (
        <div className="border-t-2 border-[#6B705C]/20 bg-white py-4 px-4">
          <div className="max-w-3xl mx-auto">
            {inputType === 'business_name' || inputType === 'text_on_bag' ? (
              <TextInput 
                placeholder={inputType === 'business_name' ? "Ex: Le Petit Gourmet" : "Ex: Café Royal, Maison Dupain..."}
                onSubmit={handleTextSubmit}
                disabled={isTyping}
              />
            ) : inputType?.type === 'options' ? (
              <QuickReplies 
                options={inputType.options}
                onSelect={handleOptionSelect}
                disabled={isTyping}
              />
            ) : null}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 60s ease-out forwards;
        }
      `}</style>
    </main>
  );
};

export default AssistantPage;
