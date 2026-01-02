from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import shutil

from models import (
    User, UserCreate, UserLogin, UserResponse, UserRole,
    Product, ProductCreate, ProductCategory,
    Order, OrderCreate, OrderStatus, OrderItemBase,
    QuoteRequest, QuoteRequestBase,
    Address, PrintType, ProductSize
)
from auth import (
    get_password_hash, verify_password, create_access_token,
    get_current_user, get_current_user_optional
)
from email_service import email_service
from pricing import calculate_total_price, get_price_breakdown, get_all_tiers_comparison

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create upload directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Create the main app
app = FastAPI(
    title="EONITE API",
    description="API B2B pour la plateforme d'emballages industriels EONITE",
    version="1.0.0"
)

# Create router with /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================
# HEALTH CHECK
# ============================================

@api_router.get("/")
async def root():
    return {"message": "EONITE API v1.0", "status": "operational"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# ============================================
# AUTH ROUTES
# ============================================

@api_router.post("/auth/register", response_model=dict)
async def register(user_data: UserCreate):
    """Register a new user with email/password"""
    # Validate password is required for email auth
    if user_data.auth_provider == "email" and not user_data.password:
        raise HTTPException(status_code=422, detail="Le mot de passe est requis")
    
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Un compte existe déjà avec cet email")
    
    # Create user
    user_dict = user_data.model_dump()
    if user_data.password:
        user_dict["hashed_password"] = get_password_hash(user_data.password)
    del user_dict["password"]
    
    user = User(**user_dict)
    user_doc = user.model_dump()
    user_doc["created_at"] = user_doc["created_at"].isoformat()
    
    await db.users.insert_one(user_doc)
    
    # Send welcome email
    await email_service.send_welcome_email(user.email, {"company_name": user.company_name})
    
    # Create token
    token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserResponse(
            id=user.id,
            email=user.email,
            company_name=user.company_name,
            contact_name=user.contact_name,
            role=user.role,
            is_franchise=user.is_franchise
        ).model_dump()
    }

@api_router.post("/auth/login", response_model=dict)
async def login(credentials: UserLogin):
    """Login with email/password"""
    user_doc = await db.users.find_one({"email": credentials.email})
    if not user_doc:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    if not user_doc.get("hashed_password"):
        raise HTTPException(status_code=401, detail="Ce compte utilise la connexion Google")
    
    if not verify_password(credentials.password, user_doc["hashed_password"]):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    token = create_access_token({
        "sub": user_doc["id"],
        "email": user_doc["email"],
        "role": user_doc["role"]
    })
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_doc["id"],
            "email": user_doc["email"],
            "company_name": user_doc["company_name"],
            "contact_name": user_doc.get("contact_name"),
            "role": user_doc["role"],
            "is_franchise": user_doc.get("is_franchise", False)
        }
    }

