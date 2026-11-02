// CoHaven Live Client & Mock API Engine
// Simulates RESTful backend endpoints with localStorage persistence and async promises

import { 
  INITIAL_PROPERTIES, 
  INITIAL_USER, 
  INITIAL_APPLICATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_CHORES, 
  INITIAL_EXPENSES 
} from '../data/mockData';
import { AVATAR_IMAGES } from '../utils/images';

const STORAGE_KEYS = {
  USER: 'cohaven_auth_user',
  PROPERTIES: 'cohaven_properties',
  FAVORITES: 'cohaven_favorites',
  APPLICATIONS: 'cohaven_applications',
  MESSAGES: 'cohaven_messages',
  CHORES: 'cohaven_chores',
  EXPENSES: 'cohaven_expenses',
  THEME: 'cohaven_theme'
};

// Demo user accounts for 1-click login
export const DEMO_USERS = [
  {
    id: 'user-aarav',
    name: 'Aarav Sharma',
    email: 'aarav@cohaven.in',
    role: 'Senior Spatial UX Lead',
    city: 'Bengaluru',
    avatar: AVATAR_IMAGES.aarav,
    bio: 'Spatial UX Lead in Indiranagar. Loves pour-over coffee, quiet weekday evenings, and clean counters.',
    type: 'resident',
    verified: true,
    score: 98
  },
  {
    id: 'user-ananya',
    name: 'Ananya Deshmukh',
    email: 'ananya@cohaven.in',
    role: 'Creative Director & Ceramicist',
    city: 'Bengaluru',
    avatar: AVATAR_IMAGES.ananya,
    bio: 'Early bird who enjoys Sunday sourdough baking and botanical styling. House plant enthusiast.',
    type: 'resident',
    verified: true,
    score: 96
  },
  {
    id: 'user-kabir',
    name: 'Kabir Sen',
    email: 'kabir@cohaven.in',
    role: 'Climate Tech Founder & Space Host',
    city: 'Mumbai',
    avatar: AVATAR_IMAGES.kabir,
    bio: 'Founder of Pali Hill sea-breeze residence. Cyclist and film photographer looking for thoughtful housemates.',
    type: 'host',
    verified: true,
    score: 95
  },
  {
    id: 'user-guest',
    name: 'Guest Explorer',
    email: 'guest@cohaven.in',
    role: 'Explorer',
    city: 'All Hubs',
    avatar: AVATAR_IMAGES.priya,
    bio: 'Exploring curated shared residences across India.',
    type: 'guest',
    verified: true,
    score: 92
  }
];

// 1. Authentication API
export const authApi = {
  async getSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async login(email, password) {
    await new Promise((res) => setTimeout(res, 400));
    const matchedDemo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    const user = matchedDemo || {
      id: 'user-' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role: 'Resident Member',
      city: 'Bengaluru',
      avatar: AVATAR_IMAGES.aarav,
      bio: 'New CoHaven community resident.',
      type: 'resident',
      verified: true,
      score: 94
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  async demoLogin(userId) {
    await new Promise((res) => setTimeout(res, 250));
    const user = DEMO_USERS.find(u => u.id === userId) || DEMO_USERS[0];
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  async register({ name, email, role = 'Resident Member', city = 'Bengaluru' }) {
    await new Promise((res) => setTimeout(res, 500));
    const user = {
      id: 'user-' + Date.now(),
      name,
      email,
      role,
      city,
      avatar: AVATAR_IMAGES.ananya,
      bio: 'Curated co-living resident excited for harmonious shared living.',
      type: 'resident',
      verified: true,
      score: 95
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  async logout() {
    await new Promise((res) => setTimeout(res, 200));
    localStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  },

  async updateProfile(updates) {
    const current = await this.getSession() || DEMO_USERS[0];
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return updated;
  }
};

// 2. Properties & Spaces API
export const propertiesApi = {
  async getProperties() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  },

  async getPropertyById(id) {
    const props = await this.getProperties();
    return props.find(p => p.id === id) || props[0];
  },

  async addProperty(newProperty) {
    await new Promise((res) => setTimeout(res, 400));
    const props = await this.getProperties();
    const updated = [newProperty, ...props];
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(updated));
    return updated;
  }
};

// 3. Flatmate Chat API
export const chatApi = {
  async getMessages() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  },

  async sendMessage(threadId, text) {
    const messages = await this.getMessages();
    const updated = messages.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          lastMessage: text,
          lastTime: 'Just now',
          history: [
            ...thread.history,
            { id: Date.now(), sender: 'me', text, time: 'Just now' }
          ]
        };
      }
      return thread;
    });
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
    return updated;
  },

  generateFlatmateReply(flatmateName, userText) {
    const responses = [
      `Thanks for your note! We just wrapped our house tea, and we'd love to show you the space. When suits you best?`,
      `Hey! That sounds wonderful. We're very careful about quiet focus hours and keeping the kitchen pristine, and your profile matches our rhythm perfectly!`,
      `Awesome! I can arrange a live FaceTime or Google Meet walkthrough tomorrow around 5 PM if that works?`,
      `Sounds great! The neighborhood is super walkable—lots of great cafes right around the corner.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
};

// 4. Neighborhood & Atmosphere City API
export const cityAtmosphereApi = {
  getStats(city) {
    const cityData = {
      'Bengaluru, Karnataka': {
        temp: '24°C',
        sky: 'Gentle Breeze',
        aqi: '42 (Good)',
        walkability: '96/100',
        metroTransit: '4 mins walk (Indiranagar 100ft Rd)',
        cafeDensity: '28 Specialty Cafes in 1km'
      },
      'Mumbai, Maharashtra': {
        temp: '29°C',
        sky: 'Coastal Sea Breeze',
        aqi: '68 (Moderate)',
        walkability: '98/100',
        metroTransit: '6 mins walk (Pali Hill / Bandra)',
        cafeDensity: '35 Artisanal Cafes in 1km'
      },
      'New Delhi, Delhi NCR': {
        temp: '21°C',
        sky: 'Autumn Haze',
        aqi: '110 (Moderate)',
        walkability: '94/100',
        metroTransit: '5 mins walk (Green Park / Hauz Khas)',
        cafeDensity: '22 Heritage Eateries in 1km'
      },
      'Hyderabad, Telangana': {
        temp: '27°C',
        sky: 'Sunny & Clear',
        aqi: '55 (Good)',
        walkability: '92/100',
        metroTransit: '8 mins to Hitec City Metro',
        cafeDensity: '19 Specialty Roasters in 1km'
      },
      'Pune, Maharashtra': {
        temp: '25°C',
        sky: 'Pleasant & Leafy',
        aqi: '48 (Good)',
        walkability: '99/100',
        metroTransit: '3 mins walk (North Main Road)',
        cafeDensity: '31 Organic Cafes in 1km'
      }
    };
    return cityData[city] || cityData['Bengaluru, Karnataka'];
  }
};
