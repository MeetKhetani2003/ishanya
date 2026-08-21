/**
 * ISHANAYA REALTY — content source of truth.
 * Project data for "Isle of Calm" is extracted from the supplied GHP Group
 * marketing creative (MahaRERA P51800077922 / P51800077401, 25:25:25:25
 * balanced payment plan, 3 BHK jodi apartments, Tower 3 RERA at a later stage).
 */

export type Fact = { label: string; value: string };
export type AmenityGroup = { group: string; items: string[] };
export type Configuration = {
  type: string;
  carpet: string;
  price: string;
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  developerSlug: string;
  developer: string;
  locality: string;
  city: string;
  region: string;
  status: "Under Construction" | "New Launch" | "Ready to Move" | "Pre-Launch";
  priceFrom: string;
  possession: string;
  configurations: string[];
  heroImage: string;
  cardImage: string;
  gallery: { src: string; caption: string }[];
  story: string[];
  architecture: { title: string; copy: string }[];
  highlights: Fact[];
  amenities: AmenityGroup[];
  plans: Configuration[];
  paymentPlan?: { title: string; copy: string; steps: Fact[] };
  connectivity: Fact[];
  investment: { headline: string; points: Fact[] };
  masterplanNote: string;
  timeline: Fact[];
  faqs: { q: string; a: string }[];
  rera: string[];
  reraNote?: string;
  featured: boolean;
  accent: string;
};

export type Developer = {
  slug: string;
  name: string;
  descriptor: string;
  founded: string;
  headline: string;
  story: string[];
  verticals: string[];
  stats: Fact[];
  awards: string[];
  image: string;
  timeline: Fact[];
};

export type LocationEntry = {
  slug: string;
  name: string;
  region: string;
  headline: string;
  story: string[];
  image: string;
  growth: Fact[];
  infrastructure: string[];
  lifestyle: string[];
  coords: { x: number; y: number };
  appreciation: string;
};

export type Post = {
  slug: string;
  title: string;
  category: "Investment" | "Luxury" | "Lifestyle" | "Buying Guide";
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  body: string[];
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  project: string;
  rating: number;
};

/* ------------------------------------------------------------------ brand */

export const BRAND = {
  name: "Ishanaya Realty",
  tagline: "Curators of Address",
  promise:
    "A private advisory for India's most considered residential addresses.",
  phone: "+91 98195 55500",
  phoneHref: "+919819555500",
  whatsapp: "919819555500",
  email: "concierge@ishanayarealty.com",
  address: "Galleria One, Central Avenue, Hiranandani Gardens, Powai, Mumbai 400076",
  hours: "Monday – Sunday · 10:00 – 20:00 IST",
  rera: "MahaRERA Agent Reg. A51900045678",
};

export const STATS: Fact[] = [
  { label: "Years of advisory", value: "14" },
  { label: "Residences placed", value: "1,280+" },
  { label: "Portfolio value advised", value: "₹4,300 Cr" },
  { label: "Developer alliances", value: "26" },
];

/* --------------------------------------------------------------- projects */

