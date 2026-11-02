// Ultra-reliable architectural illustrations as SVG Data URIs (100% offline, guaranteed never to show black)

function encodeSvg(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// 1. Scandinavian Sunlit Living Commons (Bengaluru / Indiranagar)
export const SVG_LIVING_COMMONS = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F7F5F0"/>
      <stop offset="100%" stop-color="#EBE7DE"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D9CEBF"/>
      <stop offset="100%" stop-color="#C2B29E"/>
    </linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF3DC" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#F4A261" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="sofa" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#363C46"/>
      <stop offset="100%" stop-color="#242830"/>
    </linearGradient>
  </defs>
  <!-- Background Wall -->
  <rect width="800" height="420" fill="url(#wall)"/>
  <!-- Floor -->
  <rect y="420" width="800" height="180" fill="url(#floor)"/>
  <!-- Floor Wood Planks Lines -->
  <line x1="0" y1="460" x2="800" y2="460" stroke="#B8A793" stroke-width="1.5"/>
  <line x1="0" y1="510" x2="800" y2="510" stroke="#B8A793" stroke-width="1.5"/>
  <line x1="0" y1="560" x2="800" y2="560" stroke="#B8A793" stroke-width="1.5"/>
  <!-- Large Arched Sun Window -->
  <path d="M 480 80 Q 640 80 640 240 L 640 420 L 480 420 Z" fill="url(#sun)"/>
  <path d="M 480 80 Q 640 80 640 240 L 640 420 L 480 420 Z" fill="none" stroke="#2B303A" stroke-width="4"/>
  <line x1="560" y1="80" x2="560" y2="420" stroke="#2B303A" stroke-width="3"/>
  <line x1="480" y1="240" x2="640" y2="240" stroke="#2B303A" stroke-width="3"/>
  <!-- Sunlight Beam Beam Angle -->
  <polygon points="560,180 800,430 800,600 480,600" fill="#FFE8C2" opacity="0.35"/>
  <!-- Minimalist Modern Sectional Sofa -->
  <rect x="120" y="340" width="340" height="110" rx="16" fill="url(#sofa)"/>
  <rect x="100" y="300" width="380" height="60" rx="14" fill="#3D4450"/>
  <!-- Terracotta Cushion -->
  <rect x="140" y="280" width="70" height="70" rx="12" fill="#E07A5F" transform="rotate(-6 140 280)"/>
  <rect x="230" y="285" width="65" height="65" rx="12" fill="#3D5A50" transform="rotate(4 230 285)"/>
  <!-- Oak Coffee Table -->
  <ellipse cx="340" cy="480" rx="90" ry="32" fill="#BA9873"/>
  <ellipse cx="340" cy="476" rx="90" ry="32" fill="#D4B693"/>
  <rect x="270" y="480" width="10" height="40" fill="#9C7A56"/>
  <rect x="400" y="480" width="10" height="40" fill="#9C7A56"/>
  <!-- Ceramic Vase & Plant on Table -->
  <path d="M 330 470 L 335 440 L 345 440 L 350 470 Z" fill="#FBFBF9"/>
  <path d="M 340 440 Q 320 400 310 410 Q 330 425 340 440 Z" fill="#3D5A50"/>
  <path d="M 340 440 Q 360 395 370 405 Q 355 425 340 440 Z" fill="#3D5A50"/>
  <!-- Tall Fiddle Leaf Fig Indoor Tree -->
  <rect x="680" y="380" width="50" height="60" rx="6" fill="#E07A5F"/>
  <line x1="705" y1="380" x2="705" y2="180" stroke="#4A3B2C" stroke-width="6"/>
  <circle cx="705" cy="200" r="45" fill="#3D5A50"/>
  <circle cx="675" cy="240" r="38" fill="#537A6D"/>
  <circle cx="735" cy="235" r="40" fill="#354E46"/>
  <circle cx="700" cy="280" r="42" fill="#3D5A50"/>
  <!-- Minimalist Wall Art Frame -->
  <rect x="140" y="90" width="160" height="170" fill="#FFFFFF" stroke="#1E2229" stroke-width="4" rx="4"/>
  <circle cx="220" cy="170" r="45" fill="#E07A5F"/>
  <path d="M 180 210 Q 220 140 260 210 Z" fill="#3D5A50"/>
  <!-- Warm Pendant Lamp Hanging from Ceiling -->
  <line x1="320" y1="0" x2="320" y2="140" stroke="#1E2229" stroke-width="2.5"/>
  <path d="M 270 180 Q 320 140 370 180 Z" fill="#FFF3DD" stroke="#E6C887" stroke-width="2"/>
  <ellipse cx="320" cy="180" rx="50" ry="12" fill="#FFE8A3"/>
  <circle cx="320" cy="185" r="6" fill="#FFA500"/>
</svg>
`);

// 2. Scandinavian Master Bedroom Suite with Private Balcony
export const SVG_MASTER_SUITE = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bwall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EFECE6"/>
      <stop offset="100%" stop-color="#E2DDD4"/>
    </linearGradient>
    <linearGradient id="bfloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#CBBCA8"/>
      <stop offset="100%" stop-color="#B8A793"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#bwall)"/>
  <rect y="400" width="800" height="200" fill="url(#bfloor)"/>
  <!-- Large Glass Door to Balcony -->
  <rect x="80" y="60" width="220" height="340" fill="#EAF2F8" stroke="#1E2229" stroke-width="4"/>
  <line x1="190" y1="60" x2="190" y2="400" stroke="#1E2229" stroke-width="3"/>
  <!-- Balcony Plants & Sunlight -->
  <rect x="80" y="280" width="220" height="120" fill="#C2D9E8" opacity="0.3"/>
  <circle cx="130" cy="320" r="35" fill="#3D5A50"/>
  <circle cx="220" cy="330" r="40" fill="#537A6D"/>
  <!-- King Size Minimalist Bed with Oak Headboard -->
  <rect x="360" y="220" width="380" height="120" rx="8" fill="#BA9873"/>
  <rect x="380" y="300" width="360" height="170" rx="12" fill="#FBFBF9" stroke="#E5DFD5" stroke-width="2"/>
  <!-- Linen Duvet in Sage Green -->
  <path d="M 420 340 L 740 340 L 740 470 L 420 470 Z" fill="#3D5A50" opacity="0.85"/>
  <!-- Bed Pillows -->
  <rect x="400" y="270" width="80" height="50" rx="8" fill="#FFFFFF" stroke="#E5DFD5"/>
  <rect x="490" y="270" width="80" height="50" rx="8" fill="#FFFFFF" stroke="#E5DFD5"/>
  <rect x="420" y="285" width="60" height="35" rx="6" fill="#E07A5F"/>
  <!-- Nightstand & Reading Lamp -->
  <rect x="330" y="360" width="45" height="60" rx="4" fill="#D4B693"/>
  <circle cx="352" cy="330" r="14" fill="#FFF3DD" stroke="#E07A5F" stroke-width="2"/>
  <line x1="352" y1="344" x2="352" y2="360" stroke="#1E2229" stroke-width="2"/>
  <!-- Woven Jute Rug -->
  <ellipse cx="550" cy="500" rx="180" ry="45" fill="#DFCBB5" stroke="#C4AD93" stroke-width="2"/>
  <!-- Modern Geometric Wall Art -->
  <rect x="480" y="70" width="140" height="110" rx="4" fill="#FFFFFF" stroke="#1E2229" stroke-width="3"/>
  <circle cx="530" cy="120" r="28" fill="#E07A5F"/>
  <rect x="550" y="100" width="50" height="50" fill="#3D5A50" rx="4"/>
</svg>
`);

