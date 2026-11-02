export const INITIAL_PROPERTIES = [
  {
    id: "coh-01",
    title: "The Kanso Nordic Atelier",
    subtitle: "Sun-drenched Scandinavian brownstone with bespoke birch millwork & atrium",
    neighborhood: "Williamsburg, North 7th",
    city: "Brooklyn, New York",
    pricePerMonth: 1450,
    deposit: 1450,
    roomType: "Private Room",
    sqft: 220,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-12-01",
    rating: 4.96,
    reviewsCount: 38,
    verifiedStatus: true,
    compatibilityScore: 98,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: [
      "Gigabit Fiber Wi-Fi",
      "Weekly Professional Deep Clean",
      "Sonos Architectural Audio",
      "In-Unit Miele Washer & Dryer",
      "Private Cedar Balcony",
      "Chef's Gas Range & Island",
      "Secure Keyless Biometric Entry",
      "Rooftop Herb Garden"
    ],
    lifestyleTags: ["Remote Work Friendly", "Plant Lovers", "Early Risers", "Cooks Together", "Non-Smoking", "Cat Friendly"],
    utilitiesIncluded: ["High-speed Wi-Fi", "Water", "Gas", "Bi-weekly organic cleaning supplies"],
    estimatedUtilitiesCost: 85,
    description: "Designed by an architectural duo, The Kanso Atelier balances peaceful personal sanctuary with warm communal living. High ceilings, south-facing windows framing tree tops, and acoustic insulation between rooms provide an ideal work-from-home haven. The communal kitchen is fully stocked with Le Creuset and specialty pour-over equipment.",
    flatmates: [
      {
        id: "fm-01",
        name: "Astrid Lindholm",
        age: 28,
        role: "Spatial UX Director",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        bio: "Designing immersive apps by day, experimenting with sourdough and ceramics on Sunday mornings. Value clean shared counters and quiet weekday evenings.",
        sleepSchedule: "Early Bird (6:30 AM - 10:30 PM)",
        cleanliness: "Immaculate & Organized",
        workStyle: "Hybrid (2 days studio / 3 days home)",
        vibe: "Thoughtful, calm, occasionally hosts seasonal dinner parties"
      },
      {
        id: "fm-02",
        name: "Julian Rivera",
        age: 31,
        role: "Industrial Acoustic Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        bio: "Binaural audio enthusiast and marathon runner. Clean, respectful of focus times, always happy to share fresh batch cold-brew.",
        sleepSchedule: "Balanced (7:30 AM - 11:30 PM)",
        cleanliness: "Very Tidy",
        workStyle: "Studio-based (Away most days)",
        vibe: "Quiet, outdoorsy, respectful"
      }
    ],
    houseRules: [
      { rule: "Quiet Sanctuary Hours", desc: "10:30 PM to 7:30 AM on weekdays to respect sleep & deep focus." },
      { rule: "Clean Counter Policy", desc: "Pots & dishes washed or placed in dishwasher immediately after dining." },
      { rule: "Considerate Guests", desc: "Overnight partners welcome with gentle 24h heads-up in our shared group chat." },
      { rule: "Green Living", desc: "Composting and mindful energy consumption encouraged." }
    ],
    neighborhoodScores: {
      transit: 98,
      walkability: 96,
      cafes: 99,
      noiseLevel: "Tranquil residential pocket"
    }
  },
  {
    id: "coh-02",
    title: "Torup Eco-Loft & Garden",
    subtitle: "Triple-height industrial loft with terrazzo floors, skylights & private botanical courtyard",
    neighborhood: "Kreuzberg, Paul-Lincke-Ufer",
    city: "Berlin, Germany",
    pricePerMonth: 920,
    deposit: 920,
    roomType: "Master Suite",
    sqft: 280,
    totalTenants: 4,
    occupiedTenants: 3,
    availableDate: "2026-11-15",
    rating: 4.98,
    reviewsCount: 52,
    verifiedStatus: true,
    compatibilityScore: 95,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: [
      "En-Suite Private Rainshower",
      "Triple-Glazed Soundproof Glass",
      "Underfloor Radiant Heating",
      "Co-Working Studio Desk Pods",
      "Espresso Bar (La Marzocco)",
      "Courtyard Yoga Platform",
      "Solar Powered Energy Grid",
      "EV & Cargo Bike Parking"
    ],
    lifestyleTags: ["Plant Lovers", "Creative Community", "Weekend Cookouts", "LGBTQ+ Friendly", "Hybrid Work", "Dog Friendly"],
    utilitiesIncluded: ["100% Green Energy", "Water", "High-speed Internet", "Professional bi-weekly clean"],
    estimatedUtilitiesCost: 65,
    description: "A reimagined 1920s print house overlooking the canal. High ceilings, raw concrete pillars, and lush indoor fig trees define this architectural haven. The master suite features an en-suite bathroom with Italian terrazzo tiling and private morning terrace access.",
    flatmates: [
      {
        id: "fm-03",
        name: "Lukas Weber",
        age: 29,
        role: "Climate Tech Founder",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        bio: "Working on regenerative grid systems. Loves modular synths, pour-overs, and weekend cycle tours along the Spree.",
        sleepSchedule: "Night Owl (8:30 AM - 1:00 AM)",
        cleanliness: "Organized",
        workStyle: "Hybrid Tech Work",
        vibe: "Curious, thoughtful, warm"
      },
      {
        id: "fm-04",
        name: "Noor Al-Mansoor",
        age: 27,
        role: "Editorial Fashion Stylist",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        bio: "Appreciates art books, vintage lamps, and communal Friday dinners. I have a very friendly whippet named Juno.",
        sleepSchedule: "Balanced (8:00 AM - 12:00 AM)",
        cleanliness: "Meticulous",
        workStyle: "Studio & On-location",
        vibe: "Warm, artistic, sociable"
      }
    ],
    houseRules: [
      { rule: "Shared Gastronomy", desc: "Optional communal vegetarian dinner every Friday night." },
      { rule: "Shoe-Free Sanctuary", desc: "Indoor slippers provided to keep hardwood and terrazzo pristine." },
      { rule: "Quiet Zones", desc: "Headphones required for video calls in the communal salon." }
    ],
    neighborhoodScores: {
      transit: 95,
      walkability: 98,
      cafes: 97,
      noiseLevel: "Vibrant waterside promenade"
    }
  },
  {
    id: "coh-03",
    title: "Södermalm Light Conservatory",
    subtitle: "Warm minimalist penthouse with panoramic city views, sauna & private mezzanine",
    neighborhood: "Södermalm, Mariatorget",
    city: "Stockholm, Sweden",
    pricePerMonth: 1100,
    deposit: 1100,
    roomType: "Private Room",
    sqft: 195,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-12-15",
    rating: 4.95,
    reviewsCount: 29,
    verifiedStatus: true,
    compatibilityScore: 92,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1502005229762-ee1b2b804561?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: [
      "Authentic Swedish Cedar Sauna",
      "Panoramic Rooftop Balcony",
      "Ergonomic Herman Miller Desks",
      "Underground Heated Bike Vault",
      "Custom Oak Wardrobes",
      "Filtered Triple-Osmosis Water System",
      "Weekly Linen Service Option"
    ],
    lifestyleTags: ["Early Risers", "Wellness Focused", "Quiet Evenings", "Minimalist Living", "No Pets", "Non-Smoking"],
    utilitiesIncluded: ["District Heating", "High-speed Fiber", "Sauna Electricity", "Water"],
    estimatedUtilitiesCost: 70,
    description: "Pure Scandinavian warmth. Features bleached oak flooring, floor-to-ceiling glass doors opening onto a copper-clad balcony, and a traditional cedar sauna for cold Nordic winter evenings.",
    flatmates: [
      {
        id: "fm-05",
        name: "Elin Engström",
        age: 30,
        role: "Ceramicist & Landscape Architect",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        bio: "Early bird who loves morning cold plunges and brewing filter coffee. Gentle presence who treasures order and quiet aesthetics.",
        sleepSchedule: "Early Bird (6:00 AM - 10:00 PM)",
        cleanliness: "Immaculate",
        workStyle: "Studio (Away 8-5)",
        vibe: "Zen, grounded, mindful"
      }
    ],
    houseRules: [
      { rule: "Sauna Booking Etiquette", desc: "Reserve times in our shared app so everyone enjoys private relaxation." },
      { rule: "Zero Clutter Policy", desc: "Common spaces remain artfully uncluttered at all times." },
      { rule: "No Smoking or Vaping", desc: "Strictly smoke-free throughout building and balcony." }
    ],
    neighborhoodScores: {
      transit: 97,
      walkability: 99,
      cafes: 94,
      noiseLevel: "Very quiet residential park edge"
    }
  },
  {
    id: "coh-04",
    title: "The Shoreditch Foundry Commons",
    subtitle: "Heritage brick conversion with exposed timber trusses, communal library & cinema lounge",
    neighborhood: "Shoreditch, Redchurch St",
    city: "London, United Kingdom",
    pricePerMonth: 1280,
    deposit: 1280,
    roomType: "Private Room",
    sqft: 240,
    totalTenants: 4,
    occupiedTenants: 3,
    availableDate: "2026-11-20",
    rating: 4.93,
    reviewsCount: 44,
    verifiedStatus: true,
    compatibilityScore: 97,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: [
      "4K Projector Cinema Nook",
      "Curated Art & Architecture Library",
      "Smeg Kitchen Appliances",
      "Bespoke Brass Fixtures",
      "Private Workspace Booths",
      "Dry Cleaning Pickup Locker",
      "Private Secure Entrance"
    ],
    lifestyleTags: ["Designers & Founders", "Dinner Parties", "Cocktail Enthusiasts", "Remote Friendly", "Flexible Hours"],
    utilitiesIncluded: ["Fiber Internet", "Council Tax", "Water", "Building Manager"],
    estimatedUtilitiesCost: 90,
    description: "Located seconds from Shoreditch High Street, this converted Victorian warehouse blends rich historic texture with ultra-contemporary comfort. The bedroom features double acoustic glazing, custom built-in walnut closets, and a cozy reading corner.",
    flatmates: [
      {
        id: "fm-06",
        name: "Miles Hawthorne",
        age: 33,
        role: "Typeface Designer",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        bio: "Obsessed with micro-typography and natural wines. Often working quietly in the library or discovering vinyl in Brick Lane.",
        sleepSchedule: "Night Owl (9:00 AM - 1:30 AM)",
        cleanliness: "Very Tidy",
        workStyle: "Full-Time Remote",
        vibe: "Sociable, conversational, design geek"
      },
      {
        id: "fm-07",
        name: "Chantal Moreau",
        age: 29,
        role: "Film Producer",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        bio: "Documentary producer who travels frequently. When home, loves screening indie films and cooking sharing platters.",
        sleepSchedule: "Flexible",
        cleanliness: "Tidy",
        workStyle: "Frequent Travel / Studio",
        vibe: "Warm, worldly, easy-going"
      }
    ],
    houseRules: [
      { rule: "Shared Living Etiquette", desc: "Communicate openly; respect shared spaces as collective art pieces." },
      { rule: "Media Volume", desc: "Cinema lounge is for shared enjoyment or booked slots after 11 PM." }
    ],
    neighborhoodScores: {
      transit: 99,
      walkability: 99,
      cafes: 98,
      noiseLevel: "Energetic creative district"
    }
  },
  {
    id: "coh-05",
    title: "Pacific Heights Sun Gallery",
    subtitle: "Mid-century architectural residence with Japanese cedar soaking tub & Golden Gate vistas",
    neighborhood: "Pacific Heights, Vallejo St",
    city: "San Francisco, California",
    pricePerMonth: 1850,
    deposit: 1850,
    roomType: "Master Suite",
    sqft: 310,
    totalTenants: 3,
    occupiedTenants: 2,
    availableDate: "2026-11-25",
    rating: 4.97,
    reviewsCount: 31,
    verifiedStatus: true,
    compatibilityScore: 94,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: [
      "Private Cedar Ofuro Soaking Tub",
      "Panoramic Bay & Bridge Views",
      "Dedicated EV Charging Garage",
      "Standing Walnut Motorized Desks",
      "Commercial Grade Espresso Machine",
      "Private Balcony & Zen Garden",
      "Bi-Weekly Housekeeper"
    ],
    lifestyleTags: ["Remote Tech", "Mindfulness", "Weekend Hikes", "Plant Lovers", "Early Risers", "Non-Smoking"],
    utilitiesIncluded: ["Ultra-Fiber 2Gbps", "Water & Trash", "Solar Power Supplement", "Housekeeping"],
    estimatedUtilitiesCost: 110,
    description: "An exceptional mid-century modern home overlooking the bay. Organic materials, paper lantern pendants by Noguchi, and floor-to-ceiling glass make every sunset an event. Ideal for professionals seeking tranquility in the city.",
    flatmates: [
      {
        id: "fm-08",
        name: "Kenji Sato",
        age: 34,
        role: "AI Alignment Scientist",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
        bio: "Deep thinker, trail runner in the Marin Headlands, and matcha enthusiast. Respects focus hours deeply.",
        sleepSchedule: "Early Bird (6:00 AM - 10:30 PM)",
        cleanliness: "Immaculate",
        workStyle: "Remote Research",
        vibe: "Quiet, polite, intellectual"
      }
    ],
    houseRules: [
      { rule: "Peace & Tranquility", desc: "No loud amplification; acoustic harmony maintained throughout." },
      { rule: "Kitchen Respect", desc: "Leave appliances spotless for the next housemate." }
    ],
    neighborhoodScores: {
      transit: 92,
      walkability: 94,
      cafes: 91,
      noiseLevel: "Serene & upscale residential"
    }
  },
  {
    id: "coh-06",
    title: "Jordaan Canal Atelier & Studio",
    subtitle: "17th-century canal house with historic timber beams, private courtyard & ceramic studio",
    neighborhood: "Jordaan, Prinsengracht",
    city: "Amsterdam, Netherlands",
    pricePerMonth: 990,
    deposit: 990,
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
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: [
      "Historic Leaded Glass Windows",
      "Private Bike Mooring & Storage",
      "Basement Pottery Studio",
      "Sonos Sound Throughout",
      "Smeg Induction Cooktop",
      "High-Pressure Rain Shower",
      "Sunny Ivy-Covered Courtyard"
    ],
    lifestyleTags: ["Bike Commuters", "Plant Lovers", "Creative Work", "LGBTQ+ Friendly", "Casual Dinners"],
    utilitiesIncluded: ["Gas & Heating", "Fiber Wi-Fi", "Water", "Studio Access"],
    estimatedUtilitiesCost: 75,
    description: "Step into authentic Amsterdam heritage with modernized amenities. Overlooking the quiet Prinsengracht canal, this home balances Dutch cozy gezelligheid with refined modern Scandinavian furnishings.",
    flatmates: [
      {
        id: "fm-09",
        name: "Femke van Dijk",
        age: 29,
        role: "Urban Biologist & Illustrator",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        bio: "Lover of house plants, botanical prints, and Dutch cycling culture. Always up for a fresh mint tea on the courtyard bench.",
        sleepSchedule: "Balanced (7:00 AM - 11:00 PM)",
        cleanliness: "Very Tidy",
        workStyle: "Hybrid (University & Home)",
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
      noiseLevel: "Charming historic neighborhood"
    }
  }
];

export const INITIAL_USER = {
  name: "Alexander Kim",
  email: "alexander.kim@designstudio.io",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  occupation: "Senior Product Designer",
  phone: "+1 (555) 234-8901",
  verified: true,
  bio: "Product designer who loves quiet mornings, clean architectural spaces, and exploring neighborhood bakeries. Non-smoker, early riser, values considerate and open communication.",
  lifestyle: {
    sleep: "Early Bird",
    cleanliness: "Immaculate",
    workStyle: "Hybrid Designer",
    guests: "Occasional weekend dinners",
    pets: "Loves cats & quiet dogs"
  }
};

export const INITIAL_APPLICATIONS = [
  {
    id: "app-8419",
    propertyId: "coh-01",
    propertyTitle: "The Kanso Nordic Atelier",
    location: "Brooklyn, New York",
    roomType: "Private Room",
    monthlyRent: 1450,
    appliedDate: "2026-11-01",
    tourDate: "2026-11-06 at 2:30 PM",
    tourType: "3D Spatial Virtual Tour",
    status: "Viewing Confirmed",
    statusColor: "sage",
    primaryFlatmate: "Astrid Lindholm",
    flatmateAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "app-3290",
    propertyId: "coh-04",
    propertyTitle: "The Shoreditch Foundry Commons",
    location: "London, United Kingdom",
    roomType: "Private Room",
    monthlyRent: 1280,
    appliedDate: "2026-10-28",
    tourDate: "2026-11-10 at 11:00 AM",
    tourType: "In-Person Walkthrough",
    status: "Under Review by Flatmates",
    statusColor: "terracotta",
    primaryFlatmate: "Miles Hawthorne",
    flatmateAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_MESSAGES = [
  {
    id: "msg-thread-1",
    flatmateName: "Astrid Lindholm",
    flatmateRole: "Spatial UX Director",
    flatmateAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    propertyTitle: "The Kanso Nordic Atelier",
    lastMessage: "Looking forward to our virtual walkthrough this Friday! Let me know if you have questions.",
    lastTime: "10:14 AM",
    unread: false,
    history: [
      { sender: "them", text: "Hi Alexander! Astrid here from The Kanso Atelier. We loved your profile and shared interest in architecture and quiet mornings.", time: "Yesterday, 3:45 PM" },
      { sender: "me", text: "Hi Astrid! Thanks so much for reaching out. The atelier looks stunning, especially the natural light and kitchen setup.", time: "Yesterday, 4:10 PM" },
      { sender: "them", text: "Looking forward to our virtual walkthrough this Friday! Let me know if you have questions.", time: "10:14 AM" }
    ]
  },
  {
    id: "msg-thread-2",
    flatmateName: "Lukas Weber",
    flatmateRole: "Torup Eco-Loft",
    flatmateAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    propertyTitle: "Torup Eco-Loft & Garden",
    lastMessage: "Would you be up for a quick 10-minute video call to say hello?",
    lastTime: "Yesterday",
    unread: true,
    history: [
      { sender: "them", text: "Hey Alexander! Saw your compatibility score came in at 95% with our eco-loft. Would you be up for a quick 10-minute video call to say hello?", time: "Yesterday, 6:30 PM" }
    ]
  }
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
      "Organic waste & compost emptied daily before bedtime to keep air fragrant.",
      "Bi-weekly professional cleaning covers baseboards, ovens, and tile grout."
    ]
  },
  {
    id: "sound",
    title: "Acoustic Harmony & Quiet Hours",
    summary: "Respecting deep REM sleep and high-focus remote work.",
    points: [
      "Communal quiet hours begin at 10:30 PM on weekdays and 11:30 PM on weekends.",
      "Headphones required for video calls in the communal salon and dining area.",
      "Door closers calibrated with felt dampers for silent transitions.",
      "Acoustic felt art panels installed in all bedrooms for voice isolation."
    ]
  },
  {
    id: "guests",
    title: "Guest & Partner Etiquette",
    summary: "Hospitality without compromising personal sanctuary.",
    points: [
      "A 24-hour heads-up message in the shared house thread for dinner visitors.",
      "Overnight romantic partners capped at 2 consecutive nights per week unless agreed.",
      "Guests are never left unattended in communal rooms without their host present.",
      "Respect house slipper rules: outdoor footwear never worn beyond the foyer."
    ]
  },
  {
    id: "finances",
    title: "Frictionless Shared Expenses",
    summary: "Automated, fair, transparent splitting of everyday essentials.",
    points: [
      "Household staples (oat milk, olive oil, spices, detergent) auto-replenished via CoHaven pool.",
      "Rent and high-speed fiber split automatically via digital direct-debit on the 1st.",
      "Transparent digital ledger with photo receipt scanning embedded in dashboard.",
      "No awkward Venmo reminder requests—system handles automated gentle notifications."
    ]
  }
];