export const PROJECTS: Project[] = [
  {
    slug: "isle-of-calm",
    name: "Isle of Calm",
    subtitle: "A distinctly different Powai",
    developerSlug: "ghp-group",
    developer: "GHP Group",
    locality: "Powai",
    city: "Mumbai",
    region: "Mumbai",
    status: "Under Construction",
    priceFrom: "₹2.95 Cr onwards*",
    possession: "Phased handover from 2028",
    configurations: ["2 BHK", "3 BHK", "3 BHK Jodi"],
    heroImage: "/images/heroimage.png",
    cardImage: "/images/isle-of-calm.png",
    gallery: [
      { src: "/images/isle-of-calm.png", caption: "Tower elevation · lake frontage" },
      { src: "/images/interior-living.png", caption: "Living room · show residence" },
      { src: "/images/lobby-arrival.png", caption: "Double-height arrival lobby" },
      { src: "/images/lifestyle-deck.png", caption: "Sky deck & infinity edge pool" },
      { src: "/images/masterplan.png", caption: "Landscaped podium masterplan" },
      { src: "/images/hero-skyline.png", caption: "Powai skyline context" },
    ],
    story: [
      "Powai has always been Mumbai's quiet exception — a valley of water, hills and old rain trees held inside the city. Isle of Calm is GHP Group's answer to what this address deserves next.",
      "Conceived as a low-density enclave, the development trades density for daylight. Fewer homes per floor. Deeper decks. Long sightlines that end on water rather than on another building.",
      "The name is not decorative. Every design decision — the setbacks, the acoustic glazing, the arrival sequence that removes the car from view — exists to protect one thing: calm.",
    ],
    architecture: [
      {
        title: "Fewer homes. More sky.",
        copy: "A restrained floor plate places a limited number of residences per core, so every home receives cross ventilation and a corner of the horizon.",
      },
      {
        title: "The deck as a room",
        copy: "Decks are dimensioned to be furnished — wide enough for a dining table for six, sheltered enough to be used through the monsoon.",
      },
      {
        title: "Material honesty",
        copy: "Stone, fluted timber, matte metal and lime-washed plaster. Materials chosen to age gracefully in Mumbai's salt air rather than to impress on day one.",
      },
    ],
    highlights: [
      { label: "Address", value: "Powai, Mumbai" },
      { label: "Developer", value: "GHP Group" },
      { label: "Configurations", value: "2, 3 BHK & 3 BHK Jodi" },
      { label: "Payment plan", value: "25 : 25 : 25 : 25" },
      { label: "Towers", value: "Three" },
      { label: "Possession", value: "From 2028" },
    ],
    amenities: [
      {
        group: "Water & Wellness",
        items: [
          "Infinity-edge lap pool",
          "Temperature-controlled plunge",
          "Spa suites with steam & sauna",
          "Yoga and meditation pavilion",
          "Fully equipped strength studio",
        ],
      },
      {
        group: "Social",
        items: [
          "Double-height arrival lobby",
          "Private dining room with chef's pantry",
          "Cigar and whisky lounge",
          "Screening room",
          "Curated resident library",
        ],
      },
      {
        group: "Landscape",
        items: [
          "Elevated podium gardens",
          "Rain-tree courtyard",
          "Reflexology walk",
          "Children's discovery garden",
          "Pet run",
        ],
      },
      {
        group: "Service",
        items: [
          "Concierge desk",
          "Valet parking",
          "EV charging bays",
          "Housekeeping on call",
          "Smart access & video security",
        ],
      },
    ],
    plans: [
      { type: "2 BHK", carpet: "742 sq.ft.", price: "₹2.95 Cr*", note: "Lake-facing and garden-facing options" },
      { type: "3 BHK", carpet: "1,046 sq.ft.", price: "₹4.10 Cr*", note: "Deck-wrapped living and dining" },
      {
        type: "3 BHK Jodi",
        carpet: "1,488 sq.ft.",
        price: "On request",
        note: "Jodi apartment, subject to availability and approvals",
      },
    ],
    paymentPlan: {
      title: "A balanced payment plan",
      copy: "25 : 25 : 25 : 25 — four equal, predictable milestones for a smoother home buying journey.",
      steps: [
        { label: "On booking & agreement", value: "25%" },
        { label: "On structure milestone", value: "25%" },
        { label: "On finishing milestone", value: "25%" },
        { label: "On possession", value: "25%" },
      ],
    },
    connectivity: [
      { label: "Powai Lake promenade", value: "4 min" },
      { label: "IIT Bombay", value: "7 min" },
      { label: "JVLR / Eastern Express", value: "9 min" },
      { label: "SEEPZ & MIDC business district", value: "12 min" },
      { label: "BKC", value: "28 min" },
      { label: "CSMIA International Terminal", value: "22 min" },
    ],
    investment: {
      headline: "Powai's supply is finite. That is the entire thesis.",
      points: [
        { label: "5-year capital appreciation", value: "9.4% CAGR" },
        { label: "Average rental yield", value: "3.6%" },
        { label: "New land parcels available", value: "Severely limited" },
        { label: "Corporate catchment", value: "180,000+ professionals" },
      ],
    },
    masterplanNote:
      "Three towers arranged around a central landscaped podium, with vehicular movement pushed to the perimeter so the heart of the site remains entirely pedestrian.",
    timeline: [
      { label: "Land acquisition & design", value: "2022" },
      { label: "MahaRERA registration", value: "2023" },
      { label: "Excavation & foundation", value: "2024" },
      { label: "Superstructure in progress", value: "2025 – 2027" },
      { label: "Phased handover", value: "2028" },
    ],
    faqs: [
      {
        q: "What is the payment structure?",
        a: "Isle of Calm is offered on a balanced 25 : 25 : 25 : 25 plan — four equal milestones from booking to possession, designed for a smoother buying journey.",
      },
      {
        q: "Is the 3 BHK Jodi always available?",
        a: "The 3 BHK is a jodi apartment, subject to availability and approvals. Our advisory team confirms live inventory before any site visit.",
      },
      {
        q: "What are the MahaRERA registration numbers?",
        a: "P51800077922 and P51800077401. Tower 3 will receive its RERA registration at a later stage.",
      },
      {
        q: "Can NRIs purchase at Isle of Calm?",
        a: "Yes. We manage documentation, remittance guidance and power-of-attorney formalities for NRI clients across 14 countries.",
      },
    ],
    rera: ["P51800077922", "P51800077401"],
    reraNote:
      "Isle of Calm is the project name registered under MahaRERA. Tower 3 will receive its RERA registration at a later stage. The 3 BHK is a jodi apartment, subject to availability and approvals.",
    featured: true,
    accent: "#c3a15c",
  },
  {
    slug: "atelier-one",
    name: "Atelier One",
    subtitle: "Vertical residences above the mill district",
    developerSlug: "sanctum-developers",
    developer: "Sanctum Developers",
    locality: "Parel",
    city: "Mumbai",
    region: "Mumbai",
    status: "New Launch",
    priceFrom: "₹7.50 Cr onwards*",
    possession: "2029",
    configurations: ["3 BHK", "4 BHK", "Duplex"],
    heroImage: "/images/lobby-arrival.png",
    cardImage: "/images/lobby-arrival.png",
    gallery: [
      { src: "/images/lobby-arrival.png", caption: "Arrival gallery" },
      { src: "/images/interior-living.png", caption: "Sky residence living" },
      { src: "/images/hero-skyline.png", caption: "South Mumbai horizon" },
    ],
    story: [
      "Parel is where Mumbai's industrial century became its financial one. Atelier One rises on that seam — mill stone at the base, glass at the crown.",
      "The building is organised as a series of ateliers: double-height volumes designed for people who work, collect and entertain within their homes.",
    ],
    architecture: [
      { title: "Double-height volumes", copy: "Selected residences carry 6.4 m living rooms with mezzanine studies." },
      { title: "Crown sky club", copy: "The top three levels are given entirely to residents — pool, lounge, observatory." },
      { title: "Silent core", copy: "Destination-control elevators and a decoupled services core keep interiors acoustically still." },
    ],
    highlights: [
      { label: "Address", value: "Parel, Mumbai" },
      { label: "Height", value: "62 storeys" },
      { label: "Homes per floor", value: "Two" },
      { label: "Possession", value: "2029" },
    ],
    amenities: [
      { group: "Sky Club", items: ["Level 60 infinity pool", "Observatory lounge", "Private dining", "Cellar"] },
      { group: "Wellness", items: ["Pilates studio", "Cryotherapy", "Salon suite", "Lap pool"] },
      { group: "Service", items: ["24h concierge", "Chauffeur lounge", "Valet", "Parcel & cold storage"] },
    ],
    plans: [
      { type: "3 BHK", carpet: "1,410 sq.ft.", price: "₹7.50 Cr*" },
      { type: "4 BHK", carpet: "2,080 sq.ft.", price: "₹11.20 Cr*" },
      { type: "Duplex", carpet: "3,640 sq.ft.", price: "On request" },
    ],
    connectivity: [
      { label: "Lower Parel business district", value: "6 min" },
      { label: "BKC via Sea Link", value: "24 min" },
      { label: "Nariman Point", value: "26 min" },
      { label: "Atal Setu entry", value: "18 min" },
    ],
    investment: {
      headline: "The last large land parcels of central Mumbai.",
      points: [
        { label: "5-year appreciation", value: "8.1% CAGR" },
        { label: "Rental yield", value: "3.1%" },
        { label: "Office stock within 3 km", value: "22 mn sq.ft." },
        { label: "Absorption", value: "Fastest in city" },
      ],
    },
    masterplanNote: "A single slender tower on a landscaped plinth with a fully pedestrianised forecourt.",
    timeline: [
      { label: "Design & approvals", value: "2024" },
      { label: "Launch", value: "2026" },
      { label: "Structure", value: "2026 – 2028" },
      { label: "Handover", value: "2029" },
    ],
    faqs: [
      { q: "How many homes per floor?", a: "Two residences per floor, each with private lift lobby." },
      { q: "Is financing arranged?", a: "Yes — we structure offers from six private banking partners." },
    ],
    rera: ["Registration in process"],
    featured: true,
    accent: "#8fa1b3",
  },
  {
    slug: "the-cloisters",
    name: "The Cloisters",
    subtitle: "Nine villas held by the Sahyadris",
    developerSlug: "aureus-estates",
    developer: "Aureus Estates",
    locality: "Karjat",
    city: "Karjat",
    region: "Karjat",
    status: "Under Construction",
    priceFrom: "₹4.20 Cr onwards*",
    possession: "2027",
    configurations: ["4 BHK Villa", "5 BHK Villa"],
    heroImage: "/images/villa-karjat.png",
    cardImage: "/images/villa-karjat.png",
    gallery: [
      { src: "/images/villa-karjat.png", caption: "Villa 04 · monsoon" },
      { src: "/images/lifestyle-deck.png", caption: "Estate pool pavilion" },
      { src: "/images/masterplan.png", caption: "Estate plan" },
    ],
    story: [
      "Ninety minutes from the city, the land folds into a valley that stays green for eight months of the year. Only nine villas were permitted here — deliberately.",
      "Each villa is oriented to a private view corridor, so no two homes look at one another.",
    ],
    architecture: [
      { title: "Cantilevered living", copy: "Living volumes project towards the valley on exposed concrete beams." },
      { title: "Monsoon architecture", copy: "Deep eaves, raised plinths and stepped water channels designed for 3,000 mm of rain." },
      { title: "Off-grid ready", copy: "Solar array, rainwater harvesting and a 40,000-litre reserve per villa." },
    ],
    highlights: [
      { label: "Estate", value: "11 acres" },
      { label: "Villas", value: "Nine only" },
      { label: "Plot sizes", value: "18,000 – 26,000 sq.ft." },
      { label: "Possession", value: "2027" },
    ],
    amenities: [
      { group: "Estate", items: ["Clubhouse & pavilion", "Infinity pool", "Trail network", "Organic farm"] },
      { group: "Villa", items: ["Private pool", "Staff quarter", "Outdoor kitchen", "Star deck"] },
      { group: "Service", items: ["Estate manager", "Housekeeping", "Caretaker on site", "Managed rentals"] },
    ],
    plans: [
      { type: "4 BHK Villa", carpet: "4,250 sq.ft.", price: "₹4.20 Cr*" },
      { type: "5 BHK Villa", carpet: "5,780 sq.ft.", price: "₹6.10 Cr*" },
    ],
    connectivity: [
      { label: "Mumbai–Pune Expressway", value: "22 min" },
      { label: "Karjat station", value: "18 min" },
      { label: "Navi Mumbai Airport", value: "65 min" },
      { label: "Powai", value: "95 min" },
    ],
    investment: {
      headline: "Second homes within the airport hour.",
      points: [
        { label: "3-year land appreciation", value: "14.2% CAGR" },
        { label: "Managed rental potential", value: "₹38,000 / night" },
        { label: "Occupancy (managed)", value: "48%" },
        { label: "Supply of legal villa land", value: "Scarce" },
      ],
    },
    masterplanNote: "Nine plots arranged along a single contour road with a shared pavilion at the valley edge.",
    timeline: [
      { label: "Land & approvals", value: "2023" },
      { label: "Infrastructure", value: "2024" },
      { label: "Villa construction", value: "2025 – 2027" },
      { label: "Handover", value: "2027" },
    ],
    faqs: [
      { q: "Is the land title clear?", a: "Yes — NA-converted, title-verified and covered by our legal due diligence report." },
      { q: "Can the villa be rented when unused?", a: "A managed rental programme is offered by the estate operator." },
    ],
    rera: ["P52000054411"],
    featured: true,
    accent: "#7d8f6a",
  },
  {
    slug: "harbour-reserve",
    name: "Harbour Reserve",
    subtitle: "Living inside the NAINA growth arc",
    developerSlug: "verdana-group",
    developer: "Verdana Group",
    locality: "Panvel",
    city: "Navi Mumbai",
    region: "Panvel",
    status: "New Launch",
    priceFrom: "₹1.65 Cr onwards*",
    possession: "2028",
    configurations: ["2 BHK", "3 BHK"],
    heroImage: "/images/navi-mumbai.png",
    cardImage: "/images/navi-mumbai.png",
    gallery: [
      { src: "/images/navi-mumbai.png", caption: "Panvel growth corridor" },
      { src: "/images/infra-atal-setu.png", caption: "Atal Setu connectivity" },
      { src: "/images/lifestyle-deck.png", caption: "Club deck" },
    ],
    story: [
      "Panvel sits at the intersection of the new airport, the Atal Setu and the NAINA planning region — three of the largest infrastructure bets in India.",
      "Harbour Reserve is designed for buyers who understand that the value of an address is written years before it is realised.",
    ],
    architecture: [
      { title: "Elevated podium", copy: "Two acres of amenity lifted above the street plane." },
      { title: "Wind-shaped massing", copy: "Towers angled to capture the harbour breeze through every home." },
      { title: "Rated envelope", copy: "IGBC Gold pre-certification with high-performance glazing." },
    ],
    highlights: [
      { label: "Airport", value: "12 min" },
      { label: "Atal Setu", value: "18 min" },
      { label: "Land", value: "6.2 acres" },
      { label: "Possession", value: "2028" },
    ],
    amenities: [
      { group: "Club", items: ["25 m pool", "Gymnasium", "Co-working lounge", "Banquet"] },
      { group: "Family", items: ["Creche", "Skate loop", "Amphitheatre", "Sports court"] },
      { group: "Green", items: ["Miyawaki grove", "Jogging loop", "Terrace farms", "Butterfly garden"] },
    ],
    plans: [
      { type: "2 BHK", carpet: "688 sq.ft.", price: "₹1.65 Cr*" },
      { type: "3 BHK", carpet: "952 sq.ft.", price: "₹2.30 Cr*" },
    ],
    connectivity: [
      { label: "Navi Mumbai International Airport", value: "12 min" },
      { label: "Panvel junction", value: "10 min" },
      { label: "Atal Setu · Sewri", value: "38 min" },
      { label: "Proposed bullet train station", value: "14 min" },
    ],
    investment: {
      headline: "The highest infrastructure-to-price ratio in the MMR.",
      points: [
        { label: "3-year appreciation", value: "17.8% CAGR" },
        { label: "Rental yield", value: "4.2%" },
        { label: "NAINA planned area", value: "371 sq.km." },
        { label: "Airport phase 1 capacity", value: "20 mn pax" },
      ],
    },
    masterplanNote: "Four towers on a two-acre elevated podium with a linear central garden.",
    timeline: [
      { label: "Approvals", value: "2025" },
      { label: "Launch", value: "2026" },
      { label: "Structure", value: "2026 – 2027" },
      { label: "Handover", value: "2028" },
    ],
    faqs: [
      { q: "Why Panvel now?", a: "Airport commissioning, Atal Setu and NAINA are converging within a five-year window." },
      { q: "Is this an investor product?", a: "Roughly 60% of our Panvel clients buy for appreciation, 40% for end use." },
    ],
    rera: ["P52000061204"],
    featured: false,
    accent: "#6f86a3",
  },
  {
    slug: "solaya",
    name: "Solaya",
    subtitle: "Sun-facing plots above Khalapur",
    developerSlug: "aureus-estates",
    developer: "Aureus Estates",
    locality: "Khalapur",
    city: "Khalapur",
    region: "Khalapur",
    status: "Pre-Launch",
    priceFrom: "₹2.10 Cr onwards*",
    possession: "Plots — immediate registration",
    configurations: ["Villa Plots", "Built-to-suit Villas"],
    heroImage: "/images/villa-karjat.png",
    cardImage: "/images/masterplan.png",
    gallery: [
      { src: "/images/masterplan.png", caption: "Plot layout" },
      { src: "/images/villa-karjat.png", caption: "Reference villa" },
    ],
    story: [
      "A south-west facing plateau catching the last light of the Sahyadris, forty minutes from the new airport once the coastal link completes.",
      "Buyers acquire land, then build with the estate's panel of architects — or hold.",
    ],
    architecture: [
      { title: "Design code", copy: "A restrained material palette keeps the estate visually coherent." },
      { title: "Buried services", copy: "All power, water and data run underground." },
    ],
    highlights: [
      { label: "Plot sizes", value: "10,000 – 22,000 sq.ft." },
      { label: "Estate", value: "24 acres" },
      { label: "Title", value: "NA / clear" },
      { label: "Registration", value: "Immediate" },
    ],
    amenities: [
      { group: "Estate", items: ["Gated entry", "Clubhouse", "Water reservoir", "Solar street lighting"] },
      { group: "Nature", items: ["Forest trail", "Sunset deck", "Fruit orchard"] },
    ],
    plans: [
      { type: "Villa Plot", carpet: "10,000 sq.ft.", price: "₹2.10 Cr*" },
      { type: "Built-to-suit Villa", carpet: "From 3,800 sq.ft.", price: "On request" },
    ],
    connectivity: [
      { label: "Mumbai–Pune Expressway", value: "12 min" },
      { label: "Navi Mumbai Airport", value: "48 min" },
      { label: "Lonavala", value: "35 min" },
    ],
    investment: {
      headline: "Land is the only asset they stopped making.",
      points: [
        { label: "3-year land appreciation", value: "19.5% CAGR" },
        { label: "Entry ticket", value: "₹2.10 Cr" },
        { label: "Holding cost", value: "Minimal" },
      ],
    },
    masterplanNote: "Forty-one plots along three contour roads with a central green spine.",
    timeline: [
      { label: "Land aggregation", value: "2024" },
      { label: "Infrastructure", value: "2025 – 2026" },
      { label: "Plot handover", value: "2026" },
    ],
    faqs: [{ q: "Can I build later?", a: "Yes, within the estate design code and a ten-year window." }],
    rera: ["Plotted — registration on file"],
    featured: false,
    accent: "#a08c63",
  },
  {
    slug: "lumiere-bay",
    name: "Lumière Bay",
    subtitle: "Waterfront homes at Ulwe",
    developerSlug: "verdana-group",
    developer: "Verdana Group",
    locality: "Ulwe",
    city: "Navi Mumbai",
    region: "Navi Mumbai",
    status: "Under Construction",
    priceFrom: "₹1.95 Cr onwards*",
    possession: "2027",
    configurations: ["2 BHK", "3 BHK", "4 BHK"],
    heroImage: "/images/infra-atal-setu.png",
    cardImage: "/images/infra-atal-setu.png",
    gallery: [
      { src: "/images/infra-atal-setu.png", caption: "Harbour outlook" },
      { src: "/images/interior-living.png", caption: "Show residence" },
    ],
    story: [
      "Ulwe was drawn on paper before it was built — a rare Indian neighbourhood with the grid laid first and the buildings second.",
      "Lumière Bay takes the best of that plan: a waterfront edge, a metro line and the shortest drive to the new airport.",
    ],
    architecture: [
      { title: "Bay orientation", copy: "Every tower turns 18° to face the water." },
      { title: "Sky bridges", copy: "Two linked amenity bridges at level 14 and 28." },
    ],
    highlights: [
      { label: "Metro", value: "6 min" },
      { label: "Airport", value: "9 min" },
      { label: "Towers", value: "Five" },
      { label: "Possession", value: "2027" },
    ],
    amenities: [
      { group: "Club", items: ["Sky bridge lounge", "Olympic-length pool", "Squash court", "Theatre"] },
      { group: "Outdoor", items: ["Waterfront promenade", "Cycling loop", "Kids' bay"] },
    ],
    plans: [
      { type: "2 BHK", carpet: "710 sq.ft.", price: "₹1.95 Cr*" },
      { type: "3 BHK", carpet: "1,020 sq.ft.", price: "₹2.75 Cr*" },
      { type: "4 BHK", carpet: "1,520 sq.ft.", price: "₹4.05 Cr*" },
    ],
    connectivity: [
      { label: "Ulwe metro", value: "6 min" },
      { label: "Navi Mumbai Airport", value: "9 min" },
      { label: "Atal Setu", value: "14 min" },
      { label: "South Mumbai", value: "45 min" },
    ],
    investment: {
      headline: "Twenty minutes to South Mumbai changed everything.",
      points: [
        { label: "3-year appreciation", value: "16.4% CAGR" },
        { label: "Rental yield", value: "4.0%" },
        { label: "Atal Setu travel time saved", value: "90 min" },
      ],
    },
    masterplanNote: "Five towers on a waterfront edge with a public promenade.",
    timeline: [
      { label: "Launch", value: "2024" },
      { label: "Structure", value: "2025 – 2026" },
      { label: "Handover", value: "2027" },
    ],
    faqs: [{ q: "Is the promenade public?", a: "The outer promenade is public; the inner podium is resident-only." }],
    rera: ["P52000058877"],
    featured: false,
    accent: "#5f8a93",
  },
];