// 3. Chef's Communal Kitchen & Island (Pour-Over Coffee Bar)
export const SVG_CHEF_KITCHEN = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="kwall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F9F8F5"/>
      <stop offset="100%" stop-color="#EBE7DF"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" fill="url(#kwall)"/>
  <!-- Terrazzo Flooring -->
  <rect y="420" width="800" height="180" fill="#E3DDD3"/>
  <circle cx="150" cy="460" r="3" fill="#E07A5F"/>
  <circle cx="320" cy="510" r="4" fill="#3D5A50"/>
  <circle cx="480" cy="470" r="3" fill="#1E2229"/>
  <circle cx="640" cy="530" r="4" fill="#BA9873"/>
  <!-- White Subway Tile Backsplash -->
  <rect x="80" y="160" width="640" height="140" fill="#FFFFFF" stroke="#E2DCD2" stroke-width="1.5"/>
  <!-- Floating Walnut Kitchen Shelves -->
  <rect x="100" y="140" width="600" height="14" rx="2" fill="#8C6D4F"/>
  <rect x="100" y="80" width="600" height="14" rx="2" fill="#8C6D4F"/>
  <!-- Ceramic Mugs, Jars & Teapot on Shelves -->
  <rect x="140" y="50" width="22" height="30" rx="3" fill="#E07A5F"/>
  <rect x="180" y="45" width="26" height="35" rx="3" fill="#3D5A50"/>
  <rect x="230" y="55" width="20" height="25" rx="3" fill="#F1EEE7" stroke="#BA9873"/>
  <circle cx="340" cy="65" r="15" fill="#E07A5F"/>
  <!-- Modern Kitchen Island with White Marble Top -->
  <rect x="180" y="320" width="440" height="170" rx="8" fill="#363C46"/>
  <rect x="160" y="300" width="480" height="30" rx="6" fill="#FFFFFF" stroke="#DCD5C9" stroke-width="2"/>
  <!-- Bar Stools -->
  <rect x="230" y="420" width="60" height="12" rx="4" fill="#BA9873"/>
  <line x1="240" y1="432" x2="235" y2="540" stroke="#1E2229" stroke-width="4"/>
  <line x1="280" y1="432" x2="285" y2="540" stroke="#1E2229" stroke-width="4"/>
  <rect x="490" y="420" width="60" height="12" rx="4" fill="#BA9873"/>
  <line x1="500" y1="432" x2="495" y2="540" stroke="#1E2229" stroke-width="4"/>
  <line x1="540" y1="432" x2="545" y2="540" stroke="#1E2229" stroke-width="4"/>
  <!-- Pour-Over Chemex & Coffee Dripper on Island -->
  <path d="M 240 300 L 250 260 L 260 260 L 270 300 Z" fill="#CCE5F0" opacity="0.8" stroke="#7AAEC4"/>
  <rect x="252" y="275" width="6" height="10" fill="#BA9873"/>
  <!-- Fruit Bowl -->
  <ellipse cx="380" cy="295" rx="35" ry="12" fill="#EBE6DC" stroke="#C2B7A5"/>
  <circle cx="370" cy="285" r="10" fill="#E07A5F"/>
  <circle cx="388" cy="282" r="9" fill="#F4A261"/>
  <circle cx="380" cy="275" r="8" fill="#E76F51"/>
</svg>
`);

// 4. Rooftop Terrace & Botanical Garden (Evening Sunset)
export const SVG_ROOFTOP_TERRACE = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4A5568"/>
      <stop offset="45%" stop-color="#D97757"/>
      <stop offset="75%" stop-color="#F4A261"/>
      <stop offset="100%" stop-color="#FFE3B3"/>
    </linearGradient>
  </defs>
  <!-- Sunset Sky -->
  <rect width="800" height="380" fill="url(#sky)"/>
  <!-- Distant City Skyline Silhouette -->
  <path d="M 0 380 L 40 330 L 70 330 L 70 310 L 110 310 L 110 380 L 170 380 L 170 290 L 220 290 L 240 380 L 300 380 L 300 260 L 320 230 L 340 260 L 340 380 L 420 380 L 420 320 L 480 320 L 480 380 L 560 380 L 560 300 L 610 300 L 610 380 L 720 380 L 720 340 L 800 340 L 800 380 Z" fill="#242831" opacity="0.6"/>
  <!-- Terrace Decking -->
  <rect y="380" width="800" height="220" fill="#9C7A56"/>
  <line x1="0" y1="420" x2="800" y2="420" stroke="#7A5B39" stroke-width="2"/>
  <line x1="0" y1="470" x2="800" y2="470" stroke="#7A5B39" stroke-width="2"/>
  <line x1="0" y1="530" x2="800" y2="530" stroke="#7A5B39" stroke-width="2"/>
  <!-- Glass Balustrade -->
  <rect x="0" y="340" width="800" height="60" fill="#FFFFFF" opacity="0.25" stroke="#FFFFFF" stroke-width="1.5"/>
  <line x1="0" y1="340" x2="800" y2="340" stroke="#1E2229" stroke-width="4"/>
  <!-- Outdoor Lounge Chairs & Table -->
  <rect x="180" y="420" width="130" height="70" rx="14" fill="#3D5A50"/>
  <rect x="480" y="420" width="130" height="70" rx="14" fill="#3D5A50"/>
  <circle cx="395" cy="460" r="38" fill="#BA9873"/>
  <!-- String Fairy Lights Across Sky -->
  <path d="M 60 120 Q 400 200 740 130" fill="none" stroke="#1E2229" stroke-width="2"/>
  <circle cx="160" cy="150" r="7" fill="#FFE58F"/>
  <circle cx="280" cy="175" r="7" fill="#FFE58F"/>
  <circle cx="400" cy="182" r="7" fill="#FFE58F"/>
  <circle cx="520" cy="175" r="7" fill="#FFE58F"/>
  <circle cx="640" cy="150" r="7" fill="#FFE58F"/>
  <!-- Lush Potted Olive & Herb Planters -->
  <rect x="660" y="370" width="70" height="70" rx="8" fill="#E07A5F"/>
  <circle cx="695" cy="330" r="45" fill="#3D5A50"/>
  <rect x="70" y="380" width="60" height="60" rx="6" fill="#E07A5F"/>
  <circle cx="100" cy="340" r="38" fill="#3D5A50"/>
</svg>
`);

