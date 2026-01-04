"""
EONITE V2 - AI Service
Intégration Emergent LLM (conseils techniques + images via gpt-image-1)
EON = Conseiller Technique & Marketing Expert
"""
import os
import logging
import asyncio
import base64
import uuid
from typing import Optional, Tuple
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Import knowledge base
try:
    from knowledge_base import (
        get_technical_specs, 
        analyze_usage, 
        analyze_competitor,
        get_diagnostic_conseil,
        SACS_CATALOGUE,
        BOITES_CATALOGUE,
        GOBELETS_CATALOGUE
    )
except ImportError:
    logger.warning("Knowledge base not found, using basic mode")
    get_technical_specs = lambda x: {}
    analyze_usage = lambda x: []
    analyze_competitor = lambda x: {"conseil_eonite": "Solution sur-mesure recommandée."}
    get_diagnostic_conseil = lambda *args: ""

# ============================================
# CONFIGURATION
# ============================================

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

# Image prompt prefix (base for consistency)
IMAGE_PROMPT_PREFIX = "A premium paper shopping bag, studio lighting, high resolution, professional product photography"


# ============================================
# STRATEGIC ADVICE GENERATION (Emergent LLM)
# ============================================

async def generate_strategic_advice(
    business_type: str,
    product_type: str,
    volume_estimate: str,
    brand_style: str,
    text_on_bag: str,
    business_name: Optional[str] = None,
    usage_details: Optional[str] = None,
    competitor_inspiration: Optional[str] = None
) -> str:
    """
    Génère un conseil stratégique et technique personnalisé via Emergent LLM (GPT-5.2).
    Intègre la base de connaissances catalogue et l'analyse concurrentielle.
    """
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        # Get technical specs from knowledge base
        specs = get_technical_specs(product_type)
        usage_recs = analyze_usage(usage_details or business_type) if usage_details else []
        competitor_analysis = analyze_competitor(competitor_inspiration) if competitor_inspiration else None
        
        # Build context for LLM
        technical_context = ""
        if specs:
            technical_context = f"""
SPÉCIFICATIONS TECHNIQUES (Catalogue EONITE 2024):
- Produit: {specs.get('nom', product_type)}
- Grammage recommandé: {specs.get('grammage', 'Standard')}
- Finitions disponibles: {', '.join(specs.get('finitions', ['Standard']))}
- Conseil technique: {specs.get('conseil_technique', '')}
"""
        
        usage_context = ""
        if usage_recs:
            usage_context = "\nDIAGNOSTIC INTELLIGENT:\n"
            for rec in usage_recs:
                usage_context += f"- {rec['conseil']}\n"
        
        competitor_context = ""
        if competitor_analysis and competitor_inspiration:
            competitor_context = f"""
ANALYSE CONCURRENTIELLE:
Le client s'inspire de: {competitor_inspiration}
Positionnement EONITE: {competitor_analysis.get('conseil_eonite', '')}
"""

        system_message = f"""Tu es EON, le conseiller technique et marketing expert d'EONITE, spécialiste des emballages personnalisés B2B depuis 2024.

TON EXPERTISE:
- Maîtrise des grammages (90-350 Gsm selon applications)
- Connaissance des finitions (pelliculage, marquage à chaud, gaufrage, vernis sélectif)
- Expertise poignées (plates, torsadées, ruban satin, cordelette coton)
- Standards qualité FSC, encres végétales, normes alimentaires

TON STYLE:
- Utilise des termes techniques précis mais accessibles
- Cite des données concrètes (grammages, pourcentages, références)
- Sois enthousiaste mais professionnel
- Propose toujours une solution Bespoke (sur-mesure)

MESSAGE CLÉ: "Notre objectif est de décider du BON produit pour votre client avant même de passer commande."

{technical_context}
{usage_context}
{competitor_context}

CONSIGNES:
1. Donne un conseil technique personnalisé (3-4 phrases)
2. Mentionne au moins une spécification technique (grammage, finition)
3. Si vente à emporter détectée, recommande un QR code pour les avis clients
4. Termine par une phrase d'encouragement liée à leur style choisi
"""

        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"eonite-expert-{business_name or 'client'}",
            system_message=system_message
        ).with_model("openai", "gpt-5.2")
        
        user_prompt = f"""Client: {business_name or 'Nouveau client'}
Type d'activité: {business_type}
Produit choisi: {product_type}
Volume estimé: {volume_estimate}
Style de marque: {brand_style}
Texte sur l'emballage: "{text_on_bag}"
{f"Détails d'usage: {usage_details}" if usage_details else ""}
{f"Inspiration/Concurrents: {competitor_inspiration}" if competitor_inspiration else ""}

Génère un conseil technique et marketing expert en français."""

        user_message = UserMessage(text=user_prompt)
        response = await chat.send_message(user_message)
        
        return response
        
    except Exception as e:
        logger.error(f"Error generating strategic advice: {e}")
        # Fallback with technical terms
        specs = get_technical_specs(product_type)
        grammage = specs.get('grammage', '100-120 Gsm')
        return f"""Pour {business_name or 'votre établissement'}, je recommande un {product_type} en grammage {grammage} avec finition {brand_style}.

Les études montrent que 72% des consommateurs sont plus susceptibles de recommander une marque avec un packaging distinctif. 

Notre approche Bespoke (sur-mesure) vous garantit un emballage unique, même en quantités modérées. Votre choix de style {brand_style} avec "{text_on_bag}" va créer une signature mémorable !"""