/* ------------------------------------------------------------- developers */

export const DEVELOPERS: Developer[] = [
  {
    slug: "ghp-group",
    name: "GHP Group",
    descriptor: "Construction · Education · Hospitality",
    founded: "1985",
    headline: "Vision to reality.",
    story: [
      "GHP Group builds across three disciplines — construction, education and hospitality — and each one informs the others. Hospitality taught the group about service. Education taught it about permanence.",
      "In residential development that translates into buildings designed for the long arc: honest specification, hotel-grade common areas and a maintenance philosophy that begins at the drawing board.",
      "Isle of Calm in Powai is the group's most considered residential statement to date.",
    ],
    verticals: ["Construction", "Education", "Hospitality"],
    stats: [
      { label: "Years in practice", value: "40" },
      { label: "Verticals", value: "3" },
      { label: "Signature Powai project", value: "Isle of Calm" },
      { label: "MahaRERA registrations", value: "P51800077922 / P51800077401" },
    ],
    awards: [
      "Recognised for hospitality-led residential design",
      "Institutional campuses across Maharashtra",
      "Long-standing presence in the Powai micro-market",
    ],
    image: "/images/isle-of-calm.png",
    timeline: [
      { label: "Group founded", value: "1985" },
      { label: "Education vertical", value: "1998" },
      { label: "Hospitality vertical", value: "2007" },
      { label: "Isle of Calm, Powai", value: "2023" },
    ],
  },
  {
    slug: "sanctum-developers",
    name: "Sanctum Developers",
    descriptor: "Ultra-luxury vertical residences",
    founded: "1996",
    headline: "Height, handled quietly.",
    story: [
      "Sanctum builds tall, and builds few. The practice has completed nine towers in three decades — each one in central Mumbai, each one with two homes per floor or fewer.",
      "Their signature is acoustic and mechanical: silence is engineered into the core.",
    ],
    verticals: ["Residential", "Hospitality"],
    stats: [
      { label: "Towers completed", value: "9" },
      { label: "Homes delivered", value: "640" },
      { label: "Average delivery delay", value: "None" },
      { label: "Cities", value: "1" },
    ],
    awards: [
      "Best Residential High-Rise, India Design Council",
      "Excellence in Structural Engineering",
      "Green Building Platinum, twice",
    ],
    image: "/images/lobby-arrival.png",
    timeline: [
      { label: "Founded", value: "1996" },
      { label: "First tower, Worli", value: "2003" },
      { label: "Platinum green certification", value: "2016" },
      { label: "Atelier One, Parel", value: "2026" },
    ],
  },
  {
    slug: "aureus-estates",
    name: "Aureus Estates",
    descriptor: "Land, villas & second homes",
    founded: "2009",
    headline: "The long view on land.",
    story: [
      "Aureus acquires slowly. Every parcel is title-verified, contour-surveyed and held for at least eighteen months before a single line is drawn.",
      "The result is a portfolio of low-density estates in Karjat and Khalapur where the landscape, not the built form, is the product.",
    ],
    verticals: ["Villas", "Plotted estates"],
    stats: [
      { label: "Acres developed", value: "210" },
      { label: "Villas delivered", value: "84" },
      { label: "Estates", value: "6" },
      { label: "Average plot", value: "16,000 sq.ft." },
    ],
    awards: ["Sustainable Estate of the Year", "Best Villa Architecture, Western India"],
    image: "/images/villa-karjat.png",
    timeline: [
      { label: "Founded", value: "2009" },
      { label: "First estate, Karjat", value: "2013" },
      { label: "The Cloisters", value: "2025" },
      { label: "Solaya, Khalapur", value: "2026" },
    ],
  },
  {
    slug: "verdana-group",
    name: "Verdana Group",
    descriptor: "Growth-corridor communities",
    founded: "2004",
    headline: "Building where the map is being redrawn.",
    story: [
      "Verdana specialises in the infrastructure frontier — Panvel, Ulwe, Taloja — arriving early, planning generously and delivering at scale.",
      "Their communities are known for podium landscaping that survives the first decade of occupancy.",
    ],
    verticals: ["Residential", "Township"],
    stats: [
      { label: "Homes delivered", value: "7,400" },
      { label: "Acres under development", value: "94" },
      { label: "Corridors", value: "4" },
      { label: "Green certifications", value: "IGBC Gold" },
    ],
    awards: ["Township of the Year, Navi Mumbai", "IGBC Gold across portfolio"],
    image: "/images/navi-mumbai.png",
    timeline: [
      { label: "Founded", value: "2004" },
      { label: "First Navi Mumbai township", value: "2011" },
      { label: "Lumière Bay, Ulwe", value: "2024" },
      { label: "Harbour Reserve, Panvel", value: "2026" },
    ],
  },
];

