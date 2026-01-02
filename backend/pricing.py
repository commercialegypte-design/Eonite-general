# Pricing Logic for EONITE Configurator

from typing import Tuple

# Base prices per unit by quantity tier
BASE_PRICES = {
    5000: 0.35,
    10000: 0.28,
    25000: 0.22,
    50000: 0.18
}

# Print type cost additions per unit
PRINT_COSTS = {
    "1_color": 0.02,
    "2_colors": 0.04,
    "quadri": 0.08
}

# Size multipliers
SIZE_MULTIPLIERS = {
    "small": 0.8,
    "medium": 1.0,
    "large": 1.3,
    "custom": 1.5
}

# Product category base price adjustments
CATEGORY_ADJUSTMENTS = {
    "sacs_kraft": 1.0,
    "boites": 1.2,
    "luxe": 1.8,
    "gobelets": 0.7,
    "expedition": 0.9
}

def get_quantity_tier(quantity: int) -> int:
    """Get the applicable quantity tier"""
    tiers = sorted(BASE_PRICES.keys())
    applicable_tier = tiers[0]
    for tier in tiers:
        if quantity >= tier:
            applicable_tier = tier
    return applicable_tier

def calculate_unit_price(
    quantity: int,
    print_type: str,
    size: str = "medium",
    category: str = "sacs_kraft"
) -> float:
    """Calculate unit price based on configuration"""
    tier = get_quantity_tier(quantity)
    base_price = BASE_PRICES[tier]
    
    # Add print cost
    print_cost = PRINT_COSTS.get(print_type, 0)
    
    # Apply size multiplier
    size_mult = SIZE_MULTIPLIERS.get(size, 1.0)
    
    # Apply category adjustment
    cat_adj = CATEGORY_ADJUSTMENTS.get(category, 1.0)
    
    unit_price = (base_price + print_cost) * size_mult * cat_adj
    return round(unit_price, 3)

def calculate_total_price(
    quantity: int,
    print_type: str,
    size: str = "medium",
    category: str = "sacs_kraft"
) -> Tuple[float, float]:
    """Calculate total price and unit price"""
    unit_price = calculate_unit_price(quantity, print_type, size, category)
    total_price = unit_price * quantity
    return round(unit_price, 3), round(total_price, 2)

def get_price_breakdown(
    quantity: int,
    print_type: str,
    size: str = "medium",
    category: str = "sacs_kraft"
) -> dict:
    """Get detailed price breakdown for display"""
    tier = get_quantity_tier(quantity)
    base_price = BASE_PRICES[tier]
    print_cost = PRINT_COSTS.get(print_type, 0)
    size_mult = SIZE_MULTIPLIERS.get(size, 1.0)
    cat_adj = CATEGORY_ADJUSTMENTS.get(category, 1.0)
    
    unit_price, total_price = calculate_total_price(quantity, print_type, size, category)
    
    # Calculate savings compared to minimum tier
    max_price = BASE_PRICES[5000]
    potential_unit_price = (max_price + print_cost) * size_mult * cat_adj
    savings_per_unit = potential_unit_price - unit_price
    total_savings = savings_per_unit * quantity if quantity >= 10000 else 0
    
    return {
        "quantity": quantity,
        "quantity_tier": tier,
        "base_price": base_price,
        "print_type": print_type,
        "print_cost": print_cost,
        "size": size,
        "size_multiplier": size_mult,
        "category": category,
        "category_adjustment": cat_adj,
        "unit_price": unit_price,
        "total_price": total_price,
        "savings_per_unit": round(savings_per_unit, 3),
        "total_savings": round(total_savings, 2)
    }

def get_all_tiers_comparison(
    print_type: str,
    size: str = "medium",
    category: str = "sacs_kraft"
) -> list:
    """Get price comparison for all quantity tiers"""
    comparisons = []
    for qty in sorted(BASE_PRICES.keys()):
        unit_price, total_price = calculate_total_price(qty, print_type, size, category)
        comparisons.append({
            "quantity": qty,
            "unit_price": unit_price,
            "total_price": total_price
        })
    return comparisons
