import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, TrendingDown, Leaf, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

// Pricing tiers
const QUANTITY_TIERS = [
  { qty: 5000, price: 0.35 },
  { qty: 10000, price: 0.28 },
  { qty: 25000, price: 0.22 },
  { qty: 50000, price: 0.18 },
];

const PRINT_COSTS = {
  '1_color': { label: '1 Couleur', cost: 0.02 },
  '2_colors': { label: '2 Couleurs', cost: 0.04 },
  'quadri': { label: 'Quadri', cost: 0.08 },
};

const SIZES = [
  { id: 'small', label: 'Petit', multiplier: 0.8 },
  { id: 'medium', label: 'Moyen', multiplier: 1.0 },
  { id: 'large', label: 'Grand', multiplier: 1.3 },
];

const PRODUCTS = [
  { id: 'sacs_kraft', label: 'Sacs Kraft' },
  { id: 'boites', label: 'Boîtes' },
  { id: 'gobelets', label: 'Gobelets' },
  { id: 'luxe', label: 'Luxe' },
];

// Animated number component for "magic" effect
const AnimatedNumber = ({ value, format = 'price', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsAnimating(true);
      const duration = 300;
      const startTime = Date.now();
      const startValue = prevValue.current;
      const diff = value - startValue;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = startValue + diff * eased;
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          prevValue.current = value;
        }
      };
      requestAnimationFrame(animate);
    }
  }, [value]);

  const formatted = format === 'price' 
    ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(displayValue)
    : format === 'unit'
    ? displayValue.toFixed(3) + ' €'
    : displayValue.toFixed(1);

  return (
    <span className={`${className} ${isAnimating ? 'scale-105' : ''} transition-transform duration-150`}>
      {formatted}
    </span>
  );
};