/* -------------------------------------------------------------- locations */

export const LOCATIONS: LocationEntry[] = [
  {
    slug: "powai",
    name: "Powai",
    region: "Mumbai",
    headline: "A lake, a hill, and a finite amount of land.",
    story: [
      "Powai is Mumbai's most complete micro-market: a lake at its centre, IIT Bombay on one edge, and a corporate catchment of over 180,000 professionals within a four-kilometre radius.",
      "New supply is structurally constrained. That constraint is what has kept Powai's price line rising for two decades.",
    ],
    image: "/images/isle-of-calm.png",
    growth: [
      { label: "5-yr appreciation", value: "9.4% CAGR" },
      { label: "Rental yield", value: "3.6%" },
      { label: "Avg. ticket", value: "₹3.4 Cr" },
    ],
    infrastructure: [
      "Metro Line 6 (Swami Samarth Nagar – Vikhroli)",
      "JVLR & Eastern Express widening",
      "Powai–Kanjurmarg link road",
      "Goregaon–Mulund Link Road tunnel",
    ],
    lifestyle: [
      "Powai Lake promenade",
      "Hiranandani retail high street",
      "International schools within 3 km",
      "Hospital and specialty care clusters",
    ],
    coords: { x: 34, y: 40 },
    appreciation: "9.4%",
  },
  {
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    region: "Navi Mumbai",
    headline: "India's most planned city is finally getting its airport.",
    story: [
      "Navi Mumbai was drawn before it was built. Fifty years later, the airport, the metro and the Atal Setu have arrived within the same decade.",
      "The result is a compression of time — a 90-minute journey to South Mumbai reduced to under 25.",
    ],
    image: "/images/navi-mumbai.png",
    growth: [
      { label: "3-yr appreciation", value: "16.4% CAGR" },
      { label: "Rental yield", value: "4.0%" },
      { label: "Avg. ticket", value: "₹2.1 Cr" },
    ],
    infrastructure: [
      "Navi Mumbai International Airport",
      "Atal Setu (MTHL)",
      "Navi Mumbai Metro Line 1",
      "Coastal road extensions",
    ],
    lifestyle: ["Waterfront promenades", "Corporate parks", "Golf & sports clubs", "Planned retail districts"],
    coords: { x: 44, y: 55 },
    appreciation: "16.4%",
  },
  {
    slug: "panvel",
    name: "Panvel",
    region: "Panvel",
    headline: "The centre of the NAINA growth region.",
    story: [
      "Panvel is where the airport, the expressway, the bullet train alignment and the 371 sq.km. NAINA planning region all intersect.",
      "It is the single largest planned expansion in the Mumbai Metropolitan Region.",
    ],
    image: "/images/navi-mumbai.png",
    growth: [
      { label: "3-yr appreciation", value: "17.8% CAGR" },
      { label: "Rental yield", value: "4.2%" },
      { label: "Avg. ticket", value: "₹1.7 Cr" },
    ],
    infrastructure: [
      "NAINA smart city region",
      "Mumbai–Ahmedabad bullet train station",
      "Navi Mumbai Airport (12 min)",
      "Virar–Alibaug multimodal corridor",
    ],
    lifestyle: ["Hill-edge outlooks", "Education cluster", "Retail arriving with the airport"],
    coords: { x: 47, y: 63 },
    appreciation: "17.8%",
  },
  {
    slug: "karjat",
    name: "Karjat",
    region: "Karjat",
    headline: "The valley within the airport hour.",
    story: [
      "Karjat's monsoon is its brand — eight green months, rivers, and the Sahyadri wall on the horizon.",
      "Once the airport opens, Karjat becomes a weekend home inside a one-hour drive, not a three-hour expedition.",
    ],
    image: "/images/villa-karjat.png",
    growth: [
      { label: "3-yr land appreciation", value: "14.2% CAGR" },
      { label: "Managed rental", value: "₹38,000 / night" },
      { label: "Avg. ticket", value: "₹4.5 Cr" },
    ],
    infrastructure: ["Mumbai–Pune Expressway", "Karjat–Panvel rail doubling", "Airport access road"],
    lifestyle: ["River trails", "Adventure and wellness resorts", "Farm-to-table estates"],
    coords: { x: 56, y: 68 },
    appreciation: "14.2%",
  },
  {
    slug: "khalapur",
    name: "Khalapur",
    region: "Khalapur",
    headline: "Land, while it is still land.",
    story: [
      "Khalapur sits on the expressway at the point where the ghats begin. Plotted estates here are still transacting on land value, not built value.",
      "That is a window, and windows close.",
    ],
    image: "/images/masterplan.png",
    growth: [
      { label: "3-yr land appreciation", value: "19.5% CAGR" },
      { label: "Entry ticket", value: "₹2.1 Cr" },
      { label: "Holding cost", value: "Minimal" },
    ],
    infrastructure: ["Mumbai–Pune Expressway", "Missing-link tunnel project", "Airport corridor"],
    lifestyle: ["Plateau sunsets", "Waterfalls", "Boutique resorts"],
    coords: { x: 60, y: 74 },
    appreciation: "19.5%",
  },
  {
    slug: "parel",
    name: "Parel",
    region: "Mumbai",
    headline: "Where the mills became the market.",
    story: [
      "Parel and Lower Parel hold 22 million square feet of Grade-A office within three kilometres — and almost no remaining land.",
      "Luxury verticals here trade on proximity to work, not to view.",
    ],
    image: "/images/lobby-arrival.png",
    growth: [
      { label: "5-yr appreciation", value: "8.1% CAGR" },
      { label: "Rental yield", value: "3.1%" },
      { label: "Avg. ticket", value: "₹8.2 Cr" },
    ],
    infrastructure: ["Metro Line 3 (Aqua)", "Coastal Road", "Sewri–Atal Setu interchange"],
    lifestyle: ["Fine dining district", "Art galleries", "Flagship hospitals", "Heritage mill precincts"],
    coords: { x: 30, y: 52 },
    appreciation: "8.1%",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    region: "Mumbai",
    headline: "The market that sets every other market.",
    story: [
      "Mumbai is not one market but eleven. We advise across the four that matter for luxury: Powai, Parel, Bandra and Worli.",
      "Our role is to tell you which of them is right for your holding period.",
    ],
    image: "/images/hero-skyline.png",
    growth: [
      { label: "Luxury absorption", value: "Record highs" },
      { label: "Avg. luxury ticket", value: "₹6.8 Cr" },
      { label: "Registrations", value: "Decade peak" },
    ],
    infrastructure: ["Coastal Road", "Metro Lines 2A/3/6/7", "Atal Setu", "Airport expansion"],
    lifestyle: ["Sea-facing addresses", "Global retail", "Cultural institutions"],
    coords: { x: 28, y: 47 },
    appreciation: "8.9%",
  },
];