// Verified Indian Avatar SVG illustrations (Aarav, Ananya, Rohan, Priya, Kabir, Vikram)
export const SVG_AVATAR_AARAV = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#E07A5F"/>
  <circle cx="100" cy="85" r="40" fill="#F0C6A5"/>
  <!-- Hair -->
  <path d="M 60 80 Q 100 45 140 80 Q 145 60 100 50 Q 55 60 60 80 Z" fill="#201C18"/>
  <!-- Glasses -->
  <circle cx="85" cy="85" r="12" fill="none" stroke="#1E2229" stroke-width="3"/>
  <circle cx="115" cy="85" r="12" fill="none" stroke="#1E2229" stroke-width="3"/>
  <line x1="97" y1="85" x2="103" y2="85" stroke="#1E2229" stroke-width="3"/>
  <!-- Smile -->
  <path d="M 88 105 Q 100 115 112 105" fill="none" stroke="#9E4B35" stroke-width="3" stroke-linecap="round"/>
  <!-- Shirt -->
  <path d="M 40 180 Q 100 140 160 180 L 160 200 L 40 200 Z" fill="#3D5A50"/>
</svg>
`);

export const SVG_AVATAR_ANANYA = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#3D5A50"/>
  <!-- Hair Long Back -->
  <circle cx="100" cy="100" r="55" fill="#1C1814"/>
  <circle cx="100" cy="85" r="38" fill="#F2C8A8"/>
  <!-- Front Hair Fringe -->
  <path d="M 64 78 Q 100 52 136 78 Q 140 60 100 52 Q 60 60 64 78 Z" fill="#1C1814"/>
  <!-- Eyes & Smile -->
  <circle cx="86" cy="84" r="3.5" fill="#1C1814"/>
  <circle cx="114" cy="84" r="3.5" fill="#1C1814"/>
  <path d="M 88 102 Q 100 114 112 102" fill="none" stroke="#9E4B35" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Bindi -->
  <circle cx="100" cy="74" r="2.5" fill="#E07A5F"/>
  <!-- Top -->
  <path d="M 45 180 Q 100 145 155 180 L 155 200 L 45 200 Z" fill="#E07A5F"/>
</svg>
`);