@api_router.get("/auth/me", response_model=dict)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user info"""
    user_doc = await db.users.find_one({"id": current_user["sub"]})
    if not user_doc:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    return {
        "id": user_doc["id"],
        "email": user_doc["email"],
        "company_name": user_doc["company_name"],
        "contact_name": user_doc.get("contact_name"),
        "role": user_doc["role"],
        "is_franchise": user_doc.get("is_franchise", False),
        "addresses": user_doc.get("addresses", [])
    }

# ============================================
# PRODUCTS ROUTES
# ============================================

@api_router.get("/products", response_model=List[dict])
async def get_products(category: Optional[str] = None):
    """Get all products, optionally filtered by category"""
    query = {"is_active": True}
    if category:
        query["category"] = category
    
    products = await db.products.find(query, {"_id": 0}).to_list(100)
    return products

@api_router.get("/products/{product_id}", response_model=dict)
async def get_product(product_id: str):
    """Get a single product by ID"""
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Produit non trouvé")
    return product

@api_router.get("/categories", response_model=List[dict])
async def get_categories():
    """Get all product categories with counts"""
    categories = []
    for cat in ProductCategory:
        count = await db.products.count_documents({"category": cat.value, "is_active": True})
        categories.append({
            "id": cat.value,
            "name": cat.value.replace("_", " ").title(),
            "count": count
        })
    return categories

# ============================================
# PRICING / CONFIGURATOR ROUTES
# ============================================

@api_router.post("/pricing/calculate", response_model=dict)
async def calculate_price(
    quantity: int,
    print_type: str,
    size: str = "medium",
    category: str = "sacs_kraft"
):
    """Calculate price for configurator"""
    if quantity < 500:
        raise HTTPException(status_code=400, detail="Quantité minimum: 500 pièces")
    
    breakdown = get_price_breakdown(quantity, print_type, size, category)
    return breakdown

@api_router.get("/pricing/tiers", response_model=List[dict])
async def get_pricing_tiers(
    print_type: str = "1_color",
    size: str = "medium",
    category: str = "sacs_kraft"
):
    """Get all pricing tiers for comparison display"""
    return get_all_tiers_comparison(print_type, size, category)

# ============================================
# QUOTE REQUESTS ROUTES
# ============================================

@api_router.post("/quotes", response_model=dict)
async def create_quote_request(quote: QuoteRequestBase):
    """Create a new quote request"""
    quote_obj = QuoteRequest(**quote.model_dump())
    quote_doc = quote_obj.model_dump()
    quote_doc["created_at"] = quote_doc["created_at"].isoformat()
    
    await db.quote_requests.insert_one(quote_doc)
    
    # Send confirmation email to client
    await email_service.send_quote_confirmation(quote.email, quote_doc)
    
    # Send alert to sales team
    await email_service.send_quote_alert_sales(quote_doc)
    
    logger.info(f"New quote request: {quote.company_name} - {quote.quantity} units - {quote.estimated_price}€")
    
    return {"message": "Demande de devis envoyée", "quote_id": quote_obj.id}

@api_router.get("/quotes", response_model=List[dict])
async def get_quote_requests(current_user: dict = Depends(get_current_user)):
    """Get all quote requests (admin/sales only)"""
    if current_user.get("role") not in ["admin", "sales"]:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    quotes = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return quotes

# ============================================
# ORDERS ROUTES
# ============================================

@api_router.get("/orders", response_model=List[dict])
async def get_orders(current_user: dict = Depends(get_current_user)):
    """Get orders for current user"""
    query = {"user_id": current_user["sub"]}
    
    # Admin/sales can see all orders
    if current_user.get("role") in ["admin", "sales"]:
        query = {}
    
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return orders

@api_router.get("/orders/{order_id}", response_model=dict)
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    """Get a single order"""
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    
    # Check access
    if order["user_id"] != current_user["sub"] and current_user.get("role") not in ["admin", "sales"]:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    return order

@api_router.post("/orders", response_model=dict)
async def create_order(order_data: OrderCreate, current_user: dict = Depends(get_current_user)):
    """Create a new order"""
    order = Order(**order_data.model_dump())
    order.user_id = current_user["sub"]
    
    order_doc = order.model_dump()
    order_doc["created_at"] = order_doc["created_at"].isoformat()
    order_doc["updated_at"] = order_doc["updated_at"].isoformat()
    
    await db.orders.insert_one(order_doc)
    
    logger.info(f"New order created: {order.id} by user {current_user['sub']}")
    
    return {"message": "Commande créée", "order_id": order.id}

@api_router.patch("/orders/{order_id}/status", response_model=dict)
async def update_order_status(
    order_id: str,
    status: OrderStatus,
    current_user: dict = Depends(get_current_user)
):
    """Update order status (admin/sales only)"""
    if current_user.get("role") not in ["admin", "sales"]:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    
    await db.orders.update_one(
        {"id": order_id},
        {"$set": {"status": status.value, "updated_at": datetime.utcnow().isoformat()}}
    )
    
    # Get user email and send notification
    user = await db.users.find_one({"id": order["user_id"]})
    if user:
        await email_service.send_order_status_update(user["email"], order, status.value)
    
    return {"message": f"Statut mis à jour: {status.value}"}

@api_router.post("/orders/{order_id}/reorder", response_model=dict)
async def reorder(order_id: str, current_user: dict = Depends(get_current_user)):
    """Duplicate an order (reorder)"""
    original = await db.orders.find_one({"id": order_id})
    if not original:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    
    if original["user_id"] != current_user["sub"]:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    # Create new order from original
    new_order = Order(
        user_id=current_user["sub"],
        items=original["items"],
        total_price=original["total_price"],
        shipping_address=original.get("shipping_address"),
        billing_address=original.get("billing_address"),
        notes=f"Réassort de la commande #{order_id[:8]}"
    )
    
    order_doc = new_order.model_dump()
    order_doc["created_at"] = order_doc["created_at"].isoformat()
    order_doc["updated_at"] = order_doc["updated_at"].isoformat()
    
    await db.orders.insert_one(order_doc)
    
    return {"message": "Commande dupliquée", "order_id": new_order.id}

# ============================================
# USER PROFILE / ADDRESSES ROUTES
# ============================================

@api_router.get("/profile/addresses", response_model=List[dict])
async def get_addresses(current_user: dict = Depends(get_current_user)):
    """Get user addresses"""
    user = await db.users.find_one({"id": current_user["sub"]})
    return user.get("addresses", [])

@api_router.post("/profile/addresses", response_model=dict)
async def add_address(address: Address, current_user: dict = Depends(get_current_user)):
    """Add a new address"""
    address_dict = address.model_dump()
    
    await db.users.update_one(
        {"id": current_user["sub"]},
        {"$push": {"addresses": address_dict}}
    )
    
    return {"message": "Adresse ajoutée", "address_id": address.id}

@api_router.delete("/profile/addresses/{address_id}", response_model=dict)
async def delete_address(address_id: str, current_user: dict = Depends(get_current_user)):
    """Delete an address"""
    await db.users.update_one(
        {"id": current_user["sub"]},
        {"$pull": {"addresses": {"id": address_id}}}
    )
    
    return {"message": "Adresse supprimée"}

# ============================================
# FILE UPLOAD ROUTES
# ============================================

@api_router.post("/upload", response_model=dict)
async def upload_file(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user_optional)
):
    """Upload a file (logo, design, etc.)"""
    # Validate file type
    allowed_types = [".png", ".jpg", ".jpeg", ".pdf", ".ai", ".svg"]
    file_ext = Path(file.filename).suffix.lower()
    
    if file_ext not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Type de fichier non autorisé. Types acceptés: {', '.join(allowed_types)}"
        )
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return URL (relative for now)
    file_url = f"/api/uploads/{unique_filename}"
    
    logger.info(f"File uploaded: {file.filename} -> {unique_filename}")
    
    return {"url": file_url, "filename": unique_filename}

@api_router.get("/uploads/{filename}")
async def get_upload(filename: str):
    """Serve uploaded files"""
    from fastapi.responses import FileResponse
    
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Fichier non trouvé")
    
    return FileResponse(file_path)

# ============================================
# ADMIN: SEED DATA
# ============================================

@api_router.post("/admin/seed", response_model=dict)
async def seed_products():
    """Seed database with initial products"""
    products = [
        {
            "id": str(uuid.uuid4()),
            "name": "Sac Kraft Poignées Plates",
            "category": "sacs_kraft",
            "description": "Sac kraft classique avec poignées plates. Idéal pour la vente à emporter.",
            "min_quantity": 500,
            "base_prices": {"5000": 0.35, "10000": 0.28, "25000": 0.22, "50000": 0.18},
            "image_url": "/images/sac-kraft-plat.jpg",
            "specs": {
                "sizes": {
                    "small": "18x8x22cm",
                    "medium": "26x12x35cm",
                    "large": "32x16x45cm"
                },
                "gsm": "80-100",
                "material": "Papier Kraft Vierge FSC"
            },
            "available_sizes": ["small", "medium", "large"],
            "available_prints": ["1_color", "2_colors", "quadri"],
            "is_active": True,
            "created_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sac Kraft Poignées Torsadées",
            "category": "sacs_kraft",
            "description": "Sac kraft premium avec poignées torsadées. Look haut de gamme.",
            "min_quantity": 500,
            "base_prices": {"5000": 0.42, "10000": 0.34, "25000": 0.27, "50000": 0.22},
            "image_url": "/images/sac-kraft-torsade.jpg",
            "specs": {
                "sizes": {
                    "medium": "25x11x32cm",
                    "large": "32x12x41cm"
                },
                "gsm": "100-120",
                "material": "Papier Kraft Vierge FSC"
            },
            "available_sizes": ["medium", "large"],
            "available_prints": ["1_color", "2_colors", "quadri"],
            "is_active": True,
            "created_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Boîte Burger Kraft",
            "category": "boites",
            "description": "Boîte burger en carton kraft. Résistante et éco-responsable.",
            "min_quantity": 1000,
            "base_prices": {"5000": 0.28, "10000": 0.22, "25000": 0.18, "50000": 0.15},
            "image_url": "/images/boite-burger.jpg",
            "specs": {
                "sizes": {
                    "small": "105x105x70mm",
                    "medium": "120x120x90mm",
                    "large": "200x110x80mm"
                },
                "material": "Carton Kraft"
            },
            "available_sizes": ["small", "medium", "large"],
            "available_prints": ["1_color", "2_colors"],
            "is_active": True,
            "created_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sac Shopping Luxe Côtelé",
            "category": "luxe",
            "description": "Sac shopping luxe avec finition côtelée. Impression premium.",
            "min_quantity": 500,
            "base_prices": {"5000": 0.65, "10000": 0.52, "25000": 0.42, "50000": 0.35},
            "image_url": "/images/sac-luxe.jpg",
            "specs": {
                "sizes": {
                    "custom": "Sur mesure"
                },
                "gsm": "150-200",
                "material": "Papier Kraft Côtelé Premium"
            },
            "available_sizes": ["medium", "large", "custom"],
            "available_prints": ["1_color", "2_colors", "quadri"],
            "is_active": True,
            "created_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Gobelet Carton Simple Paroi",
            "category": "gobelets",
            "description": "Gobelet carton classique pour boissons chaudes.",
            "min_quantity": 1000,
            "base_prices": {"5000": 0.08, "10000": 0.065, "25000": 0.055, "50000": 0.045},
            "image_url": "/images/gobelet-sw.jpg",
            "specs": {
                "sizes": {
                    "small": "4oz / 120ml",
                    "medium": "8oz / 240ml",
                    "large": "12oz / 360ml"
                },
                "material": "Carton PE Coated"
            },
            "available_sizes": ["small", "medium", "large"],
            "available_prints": ["1_color", "2_colors", "quadri"],
            "is_active": True,
            "created_at": datetime.utcnow().isoformat()
        }
    ]
    
    # Clear existing and insert
    await db.products.delete_many({})
    await db.products.insert_many(products)
    
    return {"message": f"{len(products)} produits créés"}

# ============================================
# INCLUDE ROUTER & MIDDLEWARE
# ============================================

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
