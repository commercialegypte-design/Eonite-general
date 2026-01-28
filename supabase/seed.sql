-- Seed Products
INSERT INTO public.products (name, category, description, min_quantity, base_prices, specs, available_sizes, available_prints, image_url, is_active)
VALUES 
(
  'Sac Kraft Poignées Plates',
  'sacs_kraft',
  'Sac kraft classique avec poignées plates. Idéal pour la vente à emporter.',
  500,
  '{"5000": 0.35, "10000": 0.28, "25000": 0.22, "50000": 0.18}',
  '{"sizes": {"small": "18x8x22cm", "medium": "26x12x35cm", "large": "32x16x45cm"}, "gsm": "80-100", "material": "Papier Kraft Vierge FSC"}',
  '["small", "medium", "large"]',
  '["1_color", "2_colors", "quadri"]',
  '/images/sac-kraft-plat.jpg',
  true
),
(
  'Sac Kraft Poignées Torsadées',
  'sacs_kraft',
  'Sac kraft premium avec poignées torsadées. Look haut de gamme.',
  500,
  '{"5000": 0.42, "10000": 0.34, "25000": 0.27, "50000": 0.22}',
  '{"sizes": {"medium": "25x11x32cm", "large": "32x12x41cm"}, "gsm": "100-120", "material": "Papier Kraft Vierge FSC"}',
  '["medium", "large"]',
  '["1_color", "2_colors", "quadri"]',
  '/images/sac-kraft-torsade.jpg',
  true
),
(
  'Boîte Burger Kraft',
  'boites',
  'Boîte burger en carton kraft. Résistante et éco-responsable.',
  1000,
  '{"5000": 0.28, "10000": 0.22, "25000": 0.18, "50000": 0.15}',
  '{"sizes": {"small": "105x105x70mm", "medium": "120x120x90mm", "large": "200x110x80mm"}, "material": "Carton Kraft"}',
  '["small", "medium", "large"]',
  '["1_color", "2_colors"]',
  '/images/boite-burger.jpg',
  true
),
(
  'Sac Shopping Luxe Côtelé',
  'luxe',
  'Sac shopping luxe avec finition côtelée. Impression premium.',
  500,
  '{"5000": 0.65, "10000": 0.52, "25000": 0.42, "50000": 0.35}',
  '{"sizes": {"custom": "Sur mesure"}, "gsm": "150-200", "material": "Papier Kraft Côtelé Premium"}',
  '["medium", "large", "custom"]',
  '["1_color", "2_colors", "quadri"]',
  '/images/sac-luxe.jpg',
  true
),
(
  'Gobelet Carton Simple Paroi',
  'gobelets',
  'Gobelet carton classique pour boissons chaudes.',
  1000,
  '{"5000": 0.08, "10000": 0.065, "25000": 0.055, "50000": 0.045}',
  '{"sizes": {"small": "4oz / 120ml", "medium": "8oz / 240ml", "large": "12oz / 360ml"}, "material": "Carton PE Coated"}',
  '["small", "medium", "large"]',
  '["1_color", "2_colors", "quadri"]',
  '/images/gobelet-sw.jpg',
  true
);
