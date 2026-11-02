// Curated high-resolution architectural interior & exterior photography (Fast Unsplash & Pexels CDN)
// Guaranteed fallback to architectural SVGs if offline.

import { 
  SVG_LIVING_COMMONS, 
  SVG_MASTER_SUITE, 
  SVG_CHEF_KITCHEN, 
  SVG_ROOFTOP_TERRACE, 
  SVG_AVATAR_AARAV, 
  SVG_AVATAR_ANANYA, 
  SVG_AVATAR_ROHAN, 
  SVG_AVATAR_PRIYA 
} from './svgImages';

// 1. High-Resolution Curated Property Galleries (4 photos per property)
export const PROPERTY_IMAGES = {
  'coh-01': [
    // Indiranagar, Bengaluru - The Kanso Nordic Atelier
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', // Living Commons
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80', // Master Suite
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', // Chef Kitchen
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', // Rooftop Terrace
  ],
  'coh-02': [
    // Bandra West, Mumbai - Bandra Sea-Breeze Haven
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // Living Room Loft
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', // Master Suite
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // Sea View Balcony
    'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80', // Dining & Kitchen
  ],
  'coh-03': [
    // Koramangala, Bengaluru - Koramangala Green Conservatory
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80', // Sunlit Living Room
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', // Quiet Bedroom
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', // Garden Terrace
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', // Work Pod
  ],
  'coh-04': [
    // Hauz Khas Village, New Delhi - Hauz Khas Heritage Commons
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', // Heritage Brick Lounge
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', // Library Bedroom
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80', // Reading Atrium
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80', // Lakeview Courtyard
  ],
  'coh-05': [
    // Jubilee Hills, Hyderabad - Jubilee Hills Minimalist Villa
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', // Modern Villa Living
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', // Suite
    'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80', // Kitchen Bar
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', // Pool & Lawn
  ],
  'coh-06': [
    // Koregaon Park, Pune - Koregaon Park Artisan Studio
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80', // Boho Artisan Living
    'https://images.unsplash.com/photo-1540518614846-7ede433c4b49?auto=format&fit=crop&w=1200&q=80', // Loft Bedroom
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', // Kitchen & Coffee Corner
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', // Leafy Balcony
  ],
  'coh-07': [
    // Powai, Mumbai - Hiranandani Lakeview High-Rise
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', // High-rise Living Room
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', // Lakeview Bedroom
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80', // Sunset Balcony
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', // Modern Kitchen
  ],
  'coh-08': [
    // DLF Phase 5, Gurugram - CyberCity Horizon Loft
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80', // Penthouse Salon
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', // Executive Suite
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', // Work Pod
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', // Sky Garden
  ]
};

// 2. Realistic Avatars for Flatmates & Users
export const AVATAR_IMAGES = {
  aarav: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  ananya: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  rohan: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  priya: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  kabir: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  dia: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  vikram: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  sneha: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  tanya: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  aditya: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
};

// 3. Category & Showcase Cards for Front Page
export const CATEGORY_CARDS = [
  {
    id: 'scandi',
    title: 'Scandinavian Lofts',
    count: '34 Spaces',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    tag: 'Bengaluru & Pune'
  },
  {
    id: 'coastal',
    title: 'Sea-Breeze Penthouses',
    count: '18 Spaces',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Mumbai & Goa'
  },
  {
    id: 'heritage',
    title: 'Heritage Courtyards',
    count: '21 Spaces',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    tag: 'Delhi & Jaipur'
  },
  {
    id: 'tech',
    title: 'High-Tech Work Havens',
    count: '42 Spaces',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    tag: 'Hyderabad & Gurgaon'
  }
];

// 4. Community Event Images
export const EVENT_IMAGES = {
  brunch: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  music: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  cycling: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
  boardgame: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80'
};

// 5. Hero & Dashboard Banner Images
export const HERO_BANNER = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
export const DASHBOARD_BANNER = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';
export const AUTH_HERO_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85';

export function getPropertyImages(propertyId) {
  return PROPERTY_IMAGES[propertyId] || [
    SVG_LIVING_COMMONS,
    SVG_MASTER_SUITE,
    SVG_CHEF_KITCHEN,
    SVG_ROOFTOP_TERRACE
  ];
}

export function getAvatar(key) {
  return AVATAR_IMAGES[key] || SVG_AVATAR_AARAV;
}