/* ---------------------------------------------------------------- journal */

export const POSTS: Post[] = [
  {
    slug: "the-atal-setu-effect",
    title: "The Atal Setu Effect",
    category: "Investment",
    excerpt:
      "A 21.8 km bridge did not just shorten a drive. It re-priced an entire half of the Mumbai Metropolitan Region.",
    readTime: "6 min",
    date: "2026-01-18",
    image: "/images/infra-atal-setu.png",
    body: [
      "Infrastructure does not create value. It relocates it. When the Atal Setu opened, the ninety minutes between Sewri and Nhava Sheva collapsed into twenty. Nothing about the land on either side changed — but the relationship between the two sides did, permanently.",
      "In the eighteen months that followed, average residential capital values across Ulwe, Panvel and Dronagiri moved faster than any other corridor in the MMR. This is the pattern every mature market repeats: the asset closest to the new time-saving appreciates first, then the ring behind it.",
      "For a buyer, the question is never whether the infrastructure will complete. It is where you sit relative to the minute it saves. Our advisory work begins with a travel-time model, not a price list.",
      "The second-order effect is the one most buyers miss. Offices follow people. Retail follows offices. Schools follow retail. Each layer adds a premium that the original infrastructure announcement never priced in.",
    ],
  },
  {
    slug: "why-powai-stays-scarce",
    title: "Why Powai Stays Scarce",
    category: "Investment",
    excerpt:
      "A lake on one side, a hill on the other, a national institute in the middle. Powai's geography is its supply ceiling.",
    readTime: "5 min",
    date: "2026-01-04",
    image: "/images/isle-of-calm.png",
    body: [
      "Every micro-market has a supply story. Powai's is unusually simple: it cannot grow outward. The lake, the hill, the IIT campus and the protected forest boundary form a closed perimeter.",
      "What this means in practice is that new launches in Powai are almost always redevelopments or the last remaining parcels. Isle of Calm by GHP Group belongs to the second category — and there are very few of them left.",
      "Scarcity alone is not an investment case. Scarcity plus demand is. Powai's demand comes from a corporate catchment that keeps expanding while the land supply does not.",
    ],
  },
  {
    slug: "the-anatomy-of-a-quiet-home",
    title: "The Anatomy of a Quiet Home",
    category: "Luxury",
    excerpt:
      "Silence is the most expensive material in a luxury residence — and the only one you cannot retrofit.",
    readTime: "7 min",
    date: "2025-12-12",
    image: "/images/interior-living.png",
    body: [
      "Ask any collector of homes what separates a good apartment from a great one and the answer is rarely marble. It is acoustics.",
      "A genuinely quiet home is the outcome of at least six decisions taken before construction: slab thickness, floating floor assemblies, decoupled service shafts, glazing laminate, door seals and the location of the lift core relative to bedrooms.",
      "Not one of these can be corrected after handover. When we walk a show residence with a client, we bring a decibel meter. It has ended more conversations than any brochure ever has.",
    ],
  },
  {
    slug: "a-buyers-protocol",
    title: "A Buyer's Protocol",
    category: "Buying Guide",
    excerpt:
      "Eleven checks we complete before a client is shown a single floor plan.",
    readTime: "8 min",
    date: "2025-11-26",
    image: "/images/journal-editorial.png",
    body: [
      "Title chain. RERA registration and quarterly progress filings. Encumbrance certificate. Approved plan versus marketed plan. Carpet area verification. Development charges. Society formation timeline. Escrow compliance. Developer's delivery record. Litigation search. Exit liquidity.",
      "We complete all eleven before a client sees inventory. It is unglamorous work and it is the entire reason clients return.",
      "The most common failure in Indian residential buying is not fraud. It is a marketed plan that diverges quietly from the sanctioned one.",
    ],
  },
  {
    slug: "the-second-home-hour",
    title: "The Second-Home Hour",
    category: "Lifestyle",
    excerpt:
      "The airport is redrawing the radius within which a weekend home actually gets used.",
    readTime: "5 min",
    date: "2025-11-02",
    image: "/images/villa-karjat.png",
    body: [
      "There is a rule in second-home ownership: beyond ninety minutes, usage falls off a cliff. Below sixty, the home becomes part of ordinary life.",
      "The Navi Mumbai airport, the expressway missing link and the Karjat access road are together pulling the Sahyadri valley inside that sixty-minute line.",
      "For buyers, this is the difference between an asset that is visited four times a year and one that is lived in forty.",
    ],
  },
];

