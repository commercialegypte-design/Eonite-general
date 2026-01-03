import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Send, Download, Calendar, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { assistantApi } from '../lib/api';

// ============================================
// CONVERSATION FLOW OPTIONS
// ============================================

const VOLUME_OPTIONS = [
  { id: '<5k', label: 'Moins de 5 000' },
  { id: '5k', label: '5 000 à 10 000' },
  { id: '10k', label: '10 000 à 20 000' },
  { id: '20k', label: '20 000 à 30 000' },
  { id: '30k+', label: 'Plus de 30 000' },
];

const HANDLE_OPTIONS = [
  { id: 'plates', label: 'Poignées plates' },
  { id: 'torsadees', label: 'Poignées torsadées' },
  { id: 'sans', label: 'Sans poignées (sachet)' },
  { id: 'indifferent', label: 'Je ne suis pas sûr' },
];

const PAPER_OPTIONS = [
  { id: 'vierge', label: 'Papier vierge' },
  { id: 'recycle', label: 'Papier recyclé' },
  { id: 'indifferent', label: 'Pas de préférence' },
];

// ============================================
// UI COMPONENTS
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
    data-testid="ai-message"
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
  <div className="flex justify-end animate-fade-in" data-testid="user-message">
    <div className="bg-[#CDCEBD] text-[#1A1A1A] px-5 py-4 rounded-2xl rounded-br-none max-w-[80%]">
      <p className="font-medium">{children}</p>
    </div>
  </div>
);

