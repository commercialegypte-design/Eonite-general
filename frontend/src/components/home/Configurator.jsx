import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, TrendingDown } from 'lucide-react';
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
  { id: 'boites', label: 'Boîtes Carton' },
  { id: 'gobelets', label: 'Gobelets' },
  { id: 'luxe', label: 'Luxe' },
];

const Configurator = () => {
  const [product, setProduct] = useState('sacs_kraft');
  const [size, setSize] = useState('medium');
  const [quantity, setQuantity] = useState(10000);
  const [printType, setPrintType] = useState('1_color');
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);

  const calculatePrice = useCallback(() => {
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
    
    setUnitPrice(calculatedUnitPrice);
    setTotalPrice(calculatedTotal);
    setSavings(potentialSavings);
  }, [product, size, quantity, printType]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const formatNumber = (num) => new Intl.NumberFormat('fr-FR').format(num);
  const formatPrice = (num) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num);

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
    <div className="bg-[#0A0A0A] border border-white/10 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#FF6B00] flex items-center justify-center">
          <Calculator size={24} className="text-black" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Configurateur Rapide</h3>
          <p className="text-white/60 text-sm">Estimez votre prix en 30 secondes</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Type de produit</label>
          <div className="grid grid-cols-2 gap-2">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setProduct(p.id)}
                className={`p-3 text-sm font-medium transition-all ${
                  product === p.id
                    ? 'bg-[#FF6B00] text-black'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Format</label>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className={`p-3 text-sm font-medium transition-all ${
                  size === s.id
                    ? 'bg-[#FF6B00] text-black'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
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
            <label className="text-sm font-medium text-white/80 uppercase tracking-wider">Quantité</label>
            <span className="text-2xl font-bold text-[#FF6B00]">{formatNumber(quantity)}</span>
          </div>
          <Slider
            value={[quantityToSlider(quantity)]}
            onValueChange={(val) => setQuantity(sliderToQuantity(val[0]))}
            max={100}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-white/40 mt-2">
            <span>5 000</span>
            <span>10 000</span>
            <span>25 000</span>
            <span>50 000</span>
          </div>
        </div>

        {/* Print Type */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Impression</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(PRINT_COSTS).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setPrintType(key)}
                className={`p-3 text-sm font-medium transition-all ${
                  printType === key
                    ? 'bg-[#FF6B00] text-black'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Prix unitaire</span>
            <span className="text-2xl font-bold text-white">{unitPrice.toFixed(3)} €</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/60">Total estimé</span>
            <span className="text-3xl font-black text-[#FF6B00]">{formatPrice(totalPrice)}</span>
          </div>
          
          {savings > 0 && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 p-3">
              <TrendingDown size={18} className="text-green-500" />
              <span className="text-green-500 text-sm">
                Économie de {formatPrice(savings)} vs. quantité min.
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link 
          to={`/contact?product=${product}&size=${size}&quantity=${quantity}&print=${printType}&price=${totalPrice.toFixed(2)}`}
        >
          <Button className="w-full btn-brutal py-6 text-lg">
            Valider ce devis
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>
        
        <p className="text-center text-white/40 text-xs">
          Prix indicatif HT. Devis définitif après validation du design.
        </p>
      </div>
    </div>
  );
};

export default Configurator;
