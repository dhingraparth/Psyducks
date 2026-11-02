import { 
  SVG_LIVING_COMMONS, 
  SVG_MASTER_SUITE, 
  SVG_CHEF_KITCHEN, 
  SVG_ROOFTOP_TERRACE, 
  SVG_AVATAR_AARAV, 
  SVG_AVATAR_ANANYA, 
  SVG_AVATAR_ROHAN, 
  SVG_AVATAR_PRIYA 
} from '../utils/svgImages';

import { PROPERTY_IMAGES, AVATAR_IMAGES } from '../utils/images';

export const INITIAL_PROPERTIES = [
  {
    id: "coh-01",
    title: "The Kanso Nordic Atelier",
    subtitle: "Sun-drenched Scandinavian brownstone with teak wood millwork & central atrium",
    neighborhood: "Indiranagar, 100ft Road",
    city: "Bengaluru, Karnataka",
    pricePerMonth: 24500,
    deposit: 49000,
    roomType: "Private Room",
    sqft: 240,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-12-01",
    rating: 4.96,
    reviewsCount: 38,
    verifiedStatus: true,
    compatibilityScore: 98,
    featured: true,
    images: PROPERTY_IMAGES['coh-01'],
    amenities: [
      "1 Gbps Airtel Extreme Fiber",
      "Daily Professional Housekeeping",
      "Sonos Ambient Room Audio",
      "In-Unit Bosch Washer & Dryer",
      "Private Teakwood Balcony",
      "Modular Island & Air Fryer",
      "24x7 Inverter & DG Power Backup",
      "Rooftop Herb & Terrace Garden"
    ],
    lifestyleTags: ["Remote Work Friendly", "Plant Lovers", "Early Risers", "Cooks Together", "Non-Smoking", "Cat Friendly"],
    utilitiesIncluded: ["Airtel Fiber", "Water & Society Maintenance", "Cooking Gas (PNG)", "Daily Housekeeper"],
    estimatedUtilitiesCost: 1800,
    description: "Designed by an architectural duo in prime Indiranagar, The Kanso Atelier balances quiet personal sanctuary with warm communal living. High ceilings, south-facing windows framing tree tops, and acoustic insulation between rooms provide an ideal work-from-home haven. The communal kitchen is fully stocked with Le Creuset and specialty pour-over equipment.",
    flatmates: [
      {
        id: "fm-01",
        name: "Ananya Deshmukh",
        age: 28,
        role: "Spatial UX Lead",
        avatar: AVATAR_IMAGES.ananya,
        bio: "Designing immersive apps by day, experimenting with sourdough and ceramics on Sunday mornings. Value clean shared counters and quiet weekday evenings.",
        sleepSchedule: "Early Bird (6:30 AM - 10:30 PM)",
        cleanliness: "Immaculate & Organized",
        workStyle: "Hybrid (2 days studio / 3 days home)",
        vibe: "Thoughtful, calm, occasionally hosts seasonal dinner parties"
      },
      {
        id: "fm-02",
        name: "Rohan Mehta",
        age: 31,
        role: "Acoustic & Hardware Engineer",
        avatar: AVATAR_IMAGES.rohan,
        bio: "Audio hardware enthusiast and marathon runner. Clean, respectful of focus times, always happy to share fresh batch pour-overs.",
        sleepSchedule: "Balanced (7:30 AM - 11:30 PM)",
        cleanliness: "Very Tidy",
        workStyle: "Studio-based (Away most days)",
        vibe: "Quiet, outdoorsy, respectful"
      }
    ],
    houseRules: [
      { rule: "Quiet Sanctuary Hours", desc: "11:00 PM to 7:30 AM on weekdays to respect sleep & deep focus." },
      { rule: "Clean Counter Policy", desc: "Pots & dishes placed in dishwasher immediately after dining." },
      { rule: "Considerate Guests", desc: "Overnight guests welcome with gentle 24h heads-up in our shared group chat." },
      { rule: "Shoe-Free Sanctuary", desc: "Indoor slippers provided to keep teak flooring pristine." }
    ],
    neighborhoodScores: {
      transit: 98,
      walkability: 96,
      cafes: 99,
      noiseLevel: "Tranquil residential pocket"
    },
    rooms: [
      { id: "r1", name: "Living Commons & Dining", sqft: 380, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-01'][0], acoustic: "24 dB", daylight: "South Facing (All Day)" },
      { id: "r2", name: "Chef's Kitchen & Island", sqft: 190, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-01'][2], acoustic: "28 dB", daylight: "East Facing (Morning Sun)" },
      { id: "r3", name: "Private Bedroom 01", sqft: 240, status: "Occupied", occupant: "Ananya (UX Lead)", photo: PROPERTY_IMAGES['coh-01'][1], acoustic: "22 dB", daylight: "South-West Facing" },
      { id: "r4", name: "Available Suite 02", sqft: 220, status: "Vacant", occupant: "Available for You (₹24,500/mo)", photo: PROPERTY_IMAGES['coh-01'][3], acoustic: "20 dB (Acoustic Foam)", daylight: "South Facing + Balcony" }
    ]
  },
  {
    id: "coh-02",
    title: "Bandra Sea-Breeze Haven",
    subtitle: "Triple-height heritage loft with terrazzo floors, skylights & private botanical courtyard",
    neighborhood: "Bandra West, Pali Hill",
    city: "Mumbai, Maharashtra",
    pricePerMonth: 32000,
    deposit: 64000,
    roomType: "Master Suite",
    sqft: 290,
    totalTenants: 4,
    occupiedTenants: 3,
    availableDate: "2026-11-15",
    rating: 4.98,
    reviewsCount: 52,
    verifiedStatus: true,
    compatibilityScore: 95,
    featured: true,
    images: PROPERTY_IMAGES['coh-02'],
    amenities: [
      "En-Suite Rainshower & Italian Bath",
      "Double-Glazed Soundproof Glass",
      "Daikin Inverter AC in all rooms",
      "Co-Working Desk Pods",
      "La Marzocco Espresso Machine",
      "Private Sunset Balcony",
      "24x7 MGL Piped Gas & Power Backup",
      "Reserved Stilt Car Parking"
    ],
    lifestyleTags: ["Plant Lovers", "Creative Community", "Weekend Cookouts", "LGBTQ+ Friendly", "Hybrid Work", "Dog Friendly"],
    utilitiesIncluded: ["JioFiber 1Gbps", "Society Maintenance", "Water", "Housekeeper Service"],
    estimatedUtilitiesCost: 2200,
    description: "A reimagined Portuguese villa conversion in Pali Hill. High ceilings, exposed timber rafters, and sea-breeze balconies define this architectural haven. The master suite features an en-suite bathroom with Italian terrazzo tiling and private morning terrace access.",
    flatmates: [
      {
        id: "fm-03",
        name: "Kabir Sen",
        age: 29,
        role: "Climate Tech Founder",
        avatar: AVATAR_IMAGES.kabir,
        bio: "Working on regenerative EV grid systems. Loves pour-overs, film photography, and Sunday morning cycling on Bandra Carter Road.",
        sleepSchedule: "Night Owl (8:30 AM - 1:00 AM)",
        cleanliness: "Organized",
        workStyle: "Hybrid Tech Work",
        vibe: "Curious, thoughtful, warm"
      },
      {
        id: "fm-04",
        name: "Priya Nair",
        age: 27,
        role: "Editorial Brand Strategist",
        avatar: AVATAR_IMAGES.priya,
        bio: "Books, vinyl records, and cold brew. Clean habits, respects quiet focus time, hosts monthly community book clubs.",
        sleepSchedule: "Balanced (7:30 AM - 11:30 PM)",
        cleanliness: "Immaculate",
        workStyle: "Full Remote (Agency Lead)",
        vibe: "Gentle, literary, kind"
      }
    ],
    houseRules: [
      { rule: "Terrace Sunset Hours", desc: "Respect shared quiet enjoyment of the balcony after 10 PM." },
      { rule: "Kitchen Courtesy", desc: "Espresso machine backflushed and steam wand wiped after each use." },
      { rule: "Pet Etiquette", desc: "Pets welcome with prior housemate consent and up-to-date vaccinations." }
    ],
    neighborhoodScores: {
      transit: 95,
      walkability: 98,
      cafes: 100,
      noiseLevel: "Gentle sea breeze, quiet residential lane"
    },
    rooms: [
      { id: "r1", name: "Double-Height Atrium Lounge", sqft: 420, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-02'][0], acoustic: "26 dB", daylight: "Skylight & Garden Glass" },
      { id: "r2", name: "Master Suite with Terrazzo Bath", sqft: 290, status: "Vacant", occupant: "Available Now (₹32,000/mo)", photo: PROPERTY_IMAGES['coh-02'][1], acoustic: "18 dB (Quiet Zone)", daylight: "Courtyard Garden View" }
    ]
  },
  {
    id: "coh-03",
    title: "Koramangala Green Conservatory",
    subtitle: "Warm minimalist residence with panoramic garden views, private terrace & acoustic focus pods",
    neighborhood: "Koramangala, 4th Block",
    city: "Bengaluru, Karnataka",
    pricePerMonth: 18500,
    deposit: 37000,
    roomType: "Private Room",
    sqft: 210,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-12-15",
    rating: 4.95,
    reviewsCount: 29,
    verifiedStatus: true,
    compatibilityScore: 92,
    featured: false,
    images: PROPERTY_IMAGES['coh-03'],
    amenities: [
      "Custom Teak Work Desks",
      "Panoramic Rooftop Balcony",
      "Ergonomic Herman Miller Chairs",
      "Gated EV Scooter Charging",
      "Custom Oak Wardrobes",
      "Triple-Osmosis RO Water System",
      "Weekly Deep Linen Clean"
    ],
    lifestyleTags: ["Early Risers", "Wellness Focused", "Quiet Evenings", "Minimalist Living", "No Pets", "Non-Smoking"],
    utilitiesIncluded: ["High-speed Fiber", "Cook & Maid Service", "RO Water", "Maintenance"],
    estimatedUtilitiesCost: 1500,
    description: "Pure warmth and greenery. Features bleached oak flooring, floor-to-ceiling glass doors opening onto an ivy-covered balcony, and dedicated acoustic quiet areas for engineering and design leads.",
    flatmates: [
      {
        id: "fm-05",
        name: "Dia Banerjee",
        age: 30,
        role: "Urban Architect",
        avatar: AVATAR_IMAGES.dia,
        bio: "Early bird who loves morning terrace yoga and brewing fresh filter coffee. Gentle presence who treasures order and quiet aesthetics.",
        sleepSchedule: "Early Bird (6:00 AM - 10:00 PM)",
        cleanliness: "Immaculate",
        workStyle: "Studio (Away 8-5)",
        vibe: "Zen, grounded, mindful"
      }
    ],
    houseRules: [
      { rule: "Terrace Etiquette", desc: "Respect quiet meditation hours on the terrace before 8 AM." },
      { rule: "Zero Clutter Policy", desc: "Common spaces remain artfully uncluttered at all times." },
      { rule: "Strictly Non-Smoking", desc: "Smoke-free throughout apartment and balconies." }
    ],
    neighborhoodScores: {
      transit: 97,
      walkability: 99,
      cafes: 94,
      noiseLevel: "Very quiet residential park edge"
    },
    rooms: [
      { id: "r1", name: "Penthouse Conservatory", sqft: 350, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-03'][0], acoustic: "20 dB", daylight: "360-Degree Garden Canopy" },
      { id: "r2", name: "East Sun Bedroom", sqft: 210, status: "Vacant", occupant: "Available Dec 15 (₹18,500/mo)", photo: PROPERTY_IMAGES['coh-03'][1], acoustic: "19 dB", daylight: "Sunrise Over 4th Block Park" }
    ]
  },
  {
    id: "coh-04",
    title: "Hauz Khas Heritage Commons",
    subtitle: "Heritage brick residence overlooking the lake with exposed timber trusses & library",
    neighborhood: "Hauz Khas Village",
    city: "New Delhi, Delhi NCR",
    pricePerMonth: 22000,
    deposit: 44000,
    roomType: "Private Room",
    sqft: 230,
    totalTenants: 4,
    occupiedTenants: 3,
    availableDate: "2026-11-20",
    rating: 4.97,
    reviewsCount: 44,
    verifiedStatus: true,
    compatibilityScore: 94,
    featured: true,
    images: PROPERTY_IMAGES['coh-04'],
    amenities: [
      "Lakeview Reading Balcony",
      "High-Speed ACT Fiber Wi-Fi",
      "Air Purifiers (HEPA 13) in All Rooms",
      "Modern Induction Island Kitchen",
      "Curated 400-Book Architecture Library",
      "Sound-Insulated Double Glazing",
      "Daily Chef for Fresh North Indian Meals",
      "Gated 24/7 Security"
    ],
    lifestyleTags: ["Plant Lovers", "Book Worms", "Culinary Explorers", "Art & Design", "Tea Lovers"],
    utilitiesIncluded: ["Cook Service", "High-speed Fiber", "Water & Generator", "Air Filters"],
    estimatedUtilitiesCost: 2000,
    description: "Nestled beside historic monuments and Hauz Khas deer park, this sanctuary features exposed brick masonry, solid wood library shelving, and modern acoustic glass keeping the vibrant village outside while maintaining peaceful quiet inside.",
    flatmates: [
      {
        id: "fm-06",
        name: "Vikramaditya Roy",
        age: 32,
        role: "Heritage Conservation Fellow",
        avatar: AVATAR_IMAGES.vikram,
        bio: "Historian and writer. Love jazz records, weekend museum visits, and quiet tea ceremonies. Keeps shared desks organized.",
        sleepSchedule: "Balanced (7:00 AM - 11:30 PM)",
        cleanliness: "Very Tidy",
        workStyle: "Hybrid Academic / Writer",
        vibe: "Thoughtful, gentle conversationalist"
      }
    ],
    houseRules: [
      { rule: "Air Purifier Protocol", desc: "Doors and windows kept closed during high PM2.5 winter months." },
      { rule: "Library Respect", desc: "Borrowed books returned to shelves after reading in salon." },
      { rule: "Quiet Mornings", desc: "Gentle volume until 9:00 AM to allow uninterrupted focus." }
    ],
    neighborhoodScores: {
      transit: 94,
      walkability: 97,
      cafes: 98,
      noiseLevel: "Peaceful inside, surrounded by historic park"
    },
    rooms: [
      { id: "r1", name: "Monument Library Salon", sqft: 400, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-04'][0], acoustic: "23 dB", daylight: "Lake & Green Canopy" },
      { id: "r2", name: "Garden Facing Study Room", sqft: 230, status: "Vacant", occupant: "Available Nov 20 (₹22,000/mo)", photo: PROPERTY_IMAGES['coh-04'][1], acoustic: "17 dB (Soundproofed)", daylight: "Morning Sun over Hauz Khas Park" }
    ]
  },
  {
    id: "coh-05",
    title: "Jubilee Hills Minimalist Villa",
    subtitle: "Striking cantilevered villa with white quartzite floors, acoustic glass & infinity green courtyard",
    neighborhood: "Jubilee Hills, Road No. 36",
    city: "Hyderabad, Telangana",
    pricePerMonth: 26000,
    deposit: 52000,
    roomType: "Master Suite",
    sqft: 280,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-12-01",
    rating: 4.93,
    reviewsCount: 31,
    verifiedStatus: true,
    compatibilityScore: 93,
    featured: false,
    images: PROPERTY_IMAGES['coh-05'],
    amenities: [
      "Attached Dressing Room & Bath",
      "Ultra-Fast Gigabit Fiber",
      "Sub-Zero Refrigerator & Dishwasher",
      "Private Courtyard Lawn",
      "Solar Water Heating & DG Backup",
      "EV Car Charging Slot",
      "Gym & Pilates Reformer Area"
    ],
    lifestyleTags: ["Fitness Enthusiasts", "Tech Leaders", "Early Risers", "Non-Smoking", "Organized Living"],
    utilitiesIncluded: ["Maintenance", "Fiber Internet", "Housekeeper", "Gym Access"],
    estimatedUtilitiesCost: 1900,
    description: "Modern architectural triumph in Jubilee Hills. Expansive floor plan, floor-to-ceiling glass pavilions, and custom marble counters. Home to tech and biotech professionals who appreciate calm, refined minimalism.",
    flatmates: [
      {
        id: "fm-07",
        name: "Dr. Tanya Reddy",
        age: 30,
        role: "Biotech Scientist",
        avatar: AVATAR_IMAGES.tanya,
        bio: "Developing computational genomics tools. Early morning workouts and quiet evenings reading clinical journals.",
        sleepSchedule: "Early Bird (6:00 AM - 10:00 PM)",
        cleanliness: "Immaculate",
        workStyle: "Lab & Home Hybrid",
        vibe: "Focused, polite, calm"
      }
    ],
    houseRules: [
      { rule: "Kitchen Sanctuary", desc: "No dirty dishes left on marble island. Clean as you go." },
      { rule: "Gym Etiquette", desc: "Weights wiped down and reracked after morning workouts." }
    ],
    neighborhoodScores: {
      transit: 92,
      walkability: 91,
      cafes: 96,
      noiseLevel: "Whisper-quiet diplomatic & luxury hill quarter"
    },
    rooms: [
      { id: "r1", name: "Grand Quartzite Pavilion", sqft: 450, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-05'][0], acoustic: "21 dB", daylight: "Courtyard Reflection" },
      { id: "r2", name: "Master Suite West", sqft: 280, status: "Vacant", occupant: "Available Dec 1 (₹26,000/mo)", photo: PROPERTY_IMAGES['coh-05'][1], acoustic: "16 dB (Extreme Quiet)", daylight: "Sunset Hillside View" }
    ]
  },
  {
    id: "coh-06",
    title: "Koregaon Park Artisan Studio",
    subtitle: "Boho-chic apartment beneath century-old banyans with teak finishes, pottery studio & leafy terrace",
    neighborhood: "Koregaon Park, Lane 5",
    city: "Pune, Maharashtra",
    pricePerMonth: 16500,
    deposit: 33000,
    roomType: "Private Room",
    sqft: 205,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-12-05",
    rating: 4.94,
    reviewsCount: 36,
    verifiedStatus: true,
    compatibilityScore: 91,
    featured: false,
    images: PROPERTY_IMAGES['coh-06'],
    amenities: [
      "Historic Leaded Glass Windows",
      "Private Bike Mooring & Storage",
      "Basement Pottery Studio",
      "Sonos Sound Throughout",
      "Induction Cooktop & Chimney",
      "High-Pressure Rain Shower",
      "Sunny Ivy-Covered Courtyard"
    ],
    lifestyleTags: ["Bike Commuters", "Plant Lovers", "Creative Work", "LGBTQ+ Friendly", "Casual Dinners"],
    utilitiesIncluded: ["Gas & Power Backup", "Fiber Wi-Fi", "Water", "Housekeeper"],
    estimatedUtilitiesCost: 1400,
    description: "Step into authentic Koregaon Park tranquility. Shaded by ancient banyans, this home balances Scandinavian minimalism with warm Indian timber furnishings.",
    flatmates: [
      {
        id: "fm-08",
        name: "Sneha Patel",
        age: 29,
        role: "Illustrator & Botanist",
        avatar: AVATAR_IMAGES.sneha,
        bio: "Lover of house plants, botanical watercolors, and Pune cafe culture. Always up for fresh chai on the terrace bench.",
        sleepSchedule: "Balanced (7:00 AM - 11:00 PM)",
        cleanliness: "Very Tidy",
        workStyle: "Hybrid (Studio & Home)",
        vibe: "Warm, artistic, friendly"
      }
    ],
    houseRules: [
      { rule: "Green Care", desc: "Shared watering duties for courtyard plants during summer." },
      { rule: "Night Quiet", desc: "Gentle volume after 11 PM on weeknights." }
    ],
    neighborhoodScores: {
      transit: 96,
      walkability: 100,
      cafes: 99,
      noiseLevel: "Charming tree-lined Koregaon Park lane"
    },
    rooms: [
      { id: "r1", name: "Canal-View Living Salon", sqft: 320, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-06'][0], acoustic: "25 dB", daylight: "Tree Canopy Reflections" },
      { id: "r2", name: "Courtyard Bedroom Suite", sqft: 205, status: "Vacant", occupant: "Available Dec 5 (₹16,500/mo)", photo: PROPERTY_IMAGES['coh-06'][1], acoustic: "18 dB (Leafy Quiet)", daylight: "Morning Sun on Courtyard" }
    ]
  },
  {
    id: "coh-07",
    title: "Powai Lakeview High-Rise",
    subtitle: "High-floor luxury residence overlooking Powai Lake with Italian marble & sunset deck",
    neighborhood: "Hiranandani Gardens, Powai",
    city: "Mumbai, Maharashtra",
    pricePerMonth: 29000,
    deposit: 58000,
    roomType: "Master Suite",
    sqft: 260,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-11-25",
    rating: 4.97,
    reviewsCount: 41,
    verifiedStatus: true,
    compatibilityScore: 96,
    featured: true,
    images: PROPERTY_IMAGES['coh-07'],
    amenities: [
      "Panoramic Lake & Skyline Views",
      "Central Air Conditioning",
      "Attached Italian Marble Bath",
      "Clubhouse & Olympic Swimming Pool",
      "Gigabit JioFiber Connection",
      "Covered Stilt Parking",
      "Cook & Daily Maid Included"
    ],
    lifestyleTags: ["High-Rise Lovers", "Tech Founders", "Fitness Enthusiasts", "Quiet Evenings", "No Smoking"],
    utilitiesIncluded: ["Cook Service", "High-speed Fiber", "Maintenance", "Water & Gas"],
    estimatedUtilitiesCost: 2100,
    description: "Perched on the 24th floor overlooking Powai Lake, this co-living residence offers uninterrupted sunset vistas, Italian marble flooring, and quiet acoustic tranquility ideal for remote tech leads and investment analysts.",
    flatmates: [
      {
        id: "fm-09",
        name: "Aditya Verma",
        age: 31,
        role: "Fintech Product Director",
        avatar: AVATAR_IMAGES.aditya,
        bio: "Fintech leader at a leading payment gateway. Enjoys squash, weekend cycling around Powai lake, and clean shared spaces.",
        sleepSchedule: "Balanced (7:00 AM - 11:30 PM)",
        cleanliness: "Immaculate",
        workStyle: "Hybrid (3 days studio / 2 days home)",
        vibe: "Polite, focused, loves espresso"
      }
    ],
    houseRules: [
      { rule: "Lake View Balcony", desc: "Balcony furniture kept clean and cushioned from monsoon rain." },
      { rule: "Late Night Quiet", desc: "Acoustic silence past 11:00 PM for deep sleep." }
    ],
    neighborhoodScores: {
      transit: 93,
      walkability: 95,
      cafes: 97,
      noiseLevel: "Very quiet high-floor oasis"
    },
    rooms: [
      { id: "r1", name: "Skyline Living Salon", sqft: 390, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-07'][0], acoustic: "22 dB", daylight: "360 Lake Panorama" },
      { id: "r2", name: "Master Lake Suite", sqft: 260, status: "Vacant", occupant: "Available Nov 25 (₹29,000/mo)", photo: PROPERTY_IMAGES['coh-07'][1], acoustic: "17 dB", daylight: "Sunset Over Powai Lake" }
    ]
  },
  {
    id: "coh-08",
    title: "DLF CyberCity Horizon Loft",
    subtitle: "Duplex penthouse on Golf Course Road with double-height glass & private acoustic focus pod",
    neighborhood: "Golf Course Road, DLF Phase 5",
    city: "New Delhi, Delhi NCR",
    pricePerMonth: 34000,
    deposit: 68000,
    roomType: "Master Suite",
    sqft: 310,
    totalTenants: 4,
    occupiedTenants: 3,
    availableDate: "2026-12-10",
    rating: 4.99,
    reviewsCount: 47,
    verifiedStatus: true,
    compatibilityScore: 97,
    featured: true,
    images: PROPERTY_IMAGES['coh-08'],
    amenities: [
      "Double-Height Ceiling with Mezzanine",
      "Ergonomic Herman Miller Setups",
      "Sound-Proofed Recording / Call Pod",
      "Multi-Stage HEPA Air Filtration",
      "Smart Keyless Yale Biometric Entry",
      "Underground Reserved Car Parking",
      "Cook & Housekeeping Team"
    ],
    lifestyleTags: ["Tech Founders", "Remote Work Friendly", "Non-Smoking", "Early Risers", "Gourmet Coffee"],
    utilitiesIncluded: ["Cook Service", "Airtel 1Gbps Fiber", "Power Backup", "HEPA Filters"],
    estimatedUtilitiesCost: 2500,
    description: "The gold standard of corporate and founder co-living in Delhi NCR. Double-height floor-to-ceiling glass windows look out over the Aravalli hills and the skyline of Golf Course Road.",
    flatmates: [
      {
        id: "fm-10",
        name: "Pooja Hegde",
        age: 28,
        role: "AI Research Scientist",
        avatar: AVATAR_IMAGES.ananya,
        bio: "Working on generative multimodal models. Clean, considerate, loves specialty teas and weekend trail walks.",
        sleepSchedule: "Early Bird (6:30 AM - 10:30 PM)",
        cleanliness: "Immaculate",
        workStyle: "100% Remote Tech",
        vibe: "Thoughtful, peaceful, kind"
      }
    ],
    houseRules: [
      { rule: "Focus Pod Reservations", desc: "Private call pod booked via shared Slack channel for calls over 1 hour." },
      { rule: "Shoe-Free Residence", desc: "Japanese style genkan entry foyer: slippers provided." }
    ],
    neighborhoodScores: {
      transit: 97,
      walkability: 96,
      cafes: 98,
      noiseLevel: "Whisper quiet with acoustic triple glazing"
    },
    rooms: [
      { id: "r1", name: "Double-Height Atrium", sqft: 460, status: "Shared", occupant: "All Flatmates", photo: PROPERTY_IMAGES['coh-08'][0], acoustic: "21 dB", daylight: "Panoramic Horizon Sun" },
      { id: "r2", name: "Horizon Master Suite", sqft: 310, status: "Vacant", occupant: "Available Dec 10 (₹34,000/mo)", photo: PROPERTY_IMAGES['coh-08'][1], acoustic: "16 dB (Acoustic Foam)", daylight: "Golf Course Sunrise" }
    ]
  }
];

export const INITIAL_USER = {
  name: "Aarav Sharma",
  email: "aarav@cohaven.in",
  avatar: AVATAR_IMAGES.aarav,
  occupation: "Senior Product Designer",
  phone: "+91 98765 43210",
  verified: true,
  bio: "Product designer in Bengaluru who loves quiet mornings, clean architectural spaces, and exploring neighborhood bakeries. Non-smoker, early riser, values considerate and open communication.",
  lifestyle: {
    sleep: "Early Bird (6:30 AM - 10:30 PM)",
    cleanliness: "Immaculate (Clean-as-you-go)",
    workStyle: "Hybrid Product Designer",
    guests: "Occasional weekend dinners (24h heads-up)",
    pets: "Loves cats & quiet dogs"
  }
};

export const INITIAL_APPLICATIONS = [
  {
    id: "APP-8419",
    propertyId: "coh-01",
    propertyTitle: "The Kanso Nordic Atelier",
    location: "Indiranagar, Bengaluru",
    roomType: "Private Room",
    monthlyRent: 24500,
    appliedDate: "2026-11-01",
    tourDate: "Friday, Nov 6 at 2:30 PM",
    tourType: "Guided Video Walkthrough",
    status: "Viewing Confirmed",
    statusBadge: "Confirmed",
    statusColor: "emerald",
    primaryFlatmate: "Ananya Deshmukh",
    flatmateAvatar: AVATAR_IMAGES.ananya,
    propertyPhoto: PROPERTY_IMAGES['coh-01'][0]
  },
  {
    id: "APP-3290",
    propertyId: "coh-04",
    propertyTitle: "Hauz Khas Heritage Commons",
    location: "Hauz Khas Village, New Delhi",
    roomType: "Private Room",
    monthlyRent: 22000,
    appliedDate: "2026-10-28",
    tourDate: "Tuesday, Nov 10 at 11:00 AM",
    tourType: "In-Person Walkthrough",
    status: "Under Review by Flatmates",
    statusBadge: "In Review",
    statusColor: "amber",
    primaryFlatmate: "Vikramaditya Roy",
    flatmateAvatar: AVATAR_IMAGES.vikram,
    propertyPhoto: PROPERTY_IMAGES['coh-04'][0]
  }
];

export const INITIAL_MESSAGES = [
  {
    id: "msg-thread-1",
    flatmateName: "Ananya Deshmukh",
    flatmateRole: "Spatial UX Lead",
    flatmateAvatar: AVATAR_IMAGES.ananya,
    propertyTitle: "The Kanso Nordic Atelier",
    online: true,
    lastMessage: "Looking forward to our walkthrough this Friday! Let me know if you have any questions about Indiranagar.",
    lastTime: "10:14 AM",
    unread: false,
    history: [
      { id: 1, sender: "them", text: "Hi Aarav! Ananya here from The Kanso Atelier in Indiranagar. We loved your profile and shared interest in clean shared counters and quiet weekday evenings.", time: "Yesterday, 3:45 PM" },
      { id: 2, sender: "me", text: "Hi Ananya! Thanks so much for reaching out. The atelier looks stunning, especially the natural light and kitchen setup.", time: "Yesterday, 4:10 PM" },
      { id: 3, sender: "them", text: "Looking forward to our walkthrough this Friday! Let me know if you have any questions about Indiranagar.", time: "10:14 AM" }
    ]
  },
  {
    id: "msg-thread-2",
    flatmateName: "Kabir Sen",
    flatmateRole: "Climate Tech Founder",
    flatmateAvatar: AVATAR_IMAGES.kabir,
    propertyTitle: "Bandra Sea-Breeze Haven",
    online: false,
    lastMessage: "Would you be up for a quick 10-minute video call to say hello?",
    lastTime: "Yesterday",
    unread: true,
    history: [
      { id: 1, sender: "them", text: "Hey Aarav! Saw your compatibility score came in at 95% with our Pali Hill loft. Would you be up for a quick 10-minute video call to say hello?", time: "Yesterday, 6:30 PM" }
    ]
  }
];

export const INITIAL_CHORES = [
  { id: "c1", title: "Kitchen Counter Sanitize & Coffee Station", assignee: "Aarav Sharma", due: "Today", status: "Pending", category: "Kitchen" },
  { id: "c2", title: "Recycling & Dry Waste Disposal", assignee: "Ananya Deshmukh", due: "Tomorrow", status: "Completed", category: "Waste" },
  { id: "c3", title: "Balcony Plants Misting & Care", assignee: "Rohan Mehta", due: "Thursday", status: "Pending", category: "Botanical" },
  { id: "c4", title: "Blue Tokai Coffee & Oat Milk Restock", assignee: "Aarav Sharma", due: "Saturday", status: "Pending", category: "Pantry" }
];

export const INITIAL_EXPENSES = [
  { id: "e1", description: "Airtel 1Gbps Fiber Wi-Fi", amount: 1499, splitWith: "3 People", myShare: 499.66, status: "Paid" },
  { id: "e2", description: "Blue Tokai Coffee Beans & Organic Groceries", amount: 1850, splitWith: "3 People", myShare: 616.66, status: "Paid" },
  { id: "e3", description: "Cook & Daily Housekeeping Share", amount: 6000, splitWith: "3 People", myShare: 2000.00, status: "Due Nov 15" }
];

export const QUIZ_QUESTIONS = [
  {
    id: "sleep",
    category: "Rhythm & Circadian Flow",
    question: "What does your typical daily sleep schedule look like?",
    subtitle: "We prioritize matching complementary circadian rhythms so morning routines flow effortlessly.",
    options: [
      {
        value: "early_bird",
        label: "Early Riser (Lark)",
        desc: "Up with the sunrise (6:00 - 7:00 AM), asleep by 10:30 PM.",
        icon: "SunMedium"
      },
      {
        value: "balanced",
        label: "Balanced Routine",
        desc: "Awake by 7:30 - 8:30 AM, wind down around 11:30 PM.",
        icon: "Clock"
      },
      {
        value: "night_owl",
        label: "Night Creative (Owl)",
        desc: "Peak productivity after dark, asleep past midnight.",
        icon: "Moon"
      },
      {
        value: "flexible",
        label: "Dynamic / Variable",
        desc: "Depends on travel, projects, or creative inspiration.",
        icon: "Compass"
      }
    ]
  },
  {
    id: "cleanliness",
    category: "Shared Space Standard",
    question: "How do you treat communal spaces and kitchen counters?",
    subtitle: "Cleanliness friction is the #1 shared living issue. We remove the guesswork.",
    options: [
      {
        value: "immaculate",
        label: "Immaculate Minimalist",
        desc: "Clean-as-you-go. Counters wiped immediately after prep. Zero dishes in sink.",
        icon: "Sparkles"
      },
      {
        value: "very_tidy",
        label: "Consistent & Mindful",
        desc: "Dishes placed in dishwasher by bedtime; communal surfaces respected daily.",
        icon: "CheckCircle2"
      },
      {
        value: "relaxed",
        label: "Lived-In & Relaxed",
        desc: "Deep clean on weekends; comfortable with occasional organized mess.",
        icon: "Coffee"
      }
    ]
  },
  {
    id: "work_style",
    category: "Work & Home Presence",
    question: "What is your primary daytime work pattern?",
    subtitle: "Ensures balanced acoustic expectations during peak daytime focus hours.",
    options: [
      {
        value: "full_remote",
        label: "100% Remote Sanctuary",
        desc: "Working from home desk 5 days a week; need strong acoustic boundary.",
        icon: "Laptop"
      },
      {
        value: "hybrid",
        label: "Hybrid Nomad",
        desc: "2-3 days remote, remainder at office, studio, or local cafes.",
        icon: "Building2"
      },
      {
        value: "studio_away",
        label: "Away Most Days",
        desc: "Work outside the house full-time; home is purely for rest and evenings.",
        icon: "Briefcase"
      }
    ]
  },
  {
    id: "social_vibe",
    category: "Home Atmosphere & Social Flow",
    question: "What feeling should walk through your front door?",
    subtitle: "Balancing social warmth with personal sanctuary.",
    options: [
      {
        value: "quiet_retreat",
        label: "Quiet Zen Retreat",
        desc: "A calm restorative haven to decompress in silence after demanding days.",
        icon: "Feather"
      },
      {
        value: "warm_communal",
        label: "Warm & Interconnected",
        desc: "Enjoying casual kitchen chats, shared tea, and monthly communal dinners.",
        icon: "Users"
      },
      {
        value: "vibrant_social",
        label: "Vibrant Hub",
        desc: "Love hosting friends, weekend brunches, and spontaneous gatherings.",
        icon: "Flame"
      }
    ]
  },
  {
    id: "guest_etiquette",
    category: "Guest & Partner Protocols",
    question: "What is your comfort level with guests and overnight partners?",
    subtitle: "Clear boundaries avoid awkward housemate conversations.",
    options: [
      {
        value: "heads_up_always",
        label: "Gentle Heads-Up Required",
        desc: "Notify housemates in chat beforehand; overnight guests 1-2 nights/week max.",
        icon: "BellRing"
      },
      {
        value: "spontaneous_welcome",
        label: "Easy-Going & Welcoming",
        desc: "Friends and partners always welcome as long as they respect noise and space.",
        icon: "HeartHandshake"
      },
      {
        value: "minimal_guests",
        label: "Strictly Sanctuary First",
        desc: "Prefer very limited external visitors to maintain supreme privacy.",
        icon: "ShieldCheck"
      }
    ]
  },
  {
    id: "pets",
    category: "Furry Friends & Allergies",
    question: "How do you feel about living with pets?",
    subtitle: "Allergies, companionship, and pet care compatibility.",
    options: [
      {
        value: "love_all",
        label: "Love All Animals",
        desc: "Happily live with dogs, cats, or both. Happy to give midday belly rubs.",
        icon: "Smile"
      },
      {
        value: "cats_only",
        label: "Quiet Pets / Cats Only",
        desc: "Comfortable with independent, low-noise companions.",
        icon: "Cat"
      },
      {
        value: "pet_free",
        label: "Pet-Free Environment",
        desc: "Allergies or strong preference for a completely pet-free home.",
        icon: "Ban"
      }
    ]
  }
];

export const COMMUNITY_BLUEPRINTS = [
  {
    id: "cleanliness",
    title: "The Clean Counter Pledge",
    summary: "A living system that eliminates dish passive-aggression forever.",
    points: [
      "No dishes left in the sink overnight. Soak in basins or load immediately into the dishwasher.",
      "Kitchen island wiped clean and cleared of personal clutter after every meal.",
      "Compost & organic waste emptied daily before bedtime to keep air fresh.",
      "Daily maid and bi-weekly deep cleaning covers ovens, exhaust chimneys, and bathroom tiles."
    ]
  },
  {
    id: "sound",
    title: "Acoustic Harmony & Quiet Hours",
    summary: "Respecting deep REM sleep and high-focus remote work.",
    points: [
      "Communal quiet hours begin at 11:00 PM on weekdays and 11:30 PM on weekends.",
      "Headphones required for Zoom/Teams calls in the communal salon and dining area.",
      "Felt dampers installed on all internal doors for silent operation.",
      "Acoustic wall panels installed in all bedrooms for voice isolation."
    ]
  },
  {
    id: "guests",
    title: "Guest & Partner Etiquette",
    summary: "Hospitality without compromising personal sanctuary.",
    points: [
      "A 24-hour heads-up message in the shared house WhatsApp thread for dinner visitors.",
      "Overnight romantic partners capped at 2 consecutive nights per week unless agreed.",
      "Guests are never left unattended in communal rooms without their host present.",
      "Respect house slipper rules: outdoor footwear never worn beyond the entrance foyer."
    ]
  },
  {
    id: "finances",
    title: "Frictionless Shared Expenses (UPI / Split)",
    summary: "Automated, fair, transparent splitting of everyday essentials.",
    points: [
      "Household staples (milk, Blue Tokai coffee, cooking oils, dishwash) auto-split via UPI pool.",
      "Rent and high-speed fiber split automatically via digital direct-debit on the 1st of every month.",
      "Transparent digital ledger with photo receipt scanning embedded in dashboard.",
      "Zero awkward payment reminder texts—system handles automated gentle notifications."
    ]
  }
];
