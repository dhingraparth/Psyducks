import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  Calculator, 
  Heart, 
  PlusCircle, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  LayoutGrid, 
  Users, 
  BookOpen, 
  UserCheck 
} from 'lucide-react';
import SmartImage from './SmartImage';
import { SVG_AVATAR_AARAV } from '../utils/svgImages';
import { soundEngine } from '../utils/audio';

export default function Navigation({
  currentView,
  setCurrentView,
  favoritesCount,
  onOpenQuiz,
  onOpenCalculator,
  onOpenFloorPlan,
  onOpenListSpace,
  onOpenDashboard,
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view, action) => {
    soundEngine.playClick();
    if (action) {
      action();
    } else if (view) {
      setCurrentView(view);
    }
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEngine.setMuted(!nextState);
    if (nextState) {
      soundEngine.playClick();
    }
  };

  const toggleTheme = () => {
    soundEngine.playClick();
    setDarkMode(!darkMode);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-nav shadow-soft-sm py-3.5 border-b border-ivory-300/80 dark:border-charcoal-500/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-xl bg-charcoal text-ivory flex items-center justify-center overflow-hidden shadow-soft-sm group-hover:scale-105 transition-transform duration-300 dark:bg-terracotta">
                <span className="font-bold text-lg tracking-tighter">C</span>
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta dark:bg-ivory absolute bottom-2 right-2"></span>
              </div>
              <div>
                <span className="font-semibold text-xl tracking-tight text-charcoal dark:text-ivory block leading-tight font-sans">
                  Co<span className="text-terracotta">Haven</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-charcoal-300 dark:text-charcoal-200 block -mt-0.5">
                  Shared Living & Co.
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-ivory-200/70 dark:bg-charcoal-600/70 px-3 py-1.5 rounded-full border border-ivory-300/70 dark:border-charcoal-500/50 backdrop-blur-md">
              <button
                onClick={() => handleNavClick('discover')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                  currentView === 'discover'
                    ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-soft-sm'
                    : 'text-charcoal-400 hover:text-charcoal dark:text-charcoal-100 dark:hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>1. Discover Spaces</span>
              </button>

              <button
                onClick={() => handleNavClick(null, onOpenQuiz)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-charcoal-400 hover:text-charcoal dark:text-charcoal-100 dark:hover:text-white transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                <span>2. VibeMatch Quiz</span>
              </button>

              <button
                onClick={() => handleNavClick(null, onOpenCalculator)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-charcoal-400 hover:text-charcoal dark:text-charcoal-100 dark:hover:text-white transition-all flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-sage" />
                <span>3. Rent Calculator</span>
              </button>

              <button
                onClick={() => handleNavClick(null, onOpenFloorPlan)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-charcoal-400 hover:text-charcoal dark:text-charcoal-100 dark:hover:text-white transition-all flex items-center gap-1.5"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
                <span>4. Floor Plan Navigator</span>
              </button>

              <button
                onClick={() => handleNavClick('community')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                  currentView === 'community'
                    ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white'
                    : 'text-charcoal-400 hover:text-charcoal dark:text-charcoal-100 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Living Blueprint</span>
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Sound FX Toggle */}
              <button
                onClick={toggleSound}
                title={soundEnabled ? "Mute interactive audio" : "Enable interactive sound FX"}
                className={`p-2 rounded-full border transition-all ${
                  soundEnabled
                    ? 'border-terracotta/50 bg-terracotta/10 text-terracotta'
                    : 'border-ivory-300 dark:border-charcoal-400 text-charcoal-300 dark:text-charcoal-200 hover:text-charcoal dark:hover:text-white'
                }`}
              >
                {soundEnabled ? (
                  <div className="flex items-center gap-0.5 px-0.5">
                    <Volume2 className="w-4 h-4" />
                    <span className="flex gap-0.5 h-2.5 items-end">
                      <span className="w-0.5 h-full bg-terracotta" />
                      <span className="w-0.5 h-1.5 bg-terracotta" />
                      <span className="w-0.5 h-2 bg-terracotta" />
                    </span>
                  </div>
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                title={darkMode ? "Switch to daylight mode" : "Switch to midnight mode"}
                className="p-2 rounded-full border border-ivory-300 dark:border-charcoal-500 text-charcoal-400 hover:text-charcoal dark:text-charcoal-100 dark:hover:text-white transition-all bg-ivory-50 dark:bg-charcoal-600"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-charcoal" />}
              </button>

              {/* Favorites Heart Counter */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenDashboard('favorites');
                }}
                className="relative p-2 rounded-full border border-ivory-300 dark:border-charcoal-500 text-charcoal-400 hover:text-terracotta dark:text-charcoal-100 transition-all bg-ivory-50 dark:bg-charcoal-600 group"
                title="View Saved Favorites"
              >
                <Heart className="w-4 h-4 transition-transform group-hover:scale-110" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* User Dashboard / Profile with SmartImage */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenDashboard('overview');
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-ivory-300 dark:border-charcoal-500 hover:border-charcoal transition-all bg-ivory-50 dark:bg-charcoal-600 group"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-terracotta/40">
                  <SmartImage
                    src={SVG_AVATAR_AARAV}
                    alt="Aarav Sharma Avatar"
                    isAvatar={true}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-charcoal dark:text-ivory">Aarav</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </button>

              {/* List Your Space CTA */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenListSpace();
                }}
                className="ml-1 px-4 py-2 rounded-full bg-charcoal text-ivory text-xs font-bold hover:bg-charcoal-600 dark:bg-ivory dark:text-charcoal dark:hover:bg-ivory-200 transition-all shadow-soft-sm flex items-center gap-1.5 group"
              >
                <PlusCircle className="w-3.5 h-3.5 text-terracotta group-hover:rotate-90 transition-transform duration-300" />
                <span>List Space</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-ivory-300 dark:border-charcoal-400 text-charcoal dark:text-ivory"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-ivory-200 dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-nav border-b border-ivory-300 dark:border-charcoal-400 px-6 pt-4 pb-6 mt-2 space-y-3 animate-fadeIn">
            <button
              onClick={() => handleNavClick('discover')}
              className="w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center gap-3 bg-ivory-200/50 dark:bg-charcoal-600"
            >
              <Compass className="w-4 h-4 text-terracotta" />
              <span>1. Discover Shared Spaces</span>
            </button>
            <button
              onClick={() => handleNavClick(null, onOpenQuiz)}
              className="w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-3 hover:bg-ivory-200/50 dark:hover:bg-charcoal-600"
            >
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span>2. Flatmate VibeMatch Quiz</span>
            </button>
            <button
              onClick={() => handleNavClick(null, onOpenCalculator)}
              className="w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-3 hover:bg-ivory-200/50 dark:hover:bg-charcoal-600"
            >
              <Calculator className="w-4 h-4 text-sage" />
              <span>3. Smart Rent Split Calculator</span>
            </button>
            <button
              onClick={() => handleNavClick(null, onOpenFloorPlan)}
              className="w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-3 hover:bg-ivory-200/50 dark:hover:bg-charcoal-600"
            >
              <LayoutGrid className="w-4 h-4 text-amber-600" />
              <span>4. Floor Plan Navigator</span>
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className="w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-3 hover:bg-ivory-200/50 dark:hover:bg-charcoal-600"
            >
              <BookOpen className="w-4 h-4 text-charcoal-400" />
              <span>Living Blueprint</span>
            </button>
            <div className="pt-2 border-t border-ivory-300 dark:border-charcoal-400 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard('overview');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border border-ivory-300 dark:border-charcoal-400 text-center flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Dashboard ({favoritesCount})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenListSpace();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold bg-terracotta text-white text-center flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Space</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