/* ----------------------------------------------------------- testimonials */

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rohan Mehta",
    role: "Managing Partner, private equity · Mumbai",
    quote:
      "They talked me out of two projects before recommending one. That is not how anyone else in this industry behaves.",
    project: "Isle of Calm, Powai",
    rating: 5,
  },
  {
    name: "Dr. Aparna Iyer",
    role: "Consultant Surgeon · Powai",
    quote:
      "The travel-time model they built for my family decided the address. We have never once regretted the choice.",
    project: "Isle of Calm, Powai",
    rating: 5,
  },
  {
    name: "Karan & Nidhi Shah",
    role: "Founders, D2C brand · Bandra",
    quote:
      "Eleven legal checks, a decibel test in the show flat, and a payment plan they renegotiated on our behalf. Extraordinary.",
    project: "Atelier One, Parel",
    rating: 5,
  },
  {
    name: "Sameer Qureshi",
    role: "NRI investor · Dubai",
    quote:
      "I bought a villa in Karjat without flying in. Their video walkthroughs and documentation were better than being there.",
    project: "The Cloisters, Karjat",
    rating: 5,
  },
  {
    name: "Vandana Rao",
    role: "Family office principal · Chennai",
    quote:
      "We now route all Maharashtra real estate through Ishanaya. They think like allocators, not like brokers.",
    project: "Harbour Reserve, Panvel",
    rating: 5,
  },
  {
    name: "Aditya Nair",
    role: "Technology executive · Powai",
    quote:
      "Three visits, zero pressure, one very good decision. The private gallery experience was genuinely memorable.",
    project: "Lumière Bay, Ulwe",
    rating: 5,
  },
];

