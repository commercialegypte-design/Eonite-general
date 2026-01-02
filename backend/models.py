from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

# ============================================
# ENUMS
# ============================================

class OrderStatus(str, Enum):
    DRAFT = "draft"
    PENDING_DESIGN = "pending_design"
    IN_PRODUCTION = "in_production"
    SHIPPED = "shipped"
    COMPLETED = "completed"

class UserRole(str, Enum):
    CLIENT = "client"
    ADMIN = "admin"
    SALES = "sales"

class ProductCategory(str, Enum):
    SACS_KRAFT = "sacs_kraft"
    BOITES = "boites"
    LUXE = "luxe"
    GOBELETS = "gobelets"
    EXPEDITION = "expedition"

class PrintType(str, Enum):
    ONE_COLOR = "1_color"
    TWO_COLORS = "2_colors"
    QUADRI = "quadri"

class ProductSize(str, Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"
    CUSTOM = "custom"

# ============================================
# USER MODELS
# ============================================

class UserBase(BaseModel):
    email: EmailStr
    company_name: str
    contact_name: Optional[str] = None
    phone: Optional[str] = None
    role: UserRole = UserRole.CLIENT
    is_franchise: bool = False
    franchise_locations: Optional[int] = None

class UserCreate(UserBase):
    password: Optional[str] = None  # Optional for Google auth
    auth_provider: str = "email"  # "email" or "google"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    hashed_password: Optional[str] = None
    auth_provider: str = "email"
    addresses: List[dict] = []
    
    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: str
    email: str
    company_name: str
    contact_name: Optional[str]
    role: UserRole
    is_franchise: bool

# ============================================
# PRODUCT MODELS
# ============================================

class ProductBase(BaseModel):
    name: str
    category: ProductCategory
    description: str
    min_quantity: int = 500
    base_prices: dict  # {"5000": 0.35, "10000": 0.28, "25000": 0.22, "50000": 0.18}
    image_url: Optional[str] = None
    specs: Optional[dict] = None  # dimensions, gsm, material, etc.
    available_sizes: List[ProductSize] = [ProductSize.SMALL, ProductSize.MEDIUM, ProductSize.LARGE]
    available_prints: List[PrintType] = [PrintType.ONE_COLOR, PrintType.TWO_COLORS, PrintType.QUADRI]

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    
    class Config:
        from_attributes = True

# ============================================
# ORDER MODELS
# ============================================

class OrderItemBase(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    size: ProductSize
    print_type: PrintType
    unit_price: float
    subtotal: float

class OrderBase(BaseModel):
    items: List[OrderItemBase]
    total_price: float
    design_file_url: Optional[str] = None
    notes: Optional[str] = None
    shipping_address: Optional[dict] = None
    billing_address: Optional[dict] = None

class OrderCreate(OrderBase):
    user_id: str

class Order(OrderBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    status: OrderStatus = OrderStatus.DRAFT
    tracking_number: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# ============================================
# QUOTE REQUEST MODELS
# ============================================

class QuoteRequestBase(BaseModel):
    company_name: str
    contact_name: str
    email: EmailStr
    phone: Optional[str] = None
    product_type: str
    size: ProductSize
    quantity: int
    print_type: PrintType
    estimated_price: float
    message: Optional[str] = None
    design_file_url: Optional[str] = None
    is_franchise: bool = False
    franchise_locations: Optional[int] = None
    annual_consumption: Optional[int] = None  # For franchise accounts

class QuoteRequest(QuoteRequestBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"  # pending, contacted, converted, rejected
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# ============================================
# ADDRESS MODEL
# ============================================

class Address(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    label: str  # "Siège", "Entrepôt", "Site 1", etc.
    street: str
    city: str
    postal_code: str
    country: str = "France"
    is_default_shipping: bool = False
    is_default_billing: bool = False

# ============================================
# AI ASSISTANT V2 MODELS
# ============================================

class VolumeEstimate(str, Enum):
    LESS_5K = "<5k"
    FROM_5K_TO_10K = "5k-10k"
    FROM_10K_TO_50K = "10k-50k"
    MORE_50K = "50k+"

class BrandStyle(str, Enum):
    MINIMALISTE = "minimaliste"
    LUXE = "luxe"
    FUN = "fun"
    ECO = "eco"

class BusinessType(str, Enum):
    RESTAURANT = "restaurant"
    BOULANGERIE = "boulangerie"
    CAFE = "cafe"
    EPICERIE = "epicerie"
    FRANCHISE = "franchise"
    RETAIL = "retail"
    AUTRE = "autre"

class AIProductType(str, Enum):
    SAC_KRAFT = "sac_kraft"
    SAC_LUXE = "sac_luxe"
    BOITE = "boite"
    GOBELET = "gobelet"

class LeadScore(str, Enum):
    GROS_PROFIL = "gros_profil"
    PETIT_PROFIL = "petit_profil"

# AI Design Request Input
class AIDesignInput(BaseModel):
    business_type: BusinessType
    product_type: AIProductType
    volume_estimate: VolumeEstimate
    brand_style: BrandStyle
    text_on_bag: str
    business_name: Optional[str] = None

# AI Design - stored in DB
class AIDesign(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    business_type: BusinessType
    product_type: AIProductType
    volume_estimate: VolumeEstimate
    brand_style: BrandStyle
    text_on_bag: str
    business_name: Optional[str] = None
    prompt_generated: str
    strategic_advice: Optional[str] = None
    image_url: Optional[str] = None
    lead_score: LeadScore
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# Visio Request (for GROS_PROFIL)
class VisioRequestCreate(BaseModel):
    ai_design_id: str
    nom_entreprise: str
    nom_contact: str
    email: EmailStr
    telephone: Optional[str] = None
    notes: Optional[str] = None

class VisioRequest(VisioRequestCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"  # pending, confirmed, completed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# Quote Request V2 (for PETIT_PROFIL)
class QuoteRequestV2Create(BaseModel):
    ai_design_id: str
    nom_entreprise: str
    nom_contact: str
    email: EmailStr
    telephone: Optional[str] = None
    notes: Optional[str] = None

class QuoteRequestV2(QuoteRequestV2Create):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"  # pending, sent, accepted, rejected
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

