import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Box, 
  Calendar, 
  Clock, 
  Coffee, 
  Compass, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function PropertyDetailModal({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onBookTour,
  onEnterSimulation
}) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-xl overflow-hidden border border-ivory-300 dark:border-charcoal-400 my-auto">
        {/* Top Floating Close & Actions */}
        <div className="sticky top-0 z-30 flex items-center justify-between p-4 glass-nav border-b border-ivory-300 dark:border-charcoal-400">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-terracotta/10 text-terracotta border border-terracotta/20">
              {property.compatibilityScore}% Compatibility Match
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-charcoal-300 dark:text-charcoal-200">
              <MapPin className="w-3.5 h-3.5 text-terracotta" />
              <span>{property.neighborhood}, {property.city}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playPortalEnter();
                onEnterSimulation();
              }}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-terracotta to-terracotta-dark text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:brightness-105"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Walkthrough in 3D</span>
            </button>

            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-full border border-ivory-300 dark:border-charcoal-400 transition-all ${
                isFavorite ? 'text-terracotta fill-terracotta bg-terracotta/10' : 'text-charcoal dark:text-ivory'
              }`}
              title="Save favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-terracotta' : ''}`} />
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-ivory-200 dark:bg-charcoal-600 text-charcoal dark:text-ivory hover:bg-ivory-300 transition-all"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-10 max-h-[85vh] overflow-y-auto">
          {/* Header & Title */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
              {property.title}
            </h1>
            <p className="text-base text-charcoal-300 dark:text-charcoal-100 mt-2">
              {property.subtitle}
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Main large image */}
            <div className="md:col-span-2 aspect-[16/10] rounded-2xl overflow-hidden shadow-soft-sm relative">
              <img
                src={property.images[selectedPhotoIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
                Photo {selectedPhotoIndex + 1} of {property.images.length}
              </span>
            </div>

            {/* Thumbnail list */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5">
              {property.images.slice(0, 3).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedPhotoIndex(idx);
                  }}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedPhotoIndex === idx ? 'border-terracotta shadow-md scale-[1.02]' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-ivory-200/60 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-charcoal-300 dark:text-charcoal-200 font-medium">Room Config</div>
              <div className="text-sm font-bold text-charcoal dark:text-ivory mt-0.5">{property.roomType}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-charcoal-300 dark:text-charcoal-200 font-medium">Living Space</div>
              <div className="text-sm font-bold text-charcoal dark:text-ivory mt-0.5">{property.sqft} sq ft private</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-charcoal-300 dark:text-charcoal-200 font-medium">Move-In Date</div>
              <div className="text-sm font-bold text-charcoal dark:text-ivory mt-0.5">{property.availableDate}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-charcoal-300 dark:text-charcoal-200 font-medium">Current Cohort</div>
              <div className="text-sm font-bold text-charcoal dark:text-ivory mt-0.5">
                {property.occupiedTenants} of {property.totalTenants} Residents
              </div>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-charcoal dark:text-ivory flex items-center gap-2">
              <Compass className="w-4 h-4 text-terracotta" />
              <span>Architectural Character & Living Flow</span>
            </h2>
            <p className="text-sm text-charcoal-400 dark:text-charcoal-100 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Flatmate Profiles (Crucial Shared Living Feature) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal dark:text-ivory flex items-center gap-2">
                <Users className="w-4 h-4 text-sage" />
                <span>Meet Your Future Housemates</span>
              </h2>
              <span className="text-xs text-charcoal-300 dark:text-charcoal-200">
                100% Background & Rhythm Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.flatmates.map((fm) => (
                <div
                  key={fm.id}
                  className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={fm.avatar}
                      alt={fm.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-terracotta/50"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-charcoal dark:text-ivory flex items-center gap-1.5">
                        <span>{fm.name}, {fm.age}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage fill-sage/20" />
                      </h4>
                      <p className="text-xs text-terracotta font-medium">{fm.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-charcoal-400 dark:text-charcoal-100 italic leading-relaxed">
                    "{fm.bio}"
                  </p>

                  <div className="pt-2 border-t border-ivory-200 dark:border-charcoal-500/60 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">Rhythm</span>
                      <span className="font-semibold text-charcoal dark:text-ivory">{fm.sleepSchedule}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">Cleanliness</span>
                      <span className="font-semibold text-charcoal dark:text-ivory">{fm.cleanliness}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included Amenities & Living Utilities */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-charcoal dark:text-ivory flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span>Curated Amenities & Perks</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 text-xs font-medium text-charcoal dark:text-ivory"
                >
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules & Community Blueprint */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-charcoal dark:text-ivory">
              House Rules & Harmony Blueprint
            </h2>
            <div className="space-y-2.5">
              {property.houseRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-ivory-200/50 dark:bg-charcoal-600/70 border border-ivory-300 dark:border-charcoal-500 flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-terracotta mt-1.5 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-xs text-charcoal dark:text-ivory">{rule.rule}</h5>
                    <p className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-0.5">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood & Walkability Radar */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-charcoal dark:text-ivory">
              Neighborhood & Accessibility
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-ivory-200/60 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 text-center">
              <div>
                <div className="text-2xl font-bold text-charcoal dark:text-ivory font-mono">{property.neighborhoodScores.transit}</div>
                <div className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-1">Transit Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-charcoal dark:text-ivory font-mono">{property.neighborhoodScores.walkability}</div>
                <div className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-1">Walkability Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-charcoal dark:text-ivory font-mono">{property.neighborhoodScores.cafes}</div>
                <div className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-1">Cafes & Bakeries</div>
              </div>
              <div>
                <div className="text-xs font-bold text-sage dark:text-sage-light mt-2">{property.neighborhoodScores.noiseLevel}</div>
                <div className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-1">Acoustic Rating</div>
              </div>
            </div>
          </div>

          {/* Bottom Sticky Action / Booking Banner */}
          <div className="p-6 rounded-3xl bg-charcoal text-ivory dark:bg-charcoal-600 border border-charcoal-500 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-xl">
            <div>
              <div className="text-xs uppercase tracking-wider text-ivory-300 font-mono">Monthly All-Inclusive Rent</div>
              <div className="text-3xl font-bold font-sans mt-0.5">
                ${property.pricePerMonth}
                <span className="text-sm font-normal text-ivory-300"> / month</span>
              </div>
              <p className="text-xs text-sage-light mt-1">
                Zero broker fee • Deposit: ${property.deposit} • Minimum 3-month lease
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundEngine.playPortalEnter();
                  onEnterSimulation();
                }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/15"
              >
                <Box className="w-4 h-4 text-terracotta" />
                <span>3D Walkthrough</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playSuccess();
                  onBookTour(property);
                }}
                className="flex-1 sm:flex-none px-7 py-3 rounded-2xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-terracotta"
              >
                <span>Schedule Walkthrough / Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
