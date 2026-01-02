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

# Image prompt prefix (forced for consistency)
IMAGE_PROMPT_PREFIX = "A premium paper shopping bag, olive green color #6B705C, studio lighting, high resolution, professional product photography"


# ============================================
# STRATEGIC ADVICE GENERATION (Emergent LLM)
# ============================================

async def generate_strategic_advice(
    business_type: str,
    product_type: str,
    volume_estimate: str,
    brand_style: str,
    text_on_bag: str,
    business_name: Optional[str] = None
) -> str:
    """
    Génère un conseil stratégique personnalisé via Emergent LLM (GPT-5.2).
    """
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        system_message = """Tu es un expert en packaging et branding pour EONITE, une entreprise B2B spécialisée dans les emballages personnalisés haut de gamme.
        
Ton rôle est de donner un conseil stratégique court et impactant (3-4 phrases max) sur pourquoi l'emballage personnalisé va transformer l'image de marque du client.

Sois enthousiaste mais professionnel. Utilise des données concrètes quand possible (ex: "Les études montrent que 72% des consommateurs...").

Termine toujours par une phrase d'encouragement liée à leur choix de style."""

        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"eonite-advice-{business_name or 'client'}",
            system_message=system_message
        ).with_model("openai", "gpt-5.2")
        
        user_prompt = f"""Client: {business_name or 'Nouveau client'}
Type d'activité: {business_type}
Produit choisi: {product_type}
Volume estimé: {volume_estimate}
Style de marque: {brand_style}
Texte sur le sac: "{text_on_bag}"

Donne un conseil stratégique personnalisé en français."""

        user_message = UserMessage(text=user_prompt)
        response = await chat.send_message(user_message)
        
        return response
        
    except Exception as e:
        logger.error(f"Error generating strategic advice: {e}")
        # Fallback advice
        return f"Excellent choix ! Un emballage {brand_style} personnalisé avec \"{text_on_bag}\" va créer une identité mémorable pour votre {business_type}. Les études montrent que 72% des consommateurs sont plus susceptibles de recommander une marque avec un packaging distinctif. Votre vision {brand_style} va vraiment faire la différence !"


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
    """
    style_descriptors = {
        "minimaliste": "minimalist design, clean typography, white space, modern",
        "luxe": "luxury premium finish, embossed effect, gold accents, elegant, sophisticated",
        "fun": "playful colorful design, bold graphics, vibrant colors, dynamic",
        "eco": "eco-friendly natural kraft, recycled texture, sustainable look, earth tones, organic"
    }
    
    product_descriptors = {
        "sac_kraft": "kraft paper shopping bag with twisted handles",
        "sac_luxe": "luxury gift bag with ribbon handles, glossy premium finish",
        "boite": "cardboard food box packaging",
        "gobelet": "paper coffee cup with lid"
    }
    
    style_desc = style_descriptors.get(brand_style, "professional design")
    product_desc = product_descriptors.get(product_type, "paper bag")
    
    prompt = f"{IMAGE_PROMPT_PREFIX}, {product_desc}, {style_desc}, with elegant text '{text_on_bag}' printed on front, product mockup, white studio background, 4K quality"
    
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