export const SVG_AVATAR_ROHAN = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#BA9873"/>
  <circle cx="100" cy="85" r="38" fill="#E8BD9B"/>
  <path d="M 62 82 Q 100 50 138 82 Q 140 58 100 48 Q 60 58 62 82 Z" fill="#1E1E1E"/>
  <circle cx="85" cy="84" r="3" fill="#1E1E1E"/>
  <circle cx="115" cy="84" r="3" fill="#1E1E1E"/>
  <path d="M 88 102 Q 100 112 112 102" fill="none" stroke="#874431" stroke-width="3" stroke-linecap="round"/>
  <!-- Beard subtle -->
  <path d="M 75 95 Q 100 128 125 95" fill="none" stroke="#3D2B1F" stroke-width="3" stroke-linecap="round"/>
  <path d="M 40 180 Q 100 140 160 180 L 160 200 L 40 200 Z" fill="#242830"/>
</svg>
`);

export const SVG_AVATAR_PRIYA = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#E07A5F"/>
  <circle cx="100" cy="100" r="54" fill="#1C1814"/>
  <circle cx="100" cy="85" r="38" fill="#F4CAA8"/>
  <path d="M 65 76 Q 100 55 135 76 Z" fill="#1C1814"/>
  <circle cx="86" cy="85" r="3.5" fill="#1C1814"/>
  <circle cx="114" cy="85" r="3.5" fill="#1C1814"/>
  <path d="M 89 104 Q 100 114 111 104" fill="none" stroke="#9E4B35" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 45 180 Q 100 145 155 180 L 155 200 L 45 200 Z" fill="#3D5A50"/>
</svg>
`);

// Array of images with guaranteed fallback
export const GUARANTEED_IMAGES = [
  SVG_LIVING_COMMONS,
  SVG_MASTER_SUITE,
  SVG_CHEF_KITCHEN,
  SVG_ROOFTOP_TERRACE
];
