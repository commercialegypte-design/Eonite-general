// EONITE - Knowledge Base (TypeScript Port)
// Catalogue industriel 2024 - Packaging B2B

// ============================================
// TYPES
// ============================================

export interface ProductSpec {
  nom: string;
  grammage: string;
  finitions?: string[];
  materiaux?: string[];
  poignees?: string;
  options?: string[];
  tailles?: string[];
  contenance?: string[];
  usage_ideal: string[];
  resistance_poids?: string;
  conseil_technique: string;
}

export interface Recommendation {
  type: string;
  conseil: string;
  produits?: string[];
  option?: string;
  finition_recommandee?: string;
}

export interface CompetitorAnalysis {
  style?: string;
  forces?: string;
  conseil_eonite: string;
}

// ============================================
// CATALOGUE TECHNIQUE
// ============================================

export const SACS_CATALOGUE: Record<string, ProductSpec> = {
  "kraft_poignees_plates": {
    "nom": "Sac Kraft Poignées Plates",
    "grammage": "90-110 Gsm",
    "finitions": ["Nature", "Blanc", "Personnalisé CMYK"],
    "poignees": "Plates découpées",
    "usage_ideal": ["Vente à emporter légère", "Boulangerie", "Épicerie"],
    "resistance_poids": "Jusqu'à 3kg",
    "conseil_technique": "Idéal pour les produits secs et légers. Poignée intégrée = économie de coût."
  },
  "kraft_poignees_torsadees": {
    "nom": "Sac Kraft Poignées Torsadées",
    "grammage": "100-120 Gsm",
    "finitions": ["Nature", "Blanc", "Couleur unie", "Quadri HD"],
    "poignees": "Torsadées kraft renforcé",
    "usage_ideal": ["Restaurant", "Vente à emporter lourde", "Multi-contenants"],
    "resistance_poids": "Jusqu'à 8kg",
    "conseil_technique": "Le standard professionnel. Poignées torsadées = confort client + résistance maximale."
  },
  "sac_luxe_ruban": {
    "nom": "Sac Shopping Luxe",
    "grammage": "170-230 Gsm",
    "finitions": ["Pelliculage mat/brillant", "Marquage à chaud", "Gaufrage", "Vernis sélectif"],
    "poignees": "Ruban satin ou cordelette coton",
    "usage_ideal": ["Boutique haut de gamme", "Cadeaux", "Cosmétique", "Mode"],
    "resistance_poids": "Jusqu'à 5kg",
    "conseil_technique": "L'emballage premium par excellence. Le client le garde = publicité gratuite."
  }
};

export const BOITES_CATALOGUE: Record<string, ProductSpec> = {
  "boite_burger": {
    "nom": "Boîte Burger",
    "grammage": "230-280 Gsm",
    "materiaux": ["Carton kraft", "Carton blanchi FSC"],
    "options": ["Fenêtre transparente", "Fermeture à languette", "Aération intégrée"],
    "usage_ideal": ["Burger", "Sandwich", "Wraps"],
    "conseil_technique": "Pour burgers chauds : exiger grammage 280 Gsm + aération. Évite la condensation."
  },
  "boite_patisserie": {
    "nom": "Boîte Pâtisserie",
    "grammage": "250-300 Gsm",
    "materiaux": ["Carton compact blanc", "Carton SBS (Solid Bleached Sulfate)"],
    "options": ["Fenêtre PET", "Calage intérieur", "Fermeture sécurisée"],
    "usage_ideal": ["Gâteaux", "Macarons", "Viennoiseries"],
    "conseil_technique": "Le carton SBS offre une blancheur supérieure. Impression HD recommandée."
  },
  "boite_pizza": {
    "nom": "Boîte Pizza",
    "grammage": "300-350 Gsm",
    "materiaux": ["Carton ondulé micro-cannelure"],
    "options": ["Trous d'aération", "Impression flexo/offset"],
    "tailles": ["26cm", "33cm", "40cm", "50cm"],
    "conseil_technique": "Micro-cannelure = résistance + isolation thermique. Trous latéraux obligatoires pour la vapeur."
  }
};

export const GOBELETS_CATALOGUE: Record<string, ProductSpec> = {
  "gobelet_simple_paroi": {
    "nom": "Gobelet Simple Paroi",
    "grammage": "230-280 Gsm + PE",
    "contenance": ["4oz (120ml)", "8oz (240ml)", "12oz (350ml)", "16oz (450ml)"],
    "usage_ideal": ["Boissons froides", "Soft drinks", "Jus"],
    "conseil_technique": "Revêtement PE intérieur = étanchéité parfaite. Pas pour boissons > 65°C."
  },
  "gobelet_double_paroi": {
    "nom": "Gobelet Double Paroi",
    "grammage": "250-300 Gsm × 2",
    "contenance": ["8oz (240ml)", "12oz (350ml)", "16oz (450ml)"],
    "usage_ideal": ["Café", "Thé", "Chocolat chaud"],
    "conseil_technique": "Double paroi = isolation thermique sans manchon. Premium mais économique sur le long terme."
  },
  "gobelet_ripple_wall": {
    "nom": "Gobelet Ripple Wall (Ondulé)",
    "grammage": "230 Gsm + ondulé",
    "contenance": ["8oz", "12oz", "16oz"],
    "usage_ideal": ["Coffee shop", "Chaînes de café"],
    "conseil_technique": "L'ondulation offre grip + isolation. Standard Starbucks/Costa. Impression 1-2 couleurs recommandée."
  }
};

