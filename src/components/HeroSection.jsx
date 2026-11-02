import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Box, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Search, 
  Heart,
  Users,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function HeroSection({
  onExploreHomes,
  onOpenQuiz,
  onEnterSimulation,
  onSearchFilter,
  featuredProperty,
  onSelectProperty
}) {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedRoomType, setSelectedRoomType] = useState('All Types');
  const [budget, setBudget] = useState(2000);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    soundEngine.playClick();
    onSearchFilter({
      city: selectedCity === 'All Cities' ? '' : selectedCity,
      roomType: selectedRoomType === 'All Types' ? '' : selectedRoomType,
      maxPrice: budget
    });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-ivory dark:bg-charcoal-700 bg-tactile">
      {/* Decorative ambient gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-terracotta/10 via-sage/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta border border-terracotta/20 dark:bg-terracotta/20 dark:text-terracotta-light">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Award-Winning Shared Living Collective</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-charcoal-300 dark:text-charcoal-200">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" />
            <span>100% Identity & Acoustic Verified</span>
          </span>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Expressive Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal dark:text-ivory leading-[1.08] font-sans">
              Find your space.<br />
              <span className="text-terracotta italic font-serif font-normal">Live with</span> your people.
            </h1>

            <p className="text-lg sm:text-xl text-charcoal-300 dark:text-charcoal-100 max-w-2xl font-normal leading-relaxed">
              More than a place to stay. Find a home that fits your lifestyle, your rhythm, and your people. Scandinavian warmth meets algorithmic flatmate compatibility.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onExploreHomes();
                }}
                className="px-6 py-3.5 rounded-full bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal hover:bg-charcoal-600 dark:hover:bg-ivory-200 text-sm font-semibold transition-all shadow-soft-lg flex items-center gap-2 group"
              >
                <span>Explore Verified Homes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenQuiz();
                }}
                className="px-6 py-3.5 rounded-full border border-ivory-300 dark:border-charcoal-400 bg-ivory-50/80 dark:bg-charcoal-600 text-charcoal dark:text-ivory hover:border-terracotta text-sm font-semibold transition-all flex items-center gap-2 group shadow-soft-sm"
              >
                <Sparkles className="w-4 h-4 text-terracotta group-hover:rotate-12 transition-transform" />
                <span>Find Your Flatmate (Quiz)</span>
              </button>

              {/* Simulation Callout Button */}
              <button
                onClick={() => {
                  soundEngine.playPortalEnter();
                  onEnterSimulation();
                }}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-terracotta to-[#c25e45] text-white text-xs font-bold tracking-wide uppercase transition-all shadow-glow-terracotta flex items-center gap-2 hover:brightness-105"
              >
                <Box className="w-4 h-4 animate-spin-slow" />
                <span>🎮 Enter 3D Simulation</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-ivory-300/80 dark:border-charcoal-500/60 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory font-sans">
                  2,480<span className="text-terracotta">+</span>
                </div>
                <div className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-0.5">
                  Verified Spaces
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory font-sans">
                  98.4<span className="text-sage">%</span>
                </div>
                <div className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-0.5">
                  Match Harmony
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory font-sans">
                  14
                </div>
                <div className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-0.5">
                  Design Capitals
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Composition with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Architectural Visual */}
              <div 
                onClick={() => {
                  soundEngine.playClick();
                  if (featuredProperty) onSelectProperty(featuredProperty);
                }}
                className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-ivory-300/80 dark:border-charcoal-400 group cursor-pointer bg-charcoal-600"
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                  alt="CoHaven Scandinavian Interior"
                  className="w-full h-[460px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                {/* Overlaid Property Info */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-terracotta text-white uppercase tracking-wider">
                      Featured Space
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/40 backdrop-blur-md text-ivory border border-white/20">
                      Brooklyn, NY
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-sans">The Kanso Nordic Atelier</h3>
                  <div className="flex items-center justify-between text-xs text-ivory-200 pt-1">
                    <span>From $1,450/month • All utilities inc.</span>
                    <span className="text-terracotta-light font-semibold">Click to Explore →</span>
                  </div>
                </div>

                {/* 3D Simulation Teaser Tag */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playPortalEnter();
                    onEnterSimulation();
                  }}
                  className="absolute top-4 left-4 glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-charcoal dark:text-ivory shadow-soft hover:scale-105 transition-transform"
                >
                  <Box className="w-3.5 h-3.5 text-terracotta" />
                  <span>Interactive 3D Walkthrough</span>
                </div>
              </div>

              {/* Floating Badge 1: Compatibility Score */}
              <div className="absolute -top-4 -right-4 sm:-right-6 glass-card p-3 rounded-2xl shadow-soft-lg flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                  98%
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal dark:text-ivory">Match Harmony</div>
                  <div className="text-[10px] text-charcoal-300 dark:text-charcoal-200">Rhythm & Cleanliness</div>
                </div>
              </div>

              {/* Floating Badge 2: Verified Flatmate */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 glass-card p-3 rounded-2xl shadow-soft-lg flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-terracotta">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Astrid flatmate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-charcoal dark:text-ivory">Astrid L.</span>
                    <CheckCircle2 className="w-3 h-3 text-sage fill-sage/20" />
                  </div>
                  <div className="text-[10px] text-charcoal-300 dark:text-charcoal-200">Spatial UX • Early Riser</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Integrated Search Filter Bar */}
        <div className="mt-14 max-w-5xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="glass-card p-4 sm:p-5 rounded-3xl shadow-soft-lg border border-ivory-300/80 dark:border-charcoal-400 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center"
          >
            {/* City Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-charcoal-300 dark:text-charcoal-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>Destination City</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-charcoal dark:text-ivory focus:outline-none cursor-pointer"
              >
                <option value="All Cities" className="dark:bg-charcoal-700">All Global Cities</option>
                <option value="Brooklyn, New York" className="dark:bg-charcoal-700">New York (Brooklyn)</option>
                <option value="Berlin, Germany" className="dark:bg-charcoal-700">Berlin (Kreuzberg)</option>
                <option value="London, United Kingdom" className="dark:bg-charcoal-700">London (Shoreditch)</option>
                <option value="Stockholm, Sweden" className="dark:bg-charcoal-700">Stockholm (Södermalm)</option>
                <option value="San Francisco, California" className="dark:bg-charcoal-700">San Francisco (Pacific Heights)</option>
                <option value="Amsterdam, Netherlands" className="dark:bg-charcoal-700">Amsterdam (Jordaan)</option>
              </select>
            </div>

            {/* Room Type Selector */}
            <div className="space-y-1 sm:border-l sm:border-ivory-300/80 sm:dark:border-charcoal-400 sm:pl-4">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-charcoal-300 dark:text-charcoal-200 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sage" />
                <span>Space Configuration</span>
              </label>
              <select
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-charcoal dark:text-ivory focus:outline-none cursor-pointer"
              >
                <option value="All Types" className="dark:bg-charcoal-700">All Room Types</option>
                <option value="Private Room" className="dark:bg-charcoal-700">Private Room</option>
                <option value="Master Suite" className="dark:bg-charcoal-700">Master Suite (En-Suite Bath)</option>
              </select>
            </div>

            {/* Budget Slider */}
            <div className="space-y-1 lg:border-l lg:border-ivory-300/80 lg:dark:border-charcoal-400 lg:pl-4">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-charcoal-300 dark:text-charcoal-200 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-terracotta" />
                  <span>Max Monthly Budget</span>
                </label>
                <span className="text-xs font-bold text-terracotta font-mono">${budget}</span>
              </div>
              <input
                type="range"
                min="800"
                max="2500"
                step="50"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-terracotta cursor-pointer h-1.5 bg-ivory-300 dark:bg-charcoal-500 rounded-lg"
              />
            </div>

            {/* Search Button */}
            <div className="pt-2 sm:pt-0">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl bg-charcoal text-ivory dark:bg-terracotta dark:text-white font-semibold text-sm hover:bg-charcoal-600 dark:hover:bg-terracotta-dark transition-all flex items-center justify-center gap-2 shadow-soft-sm group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search Spaces</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