const Configurator = () => {
  const [product, setProduct] = useState('sacs_kraft');
  const [size, setSize] = useState('medium');
  const [quantity, setQuantity] = useState(10000);
  const [printType, setPrintType] = useState('1_color');
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [plasticSaved, setPlasticSaved] = useState(0);
  const [priceFlash, setPriceFlash] = useState(false);

  const calculatePrice = useCallback(() => {
    // Trigger flash effect
    setPriceFlash(true);
    setTimeout(() => setPriceFlash(false), 200);

    // Get base price from tier
    let tierPrice = QUANTITY_TIERS[0].price;
    for (const tier of QUANTITY_TIERS) {
      if (quantity >= tier.qty) {
        tierPrice = tier.price;
      }
    }

    // Add print cost
    const printCost = PRINT_COSTS[printType]?.cost || 0;
    
    // Apply size multiplier
    const sizeMultiplier = SIZES.find(s => s.id === size)?.multiplier || 1;
    
    // Calculate unit price
    const calculatedUnitPrice = (tierPrice + printCost) * sizeMultiplier;
    const calculatedTotal = calculatedUnitPrice * quantity;
    
    // Calculate savings vs minimum tier
    const maxPrice = (QUANTITY_TIERS[0].price + printCost) * sizeMultiplier;
    const potentialSavings = quantity >= 10000 ? (maxPrice - calculatedUnitPrice) * quantity : 0;
    
    // Calculate plastic saved (eco variable) - ~15g of plastic avoided per paper bag
    const plasticKg = quantity * 0.015;
    
    setUnitPrice(calculatedUnitPrice);
    setTotalPrice(calculatedTotal);
    setSavings(potentialSavings);
    setPlasticSaved(plasticKg);
  }, [product, size, quantity, printType]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const formatNumber = (num) => new Intl.NumberFormat('fr-FR').format(num);

  const quantityToSlider = (qty) => {
    if (qty <= 5000) return 0;
    if (qty <= 10000) return 33;
    if (qty <= 25000) return 66;
    return 100;
  };

  const sliderToQuantity = (val) => {
    if (val <= 25) return 5000;
    if (val <= 50) return 10000;
    if (val <= 75) return 25000;
    return 50000;
  };

  return (
    <div className="bg-[#F9F8EF] border-2 border-[#6B705C] p-6 lg:p-8 shadow-2xl" data-testid="configurator">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center">
          <Calculator size={28} className="text-[#F9F8EF]" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#1A1A1A]">Configurateur de Devis</h3>
          <p className="text-[#1A1A1A]/60 text-sm flex items-center gap-1">
            <Sparkles size={14} className="text-[#6B705C]" />
            Prix calculé instantanément
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Product Type */}
        <div>
          <label className="block text-sm font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">Type de produit</label>
          <div className="grid grid-cols-2 gap-2">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setProduct(p.id)}
                data-testid={`product-${p.id}`}
                className={`p-4 text-sm font-bold transition-all border-2 ${
                  product === p.id
                    ? 'bg-[#1A1A1A] text-[#F9F8EF] border-[#1A1A1A] scale-[1.02]'
                    : 'bg-transparent text-[#1A1A1A] border-[#6B705C]/30 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">Format</label>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                data-testid={`size-${s.id}`}
                className={`p-4 text-sm font-bold transition-all border-2 ${
                  size === s.id
                    ? 'bg-[#1A1A1A] text-[#F9F8EF] border-[#1A1A1A] scale-[1.02]'
                    : 'bg-transparent text-[#1A1A1A] border-[#6B705C]/30 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Quantité</label>
            <span className="text-3xl font-black text-[#1A1A1A]" data-testid="quantity-display">
              {formatNumber(quantity)}
            </span>
          </div>
          <Slider
            value={[quantityToSlider(quantity)]}
            onValueChange={(val) => setQuantity(sliderToQuantity(val[0]))}
            max={100}
            step={1}
            className="py-4"
            data-testid="quantity-slider"
          />
          <div className="flex justify-between text-xs text-[#1A1A1A]/50 mt-2 font-medium">
            <span>5 000</span>
            <span>10 000</span>
            <span>25 000</span>
            <span>50 000</span>
          </div>
        </div>

        {/* Print Type */}
        <div>
          <label className="block text-sm font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">Impression</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(PRINT_COSTS).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setPrintType(key)}
                data-testid={`print-${key}`}
                className={`p-4 text-sm font-bold transition-all border-2 ${
                  printType === key
                    ? 'bg-[#1A1A1A] text-[#F9F8EF] border-[#1A1A1A] scale-[1.02]'
                    : 'bg-transparent text-[#1A1A1A] border-[#6B705C]/30 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results - MAGIC ZONE */}
        <div className={`border-t-2 border-[#1A1A1A] pt-6 space-y-4 transition-all duration-200 ${priceFlash ? 'bg-[#6B705C]/5' : ''}`}>
          <div className="flex justify-between items-center">
            <span className="text-[#1A1A1A]/70 font-medium">Prix unitaire</span>
            <AnimatedNumber value={unitPrice} format="unit" className="text-2xl font-black text-[#1A1A1A]" />
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-[#1A1A1A]/70 font-medium">Total estimé</span>
            <AnimatedNumber 
              value={totalPrice} 
              format="price" 
              className="text-4xl font-black text-[#1A1A1A]" 
              data-testid="total-price"
            />
          </div>
          
          {/* ÉCONOMIE PLASTIQUE - VERT FONCÉ GRAS */}
          <div className="bg-[#2D4F2D] p-5 mt-4" data-testid="eco-impact">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#1A3A1A] flex items-center justify-center flex-shrink-0">
                <Leaf size={28} className="text-[#90EE90]" />
              </div>
              <div>
                <p className="text-[#90EE90]/80 text-xs uppercase tracking-wider font-bold">Impact Positif</p>
                <p className="text-[#F9F8EF] text-2xl font-black">
                  <AnimatedNumber value={plasticSaved} format="kg" className="text-[#90EE90]" />
                  <span className="text-[#90EE90] ml-1">kg</span>
                  <span className="text-[#F9F8EF]/70 font-medium text-base ml-2">de plastique évités</span>
                </p>
              </div>
            </div>
          </div>
          
          {savings > 0 && (
            <div className="flex items-center gap-2 bg-[#6B705C]/10 border-2 border-[#6B705C] p-4">
              <TrendingDown size={20} className="text-[#6B705C]" />
              <span className="text-[#6B705C] font-bold">
                Économie de <AnimatedNumber value={savings} format="price" className="font-black" /> vs. quantité min.
              </span>
            </div>
          )}
        </div>

        {/* CTA - IMPOSANT */}
        <Link 
          to={`/contact?product=${product}&size=${size}&quantity=${quantity}&print=${printType}&price=${totalPrice.toFixed(2)}`}
          data-testid="configurator-cta"
        >
          <Button className="w-full bg-[#1A1A1A] hover:bg-[#000000] text-[#F9F8EF] py-8 text-xl font-black uppercase tracking-wider border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            Démarrer mon design
            <ArrowRight className="ml-3" size={24} />
          </Button>
        </Link>
        
        <p className="text-center text-[#1A1A1A]/50 text-xs font-medium">
          Prix indicatif HT. Design validé en 30 minutes.
        </p>
      </div>
    </div>
  );
};

export default Configurator;
