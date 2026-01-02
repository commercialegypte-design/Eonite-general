"""
EONITE V2 - AI Service
Intégration Emergent LLM (conseils) + Hugging Face FLUX (images)
"""
import os
import logging
import asyncio
import aiohttp
from typing import Optional, Tuple
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# ============================================
# CONFIGURATION
# ============================================

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")
HF_API_TOKEN = os.environ.get("HF_API_TOKEN")

# Hugging Face model endpoint - using Stable Diffusion XL (more reliable)
HF_IMAGE_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"

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
    Génère le prompt pour FLUX avec le préfixe forcé.
    """
    style_descriptors = {
        "minimaliste": "minimalist design, clean typography, white space",
        "luxe": "luxury premium finish, embossed effect, gold accents, elegant",
        "fun": "playful colorful design, bold graphics, vibrant",
        "eco": "eco-friendly natural kraft, recycled texture, sustainable look, earth tones"
    }
    
    product_descriptors = {
        "sac_kraft": "kraft paper shopping bag with handles",
        "sac_luxe": "luxury gift bag with ribbon handles, premium finish",
        "boite": "cardboard box packaging",
        "gobelet": "paper coffee cup"
    }
    
    style_desc = style_descriptors.get(brand_style, "professional design")
    product_desc = product_descriptors.get(product_type, "paper bag")
    
    prompt = f"{IMAGE_PROMPT_PREFIX}, {product_desc}, {style_desc}, with text '{text_on_bag}' printed on it, mockup style, white background"
    
    return prompt


# ============================================
# IMAGE GENERATION (Hugging Face FLUX)
# ============================================

async def generate_image_flux(prompt: str) -> Tuple[Optional[str], Optional[str]]:
    """
    Génère une image via Hugging Face FLUX.1-schnell.
    Retourne (image_url, error_message)
    """
    if not HF_API_TOKEN or HF_API_TOKEN == "your_huggingface_token_here":
        logger.warning("HF_API_TOKEN not configured, returning placeholder")
        return None, "HF_API_TOKEN non configuré"
    
    headers = {
        "Authorization": f"Bearer {HF_API_TOKEN}",
        "Content-Type": "application/json"
    }
    
    # Simple payload - HF Inference API handles parameters automatically
    payload = {
        "inputs": prompt
    }
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                HF_FLUX_URL,
                headers=headers,
                json=payload,
                timeout=aiohttp.ClientTimeout(total=60)
            ) as response:
                if response.status == 200:
                    # FLUX returns binary image data
                    image_data = await response.read()
                    
                    # Save to file and return URL (for MVP, save locally)
                    import base64
                    import uuid
                    from pathlib import Path
                    
                    # Create uploads directory if not exists
                    uploads_dir = Path(__file__).parent / "uploads" / "generated"
                    uploads_dir.mkdir(parents=True, exist_ok=True)
                    
                    # Save image
                    filename = f"design_{uuid.uuid4().hex[:8]}.png"
                    filepath = uploads_dir / filename
                    
                    with open(filepath, "wb") as f:
                        f.write(image_data)
                    
                    # Return relative URL
                    image_url = f"/api/uploads/generated/{filename}"
                    return image_url, None
                    
                elif response.status == 503:
                    # Model is loading
                    error_data = await response.json()
                    estimated_time = error_data.get("estimated_time", 20)
                    return None, f"Le modèle se charge, veuillez patienter {int(estimated_time)}s..."
                    
                else:
                    error_text = await response.text()
                    logger.error(f"FLUX API error: {response.status} - {error_text}")
                    return None, f"Erreur de génération: {response.status}"
                    
    except asyncio.TimeoutError:
        return None, "Timeout lors de la génération de l'image"
    except Exception as e:
        logger.error(f"Error generating image: {e}")
        return None, str(e)


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
    3. Lance la génération d'image (peut être lent)
    
    Retourne le conseil immédiatement, l'image peut suivre.
    """
    
    # Generate image prompt
    image_prompt = generate_image_prompt(product_type, brand_style, text_on_bag)
    
    # Start both tasks concurrently
    advice_task = generate_strategic_advice(
        business_type, product_type, volume_estimate, 
        brand_style, text_on_bag, business_name
    )
    
    image_task = generate_image_flux(image_prompt)
    
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
    image_url, image_error = await generate_image_flux(prompt)
    return {
        "image_url": image_url,
        "image_error": image_error
    }
