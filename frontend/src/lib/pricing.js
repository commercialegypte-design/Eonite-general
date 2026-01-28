
// Pricing Logic for EONITE Configurator (Ported from Backend)

const BASE_PRICES = {
    5000: 0.35,
    10000: 0.28,
    25000: 0.22,
    50000: 0.18
};

const PRINT_COSTS = {
    "1_color": 0.02,
    "2_colors": 0.04,
    "quadri": 0.08
};

const SIZE_MULTIPLIERS = {
    "small": 0.8,
    "medium": 1.0,
    "large": 1.3,
    "custom": 1.5
};

const CATEGORY_ADJUSTMENTS = {
    "sacs_kraft": 1.0,
    "boites": 1.2,
    "luxe": 1.8,
    "gobelets": 0.7,
    "expedition": 0.9
};

function getQuantityTier(quantity) {
    const tiers = Object.keys(BASE_PRICES).map(Number).sort((a, b) => a - b);
    let applicableTier = tiers[0];
    for (const tier of tiers) {
        if (quantity >= tier) {
            applicableTier = tier;
        }
    }
    return applicableTier;
}

export function calculateTotalPrice(quantity, printType, size = "medium", category = "sacs_kraft") {
    const tier = getQuantityTier(quantity);
    const basePrice = BASE_PRICES[tier];

    const printCost = PRINT_COSTS[printType] || 0;
    const sizeMult = SIZE_MULTIPLIERS[size] || 1.0;
    const catAdj = CATEGORY_ADJUSTMENTS[category] || 1.0;

    const unitPrice = (base_price + printCost) * sizeMult * catAdj;
    const totalPrice = unitPrice * quantity;

    return {
        unitPrice: Number(unitPrice.toFixed(3)),
        totalPrice: Number(totalPrice.toFixed(2))
    };
}

export function getPriceBreakdown(quantity, printType, size = "medium", category = "sacs_kraft") {
    const tier = getQuantityTier(quantity);
    const basePrice = BASE_PRICES[tier];
    const printCost = PRINT_COSTS[printType] || 0;
    const sizeMult = SIZE_MULTIPLIERS[size] || 1.0;
    const catAdj = CATEGORY_ADJUSTMENTS[category] || 1.0;

    const { unitPrice, totalPrice } = calculateTotalPrice(quantity, printType, size, category);

    // Calculate savings
    const maxPrice = BASE_PRICES[5000];
    const potentialUnitPrice = (maxPrice + printCost) * sizeMult * catAdj;
    const savingsPerUnit = potentialUnitPrice - unitPrice;
    const totalSavings = quantity >= 10000 ? savingsPerUnit * quantity : 0;

    return {
        quantity,
        quantity_tier: tier,
        base_price: basePrice,
        print_type: printType,
        print_cost: printCost,
        size,
        size_multiplier: sizeMult,
        category,
        category_adjustment: catAdj,
        unit_price: unitPrice,
        total_price: totalPrice,
        savings_per_unit: Number(savingsPerUnit.toFixed(3)),
        total_savings: Number(totalSavings.toFixed(2))
    };
}

export function getAllTiersComparison(printType, size = "medium", category = "sacs_kraft") {
    const tiers = Object.keys(BASE_PRICES).map(Number).sort((a, b) => a - b);
    return tiers.map(qty => {
        const { unitPrice, totalPrice } = calculateTotalPrice(qty, printType, size, category);
        return {
            quantity: qty,
            unit_price: unitPrice,
            total_price: totalPrice
        };
    });
}
