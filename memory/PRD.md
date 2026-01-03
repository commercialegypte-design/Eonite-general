# EONITE B2B Platform - Product Requirements Document V2

## Overview
Plateforme B2B de vente d'emballages personnalisés (sacs kraft, boîtes, gobelets) pour les professionnels de la restauration et du retail. **V2 introduit l'Assistant Design IA** qui remplace l'ancien configurateur.

## User Persona
- **Client principal**: Restaurateurs, franchises, chaînes de magasins
- **Besoins**: Emballages personnalisés avec leur logo, prix compétitifs, qualité industrielle
- **Pain points**: Prix du design séparé, délais de devis, complexité de commande

## Brand Assets
- **Logo**: https://customer-assets.emergentagent.com/job_brutalist-biz/artifacts/1sxp8kqj_logo.png
- **Typographie logo**: Serif élégante avec feuille intégrée dans le "E"
- **Couleur logo**: Olive (#6B705C)

## Core Requirements

### Design Philosophy: "Haute Couture Industrielle"
- **Palette**: Olive (#6B705C), Crème (#F9F8EF), Sage (#CDCEBD)
- **Style**: Brutalist Premium - angles droits (border-radius: 0), bordures fines
- **CTAs**: NOIR PUR (#1A1A1A) pour impact maximal "Buzzman"
- **Typography**: Space Grotesk (headings), Inter (body)

---

## V2 - ASSISTANT DESIGN IA (DONE)

### Backend (FastAPI + MongoDB)
- [x] Modèles de données: `AIDesign`, `VisioRequest`, `QuoteRequestV2`
- [x] Route POST `/api/ai-design` - Crée design avec conseil IA + lead scoring
- [x] Route POST `/api/visio-booking` - Réservation visio (Gros profil)
- [x] Route POST `/api/quote-request` - Demande devis (Petit profil)
- [x] Service AI (`ai_service.py`) - Emergent LLM + Hugging Face FLUX
- [x] Lead Scoring automatique (`lead_scoring.py`)

### Frontend (React)
- [x] Page `/assistant` - Interface conversationnelle **10 étapes** (refactorisée)
- [x] Flux naturel et consultative : Prénom → Enseigne → Activité → Produit → Volume → Poignées → Papier → Branding → Style → Éléments
- [x] Questions ouvertes (text) pour activité, produit, style, éléments
- [x] Boutons de choix rapides pour volume, poignées, papier
- [x] Transitions fluides fade-in entre questions
- [x] Affichage conseil stratégique + aperçu image généré
- [x] CTA "Réserver ma session design" → /reservation avec Cal.com

### Intégrations
- [x] **Emergent LLM Key** (GPT-5.2) → Conseils stratégiques ✅
- [x] **Emergent LLM Key** (gpt-image-1) → Génération images ✅

### Homepage V2
- [x] Nouveau H1: "Votre emballage personnalisé au prix du neutre."
- [x] Nouveau CTA: "Lancer l'Assistant Design" → `/assistant`
- [x] Section teaser "Assistant Design IA"
- [x] Ancien configurateur SUPPRIMÉ

---

## Database Schema V2

### Nouvelles Collections
```
ai_designs: {
  id, business_type, product_type, volume_estimate, brand_style,
  text_on_bag, business_name, prompt_generated, strategic_advice,
  image_url, lead_score, created_at
}

visio_requests: {
  id, ai_design_id, nom_entreprise, nom_contact, email, telephone,
  notes, status, created_at
}

quote_requests_v2: {
  id, ai_design_id, nom_entreprise, nom_contact, email, telephone,
  notes, status, created_at
}
```

---

## API Endpoints V2

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/ai-design | POST | Crée design IA + conseil + lead score |
| /api/ai-design/{id} | GET | Récupère un design |
| /api/ai-design/{id}/retry-image | POST | Réessaye génération image |
| /api/visio-booking | POST | Demande visio (Gros profil) |
| /api/quote-request | POST | Demande devis (Petit profil) |

---

## Lead Scoring Logic

| Condition | Lead Score | Action |
|-----------|------------|--------|
| Volume ≥ 5k OU Franchise | `gros_profil` | Badge "Accompagnement Premium" + Formulaire Visio |
| Volume < 5k ET pas Franchise | `petit_profil` | Badge "Devis Express" + Formulaire Devis email |

---

## Prochaines Étapes

### P0 - Immédiat
- [x] ~~Ajouter HF_API_TOKEN~~ → Remplacé par Emergent LLM (gpt-image-1)
- [x] ~~Refonte flux conversationnel EON~~ → Complété avec persona naturelle

### P1 - Cette semaine
- [ ] **Dashboard Client** : Afficher historique commandes avec barre de progression 4 étapes
- [ ] **Upload fichiers logos** : Permettre envoi .ai, .pdf, .svg, .png pour les devis
- [ ] Connecter formulaire devis → `/api/quote-request`

### P2 - Backlog
- [ ] Intégration email réel (Resend/SendGrid)
- [ ] Webhooks Cal.com pour sauvegarder les réservations automatiquement
- [ ] Stockage cloud fichiers (Cloudinary/S3)

---

## Services Mockés
- **Email**: `backend/email_service.py` - Emails loggés mais non envoyés

---

## Changelog

### 2025-01-03 - V3 Refonte Homepage & Copywriting ✅
- Nouveau concept "Emballage Personnalisé au Prix du Neutre"
- Style : Industriel haut de gamme, contrastes Noir/Blanc, accent Vert (#22C55E)
- Nouveau H1 : "Votre emballage personnalisé au prix du neutre."
- CTAs : "Créer mon design gratuitement" + "Prendre RDV en visio"
- Bandeau réassurance : Conception offerte | Validation 30 min | Transport prix coûtant | Stockage France
- Section Univers Produits : 4 blocs (Retail, Pizza, Pâtisserie, Alimentation)
- Section "Pourquoi Éonite" : Transparence sur le modèle économique
- Tunnel conversion : 3 étapes (Produit → Visio → BAT+Devis)
- Widget WhatsApp flottant intégré
- Header avec menu "Solutions Métiers" dropdown
- Footer recolorisé en noir avec accent vert

### 2025-01-03 - V2.3 Corrections Flux Produits & Quantités ✅
- Ajout sélection famille de produits : Sacs kraft, Sacs SOS, Sacs fruits/primeurs, Boîtes, Gobelets, Autre
- Question couleur kraft : marron (naturel, artisanal) ou blanc (moderne, épuré)
- Correction tranches quantités : 7 options (<5k, 5k, 10k, 15k, 20k, 30k, >30k)
- Flux conditionnel : poignées demandées uniquement pour Sacs kraft
- Tests E2E validés : 100% (13 features testées)

### 2025-01-03 - V2.2 Flux Conversationnel Naturel ✅
- Refonte complète du flux EON : 10 étapes avec persona consultative
- Questions ouvertes pour activité, produit, style, éléments (au lieu de boutons)
- Ton plus naturel : "Salut ! Moi c'est EON..." au lieu de "Bonjour, je suis EON..."
- Séquence optimisée : Prénom → Enseigne → Activité → Produit → Volume → Poignées → Papier → Branding → Style → Éléments
- Résumé final personnalisé avec pitch session design
- Tests E2E validés : 100% de réussite (16 features testées)

### 2026-01-02 - V2.1 Conseiller Technique Expert
- EON transformé en conseiller technique & marketing expert
- Base de connaissances catalogue (grammages, finitions, poignées)
- Diagnostic intelligent (transport chaud → aération, vente à emporter → QR code)
- Analyse concurrentielle (Kedypack, Firplast, Raja, Packhelp)
- Oracle comments avec termes techniques (Gsm, Ripple Wall, soft-touch)
- Nouvelle étape : inspiration concurrentielle
- Clôture : "Voulez-vous transformer ce concept en BAT industriel en 30 min ?"

### 2026-01-02 - V2 Assistant IA
- Nouveau H1 HomePage: "Votre emballage personnalisé au prix du neutre"
- Suppression ancien Configurateur
- Création Assistant Design IA en 5 étapes
- Intégration Emergent LLM pour conseils stratégiques
- Lead Scoring automatique (Gros/Petit profil)
- Nouvelles routes API: /ai-design, /visio-booking, /quote-request
- Préparation intégration Hugging Face FLUX

### 2026-01-02 - V1 Design
- Design "Haute Couture Industrielle" appliqué
- CTAs en NOIR PUR
- Logo Eonite intégré (Header, Footer, Login)
- Message éco-responsable dans configurateur (supprimé avec V2)