// ============================================
// DIAGNOSTIC INTELLIGENT
// ============================================

export const DIAGNOSTIC_RULES = {
  "transport_chaud": {
    "keywords": ["burger", "frites", "pizza", "kebab", "poulet", "wok", "chaud", "friture", "grillé"],
    "conseil": "Pour le transport chaud, je recommande un carton fort grammage (280-350 Gsm) avec aération intégrée. Cela évite la condensation qui ramollit les emballages et les aliments.",
    "produits_recommandes": ["boite_burger", "boite_pizza"]
  },
  "vente_emporter": {
    "keywords": ["emporter", "take away", "livraison", "delivery", "uber", "deliveroo", "dark kitchen"],
    "conseil": "En vente à emporter, je recommande systématiquement d'intégrer un QR code sur l'emballage. Ça permet de collecter les avis clients et de booster votre e-réputation. +30% d'avis en moyenne.",
    "option_recommandee": "qr_code"
  },
  "eco_responsable": {
    "keywords": ["bio", "écolo", "vert", "nature", "durable", "recyclé", "vegan", "organic"],
    "conseil": "Pour une image éco-responsable authentique, je recommande du kraft non blanchi certifié FSC, avec encres végétales. On peut aussi ajouter un message 'Emballage 100% recyclable' directement imprimé.",
    "finition_recommandee": "kraft_nature_fsc"
  },
  "premium_luxe": {
    "keywords": ["luxe", "premium", "haut de gamme", "prestige", "élégant", "raffiné", "chic"],
    "conseil": "Pour un positionnement premium, je recommande un carton 250+ Gsm avec pelliculage soft-touch et marquage à chaud sur le logo. L'effet 'Wow' est garanti à l'ouverture.",
    "finition_recommandee": "soft_touch_marquage_chaud"
  }
};

// ============================================
// CONCURRENTS / INSPIRATIONS
// ============================================

export const COMPETITOR_ANALYSIS: Record<string, CompetitorAnalysis> = {
  "kedypack": {
    "style": "Industriel premium, volumes importants",
    "forces": "Prix agressifs sur gros volumes, rapidité de production",
    "conseil_eonite": "Pour égaler le standard Kedypack, nous allons miser sur un design épuré avec impression flexo haute fidélité. Prix compétitif dès 5000 unités."
  },
  "firplast": {
    "style": "Design minimaliste, finitions haut de gamme",
    "forces": "Catalogue large, personnalisation poussée",
    "conseil_eonite": "Pour égaler le standard Firplast, nous allons privilégier un design minimaliste avec impression HD et finitions premium (pelliculage, vernis sélectif)."
  },
  "raja": {
    "style": "Généraliste, large gamme",
    "forces": "Stock disponible, petites quantités",
    "conseil_eonite": "EONITE se différencie de Raja par le sur-mesure. Même en quantités modérées, vous obtenez un packaging unique, pas un produit de catalogue générique."
  },
  "packhelp": {
    "style": "Digital-first, startups",
    "forces": "Expérience en ligne simple, MOQ bas",
    "conseil_eonite": "Contrairement à Packhelp, nous offrons un accompagnement humain expert. Votre design est validé en visio avec un spécialiste packaging, pas par un algorithme."
  },
  "default": {
    "conseil_eonite": "Notre approche sur-mesure (Bespoke) nous permet de créer exactement ce dont vous avez besoin, même en quantités modérées. Notre objectif : décider du BON produit pour votre client avant même de passer commande."
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTechnicalSpecs(productType: string): ProductSpec | null {
  const allProducts = { ...SACS_CATALOGUE, ...BOITES_CATALOGUE, ...GOBELETS_CATALOGUE };
  
  const mapping: Record<string, string> = {
    "sac_kraft": "kraft_poignees_torsadees",
    "sac_luxe": "sac_luxe_ruban",
    "boite": "boite_burger",
    "gobelet": "gobelet_double_paroi"
  };
  
  const key = mapping[productType] || productType;
  return allProducts[key] || null;
}

export function analyzeUsage(description: string): Recommendation[] {
  const descriptionLower = description.toLowerCase();
  const recommendations: Recommendation[] = [];
  
  for (const [ruleKey, rule] of Object.entries(DIAGNOSTIC_RULES)) {
    if (rule.keywords.some(kw => descriptionLower.includes(kw))) {
      recommendations.push({
        type: ruleKey,
        conseil: rule.conseil,
        produits: rule.produits_recommandes,
        option: rule.option_recommandee,
        finition_recommandee: rule.finition_recommandee
      });
    }
  }
  
  return recommendations;
}

export function analyzeCompetitor(competitorName: string): CompetitorAnalysis {
  const competitorLower = competitorName.toLowerCase();
  
  for (const [key, data] of Object.entries(COMPETITOR_ANALYSIS)) {
    if (competitorLower.includes(key)) {
      return data;
    }
  }
  
  return COMPETITOR_ANALYSIS["default"];
}
