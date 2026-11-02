import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CoreFeaturesShowcase from './components/CoreFeaturesShowcase';
import InteractiveFloorPlan from './components/InteractiveFloorPlan';
import PropertyDiscovery from './components/PropertyDiscovery';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import FlatmateQuizModal from './components/FlatmateQuizModal';
import RentCalculator from './components/RentCalculator';
import BookingModal from './components/BookingModal';
import UserDashboard from './components/UserDashboard';
import ListYourSpaceModal from './components/ListYourSpaceModal';
import CommunitySection from './components/CommunitySection';
import AuthModal from './components/AuthModal';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';

import { 
  INITIAL_PROPERTIES, 
  INITIAL_USER, 
  INITIAL_APPLICATIONS, 
  INITIAL_MESSAGES 
} from './data/mockData';
import { DEMO_USERS, authApi, chatApi } from './services/api';
import { soundEngine } from './utils/audio';

const DATA_VERSION = '3.0-multipage-inr';

export default function App() {
  // 1. Core State & Data Persistence
  const [properties, setProperties] = useState(() => {
    try {
      const v = localStorage.getItem('cohaven_version');
      if (v !== DATA_VERSION) {
        localStorage.setItem('cohaven_version', DATA_VERSION);
        localStorage.setItem('cohaven_properties', JSON.stringify(INITIAL_PROPERTIES));
        localStorage.setItem('cohaven_applications', JSON.stringify(INITIAL_APPLICATIONS));
        localStorage.setItem('cohaven_messages', JSON.stringify(INITIAL_MESSAGES));
        return INITIAL_PROPERTIES;
      }
      const saved = localStorage.getItem('cohaven_properties');
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch (e) {
      return INITIAL_PROPERTIES;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('cohaven_favorites');
      return saved ? JSON.parse(saved) : ['coh-01', 'coh-02', 'coh-07'];
    } catch (e) {
      return ['coh-01', 'coh-02', 'coh-07'];
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      if (localStorage.getItem('cohaven_version') !== DATA_VERSION) return INITIAL_APPLICATIONS;
      const saved = localStorage.getItem('cohaven_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch (e) {
      return INITIAL_APPLICATIONS;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      if (localStorage.getItem('cohaven_version') !== DATA_VERSION) return INITIAL_MESSAGES;
      const saved = localStorage.getItem('cohaven_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch (e) {
      return INITIAL_MESSAGES;
    }
  });

  // 2. Authentication State (Gate before entering website)
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cohaven_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('cohaven_theme') === 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 3. Multi-Page Navigation State & Hash Routing
  // Pages: 'home' | 'discover' | 'quiz' | 'calculator' | 'floorplan' | 'community' | 'list-space' | 'dashboard' | 'property-detail' | 'auth'
  const [currentView, setCurrentView] = useState(() => {
    // If user is not authenticated yet, present the login experience first
    const savedUser = localStorage.getItem('cohaven_auth_user');
    if (!savedUser) return 'auth';

    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'discover', 'quiz', 'calculator', 'floorplan', 'community', 'list-space', 'dashboard', 'auth'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Modals & Overlays
  const [activePropertyDetail, setActivePropertyDetail] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [bookingProperty, setBookingProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});

  // 4. URL Hash Synchronization for true multi-page navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('property-')) {
        const propId = hash.replace('property-', '');
        const found = properties.find(p => p.id === propId);
        if (found) {
          setActivePropertyDetail(found);
          setCurrentView('property-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (hash && ['home', 'discover', 'quiz', 'calculator', 'floorplan', 'community', 'list-space', 'dashboard', 'auth'].includes(hash)) {
        setCurrentView(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [properties]);

  const navigateTo = (view, property = null) => {
    soundEngine.playClick();
    if (property) {
      setActivePropertyDetail(property);
      setCurrentView('property-detail');
      window.location.hash = `#property-${property.id}`;
    } else {
      setCurrentView(view);
      window.location.hash = `#${view}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Theme & Persistence Effects
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cohaven_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cohaven_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('cohaven_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('cohaven_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cohaven_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('cohaven_messages', JSON.stringify(messages));
  }, [messages]);

  // 6. Action Handlers
  const handleAuthSuccess = (user) => {
    setAuthUser(user);
    localStorage.setItem('cohaven_auth_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    // Smoothly enter the website after logging in
    if (currentView === 'auth') {
      navigateTo('home');
    }
  };

  const handleLogout = () => {
    soundEngine.playClick();
    authApi.logout();
    setAuthUser(null);
    setToastMessage("You have been signed out.");
    navigateTo('auth');
  };

  const handleToggleFavorite = (propertyId) => {
    soundEngine.playClick();
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(id => id !== propertyId));
      setToastMessage("Removed from saved spaces");
    } else {
      setFavorites([...favorites, propertyId]);
      soundEngine.playSuccess();
      setToastMessage("Saved to your personal favorites!");
    }
  };

  const handleHeroSearch = (filters) => {
    setSearchFilters(filters);
    navigateTo('discover');
  };

  const handleAddProperty = (newProperty) => {
    setProperties([newProperty, ...properties]);
    setToastMessage("New shared residence listed live on CoHaven!");
    navigateTo('discover');
  };

  const handleBookingComplete = (newApp) => {
    setApplications([newApp, ...applications]);
    setToastMessage("Tour application confirmed with housemates!");
    setBookingProperty(null);
  };

  const handleSendMessage = (threadId, text) => {
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
    setMessages(updated);

    // Dynamic simulated response from flatmates using chatApi
    setTimeout(() => {
      soundEngine.playHover();
      setMessages(prev => prev.map(thread => {
        if (thread.id === threadId) {
          const autoReply = chatApi.generateFlatmateReply(thread.flatmateName, text);
          return {
            ...thread,
            lastMessage: autoReply,
            lastTime: 'Just now',
            history: [
              ...thread.history,
              { 
                id: Date.now() + 1, 
                sender: 'them', 
                text: autoReply, 
                time: 'Just now' 
              }
            ]
          };
        }
        return thread;
      }));
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-ivory text-charcoal dark:bg-charcoal-700 dark:text-ivory selection:bg-terracotta selection:text-white transition-colors duration-300">
      
      {/* Global Sticky Navigation */}
      <Navigation
        currentView={currentView}
        setCurrentView={(view) => navigateTo(view)}
        favoritesCount={favorites.length}
        onOpenQuiz={() => navigateTo('quiz')}
        onOpenCalculator={() => navigateTo('calculator')}
        onOpenFloorPlan={() => navigateTo('floorplan')}
        onOpenListSpace={() => navigateTo('list-space')}
        onOpenDashboard={() => navigateTo('dashboard')}
        onOpenAuth={(mode = 'signin') => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        user={authUser}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* MULTI-PAGE ROUTER VIEW CONTAINER */}
      <main className="flex-1">
        
        {/* PAGE 1: AUTHENTICATION GATE / LOGIN & SIGN UP PAGE */}
        {currentView === 'auth' && (
          <div className="min-h-screen pt-20 pb-16 flex items-center justify-center bg-ivory-100 dark:bg-charcoal-800 px-4">
            <AuthModal
              isOpen={true}
              onClose={() => navigateTo('home')}
              onAuthSuccess={handleAuthSuccess}
              initialMode={authModalMode}
              onShowToast={(msg) => setToastMessage(msg)}
            />
          </div>
        )}

        {/* PAGE 2: HOME / EXPLORE OVERVIEW PAGE */}
        {(currentView === 'home' || currentView === 'landing') && (
          <div className="animate-fadeIn">
            {/* Expressive Hero with Photographic Living Collections */}
            <HeroSection
              onExploreHomes={() => navigateTo('discover')}
              onOpenQuiz={() => navigateTo('quiz')}
              onOpenFloorPlan={() => navigateTo('floorplan')}
              onSearchFilter={handleHeroSearch}
              featuredProperty={properties[0]}
              onSelectProperty={(prop) => navigateTo('property-detail', prop)}
            />

            {/* 4 Core Features Showcase with direct page links */}
            <CoreFeaturesShowcase
              onExploreHomes={() => navigateTo('discover')}
              onOpenQuiz={() => navigateTo('quiz')}
              onOpenCalculator={() => navigateTo('calculator')}
              onOpenDashboard={() => navigateTo('dashboard')}
            />

            {/* Featured Properties Showcase Grid */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-ivory-300 dark:border-charcoal-600">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-terracotta font-bold">
                    Curated Residences
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold text-charcoal dark:text-ivory font-sans mt-1">
                    Featured Indian Sanctuaries
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-300 dark:text-charcoal-200 mt-1">
                    Handpicked shared residences with vetted housemates in Bengaluru, Mumbai, and Delhi.
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('discover')}
                  className="px-5 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all shadow-soft-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Explore All {properties.length} Spaces</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {properties.slice(0, 3).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectProperty={(prop) => navigateTo('property-detail', prop)}
                    onOpenFloorPlan={() => navigateTo('floorplan')}
                  />
                ))}
              </div>
            </section>

            {/* Interactive Floor Plan Section Preview */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <InteractiveFloorPlan
                property={properties[0]}
                properties={properties}
                onSelectAnotherProperty={(p) => setActivePropertyDetail(p)}
                onBookRoom={(p) => setBookingProperty(p)}
                onSelectProperty={(p) => navigateTo('property-detail', p)}
              />
            </section>

            {/* Shared Living Community Blueprint Section */}
            <CommunitySection
              onOpenQuiz={() => navigateTo('quiz')}
            />
          </div>
        )}

        {/* PAGE 3: DISCOVER SPACES & ADVANCED FILTERS PAGE */}
        {currentView === 'discover' && (
          <div className="animate-fadeIn pt-12">
            <PropertyDiscovery
              properties={properties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={(prop) => navigateTo('property-detail', prop)}
              onOpenFloorPlan={() => navigateTo('floorplan')}
              initialFilters={searchFilters}
            />
          </div>
        )}

        {/* PAGE 4: PROPERTY DETAIL DEEP-DIVE PAGE */}
        {currentView === 'property-detail' && activePropertyDetail && (
          <div className="animate-fadeIn">
            <PropertyDetailModal
              property={activePropertyDetail}
              onClose={() => navigateTo('discover')}
              isFavorite={favorites.includes(activePropertyDetail.id)}
              onToggleFavorite={handleToggleFavorite}
              onBookTour={(p) => setBookingProperty(p)}
              onOpenFloorPlan={() => navigateTo('floorplan')}
              isFullPage={true}
            />
          </div>
        )}

        {/* PAGE 5: VIBEMATCH FLATMATES COMPATIBILITY QUIZ PAGE */}
        {currentView === 'quiz' && (
          <div className="animate-fadeIn">
            <FlatmateQuizModal
              isOpen={true}
              onClose={() => navigateTo('home')}
              properties={properties}
              onSelectProperty={(p) => navigateTo('property-detail', p)}
              isFullPage={true}
            />
          </div>
        )}

        {/* PAGE 6: SMART FAIR-SHARE RENT CALCULATOR PAGE */}
        {currentView === 'calculator' && (
          <div className="animate-fadeIn">
            <RentCalculator
              onShowToast={(msg) => setToastMessage(msg)}
              isFullPage={true}
            />
          </div>
        )}

        {/* PAGE 7: INTERACTIVE 3D/2D FLOOR PLAN NAVIGATOR PAGE */}
        {currentView === 'floorplan' && (
          <div className="animate-fadeIn">
            <InteractiveFloorPlan
              property={activePropertyDetail || properties[0]}
              properties={properties}
              onSelectAnotherProperty={(p) => setActivePropertyDetail(p)}
              onBookRoom={(p) => setBookingProperty(p)}
              onSelectProperty={(p) => navigateTo('property-detail', p)}
              isFullPage={true}
            />
          </div>
        )}

        {/* PAGE 8: LIVING BLUEPRINT & COMMUNITY HUB PAGE */}
        {currentView === 'community' && (
          <div className="animate-fadeIn pt-16">
            <CommunitySection
              onOpenQuiz={() => navigateTo('quiz')}
            />
          </div>
        )}

        {/* PAGE 9: LIST YOUR SPACE (HOST/OWNER) PAGE */}
        {currentView === 'list-space' && (
          <div className="animate-fadeIn">
            <ListYourSpaceModal
              isOpen={true}
              onClose={() => navigateTo('discover')}
              onAddProperty={handleAddProperty}
              onShowToast={(msg) => setToastMessage(msg)}
              isFullPage={true}
            />
          </div>
        )}

        {/* PAGE 10: SYSTEMATIC RESIDENT HUB & DASHBOARD PAGE */}
        {currentView === 'dashboard' && (
          <div className="animate-fadeIn">
            <UserDashboard
              isOpen={true}
              onClose={() => navigateTo('home')}
              initialTab="overview"
              user={authUser || INITIAL_USER}
              favorites={favorites}
              properties={properties}
              applications={applications}
              messages={messages}
              onSendMessage={handleSendMessage}
              onSelectProperty={(p) => navigateTo('property-detail', p)}
              onRemoveFavorite={handleToggleFavorite}
              onOpenCalculator={() => navigateTo('calculator')}
              onOpenQuiz={() => navigateTo('quiz')}
              onShowToast={(msg) => setToastMessage(msg)}
              isFullPage={true}
              onLogout={handleLogout}
            />
          </div>
        )}

      </main>

      {/* Global Footer (shown on major pages) */}
      {currentView !== 'auth' && (
        <Footer
          onShowToast={(msg) => setToastMessage(msg)}
          onOpenQuiz={() => navigateTo('quiz')}
          onOpenCalculator={() => navigateTo('calculator')}
          onOpenFloorPlan={() => navigateTo('floorplan')}
        />
      )}

      {/* Global Modals */}
      {/* 1. Modal Booking Walkthrough */}
      {bookingProperty && (
        <BookingModal
          isOpen={!!bookingProperty}
          onClose={() => setBookingProperty(null)}
          property={bookingProperty}
          onBookingComplete={handleBookingComplete}
          onOpenMessages={() => navigateTo('dashboard')}
        />
      )}

      {/* 2. Modal Quick Auth (if triggered via popup) */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
          initialMode={authModalMode}
          onShowToast={(msg) => setToastMessage(msg)}
        />
      )}

      {/* 3. Global Toast Notifications */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
