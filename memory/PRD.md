# EONITE B2B Platform - Product Requirements Document

## Overview
Plateforme B2B de vente d'emballages personnalisés (sacs kraft, boîtes, gobelets) pour les professionnels de la restauration et du retail.

## User Persona
- **Client principal**: Restaurateurs, franchises, chaînes de magasins
- **Besoins**: Emballages personnalisés avec leur logo, prix compétitifs, qualité industrielle
- **Pain points**: Prix du design séparé, délais de devis, complexité de commande

## Core Requirements

### Design Philosophy: "Haute Couture Industrielle"
- **Palette**: Olive (#6B705C), Crème (#F9F8EF), Sage (#CDCEBD)
- **Style**: Brutalist Premium - angles droits (border-radius: 0), bordures fines
- **CTAs**: NOIR PUR (#1A1A1A) pour impact maximal "Buzzman"
- **Typography**: Space Grotesk (headings), Inter (body)

### P0 - Core Features (DONE)
- [x] Homepage avec Hero vidéo et headline impactante
- [x] Configurateur de prix en temps réel
- [x] Message éco-responsable "Impact Positif: -[X] kg de plastique générés"
- [x] Authentification (inscription/connexion JWT)
- [x] Dashboard client avec barre de progression 4 étapes:
  1. Brief Design (Visio)
  2. BAT Validé
  3. En Impression (Usine)
  4. Expédition

### P1 - En cours
- [ ] Upload de fichiers logo (formats AI, PDF, SVG, PNG)
- [ ] Formulaires de devis connectés au backend
- [ ] Gestion des adresses de livraison

### P2 - Backlog
- [ ] Intégration email réel (Resend/SendGrid)
- [ ] Stockage cloud pour fichiers (Cloudinary)
- [ ] Intégration Calendly pour RDV design
- [ ] Intégration Stripe pour paiements B2B

## Technical Architecture

### Frontend
- React 18 + React Router
- TailwindCSS + Shadcn/UI
- Axios pour API calls
- React Context pour auth state

### Backend
- FastAPI (Python)
- MongoDB (motor async driver)
- JWT authentication (python-jose)
- Password hashing (passlib + bcrypt)

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/register | POST | Inscription utilisateur |
| /api/auth/login | POST | Connexion |
| /api/auth/me | GET | Profil utilisateur (auth) |
| /api/products | GET | Liste produits |
| /api/calculate-price | POST | Calcul prix temps réel |
| /api/orders | GET/POST | Gestion commandes |

### Database Schema
```
users: { id, email, hashed_password, company_name, contact_name, role, is_franchise }
products: { id, name, category, description, base_price_unit, image_url }
orders: { id, user_id, product_id, status, quantity, total_price, design_file_url, created_at }
```

## Mocked Services
- **Email**: backend/email_service.py - emails loggés mais non envoyés
- **File Upload**: Stockage local temporaire

## Testing
- Tests backend: /app/tests/test_eonite_auth.py
- Rapport: /app/test_reports/iteration_1.json
- Success rate: Backend 100% (après corrections), Frontend 100%

## Changelog
### 2026-01-02
- Design "Haute Couture Industrielle" appliqué
- CTAs en NOIR PUR pour contraste maximal
- Message éco-responsable impactant ajouté
- Dashboard avec 4 étapes de progression
- Corrections API: validation mot de passe, HTTP 401 auth
- Tests automatisés créés et passants
