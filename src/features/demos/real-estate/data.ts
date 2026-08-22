export const realEstateBase = "/showroom/real-estate";

export type Listing = {
  slug: string;
  address: string;
  locality: string;
  neighborhood: string;
  neighborhoodSlug: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  type: "Architectural" | "Spanish Colonial" | "Craftsman" | "Condominium";
  year: number;
  image: string;
  gallery: string[];
  alt: string;
  features: string[];
  description: string;
};

export const listings: Listing[] = [
  {
    slug: "canon-view-residence",
    address: "1480 Cañon View Drive",
    locality: "Pasadena, CA 91103",
    neighborhood: "Linda Vista",
    neighborhoodSlug: "linda-vista",
    price: 3250000,
    beds: 4,
    baths: 3.5,
    area: 3180,
    type: "Architectural",
    year: 1984,
    image: "/images/real-estate/foothill-house.jpg",
    gallery: [
      "/images/real-estate/foothill-house.jpg",
      "/images/real-estate/foothill-interior.jpg",
    ],
    alt: "Sample architectural residence with limestone walls and foothill views",
    features: ["Foothill outlook", "Limestone construction", "Native garden", "Library wall", "Indoor-outdoor living", "Two-car garage"],
    description:
      "A measured hillside residence organized around morning light, long views, and durable natural materials. The plan keeps the primary living rooms on one level while quieter rooms step into the slope.",
  },
  {
    slug: "arroyo-courtyard-house",
    address: "612 Arroyo Terrace",
    locality: "Pasadena, CA 91105",
    neighborhood: "San Rafael Hills",
    neighborhoodSlug: "san-rafael-hills",
    price: 2395000,
    beds: 3,
    baths: 2.5,
    area: 2410,
    type: "Spanish Colonial",
    year: 1928,
    image: "/images/real-estate/spanish-courtyard.jpg",
    gallery: ["/images/real-estate/spanish-courtyard.jpg"],
    alt: "Sample 1920s Spanish Colonial home with arched courtyard and garden",
    features: ["Original arches", "Terracotta roof", "Courtyard plan", "Restored oak doors", "Garden studio", "Updated systems"],
    description:
      "A courtyard-centered Spanish Colonial with original proportion, restored millwork, and an unusually calm relationship between the interior rooms and garden.",
  },
  {
    slug: "oakshade-craftsman",
    address: "94 Oakshade Lane",
    locality: "Altadena, CA 91001",
    neighborhood: "Altadena Foothills",
    neighborhoodSlug: "altadena-foothills",
    price: 1875000,
    beds: 4,
    baths: 2,
    area: 2260,
    type: "Craftsman",
    year: 1912,
    image: "/images/real-estate/craftsman-oaks.jpg",
    gallery: ["/images/real-estate/craftsman-oaks.jpg"],
    alt: "Sample dark-shingle Craftsman home under mature oak trees",
    features: ["River-stone porch", "Quarter-sawn oak", "Original hearth", "Mature oaks", "Flexible study", "Detached workshop"],
    description:
      "A deeply shaded Craftsman whose broad porch, honest joinery, and compact garden rooms make the house feel larger than its measured footprint.",
  },
  {
    slug: "granite-court-house",
    address: "37 Granite Court",
    locality: "Sierra Madre, CA 91024",
    neighborhood: "Sierra Madre Village",
    neighborhoodSlug: "sierra-madre-village",
    price: 1645000,
    beds: 3,
    baths: 2,
    area: 1890,
    type: "Architectural",
    year: 1961,
    image: "/images/real-estate/foothill-interior.jpg",
    gallery: ["/images/real-estate/foothill-interior.jpg"],
    alt: "Sample mid-century living room with concrete fireplace and foothill view",
    features: ["Concrete hearth", "White-oak millwork", "Single-level plan", "Mountain view", "Covered terrace", "Quiet cul-de-sac"],
    description:
      "A compact mid-century plan, carefully renewed around its original hearth and view corridor, with storage and daylight doing more work than added square footage.",
  },
];

export type Neighborhood = {
  slug: string;
  name: string;
  summary: string;
  architecture: string;
  housing: string;
  priceRange: string;
  access: string;
  parks: string;
  dailyLife: string;
  image: string;
};

