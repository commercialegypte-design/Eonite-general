import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Send, Download, CheckCircle2, Calendar, Mail, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { assistantApi } from '../lib/api';

// ============================================
// VOLUME OPTIONS (granular)
// ============================================

const VOLUME_OPTIONS = [
  { id: '<5k', label: 'Moins de 5 000' },
  { id: '5k', label: '5 000' },
  { id: '10k', label: '10 000' },
  { id: '15k', label: '15 000' },
  { id: '20k', label: '20 000' },
  { id: '30k', label: '30 000' },
  { id: '30k+', label: 'Plus de 30 000' },
];

const HANDLE_OPTIONS = [
  { id: 'plates', label: 'Poignées plates' },
  { id: 'torsadees', label: 'Poignées torsadées' },
  { id: 'sans', label: 'Sans poignées (sachet)' },
];

const PAPER_OPTIONS = [
  { id: 'vierge', label: 'Papier vierge' },
  { id: 'recycle', label: 'Papier recyclé' },
];

const COLOR_OPTIONS = [
  { id: 'kraft_marron', label: 'Kraft marron (artisanal)' },
  { id: 'blanc', label: 'Blanc (net et moderne)' },
];

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
      <div className="leading-relaxed whitespace-pre-line">{children}</div>
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

const QuickReplies = ({ options, onSelect, disabled, multiColumn = false }) => (
  <div className={`flex flex-wrap gap-2 mt-4 animate-fade-in ${multiColumn ? 'max-w-md' : ''}`}>
    {options.map((option) => (
      <button
        key={option.id}
        onClick={() => !disabled && onSelect(option)}
        disabled={disabled}
        className={`px-5 py-3 border-2 border-[#6B705C] text-[#1A1A1A] font-medium transition-all text-sm
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

const TextInput = ({ placeholder, onSubmit, disabled, type = 'text' }) => {
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
        type={type}
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

const YesNoButtons = ({ onSelect, disabled }) => (
  <div className="flex gap-3 mt-4 animate-fade-in">
    <button
      onClick={() => !disabled && onSelect(true)}
      disabled={disabled}
      className="px-8 py-3 bg-[#6B705C] text-[#F9F8EF] font-medium transition-all hover:bg-[#5A5F4D]"
    >
      Oui
    </button>
    <button
      onClick={() => !disabled && onSelect(false)}
      disabled={disabled}
      className="px-8 py-3 border-2 border-[#6B705C] text-[#1A1A1A] font-medium transition-all hover:bg-[#6B705C]/10"
    >
      Non
    </button>
  </div>
);

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
        <div className="h-1 bg-[#6B705C]/30 rounded overflow-hidden">
          <div className="h-full bg-[#6B705C] animate-loading-bar" />
        </div>
      </div>
      <h2 className="text-3xl font-black text-[#F9F8EF] mb-4">
        Préparation de votre synthèse...
      </h2>
      <p className="text-[#F9F8EF]/60 text-lg mb-8">
        Analyse de votre projet pour <span className="text-[#CDCEBD] font-semibold">{businessName || 'votre enseigne'}</span>
      </p>
    </div>
  </div>
);

// ============================================
// RESULT DISPLAY
// ============================================

const ResultDisplay = ({ result, clientData, onBookSession }) => (
  <div className="space-y-6 animate-fade-in">
    {/* Résumé */}
    <AIMessage>
      <span className="text-[#CDCEBD] font-semibold block mb-3">📋 Si je résume :</span>
      <div className="space-y-2 text-sm">
        <p>• <strong>Vous êtes</strong> : {clientData.activite} {clientData.specialite ? `(${clientData.specialite})` : ''}</p>
        <p>• <strong>Produit principal</strong> : {clientData.produit}</p>
        <p>• <strong>Volumes</strong> : environ {clientData.volume} unités/an</p>
        <p>• <strong>Poignées</strong> : {clientData.poignees || 'À définir'}</p>
        <p>• <strong>Papier/couleur</strong> : {clientData.papier} {clientData.couleur}</p>
        <p>• <strong>Branding</strong> : {clientData.branding || 'À définir'}</p>
        <p>• <strong>Éléments obligatoires</strong> : {clientData.elements || 'À définir'}</p>
      </div>
    </AIMessage>

    {/* Proposition de concept */}
    <AIMessage>
      <span className="text-[#CDCEBD] font-semibold block mb-2">✨ Proposition de concept</span>
      {result.strategic_advice}
    </AIMessage>

    {/* Image générée */}
    {result.image_url && (
      <div className="ml-13">
        <div className="bg-white border-2 border-[#6B705C] p-4 max-w-md">
          <p className="text-[#6B705C] text-xs font-bold uppercase tracking-wider mb-3">Aperçu du concept</p>
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
            download="eonite-concept.png"
            className="mt-3 inline-flex items-center gap-2 text-[#6B705C] hover:text-[#1A1A1A] font-medium text-sm"
          >
            <Download size={16} />
            Télécharger l'aperçu
          </a>
        </div>
      </div>
    )}

    {/* Invitation session design */}
    <AIMessage>
      <span className="text-[#CDCEBD] font-semibold block mb-2">🗓️ Prochaine étape</span>
      Pour transformer ce concept en BAT concret (format précis, visuels, placement des éléments) et gagner du temps, le plus efficace est de réserver une <strong>session design de 30 minutes</strong> avec un expert EONITE.
      
      Pendant cette session, on reprend vos réponses, on valide ensemble les choix techniques et on prépare un BAT prêt à être validé.
      
      <span className="text-[#F9F8EF]/70 block mt-2 text-sm">Cela vous évite des allers-retours par email : en 30 minutes, on clarifie tout et vous repartez avec une proposition claire.</span>
    </AIMessage>

    {/* CTA */}
    <div className="ml-13 space-y-3">
      <Link to={`/reservation?business=${encodeURIComponent(clientData.enseigne)}`}>
        <Button className="bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] px-8 py-6 text-lg font-bold w-full sm:w-auto">
          <Calendar className="mr-2" size={20} />
          Réserver ma session design
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </Link>
      <p className="text-[#1A1A1A]/50 text-sm">
        Vous pouvez aussi continuer à discuter avec moi ici si vous avez des questions.
      </p>
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
  const [inputConfig, setInputConfig] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  
  // Client data collection
  const [clientData, setClientData] = useState({
    nom: '',
    telephone: '',
    enseigne: '',
    activite: '',
    specialite: '',
    produit: '',
    volume: '',
    poigneesImportant: null,
    poignees: '',
    papier: '',
    couleur: '',
    hasLogo: null,
    hasCharte: null,
    hasVisuels: null,
    branding: '',
    style: '',
    elements: ''
  });

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping, showInput]);

  // Initialize
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    startConversation();
  }, []);

  const addMessage = (type, content) => {
    setMessages(prev => [...prev, { type, content, id: Date.now() + Math.random() }]);
  };

  const simulateTyping = async (duration = 1200) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, duration));
    setIsTyping(false);
  };

  const updateClientData = (key, value) => {
    setClientData(prev => ({ ...prev, [key]: value }));
  };

  // ============================================
  // CONVERSATION FLOW
  // ============================================

  const startConversation = async () => {
    await simulateTyping(1000);
    addMessage('ai', "Bonjour, je suis EON, l'agent EONITE dédié à vos packagings. Je vais vous poser quelques questions pour comprendre votre projet et vous proposer un design adapté.");
    await simulateTyping(1000);
    addMessage('ai', "Pour commencer, comment vous appelez-vous ?");
    setShowInput(true);
    setInputConfig({ type: 'text', placeholder: 'Votre prénom', key: 'nom' });
    setCurrentStep('nom');
  };

  const handleTextSubmit = async (value) => {
    setShowInput(false);
    addMessage('user', value);
    
    switch (currentStep) {
      case 'nom':
        updateClientData('nom', value);
        await simulateTyping(800);
        addMessage('ai', `Enchanté ${value} ! Quel est le numéro pour vous joindre ?`);
        setShowInput(true);
        setInputConfig({ type: 'tel', placeholder: '06 XX XX XX XX', key: 'telephone' });
        setCurrentStep('telephone');
        break;
        
      case 'telephone':
        updateClientData('telephone', value);
        await simulateTyping(800);
        addMessage('ai', "Et pour finir, quel est le nom de votre enseigne ?");
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Nom de votre établissement', key: 'enseigne' });
        setCurrentStep('enseigne');
        break;
        
      case 'enseigne':
        updateClientData('enseigne', value);
        await simulateTyping(1000);
        addMessage('ai', `Parfait, merci pour ces informations ! Maintenant parlons de votre projet.\n\nQuelle est votre activité principale ? (ex. restaurant, boulangerie, coffee shop, épicerie fine, dark kitchen…)`);
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Ex: Restaurant, Boulangerie...', key: 'activite' });
        setCurrentStep('activite');
        break;
        
      case 'activite':
        updateClientData('activite', value);
        await simulateTyping(1000);
        addMessage('ai', "Et quelle est votre spécialité ou votre positionnement ? (ex. burgers gourmets, pâtisserie haut de gamme, café de spécialité, traiteur oriental…)");
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Votre spécialité...', key: 'specialite' });
        setCurrentStep('specialite');
        break;
        
      case 'specialite':
        updateClientData('specialite', value);
        await simulateTyping(1000);
        addMessage('ai', "Racontez-moi simplement quel produit ou quels produits vous voulez surtout emballer ou mettre en avant (ex. sandwichs, menus à emporter, gâteaux, boissons, paniers traiteur…)");
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Vos produits principaux...', key: 'produit' });
        setCurrentStep('produit');
        break;
        
      case 'produit':
        updateClientData('produit', value);
        await simulateTyping(800);
        addMessage('ai', `Parfait, vous voulez donc surtout un packaging adapté pour : ${value}.\n\nQuelle quantité annuelle estimez-vous avoir besoin ?`);
        setShowInput(true);
        setInputConfig({ type: 'options', options: VOLUME_OPTIONS, key: 'volume' });
        setCurrentStep('volume');
        break;
        
      case 'style':
        updateClientData('style', value);
        await simulateTyping(1000);
        addMessage('ai', "Dernier point : y a-t-il des éléments qui doivent absolument apparaître sur votre design ?\n\n(ex. logo, slogan, mentions légales, labels, coordonnées, réseaux sociaux…)\n\nVous pouvez me lister librement ce qui est obligatoire pour vous.");
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Éléments obligatoires...', key: 'elements' });
        setCurrentStep('elements');
        break;
        
      case 'elements':
        updateClientData('elements', value);
        // Generate synthesis
        await handleGenerateSynthesis({ ...clientData, elements: value });
        break;
        
      default:
        break;
    }
  };

  const handleOptionSelect = async (option) => {
    setShowInput(false);
    addMessage('user', option.label);
    
    switch (currentStep) {
      case 'volume':
        updateClientData('volume', option.label);
        await simulateTyping(1000);
        addMessage('ai', "Pour vos sacs, est-ce que le type de poignée est déterminant pour vous, ou ce n'est pas un point sensible ?");
        setShowInput(true);
        setInputConfig({ type: 'yesno', key: 'poigneesImportant' });
        setCurrentStep('poignees_question');
        break;
        
      case 'poignees_choice':
        updateClientData('poignees', option.label);
        await simulateTyping(800);
        addMessage('ai', `Je note pour les poignées : ${option.label}.\n\nVous préférez plutôt un papier vierge ou recyclé ?`);
        setShowInput(true);
        setInputConfig({ type: 'options', options: PAPER_OPTIONS, key: 'papier' });
        setCurrentStep('papier');
        break;
        
      case 'papier':
        updateClientData('papier', option.label);
        await simulateTyping(800);
        addMessage('ai', "Et plutôt un rendu kraft marron (plus artisanal) ou blanc (plus net et moderne) pour votre image de marque ?");
        setShowInput(true);
        setInputConfig({ type: 'options', options: COLOR_OPTIONS, key: 'couleur' });
        setCurrentStep('couleur');
        break;
        
      case 'couleur':
        updateClientData('couleur', option.label);
        await simulateTyping(1000);
        addMessage('ai', "Parlons maintenant de votre identité visuelle.\n\nEst-ce que vous avez déjà un logo ou une identité visuelle en place ?");
        setShowInput(true);
        setInputConfig({ type: 'yesno', key: 'hasLogo' });
        setCurrentStep('branding_logo');
        break;
        
      default:
        break;
    }
  };

  const handleYesNo = async (value) => {
    setShowInput(false);
    addMessage('user', value ? 'Oui' : 'Non');
    
    switch (currentStep) {
      case 'poignees_question':
        updateClientData('poigneesImportant', value);
        if (value) {
          await simulateTyping(800);
          addMessage('ai', "Très bien. Vous imaginez plutôt des poignées plates, des poignées torsadées, ou des sacs sans poignées (type sachet) ?");
          setShowInput(true);
          setInputConfig({ type: 'options', options: HANDLE_OPTIONS, key: 'poignees' });
          setCurrentStep('poignees_choice');
        } else {
          updateClientData('poignees', 'Solution standard (à ajuster)');
          await simulateTyping(800);
          addMessage('ai', "Parfait, je noterai une solution standard et robuste, et on ajustera les poignées si besoin plus tard.\n\nVous préférez plutôt un papier vierge ou recyclé ?");
          setShowInput(true);
          setInputConfig({ type: 'options', options: PAPER_OPTIONS, key: 'papier' });
          setCurrentStep('papier');
        }
        break;
        
      case 'branding_logo':
        updateClientData('hasLogo', value);
        await simulateTyping(800);
        if (value) {
          addMessage('ai', "Disposez-vous d'une charte graphique (couleurs, typo, règles) ou plutôt d'un logo simple sans règles formalisées ?");
          setShowInput(true);
          setInputConfig({ type: 'yesno', key: 'hasCharte' });
          setCurrentStep('branding_charte');
        } else {
          updateClientData('branding', 'Pas de logo existant');
          await simulateTyping(800);
          addMessage('ai', "Pas de souci, on pourra travailler sur une identité visuelle simple.\n\nSi on parle de ressenti, quel style correspond le mieux à votre marque ? Vous pouvez me décrire librement (ex. minimaliste, très coloré, premium, éco, traditionnel…)");
          setShowInput(true);
          setInputConfig({ type: 'text', placeholder: 'Décrivez votre style...', key: 'style' });
          setCurrentStep('style');
        }
        break;
        
      case 'branding_charte':
        updateClientData('hasCharte', value);
        await simulateTyping(800);
        addMessage('ai', "Avez-vous des photos ou visuels (devanture, produits, Instagram, site web) dont on peut s'inspirer pour le design du packaging ?");
        setShowInput(true);
        setInputConfig({ type: 'yesno', key: 'hasVisuels' });
        setCurrentStep('branding_visuels');
        break;
        
      case 'branding_visuels':
        updateClientData('hasVisuels', value);
        const brandingLevel = clientData.hasCharte 
          ? 'Logo + Charte graphique' 
          : 'Logo simple';
        const visuelsText = value ? ' + visuels disponibles' : '';
        updateClientData('branding', brandingLevel + visuelsText);
        
        await simulateTyping(1000);
        addMessage('ai', `Parfait, merci pour ces précisions. Avec ce niveau de branding (${brandingLevel}${visuelsText}), je peux mieux adapter la proposition de design.\n\nSi on parle de ressenti, quel style correspond le mieux à votre marque ? Vous pouvez me décrire librement (ex. minimaliste, très coloré, premium, éco, traditionnel…)`);
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Décrivez votre style...', key: 'style' });
        setCurrentStep('style');
        break;
        
      default:
        break;
    }
  };

  const handleGenerateSynthesis = async (finalData) => {
    setShowInput(false);
    setIsGenerating(true);
    
    try {
      // Map to API format
      const apiData = {
        business_type: finalData.activite.toLowerCase().includes('franchise') ? 'franchise' : 
                       finalData.activite.toLowerCase().includes('restaurant') ? 'restaurant' :
                       finalData.activite.toLowerCase().includes('boulangerie') ? 'boulangerie' :
                       finalData.activite.toLowerCase().includes('café') || finalData.activite.toLowerCase().includes('coffee') ? 'cafe' :
                       finalData.activite.toLowerCase().includes('dark kitchen') ? 'dark_kitchen' :
                       'autre',
        product_type: finalData.produit.toLowerCase().includes('gobelet') ? 'gobelet' :
                      finalData.produit.toLowerCase().includes('boîte') || finalData.produit.toLowerCase().includes('box') ? 'boite' :
                      finalData.produit.toLowerCase().includes('luxe') ? 'sac_luxe' : 'sac_kraft',
        volume_estimate: finalData.volume.includes('30 000') && finalData.volume.includes('Plus') ? '50k+' :
                        finalData.volume.includes('30 000') || finalData.volume.includes('20 000') ? '10k-50k' :
                        finalData.volume.includes('10 000') || finalData.volume.includes('15 000') ? '5k-10k' : '<5k',
        brand_style: finalData.style.toLowerCase().includes('luxe') || finalData.style.toLowerCase().includes('premium') ? 'luxe' :
                     finalData.style.toLowerCase().includes('éco') || finalData.style.toLowerCase().includes('nature') ? 'eco' :
                     finalData.style.toLowerCase().includes('fun') || finalData.style.toLowerCase().includes('color') ? 'fun' : 'minimaliste',
        text_on_bag: finalData.elements || finalData.enseigne,
        business_name: finalData.enseigne
      };
      
      const result = await assistantApi.createDesign(apiData);
      setAiResult(result);
      setClientData(finalData);
      setCurrentStep('result');
    } catch (error) {
      console.error('Error:', error);
      // Fallback
      setAiResult({
        strategic_advice: `Je vous propose un concept de packaging aligné avec ce que vous décrivez : un design qui met en avant votre identité "${finalData.enseigne}", avec un style ${finalData.style || 'adapté à votre activité'}, en respectant vos contraintes de poignées (${finalData.poignees}), de papier (${finalData.papier} ${finalData.couleur}) et vos éléments obligatoires.`,
        image_url: null
      });
      setClientData(finalData);
      setCurrentStep('result');
    } finally {
      setIsGenerating(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  const renderInput = () => {
    if (!showInput || !inputConfig) return null;
    
    switch (inputConfig.type) {
      case 'text':
      case 'tel':
        return (
          <TextInput 
            placeholder={inputConfig.placeholder}
            onSubmit={handleTextSubmit}
            disabled={isTyping}
            type={inputConfig.type}
          />
        );
      case 'options':
        return (
          <QuickReplies 
            options={inputConfig.options}
            onSelect={handleOptionSelect}
            disabled={isTyping}
          />
        );
      case 'yesno':
        return (
          <YesNoButtons 
            onSelect={handleYesNo}
            disabled={isTyping}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F8EF] flex flex-col">
      {/* Magic Loading Screen */}
      {isGenerating && <MagicLoadingScreen businessName={clientData.enseigne} />}

      {/* Header */}
      <div className="bg-[#6B705C] py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center">
            <Sparkles size={20} className="text-[#F9F8EF]" />
          </div>
          <div>
            <h1 className="text-[#F9F8EF] font-bold">EON <span className="font-normal opacity-70">• Conseiller Packaging Expert</span></h1>
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
          {currentStep === 'result' && aiResult && (
            <ResultDisplay 
              result={aiResult} 
              clientData={clientData}
            />
          )}
        </div>
      </div>

      {/* Input Area */}
      {showInput && !isGenerating && currentStep !== 'result' && (
        <div className="border-t-2 border-[#6B705C]/20 bg-white py-4 px-4">
          <div className="max-w-3xl mx-auto">
            {renderInput()}
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
          animation: loading-bar 30s ease-out forwards;
        }
      `}</style>
    </main>
  );
};

export default AssistantPage;
