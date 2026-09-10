/**
 * VÉRITÉ ATELIER - Product Catalog Dataset
 * High-fashion luxury items with high-res optimized WebP images, categories, sizes, colors, and pricing.
 */

const PRODUCTS_DATA = [
  {
    id: "VA-101",
    name: "Architectural Wool Trench Coat",
    category: "Jackets",
    gender: "Women",
    collection: "Autumn / Winter",
    price: 385,
    oldPrice: 460,
    rating: 4.9,
    reviewsCount: 38,
    badge: "Bestseller",
    isNew: true,
    isTrending: true,
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "Sand", hex: "#E3DAC9" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 7,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80&fm=webp",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80&fm=webp",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Crafted from double-faced Italian virgin wool, this architectural trench redefines modern tailoring with structured storm flaps, an exaggerated notched lapel, and a belted waist silhouette.",
    fabric: "100% Italian Virgin Wool. Cupro lining.",
    care: "Dry clean only. Store on shaped wooden hanger."
  },
  {
    id: "VA-102",
    name: "Silk Satin Bias Slip Dress",
    category: "Dresses",
    gender: "Women",
    collection: "Evening Elegance",
    price: 240,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 52,
    badge: "New Arrival",
    isNew: true,
    isTrending: false,
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Midnight Black", hex: "#121212" },
      { name: "Terracotta", hex: "#B06346" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 12,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80&fm=webp",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "An effortless 90s-inspired slip dress cut on the bias in lustrous mulberry silk. Features delicate roulette straps and a fluid, floor-grazing drape that moves effortlessly with every step.",
    fabric: "100% 22 Momme Mulberry Silk.",
    care: "Hand wash cold with silk detergent or dry clean."
  },
  {
    id: "VA-103",
    name: "Tailored Linen Atelier Shirt",
    category: "Shirts",
    gender: "Men",
    collection: "Minimalist Linen",
    price: 165,
    oldPrice: 195,
    rating: 4.7,
    reviewsCount: 29,
    badge: "Sale",
    isNew: false,
    isTrending: true,
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Sage", hex: "#9CAF88" },
      { name: "Oatmeal", hex: "#D8CAB8" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 15,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80&fm=webp",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Woven in Normandy from long-staple organic flax, this relaxed yet refined shirt boasts mother-of-pearl buttons, a spread collar, and pre-washed softness for seasonless elegance.",
    fabric: "100% Organic French Flax Linen.",
    care: "Machine wash cold on gentle cycle. Hang dry."
  },
  {
    id: "VA-104",
    name: "Minimalist Cashmere Crewneck",
    category: "Shirts",
    gender: "Women",
    collection: "Autumn / Winter",
    price: 295,
    oldPrice: null,
    rating: 5.0,
    reviewsCount: 44,
    badge: "Iconic",
    isNew: false,
    isTrending: true,
    colors: [
      { name: "Oatmeal", hex: "#D8CAB8" },
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "Terracotta", hex: "#B06346" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 4,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80&fm=webp",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Spun from ultra-fine Grade-A Mongolian cashmere. Lightweight yet exquisitely insulating, with ribbed trims and relaxed dropped shoulders.",
    fabric: "100% Grade-A Mongolian Cashmere (2-ply).",
    care: "Hand wash in cool water with cashmere shampoo."
  },
  {
    id: "VA-105",
    name: "Structured Calfskin Tote Bag",
    category: "Bags",
    gender: "Unisex",
    collection: "Urban Monochrome",
    price: 490,
    oldPrice: 560,
    rating: 4.9,
    reviewsCount: 23,
    badge: "Luxury",
    isNew: true,
    isTrending: false,
    colors: [
      { name: "Espresso", hex: "#3D2B1F" },
      { name: "Black", hex: "#111111" },
      { name: "Tan", hex: "#C68B59" }
    ],
    sizes: ["One Size"],
    stock: 6,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80&fm=webp",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Handcrafted in Florence using full-grain vegetable tanned leather. Features a spacious microfiber-lined interior, magnetic closure, and laptop compartment.",
    fabric: "100% Full-grain Tuscan Calf Leather.",
    care: "Wipe clean with a soft dry cloth. Use leather conditioner twice a year."
  },
  {
    id: "VA-106",
    name: "Classic Chelsea Leather Boot",
    category: "Footwear",
    gender: "Men",
    collection: "Autumn / Winter",
    price: 320,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 67,
    badge: "Bestseller",
    isNew: false,
    isTrending: true,
    colors: [
      { name: "Dark Brown", hex: "#3A2E2B" },
      { name: "Onyx Black", hex: "#151515" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    stock: 9,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Goodyear-welted Chelsea boots built on an archival British last. Features elastic side gussets, stacked leather heel, and a durable Vibram rubber outsole.",
    fabric: "Full-grain calfskin upper with Goodyear welted construction.",
    care: "Polish regularly with beeswax cream."
  },
  {
    id: "VA-107",
    name: "Pleated Wide-Leg Palazzo Trousers",
    category: "Dresses",
    gender: "Women",
    collection: "Minimalist Linen",
    price: 190,
    oldPrice: 220,
    rating: 4.7,
    reviewsCount: 31,
    badge: "Trending",
    isNew: true,
    isTrending: true,
    colors: [
      { name: "Ivory", hex: "#FAF8F5" },
      { name: "Olive", hex: "#556B2F" },
      { name: "Charcoal", hex: "#2B2B2B" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 14,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "High-waisted trousers tailored with deep double front pleats and a relaxed wide-leg silhouette that cascades gracefully.",
    fabric: "70% Tencel Lyocell, 30% Linen.",
    care: "Gentle machine wash cold. Warm iron while slightly damp."
  },
  {
    id: "VA-108",
    name: "Sculptural Gold Knot Earring",
    category: "Accessories",
    gender: "Women",
    collection: "Evening Elegance",
    price: 110,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 19,
    badge: "Iconic",
    isNew: false,
    isTrending: false,
    colors: [
      { name: "18k Gold Vermeil", hex: "#E5C158" },
      { name: "Sterling Silver", hex: "#C0C0C0" }
    ],
    sizes: ["One Size"],
    stock: 20,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Cast in lightweight recycled silver coated with 3 microns of 18-karat gold vermeil. High polish with an organic ribbon motif.",
    fabric: "18k Gold Vermeil over 925 Sterling Silver.",
    care: "Keep away from water, perfumes, and store in soft pouch."
  },
  {
    id: "VA-109",
    name: "Deconstructed Wool Blazer",
    category: "Jackets",
    gender: "Men",
    collection: "Urban Monochrome",
    price: 360,
    oldPrice: 420,
    rating: 4.8,
    reviewsCount: 41,
    badge: "Sale",
    isNew: false,
    isTrending: true,
    colors: [
      { name: "Deep Charcoal", hex: "#1F1F1F" },
      { name: "Navy", hex: "#1B263B" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "An unlined single-breasted blazer with soft natural shoulders and patch pockets, balancing sartorial refinement with everyday ease.",
    fabric: "100% Super 130s Merino Wool.",
    care: "Professional dry clean."
  },
  {
    id: "VA-110",
    name: "Leather Minimalist Loafers",
    category: "Footwear",
    gender: "Women",
    collection: "Minimalist Linen",
    price: 275,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 27,
    badge: "New Arrival",
    isNew: true,
    isTrending: true,
    colors: [
      { name: "Ivory White", hex: "#F5F5F0" },
      { name: "Espresso", hex: "#3A2E2B" }
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stock: 11,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Crafted in Portugal from buttery soft nappa leather with a squared almond toe and cushioned memory-foam footbed.",
    fabric: "100% Calfskin Nappa Leather.",
    care: "Protect with water-repellent leather spray."
  },
  {
    id: "VA-111",
    name: "Cashmere Ribbed Beanie & Scarf Set",
    category: "Accessories",
    gender: "Unisex",
    collection: "Autumn / Winter",
    price: 180,
    oldPrice: 210,
    rating: 5.0,
    reviewsCount: 15,
    badge: "Gift Choice",
    isNew: false,
    isTrending: false,
    colors: [
      { name: "Oatmeal Heather", hex: "#D8CAB8" },
      { name: "Charcoal", hex: "#2B2B2B" }
    ],
    sizes: ["One Size"],
    stock: 18,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Warm, ultra-plush ribbed cashmere knit accessory duo that delivers sublime softness and thermal warmth during winter chills.",
    fabric: "100% Mongolian Cashmere.",
    care: "Hand wash cold, dry flat on towel."
  },
  {
    id: "VA-112",
    name: "Oversized Silk Crepe Blouse",
    category: "Shirts",
    gender: "Women",
    collection: "Evening Elegance",
    price: 210,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 34,
    badge: "Trending",
    isNew: true,
    isTrending: true,
    colors: [
      { name: "Ivory", hex: "#FAF8F5" },
      { name: "Black Onyx", hex: "#111111" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 8,
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Cut from heavy silk crepe de Chine with dropped shoulders, exaggerated French cuffs, and a concealed button placket.",
    fabric: "100% Silk Crepe de Chine.",
    care: "Dry clean only."
  },
  {
    id: "VA-113",
    name: "Pleated Virgin Wool Flannel Trousers",
    category: "Shirts",
    gender: "Men",
    collection: "Urban Monochrome",
    price: 220,
    oldPrice: 260,
    rating: 4.8,
    reviewsCount: 18,
    badge: "New Arrival",
    isNew: true,
    isTrending: true,
    colors: [
      { name: "Charcoal Melange", hex: "#333333" },
      { name: "Midnight Navy", hex: "#1A2536" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 10,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Tailored with classic forward pleats, side adjusters, and a subtle taper down to a clean cuff break in Biella flannel wool.",
    fabric: "100% Italian Virgin Wool Flannel.",
    care: "Dry clean only."
  },
  {
    id: "VA-114",
    name: "Silk Charmeuse Column Evening Gown",
    category: "Dresses",
    gender: "Women",
    collection: "Evening Elegance",
    price: 380,
    oldPrice: 450,
    rating: 5.0,
    reviewsCount: 22,
    badge: "Haute Couture",
    isNew: true,
    isTrending: false,
    colors: [
      { name: "Nocturne Black", hex: "#0F0F11" },
      { name: "Emerald", hex: "#1B4D3E" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 5,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Floor-sweeping architectural evening gown crafted with an asymmetric high neckline, low cowl back, and fluid hem train.",
    fabric: "100% Heavy Mulberry Silk Charmeuse.",
    care: "Professional specialty green dry clean only."
  },
  {
    id: "VA-115",
    name: "Sculpted Double-Breasted Wool Blazer",
    category: "Jackets",
    gender: "Women",
    collection: "Autumn / Winter",
    price: 340,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 29,
    badge: "Bestseller",
    isNew: false,
    isTrending: true,
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Chalk White", hex: "#F8F6F0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 7,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Strong structural shoulders with a nipped waistline, peaked lapels, and carved genuine horn buttons.",
    fabric: "100% Superfine Italian Wool. Cupro lining.",
    care: "Dry clean only."
  },
  {
    id: "VA-116",
    name: "Burnished Calfskin Oxford Derby",
    category: "Footwear",
    gender: "Men",
    collection: "Autumn / Winter",
    price: 290,
    oldPrice: 340,
    rating: 4.8,
    reviewsCount: 36,
    badge: "Iconic",
    isNew: false,
    isTrending: false,
    colors: [
      { name: "Chestnut", hex: "#4A2E1B" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    stock: 12,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Handcrafted in Northampton using Goodyear welt construction and antique hand-burnished French calfskin.",
    fabric: "100% French Calfskin with Dainite Soles.",
    care: "Condition with beeswax shoe cream."
  },
  {
    id: "VA-117",
    name: "Tuscan Suede Minimalist Belt",
    category: "Accessories",
    gender: "Unisex",
    collection: "Minimalist Linen",
    price: 130,
    oldPrice: null,
    rating: 4.7,
    reviewsCount: 14,
    badge: "Essential",
    isNew: true,
    isTrending: false,
    colors: [
      { name: "Cognac Suede", hex: "#9E5B32" },
      { name: "Espresso", hex: "#3A2E2B" }
    ],
    sizes: ["85cm", "90cm", "95cm", "100cm"],
    stock: 16,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Supple reverse calfskin suede with a matte brushed brass buckle and feathered stitched edges.",
    fabric: "100% Italian Reverse Suede Calfskin.",
    care: "Clean with specialized suede brush."
  },
  {
    id: "VA-118",
    name: "Sea Island Cotton Marcella Tuxedo Shirt",
    category: "Shirts",
    gender: "Men",
    collection: "Evening Elegance",
    price: 185,
    oldPrice: 220,
    rating: 4.9,
    reviewsCount: 25,
    badge: "Sale",
    isNew: false,
    isTrending: true,
    colors: [
      { name: "Optic White", hex: "#FFFFFF" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 9,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80&fm=webp"
    ],
    description: "Finely spun 140s two-ply West Indian Sea Island cotton with a textured Marcella bib front and mother-of-pearl stud closures.",
    fabric: "100% Sea Island Long-Staple Cotton.",
    care: "Warm machine wash, steam press."
  }
];

// Helper functions for catalog queries
function getAllProducts() {
  return PRODUCTS_DATA;
}

function getProductById(id) {
  return PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0];
}

function getNewArrivals() {
  return PRODUCTS_DATA.filter(p => p.isNew);
}

function getTrendingProducts() {
  return PRODUCTS_DATA.filter(p => p.isTrending);
}

function getProductsByCategory(category) {
  if (!category || category === "All") return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getProductsByGender(gender) {
  if (!gender || gender === "All") return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.gender.toLowerCase() === gender.toLowerCase() || p.gender === "Unisex");
}