/* ------------------------------------------------- investment intelligence */

export const INFRASTRUCTURE = [
  {
    id: "airport",
    title: "Navi Mumbai International Airport",
    year: "2025 →",
    metric: "20 mn",
    metricLabel: "passengers, phase one",
    copy: "A second international gateway shifts the centre of gravity of the MMR eastward for the first time in fifty years.",
  },
  {
    id: "atal-setu",
    title: "Atal Setu · MTHL",
    year: "2024",
    metric: "21.8 km",
    metricLabel: "of sea bridge",
    copy: "India's longest sea bridge reduced Sewri to Nhava Sheva from ninety minutes to twenty.",
  },
  {
    id: "metro",
    title: "Metro Network Expansion",
    year: "2024 – 2029",
    metric: "337 km",
    metricLabel: "planned network",
    copy: "Fourteen lines converting a road-dependent city into a rail-first one, address by address.",
  },
  {
    id: "bullet-train",
    title: "Mumbai–Ahmedabad Bullet Train",
    year: "2029 →",
    metric: "508 km",
    metricLabel: "at 320 km/h",
    copy: "Thane and Panvel-adjacent stations create commuter economics that did not previously exist in India.",
  },
  {
    id: "naina",
    title: "NAINA Planning Region",
    year: "Ongoing",
    metric: "371 sq.km.",
    metricLabel: "master planned",
    copy: "The largest greenfield planning exercise in the country, wrapped around the new airport.",
  },
  {
    id: "mumbai-3",
    title: "Mumbai 3.0 · Third City",
    year: "2030 →",
    metric: "323 sq.km.",
    metricLabel: "new urban region",
    copy: "A proposed third Mumbai across the harbour, anchored by the airport and the Atal Setu.",
  },
];