export const neighborhoods: Neighborhood[] = [
  {
    slug: "linda-vista",
    name: "Linda Vista",
    summary: "Low-density streets west of the Rose Bowl with varied hillside architecture and quick access to Arroyo trails.",
    architecture: "Mid-century, ranch, and later architectural houses",
    housing: "Predominantly detached homes on irregular hillside lots",
    priceRange: "$1.8M–$4.5M sample range",
    access: "Arroyo Boulevard, SR-134, and local trail connections",
    parks: "Lower Arroyo Park and Rose Bowl loop",
    dailyLife: "Limited commercial frontage; Old Pasadena is the nearest larger retail district",
    image: "/images/real-estate/foothill-house.jpg",
  },
  {
    slug: "san-rafael-hills",
    name: "San Rafael Hills",
    summary: "Layered residential streets between the Arroyo and South Pasadena, with early houses and later hillside infill.",
    architecture: "Spanish Revival, Craftsman, ranch, and contemporary infill",
    housing: "Detached homes, duplexes along selected corridors, varied lot slope",
    priceRange: "$1.4M–$3.2M sample range",
    access: "Colorado Boulevard, Avenue 64, and Gold Line access from South Pasadena",
    parks: "San Rafael Park and Arroyo Seco paths",
    dailyLife: "Small neighborhood retail pockets with broader dining in Old Pasadena and Highland Park",
    image: "/images/real-estate/spanish-courtyard.jpg",
  },
  {
    slug: "altadena-foothills",
    name: "Altadena Foothills",
    summary: "A broad foothill area with deep lots, mature tree canopy, and direct proximity to trailheads and open space.",
    architecture: "Craftsman, Tudor, Spanish Revival, ranch, and contemporary",
    housing: "Detached homes with wide variation in lot size and condition",
    priceRange: "$1.1M–$2.8M sample range",
    access: "Lake Avenue, Fair Oaks Avenue, and mountain trailheads",
    parks: "Loma Alta Park, Farnsworth Park, and Angeles National Forest access",
    dailyLife: "Independent shops and cafes concentrated along Lake and Lincoln avenues",
    image: "/images/real-estate/craftsman-oaks.jpg",
  },
  {
    slug: "sierra-madre-village",
    name: "Sierra Madre Village",
    summary: "A compact foothill city organized around a walkable commercial core and a mix of modest historic houses.",
    architecture: "Bungalows, cottages, mid-century houses, and small multifamily buildings",
    housing: "Detached homes near the foothills with condos and townhomes closer to the center",
    priceRange: "$950K–$2.3M sample range",
    access: "Sierra Madre Boulevard and connections to I-210",
    parks: "Memorial Park, Bailey Canyon, and Mount Wilson Trail",
    dailyLife: "Groceries, cafes, services, and restaurants clustered around the village center",
    image: "/images/real-estate/pasadena-streetscape.jpg",
  },
];

export const marketRows = [
  { metric: "Active sample inventory", pasadena: "146", altadena: "62", period: "Illustrative · Q2 2026" },
  { metric: "Median sample asking price", pasadena: "$1.48M", altadena: "$1.21M", period: "Illustrative · Q2 2026" },
  { metric: "Median sample days available", pasadena: "24", altadena: "21", period: "Illustrative · Q2 2026" },
  { metric: "Sample sale-to-list range", pasadena: "98–102%", altadena: "99–103%", period: "Illustrative · Q2 2026" },
];

export const toolDirectory = [
  { slug: "move-strategy-studio", name: "Move Strategy Studio", question: "How should the next 90 days be sequenced?", output: "A personalized move plan", time: "6–8 min" },
  { slug: "true-monthly-cost", name: "True Monthly Cost", question: "What does ownership cost beyond principal and interest?", output: "An itemized monthly estimate", time: "3 min" },
  { slug: "offer-comparison", name: "Offer Comparison Lab", question: "How do two offers differ beyond price?", output: "A transparent side-by-side", time: "4 min" },
  { slug: "seller-readiness", name: "Seller Readiness Report", question: "What deserves attention before launch?", output: "A prioritized preparation plan", time: "4 min" },
  { slug: "tour-builder", name: "Tour Builder", question: "Which properties belong in one efficient tour?", output: "A saved itinerary request", time: "2 min" },
  { slug: "neighborhood-comparison", name: "Neighborhood Comparison", question: "How do areas differ on objective criteria?", output: "A dated comparison table", time: "3 min" },
] as const;

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function getListing(slug: string) {
  return listings.find((listing) => listing.slug === slug);
}

export function getNeighborhood(slug: string) {
  return neighborhoods.find((neighborhood) => neighborhood.slug === slug);
}
