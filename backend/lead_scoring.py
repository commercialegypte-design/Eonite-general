"""
EONITE V2 - Lead Scoring Service
Détection automatique du profil client (Gros/Petit)
"""
from models import VolumeEstimate, BusinessType, LeadScore

def calculate_lead_score(volume_estimate: VolumeEstimate, business_type: BusinessType) -> LeadScore:
    """
    Calcule le lead score basé sur le volume et le type d'activité.
    
    GROS PROFIL (Accompagnement Premium):
    - Volume >= 5000 OU
    - Secteur = Franchise
    
    PETIT PROFIL (Devis email):
    - Volume < 5000 ET pas franchise
    """
    
    # Check if franchise
    is_franchise = business_type == BusinessType.FRANCHISE
    
    # Check volume threshold (>= 5k is considered "gros")
    high_volume = volume_estimate in [
        VolumeEstimate.FROM_5K_TO_10K,
        VolumeEstimate.FROM_10K_TO_50K,
        VolumeEstimate.MORE_50K
    ]
    
    # Decision logic
    if is_franchise or high_volume:
        return LeadScore.GROS_PROFIL
    else:
        return LeadScore.PETIT_PROFIL


def get_lead_message(lead_score: LeadScore) -> dict:
    """
    Retourne le message approprié selon le lead score.
    """
    if lead_score == LeadScore.GROS_PROFIL:
        return {
            "badge": "Accompagnement Premium",
            "title": "Projet stratégique détecté",
            "message": "Le plus efficace : une visio de 30 min avec un expert design.",
            "form_type": "visio",
            "cta_text": "Réserver ma visio design"
        }
    else:
        return {
            "badge": "Devis Express",
            "title": "Devis personnalisé",
            "message": "Pour ce volume, nous vous envoyons un devis par email sous 24h.",
            "form_type": "quote",
            "cta_text": "Recevoir mon devis"
        }


def get_volume_numeric(volume_estimate: VolumeEstimate) -> int:
    """
    Retourne une valeur numérique approximative pour le volume.
    """
    mapping = {
        VolumeEstimate.LESS_5K: 2500,
        VolumeEstimate.FROM_5K_TO_10K: 7500,
        VolumeEstimate.FROM_10K_TO_50K: 30000,
        VolumeEstimate.MORE_50K: 75000
    }
    return mapping.get(volume_estimate, 5000)
