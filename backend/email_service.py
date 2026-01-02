# Email Service - Mock for MVP
# Will be replaced with Resend/SendGrid integration

import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class EmailService:
    """
    Mock email service for MVP.
    All emails are logged but not actually sent.
    Replace with Resend/SendGrid integration for production.
    """
    
    def __init__(self):
        self.sent_emails = []  # In-memory storage for demo
    
    async def send_quote_confirmation(self, to_email: str, quote_data: dict):
        """Send quote confirmation to client"""
        email = {
            "to": to_email,
            "subject": f"EONITE - Confirmation de votre demande de devis #{quote_data.get('id', 'N/A')[:8]}",
            "template": "quote_confirmation",
            "data": quote_data,
            "sent_at": datetime.utcnow().isoformat()
        }
        self.sent_emails.append(email)
        logger.info(f"[MOCK EMAIL] Quote confirmation sent to {to_email}")
        logger.info(f"[MOCK EMAIL] Subject: {email['subject']}")
        return True
    
    async def send_quote_alert_sales(self, quote_data: dict):
        """Send alert to sales team (would also trigger Slack)"""
        email = {
            "to": "sales@eonite.fr",
            "subject": f"🔥 Nouvelle demande de devis - {quote_data.get('company_name', 'N/A')}",
            "template": "quote_alert_sales",
            "data": quote_data,
            "sent_at": datetime.utcnow().isoformat()
        }
        self.sent_emails.append(email)
        logger.info(f"[MOCK EMAIL] Sales alert sent for {quote_data.get('company_name')}")
        logger.info(f"[MOCK EMAIL] Quantity: {quote_data.get('quantity')} - Est. Price: {quote_data.get('estimated_price')}€")
        return True
    
    async def send_order_status_update(self, to_email: str, order_data: dict, new_status: str):
        """Send order status update to client"""
        status_messages = {
            "pending_design": "Votre commande est en attente de validation du design",
            "in_production": "🏭 Bonne nouvelle ! Votre commande est en production",
            "shipped": "📦 Votre commande a été expédiée",
            "completed": "✅ Votre commande a été livrée"
        }
        
        email = {
            "to": to_email,
            "subject": f"EONITE - {status_messages.get(new_status, 'Mise à jour de commande')}",
            "template": "order_status_update",
            "data": {**order_data, "status": new_status},
            "sent_at": datetime.utcnow().isoformat()
        }
        self.sent_emails.append(email)
        logger.info(f"[MOCK EMAIL] Order status update sent to {to_email}")
        logger.info(f"[MOCK EMAIL] New status: {new_status}")
        return True
    
    async def send_welcome_email(self, to_email: str, user_data: dict):
        """Send welcome email to new user"""
        email = {
            "to": to_email,
            "subject": "Bienvenue chez EONITE - Votre compte est prêt",
            "template": "welcome",
            "data": user_data,
            "sent_at": datetime.utcnow().isoformat()
        }
        self.sent_emails.append(email)
        logger.info(f"[MOCK EMAIL] Welcome email sent to {to_email}")
        return True
    
    def get_sent_emails(self):
        """Get all sent emails (for debugging/demo)"""
        return self.sent_emails

# Singleton instance
email_service = EmailService()