const QuickReplies = ({ options, onSelect, disabled }) => (
  <div className="flex flex-wrap gap-2 mt-4 animate-fade-in" data-testid="quick-replies">
    {options.map((option) => (
      <button
        key={option.id}
        onClick={() => !disabled && onSelect(option)}
        disabled={disabled}
        data-testid={`option-${option.id}`}
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
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 animate-fade-in" data-testid="text-input-form">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        data-testid="text-input"
        className="flex-1 h-12 bg-white border-2 border-[#6B705C]/30 focus:border-[#6B705C] text-lg"
        autoFocus
      />
      <Button 
        type="submit" 
        disabled={!value.trim() || disabled}
        data-testid="send-button"
        className="h-12 px-6 bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF]"
      >
        <Send size={20} />
      </Button>
    </form>
  );
};

const YesNoButtons = ({ onSelect, disabled }) => (
  <div className="flex gap-3 mt-4 animate-fade-in" data-testid="yes-no-buttons">
    <button
      onClick={() => !disabled && onSelect(true)}
      disabled={disabled}
      data-testid="yes-button"
      className="px-8 py-3 bg-[#6B705C] text-[#F9F8EF] font-medium transition-all hover:bg-[#5A5F4D]"
    >
      Oui
    </button>
    <button
      onClick={() => !disabled && onSelect(false)}
      disabled={disabled}
      data-testid="no-button"
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
  <div className="fixed inset-0 bg-[#1A1A1A] z-50 flex items-center justify-center animate-fade-in" data-testid="loading-screen">
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
        Je prépare votre synthèse...
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

const ResultDisplay = ({ result, clientData }) => (
  <div className="space-y-6 animate-fade-in" data-testid="result-display">
    {/* Résumé */}
    <AIMessage>
      <span className="text-[#CDCEBD] font-semibold block mb-3">📋 Si je résume notre échange :</span>
      <div className="space-y-2 text-sm">
        <p>• <strong>Vous</strong> : {clientData.prenom} de {clientData.enseigne}</p>
        <p>• <strong>Activité</strong> : {clientData.activite}</p>
        <p>• <strong>Produit principal</strong> : {clientData.produit}</p>
        <p>• <strong>Volume annuel</strong> : environ {clientData.volume}</p>
        <p>• <strong>Poignées</strong> : {clientData.poignees || 'À définir ensemble'}</p>
        <p>• <strong>Papier</strong> : {clientData.papier}</p>
        <p>• <strong>Identité visuelle</strong> : {clientData.branding || 'À créer ou développer'}</p>
        <p>• <strong>Éléments à intégrer</strong> : {clientData.elements || 'À préciser'}</p>
      </div>
    </AIMessage>

    {/* Proposition de concept */}
    <AIMessage>
      <span className="text-[#CDCEBD] font-semibold block mb-2">✨ Ma proposition</span>
      {result.strategic_advice}
    </AIMessage>

    {/* Image générée */}
    {result.image_url && (
      <div className="ml-13" data-testid="generated-image">
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

    {/* Pitch pour la session design */}
    <AIMessage>
      <span className="text-[#CDCEBD] font-semibold block mb-2">🗓️ La suite ?</span>
      On a fait un bon tour d'horizon. Pour passer à l'étape concrète — c'est-à-dire créer ensemble votre BAT (bon à tirer) avec les vraies dimensions, couleurs Pantone, et placement des éléments — le plus simple c'est qu'on se cale <strong>30 minutes en visio</strong>.

      En général, on ressort de cette session avec un design quasi finalisé. Vous validez, et on lance la prod.

      <span className="text-[#F9F8EF]/70 block mt-3 text-sm italic">
        (Pas de panique, c'est sans engagement. On discute, vous voyez si ça vous convient.)
      </span>
    </AIMessage>

    {/* CTA */}
    <div className="ml-13 space-y-3" data-testid="cta-section">
      <Link to={`/reservation?business=${encodeURIComponent(clientData.enseigne)}&contact=${encodeURIComponent(clientData.prenom)}`}>
        <Button 
          className="bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] px-8 py-6 text-lg font-bold w-full sm:w-auto"
          data-testid="book-session-button"
        >
          <Calendar className="mr-2" size={20} />
          Réserver ma session design
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </Link>
      <p className="text-[#1A1A1A]/50 text-sm">
        Des questions ? Vous pouvez continuer à discuter avec moi ici.
      </p>
    </div>
  </div>
);

// ============================================
// MAIN ASSISTANT COMPONENT
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
  
  // Client data collection - Nouvelle structure
  const [clientData, setClientData] = useState({
    prenom: '',
    enseigne: '',
    activite: '',
    produit: '',
    volume: '',
    poignees: '',
    papier: '',
    hasLogo: null,
    branding: '',
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
  // CONVERSATION FLOW - NOUVELLE VERSION
  // ============================================

  const startConversation = async () => {
    await simulateTyping(1000);
    addMessage('ai', "Salut ! Moi c'est EON, je suis là pour vous aider à imaginer votre prochain emballage.\n\nOn va faire ça de façon simple : quelques questions pour bien comprendre votre projet, et à la fin je vous propose une direction.");
    await simulateTyping(1200);
    addMessage('ai', "Pour commencer, c'est quoi votre prénom ?");
    setShowInput(true);
    setInputConfig({ type: 'text', placeholder: 'Votre prénom', key: 'prenom' });
    setCurrentStep('prenom');
  };

  const handleTextSubmit = async (value) => {
    setShowInput(false);
    addMessage('user', value);
    
    switch (currentStep) {
      case 'prenom':
        updateClientData('prenom', value);
        await simulateTyping(800);
        addMessage('ai', `Enchanté ${value} ! Et vous travaillez pour quelle enseigne ou établissement ?`);
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Nom de votre établissement', key: 'enseigne' });
        setCurrentStep('enseigne');
        break;
        
      case 'enseigne':
        updateClientData('enseigne', value);
        await simulateTyping(1000);
        addMessage('ai', `Ok, ${value}. Et vous êtes dans quel secteur d'activité ?\n\nRestaurant, boulangerie, coffee shop, épicerie fine, dark kitchen... Dites-moi juste avec vos mots.`);
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Ex: Restaurant italien, Boulangerie artisanale...', key: 'activite' });
        setCurrentStep('activite');
        break;
        
      case 'activite':
        updateClientData('activite', value);
        await simulateTyping(1000);
        addMessage('ai', `D'accord, ${value.toLowerCase().includes('restaurant') ? 'belle activité' : 'intéressant'} !\n\nEt concrètement, c'est quoi le produit principal que vous voulez emballer ? Un sandwich, des plats à emporter, des gâteaux, du café...?`);
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Ex: Sandwichs, menus à emporter, pâtisseries...', key: 'produit' });
        setCurrentStep('produit');
        break;
        
      case 'produit':
        updateClientData('produit', value);
        await simulateTyping(1000);
        addMessage('ai', `Parfait, donc on parle surtout d'emballer : ${value}.\n\nEn termes de volume, vous estimez avoir besoin de combien d'unités par an à peu près ?`);
        setShowInput(true);
        setInputConfig({ type: 'options', options: VOLUME_OPTIONS, key: 'volume' });
        setCurrentStep('volume');
        break;
        
      case 'branding_description':
        updateClientData('branding', value);
        await simulateTyping(1000);
        addMessage('ai', `Super, je visualise bien.\n\nDernière chose : est-ce qu'il y a des éléments qui doivent absolument apparaître sur le packaging ?\n\nJe pense au logo évidemment, mais aussi un slogan, des mentions légales, des labels, vos réseaux sociaux... Listez-moi tout ce qui est non-négociable.`);
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Ex: Logo, slogan, QR code menu, @instagram...', key: 'elements' });
        setCurrentStep('elements');
        break;
        
      case 'elements':
        updateClientData('elements', value);
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
        addMessage('ai', `Noté. On est sur du ${option.label} unités/an.\n\nMaintenant un truc plus technique : le type de poignée, c'est quelque chose d'important pour vous, ou vous préférez qu'on en discute plus tard ?`);
        setShowInput(true);
        setInputConfig({ type: 'options', options: HANDLE_OPTIONS, key: 'poignees' });
        setCurrentStep('poignees');
        break;
        
      case 'poignees':
        updateClientData('poignees', option.label);
        await simulateTyping(800);
        const poigneesComment = option.id === 'indifferent' 
          ? "Pas de souci, on verra ça ensemble en détail."
          : `Ok, ${option.label.toLowerCase()}.`;
        addMessage('ai', `${poigneesComment}\n\nEt côté papier, vous avez une préférence entre papier vierge classique ou papier recyclé ?`);
        setShowInput(true);
        setInputConfig({ type: 'options', options: PAPER_OPTIONS, key: 'papier' });
        setCurrentStep('papier');
        break;
        
      case 'papier':
        updateClientData('papier', option.label);
        await simulateTyping(1000);
        addMessage('ai', `Parfait.\n\nMaintenant parlons de votre identité visuelle. Est-ce que vous avez déjà un logo et une charte graphique en place ?`);
        setShowInput(true);
        setInputConfig({ type: 'yesno', key: 'hasLogo' });
        setCurrentStep('branding_question');
        break;
        
      default:
        break;
    }
  };

  const handleYesNo = async (value) => {
    setShowInput(false);
    addMessage('user', value ? 'Oui' : 'Non');
    
    switch (currentStep) {
      case 'branding_question':
        updateClientData('hasLogo', value);
        await simulateTyping(1000);
        if (value) {
          updateClientData('branding', 'Logo et charte existants');
          addMessage('ai', `Super, ça va nous faire gagner du temps.\n\nPour que je puisse imaginer une direction cohérente avec votre univers, comment décririez-vous le style de votre marque en quelques mots ?\n\n(Ex: "minimaliste et épuré", "coloré et fun", "haut de gamme", "artisanal et authentique"...)`);
        } else {
          updateClientData('branding', 'À créer');
          addMessage('ai', `Pas de problème, on peut partir de zéro.\n\nDans ce cas, quel style ou quelle ambiance aimeriez-vous donner à votre marque à travers le packaging ?\n\n(Ex: "moderne et sobre", "chaleureux et artisanal", "premium", "éco-responsable"...)`);
        }
        setShowInput(true);
        setInputConfig({ type: 'text', placeholder: 'Décrivez l\'ambiance souhaitée...', key: 'branding_description' });
        setCurrentStep('branding_description');
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
                        finalData.volume.includes('20 000') || finalData.volume.includes('30 000') ? '10k-50k' :
                        finalData.volume.includes('10 000') ? '5k-10k' : '<5k',
        brand_style: finalData.branding.toLowerCase().includes('luxe') || finalData.branding.toLowerCase().includes('premium') || finalData.branding.toLowerCase().includes('haut de gamme') ? 'luxe' :
                     finalData.branding.toLowerCase().includes('éco') || finalData.branding.toLowerCase().includes('nature') || finalData.branding.toLowerCase().includes('recyclé') ? 'eco' :
                     finalData.branding.toLowerCase().includes('fun') || finalData.branding.toLowerCase().includes('color') || finalData.branding.toLowerCase().includes('coloré') ? 'fun' : 'minimaliste',
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
        strategic_advice: `Avec ce que vous m'avez partagé sur ${finalData.enseigne}, je vois un packaging qui reflète vraiment votre identité "${finalData.branding || 'unique'}". 

Pour vos ${finalData.produit}, je recommanderais un sac en ${finalData.papier.toLowerCase().includes('recyclé') ? 'kraft recyclé authentique' : 'papier premium'}, avec vos éléments clés (${finalData.elements || 'logo'}) mis en valeur de façon élégante.

Le volume que vous ciblez (${finalData.volume}) nous permet d'envisager une personnalisation complète à un prix très compétitif.`,
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
    <main className="min-h-screen bg-[#F9F8EF] flex flex-col" data-testid="assistant-page">
      {/* Magic Loading Screen */}
      {isGenerating && <MagicLoadingScreen businessName={clientData.enseigne} />}

      {/* Header */}
      <div className="bg-[#6B705C] py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center">
            <Sparkles size={20} className="text-[#F9F8EF]" />
          </div>
          <div>
            <h1 className="text-[#F9F8EF] font-bold">EON <span className="font-normal opacity-70">• Conseiller Packaging</span></h1>
            <p className="text-[#F9F8EF]/60 text-sm">En ligne</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto py-8 px-4"
        style={{ maxHeight: 'calc(100vh - 180px)' }}
        data-testid="chat-area"
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
        <div className="border-t-2 border-[#6B705C]/20 bg-white py-4 px-4" data-testid="input-area">
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