# ============================================
# IMAGE PROMPT GENERATION
# ============================================

def generate_image_prompt(
    product_type: str,
    brand_style: str,
    text_on_bag: str
) -> str:
    """
    Génère le prompt pour la génération d'image.
    Utilise les couleurs et styles variés selon les choix du client.
    """
    # Couleurs variées selon le style
    style_colors = {
        "minimaliste": "white and black color scheme, clean monochrome",
        "luxe": "elegant black with gold foil accents, premium dark finish",
        "fun": "bright colorful design, vibrant orange and teal accents",
        "eco": "natural brown kraft paper, recycled texture, earth tone colors"
    }
    
    style_descriptors = {
        "minimaliste": "minimalist design, clean typography, white space, modern sans-serif font",
        "luxe": "luxury premium finish, embossed effect, gold accents, elegant, sophisticated",
        "fun": "playful colorful design, bold graphics, vibrant colors, dynamic patterns",
        "eco": "eco-friendly natural kraft, recycled texture, sustainable look, organic feel"
    }
    
    product_descriptors = {
        "sac_kraft": "kraft paper shopping bag with twisted paper handles",
        "sac_luxe": "luxury gift bag with satin ribbon handles, glossy premium finish",
        "boite": "cardboard food box packaging, takeaway container",
        "gobelet": "paper coffee cup with lid, hot drink container"
    }
    
    style_color = style_colors.get(brand_style, "natural brown kraft")
    style_desc = style_descriptors.get(brand_style, "professional design")
    product_desc = product_descriptors.get(product_type, "paper bag")
    
    prompt = f"{IMAGE_PROMPT_PREFIX}, {product_desc}, {style_color}, {style_desc}, with elegant text '{text_on_bag}' printed on front, product mockup, white studio background, 4K quality, photorealistic"
    
    return prompt


# ============================================
# IMAGE GENERATION (Emergent LLM - gpt-image-1)
# ============================================

async def generate_image_emergent(prompt: str) -> Tuple[Optional[str], Optional[str]]:
    """
    Génère une image via Emergent LLM (OpenAI gpt-image-1).
    Retourne (image_url, error_message)
    """
    if not EMERGENT_LLM_KEY:
        logger.warning("EMERGENT_LLM_KEY not configured")
        return None, "Clé API non configurée"
    
    try:
        from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
        
        # Initialize the image generator
        image_gen = OpenAIImageGeneration(api_key=EMERGENT_LLM_KEY)
        
        # Generate image
        images = await image_gen.generate_images(
            prompt=prompt,
            model="gpt-image-1",
            number_of_images=1
        )
        
        if images and len(images) > 0:
            # Create uploads directory if not exists
            uploads_dir = Path(__file__).parent / "uploads" / "generated"
            uploads_dir.mkdir(parents=True, exist_ok=True)
            
            # Save image
            filename = f"design_{uuid.uuid4().hex[:8]}.png"
            filepath = uploads_dir / filename
            
            with open(filepath, "wb") as f:
                f.write(images[0])
            
            # Return relative URL
            image_url = f"/api/uploads/generated/{filename}"
            logger.info(f"Image generated successfully: {filename}")
            return image_url, None
        else:
            return None, "Aucune image générée"
            
    except Exception as e:
        logger.error(f"Error generating image: {e}")
        return None, f"Erreur de génération: {str(e)}"


# ============================================
# COMBINED AI DESIGN SERVICE
# ============================================

async def create_ai_design(
    business_type: str,
    product_type: str,
    volume_estimate: str,
    brand_style: str,
    text_on_bag: str,
    business_name: Optional[str] = None
) -> dict:
    """
    Service principal qui:
    1. Génère le conseil stratégique (rapide)
    2. Génère le prompt d'image
    3. Lance la génération d'image
    
    Retourne le conseil immédiatement, l'image peut suivre.
    """
    
    # Generate image prompt
    image_prompt = generate_image_prompt(product_type, brand_style, text_on_bag)
    
    # Start both tasks concurrently
    advice_task = generate_strategic_advice(
        business_type, product_type, volume_estimate, 
        brand_style, text_on_bag, business_name
    )
    
    image_task = generate_image_emergent(image_prompt)
    
    # Wait for both
    advice, (image_url, image_error) = await asyncio.gather(advice_task, image_task)
    
    return {
        "strategic_advice": advice,
        "prompt_generated": image_prompt,
        "image_url": image_url,
        "image_error": image_error
    }


async def generate_image_only(prompt: str) -> dict:
    """
    Génère uniquement l'image (pour retry).
    """
    image_url, image_error = await generate_image_emergent(prompt)
    return {
        "image_url": image_url,
        "image_error": image_error
    }
