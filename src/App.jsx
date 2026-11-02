import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CoreFeaturesShowcase from './components/CoreFeaturesShowcase';
import InteractiveFloorPlan from './components/InteractiveFloorPlan';
import PropertyDiscovery from './components/PropertyDiscovery';
import PropertyDetailModal from './components/PropertyDetailModal';
import FlatmateQuizModal from './components/FlatmateQuizModal';
import RentCalculator from './components/RentCalculator';
import BookingModal from './components/BookingModal';
import UserDashboard from './components/UserDashboard';
import ListYourSpaceModal from './components/ListYourSpaceModal';
import CommunitySection from './components/CommunitySection';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';

import { 
  INITIAL_PROPERTIES, 
  INITIAL_USER, 
  INITIAL_APPLICATIONS, 
  INITIAL_MESSAGES 
} from './data/mockData';
import { soundEngine } from './utils/audio';

export default function App() {
  // 1. Core State with LocalStorage Persistence
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('cohaven_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cohaven_favorites');
    return saved ? JSON.parse(saved) : ['coh-01', 'coh-04'];
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('cohaven_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('cohaven_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [user, setUser] = useState(INITIAL_USER);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('cohaven_theme') === 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 2. View and Modal States
  const [currentView, setCurrentView] = useState('landing');
  const [activePropertyDetail, setActivePropertyDetail] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isListSpaceOpen, setIsListSpaceOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [bookingProperty, setBookingProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});

  // 3. Effects for Theme & LocalStorage
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

  // 4. Action Handlers
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
    setCurrentView('discover');
    const el = document.getElementById('discovery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddProperty = (newProperty) => {
    setProperties([newProperty, ...properties]);
    setToastMessage("New shared residence listed live on CoHaven!");
  };

  const handleBookingComplete = (newApp) => {
    setApplications([newApp, ...applications]);
  };

  const handleSendMessage = (threadId, text) => {
    const updated = messages.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          history: [
            ...thread.history,
            { id: Date.now(), sender: 'me', text, time: 'Just now' }
          ]
        };
      }
      return thread;
    });
    setMessages(updated);

    // Dynamic simulated response from housemates
    setTimeout(() => {
      soundEngine.playHover();
      setMessages(prev => prev.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            history: [
              ...thread.history,
              { id: Date.now() + 1, sender: 'them', text: "Thanks for the note, Alexander! Looking forward to connecting and showing you around the residence.", time: 'Just now' }
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
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCalculator={() => {
          const el = document.getElementById('calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenFloorPlan={() => {
          const el = document.getElementById('floorplan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenListSpace={() => setIsListSpaceOpen(true)}
        onOpenDashboard={(tab = 'overview') => {
          setDashboardTab(tab);
          setIsDashboardOpen(true);
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreHomes={() => {
            const el = document.getElementById('discovery');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenFloorPlan={() => {
            const el = document.getElementById('floorplan');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSearchFilter={handleHeroSearch}
          featuredProperty={properties[0]}
          onSelectProperty={(prop) => setActivePropertyDetail(prop)}
        />

        {/* 4 Core Features Showcase (Systematic & High UI/UX Quality) */}
        <CoreFeaturesShowcase
          onExploreHomes={() => {
            const el = document.getElementById('discovery');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCalculator={() => {
            const el = document.getElementById('calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDashboard={(tab) => {
            setDashboardTab(tab);
            setIsDashboardOpen(true);
          }}
        />

        {/* Interactive Floor Plan & Room Navigator Section */}
        <section id="floorplan" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <InteractiveFloorPlan
            property={properties[0]}
            onBookRoom={(p) => setBookingProperty(p)}
            onSelectProperty={(p) => setActivePropertyDetail(p)}
          />
        </section>

        {/* Property Discovery & Editorial Grid */}
        <PropertyDiscovery
          properties={properties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={(prop) => setActivePropertyDetail(prop)}
          onOpenFloorPlan={() => {
            const el = document.getElementById('floorplan');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          initialFilters={searchFilters}
        />

        {/* Smart Fair-Share Rent & Utility Split Calculator */}
        <RentCalculator
          onShowToast={(msg) => setToastMessage(msg)}
        />

        {/* Shared Living Community Blueprint Section */}
        <CommunitySection
          onOpenQuiz={() => setIsQuizOpen(true)}
        />
      </main>

      {/* Global Footer */}
      <Footer
        onShowToast={(msg) => setToastMessage(msg)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCalculator={() => {
          const el = document.getElementById('calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenFloorPlan={() => {
          const el = document.getElementById('floorplan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Overlays */}
      {/* 1. Property Detail Modal */}
      {activePropertyDetail && (
        <PropertyDetailModal
          property={activePropertyDetail}
          onClose={() => setActivePropertyDetail(null)}
          isFavorite={favorites.includes(activePropertyDetail.id)}
          onToggleFavorite={handleToggleFavorite}
          onBookTour={(p) => {
            setActivePropertyDetail(null);
            setBookingProperty(p);
          }}
          onOpenFloorPlan={() => {
            setActivePropertyDetail(null);
            const el = document.getElementById('floorplan');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* 2. Flatmate Compatibility Quiz */}
      <FlatmateQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        properties={properties}
        onSelectProperty={(p) => setActivePropertyDetail(p)}
      />

      {/* 3. Booking & Viewing Modal */}
      {bookingProperty && (
        <BookingModal
          isOpen={!!bookingProperty}
          onClose={() => setBookingProperty(null)}
          property={bookingProperty}
          onBookingComplete={handleBookingComplete}
          onOpenMessages={() => {
            setIsDashboardOpen(true);
            setDashboardTab('messages');
          }}
        />
      )}

      {/* 4. Systematic Resident Hub & Dashboard */}
      <UserDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        initialTab={dashboardTab}
        user={user}
        favorites={favorites}
        properties={properties}
        applications={applications}
        messages={messages}
        onSendMessage={handleSendMessage}
        onSelectProperty={(p) => {
          setIsDashboardOpen(false);
          setActivePropertyDetail(p);
        }}
        onRemoveFavorite={handleToggleFavorite}
        onOpenCalculator={() => {
          const el = document.getElementById('calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* 5. Owner List Your Space Modal */}
      <ListYourSpaceModal
        isOpen={isListSpaceOpen}
        onClose={() => setIsListSpaceOpen(false)}
        onAddProperty={handleAddProperty}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