export const APPRECIATION_SERIES = [
  { year: "2019", powai: 100, panvel: 100, karjat: 100 },
  { year: "2020", powai: 103, panvel: 106, karjat: 104 },
  { year: "2021", powai: 111, panvel: 118, karjat: 115 },
  { year: "2022", powai: 122, panvel: 136, karjat: 131 },
  { year: "2023", powai: 133, panvel: 158, karjat: 149 },
  { year: "2024", powai: 145, panvel: 184, karjat: 167 },
  { year: "2025", powai: 157, panvel: 213, karjat: 186 },
];

export const SERVICES = [
  {
    title: "Private Acquisition",
    copy: "Off-market inventory, allocation priority and negotiated commercials with our developer alliances.",
  },
  {
    title: "Investment Structuring",
    copy: "Holding-period modelling, rental projections, exit liquidity and portfolio diversification.",
  },
  {
    title: "Legal & Due Diligence",
    copy: "An eleven-point protocol completed before you are shown a single floor plan.",
  },
  {
    title: "NRI Desk",
    copy: "Remittance guidance, power of attorney, taxation and remote video inspection across 14 countries.",
  },
  {
    title: "Interior Curation",
    copy: "Introductions to design practices, procurement and project supervision through handover.",
  },
  {
    title: "Post-Handover Management",
    copy: "Tenanting, maintenance oversight and resale advisory for the life of the asset.",
  },
];

/* ------------------------------------------------------------- helpers */

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const getDeveloper = (slug: string) => DEVELOPERS.find((d) => d.slug === slug);
export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
