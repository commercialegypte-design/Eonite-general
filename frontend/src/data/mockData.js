// Mock data for Eonite - Emballages alimentaires professionnels

export const categories = [
  {
    id: 'sacs-poignees',
    name: 'Sacs Poignées',
    description: 'Sacs en papier avec poignées plates ou torsadées',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80'
  },
  {
    id: 'sacs-sos',
    name: 'Sacs SOS',
    description: 'Sacs en papier kraft brun ou blanc',
    icon: 'Package',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'
  },
  {
    id: 'boites-food',
    name: 'Boîtes Food',
    description: 'Boîtes pizza, burger, sandwich et wrap',
    icon: 'Box',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80'
  },
  {
    id: 'gobelets',
    name: 'Gobelets',
    description: 'Gobelets simple, double et triple paroi',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80'
  },
  {
    id: 'bols-kraft',
    name: 'Bols Kraft',
    description: 'Bols salade et contenants kraft',
    icon: 'Circle',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 'expedition',
    name: 'Expédition',
    description: 'Sacs d\'expédition et emballages courrier',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80'
  }
];

export const products = [
  // Sacs Poignées
  {
    id: 1,
    category: 'sacs-poignees',
    type: 'Poignée Plate',
    name: 'Take Away - Poignée Plate S',
    description: 'Sac en papier avec poignées plates. Idéal pour la vente à emporter.',
    specs: '18x8x22cm | 70-80 GSM',
    packaging: '250-500/CTN',
    material: 'Papier Kraft'
  },
  {
    id: 2,
    category: 'sacs-poignees',
    type: 'Poignée Plate',
    name: 'Take Away - Poignée Plate M',
    description: 'Sac en papier avec poignées plates. Format moyen polyvalent.',
    specs: '26x12x35cm | 80-90 GSM',
    packaging: '250/CTN',
    material: 'Papier Kraft'
  },
  {
    id: 3,
    category: 'sacs-poignees',
    type: 'Poignée Plate',
    name: 'Take Away - Poignée Plate L',
    description: 'Sac en papier avec poignées plates. Grand format.',
    specs: '32x16x45cm | 90-100 GSM',
    packaging: '250/CTN',
    material: 'Papier Kraft'
  },
  {
    id: 4,
    category: 'sacs-poignees',
    type: 'Poignée Torsadée',
    name: 'Poignée Torsadée - Brun M',
    description: 'Sac en papier kraft brun avec poignées torsadées.',
    specs: '25x11x32cm | 90-110 GSM',
    packaging: '250/CTN',
    material: 'Papier Kraft Brun'
  },
  {
    id: 5,
    category: 'sacs-poignees',
    type: 'Poignée Torsadée',
    name: 'Poignée Torsadée - Brun L',
    description: 'Sac en papier kraft brun avec poignées torsadées. Grand format.',
    specs: '32x12x41cm | 100-110 GSM',
    packaging: '250/CTN',
    material: 'Papier Kraft Brun'
  },
  {
    id: 6,
    category: 'sacs-poignees',
    type: 'Shopping Luxe',
    name: 'Shopping Luxe Côtelé',
    description: 'Sac en papier luxe avec nervures et poignées. Finition premium.',
    specs: 'Custom Sizes | 120-170 GSM',
    packaging: '100/CTN',
    material: 'Papier Kraft Premium'
  },
  // Sacs SOS
  {
    id: 7,
    category: 'sacs-sos',
    type: 'Kraft Brun',
    name: 'Sac SOS Kraft Brun - Taille 1',
    description: 'Sac en papier kraft brun. Format compact.',
    specs: '12x7x24cm | 50 GSM',
    packaging: '1000/CTN',
    material: 'Papier Kraft Brun'
  },
  {
    id: 8,
    category: 'sacs-sos',
    type: 'Kraft Brun',
    name: 'Sac SOS Kraft Brun - Taille 2',
    description: 'Sac en papier kraft brun. Format moyen.',
    specs: '15x9x30cm | 70 GSM',
    packaging: '500/CTN',
    material: 'Papier Kraft Brun'
  },
  {
    id: 9,
    category: 'sacs-sos',
    type: 'Kraft Brun',
    name: 'Sac SOS Kraft Brun - Taille 3',
    description: 'Sac en papier kraft brun. Grand format.',
    specs: '18x11x34cm | 70 GSM',
    packaging: '500/CTN',
    material: 'Papier Kraft Brun'
  },
  {
    id: 10,
    category: 'sacs-sos',
    type: 'Kraft Blanc',
    name: 'Sac SOS Kraft Blanc - Taille 1',
    description: 'Sac en papier kraft blanc. Format compact élégant.',
    specs: '12x7x24cm | 50 GSM',
    packaging: '1000/CTN',
    material: 'Papier Kraft Blanc'
  },
  // Boîtes Food
  {
    id: 11,
    category: 'boites-food',
    type: 'Boîte Pizza',
    name: 'Boîte Pizza 26cm',
    description: 'Boîte à pizza micro-cannelure. Format standard.',
    specs: '26cm | E-Flute Micro-cannelure',
    packaging: '100/Pack',
    material: 'Carton Ondulé'
  },
  {
    id: 12,
    category: 'boites-food',
    type: 'Boîte Pizza',
    name: 'Boîte Pizza 33cm',
    description: 'Boîte à pizza micro-cannelure. Format familial.',
    specs: '33cm | E-Flute Micro-cannelure',
    packaging: '100/Pack',
    material: 'Carton Ondulé'
  },
  {
    id: 13,
    category: 'boites-food',
    type: 'Boîte Pizza',
    name: 'Boîte Pizza 40cm',
    description: 'Boîte à pizza renforcée. Format géant.',
    specs: '40cm | B-Flute Renforcé',
    packaging: '50/Pack',
    material: 'Carton Ondulé Renforcé'
  },
  {
    id: 14,
    category: 'boites-food',
    type: 'Burger Box',
    name: 'Burger Box Standard',
    description: 'Boîte standard pour burger. Format classique.',
    specs: '105x105x70mm | Kraft',
    packaging: '500/CTN',
    material: 'Carton Kraft'
  },
  {
    id: 15,
    category: 'boites-food',
    type: 'Burger Box',
    name: 'Burger Box Gourmet XL',
    description: 'Boîte XL pour burger gourmet.',
    specs: '120x120x90mm | Kraft',
    packaging: '400/CTN',
    material: 'Carton Kraft'
  },
  {
    id: 16,
    category: 'boites-food',
    type: 'Sandwich Box',
    name: 'Sandwich Box Triangle S',
    description: 'Boîte triangle pour sandwich avec fenêtre.',
    specs: '123x72mm | Fenêtre PET',
    packaging: '500/CTN',
    material: 'Carton + PET'
  },
  // Gobelets
  {
    id: 17,
    category: 'gobelets',
    type: 'Simple Paroi',
    name: 'Gobelet SW 4oz',
    description: 'Gobelet simple paroi pour espresso.',
    specs: 'Espresso | 62mm',
    packaging: '1000/CTN',
    material: 'Carton PE Coated'
  },
  {
    id: 18,
    category: 'gobelets',
    type: 'Simple Paroi',
    name: 'Gobelet SW 8oz',
    description: 'Gobelet simple paroi standard.',
    specs: 'Standard | 80mm',
    packaging: '500/CTN',
    material: 'Carton PE Coated'
  },
  {
    id: 19,
    category: 'gobelets',
    type: 'Double Paroi',
    name: 'Gobelet DW 8oz',
    description: 'Gobelet double paroi pour isolation thermique.',
    specs: 'Double Wall | 80mm',
    packaging: '500/CTN',
    material: 'Carton Double Paroi'
  },
  {
    id: 20,
    category: 'gobelets',
    type: 'Ripple Wall',
    name: 'Gobelet Ripple 12oz',
    description: 'Gobelet triple paroi ondulé. Isolation maximale.',
    specs: 'Ondulé Triple Paroi | 90mm',
    packaging: '500/CTN',
    material: 'Carton Ondulé Triple'
  },
  // Bols Kraft
  {
    id: 21,
    category: 'bols-kraft',
    type: 'Bol Salade',
    name: 'Bol Salade 500ml',
    description: 'Bol en kraft pour salade. Format individuel.',
    specs: 'Diam. 150mm | PE Coated',
    packaging: '300/CTN',
    material: 'Kraft PE Coated'
  },
  {
    id: 22,
    category: 'bols-kraft',
    type: 'Bol Salade',
    name: 'Bol Salade 750ml',
    description: 'Bol en kraft pour salade. Format moyen.',
    specs: 'Diam. 150mm | PE Coated',
    packaging: '300/CTN',
    material: 'Kraft PE Coated'
  },
  {
    id: 23,
    category: 'bols-kraft',
    type: 'Bol Salade',
    name: 'Bol Salade 1000ml',
    description: 'Bol en kraft pour salade. Grand format.',
    specs: 'Diam. 150mm | PE Coated',
    packaging: '300/CTN',
    material: 'Kraft PE Coated'
  },
  // Expédition
  {
    id: 24,
    category: 'expedition',
    type: 'Mailing Bag',
    name: 'Mailing Bag / Courier',
    description: 'Sac d\'expédition auto-adhésif.',
    specs: 'LDPE Co-ex | Auto-adhésif',
    packaging: '500/CTN',
    material: 'LDPE Co-extrudé'
  },
  {
    id: 25,
    category: 'expedition',
    type: 'Magazine Bag',
    name: 'Magazine Bag',
    description: 'Sac transparent pour magazines et documents.',
    specs: 'LDPE Transparent',
    packaging: '1000/CTN',
    material: 'LDPE Transparent'
  },
  {
    id: 26,
    category: 'expedition',
    type: 'Sac Isotherme',
    name: 'Foil Paper Bag (Poulet)',
    description: 'Sac isotherme en aluminium/papier pour garder au chaud.',
    specs: 'Alu/Papier Isotherme',
    packaging: '500/CTN',
    material: 'Aluminium + Papier'
  }
];

export const advantages = [
  {
    title: 'Qualité Premium',
    description: 'Emballages certifiés, matériaux de haute qualité pour vos produits alimentaires.',
    icon: 'Award'
  },
  {
    title: 'Éco-Responsable',
    description: 'Solutions durables : papier kraft recyclable, matériaux biodégradables.',
    icon: 'Leaf'
  },
  {
    title: 'Livraison Rapide',
    description: 'Expédition sous 24-48h pour les commandes en stock.',
    icon: 'Truck'
  },
  {
    title: 'Prix Compétitifs',
    description: 'Tarifs dégressifs selon quantités. Devis personnalisé gratuit.',
    icon: 'PiggyBank'
  },
  {
    title: 'Personnalisation',
    description: 'Impression de votre logo sur tous nos produits.',
    icon: 'Palette'
  },
  {
    title: 'Service Client',
    description: 'Équipe dédiée pour vous accompagner dans vos choix.',
    icon: 'HeadphonesIcon'
  }
];

export const testimonials = [
  {
    name: 'Marie Dupont',
    company: 'Boulangerie Le Pain Doré',
    text: 'Excellent rapport qualité-prix. Les sacs kraft sont parfaits pour nos viennoiseries.',
    rating: 5
  },
  {
    name: 'Pierre Martin',
    company: 'Restaurant Le Gourmet',
    text: 'Service impeccable et livraison ultra rapide. Je recommande vivement Eonite !',
    rating: 5
  },
  {
    name: 'Sophie Bernard',
    company: 'Traiteur Saveurs & Co',
    text: 'Nos clients adorent les emballages éco-responsables. Merci Eonite !',
    rating: 5
  }
];

export const companyInfo = {
  name: 'Eonite',
  tagline: 'Emballages Alimentaires Professionnels',
  description: 'Eonite est votre partenaire de confiance pour tous vos besoins en emballages alimentaires. Nous proposons une gamme complète de sacs, boîtes, gobelets et solutions d\'emballage pour la restauration, la vente à emporter et l\'expédition.',
  address: 'France',
  email: 'contact@eonite.fr',
  phone: '+33 (0)1 XX XX XX XX',
  founded: '2024',
  clients: '500+',
  products: '200+',
  deliveryCountries: '10+'
};
