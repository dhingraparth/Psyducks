import React, { useState } from 'react';
import { 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Users, 
  LayoutGrid, 
  ArrowUpRight 
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onOpenFloorPlan
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    soundEngine.playHover();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    soundEngine.playHover();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  return (
    <div
      onClick={() => {
        soundEngine.playClick();
        onSelectProperty(property);
      }}
      className="group relative rounded-3xl overflow-hidden glass-card hover:shadow-soft-xl transition-all duration-300 border border-ivory-300 dark:border-charcoal-500 cursor-pointer flex flex-col h-full bg-white dark:bg-charcoal-700"
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-700">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Carousel Navigation Arrows */}
        {property.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-charcoal/70 text-white hover:bg-charcoal transition-all backdrop-blur-md"
              title="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-charcoal/70 text-white hover:bg-charcoal transition-all backdrop-blur-md"
              title="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {property.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {/* Match Score Badge */}
          <div className="glass-pill px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-charcoal dark:text-ivory shadow-sm">
            <Sparkles className="w-3 h-3 text-terracotta" />
            <span>{property.compatibilityScore}% Match</span>
          </div>

          {/* Top Actions: Floor Plan Quick Link & Favorite Heart */}
          <div className="flex items-center gap-1.5">
            {onOpenFloorPlan && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playClick();
                  onOpenFloorPlan();
                }}
                className="p-2 rounded-full glass-pill text-charcoal hover:text-amber-600 dark:text-ivory transition-transform hover:scale-105"
                title="Inspect Floor Plan Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
              </button>
            )}

            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full glass-pill transition-all ${
                isFavorite
                  ? 'text-terracotta fill-terracotta scale-110'
                  : 'text-charcoal hover:text-terracotta dark:text-ivory'
              }`}
              title={isFavorite ? "Remove from favorites" : "Save to favorites"}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-terracotta text-terracotta' : ''}`} />
            </button>
          </div>
        </div>

        {/* Room Type Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/50 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider font-mono">
            {property.roomType} • {property.sqft} sq ft
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location & Title */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal-300 dark:text-charcoal-200 mb-1">
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            <span>{property.neighborhood}, {property.city}</span>
          </div>
          <h3 className="font-bold text-base text-charcoal dark:text-ivory group-hover:text-terracotta transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-charcoal-300 dark:text-charcoal-100 line-clamp-2 mt-1 leading-relaxed">
            {property.subtitle}
          </p>

          {/* Lifestyle Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.lifestyleTags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-ivory-200/80 dark:bg-charcoal-600 text-charcoal-400 dark:text-charcoal-100 border border-ivory-300/60 dark:border-charcoal-500/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Flatmate Avatars & Pricing Breakdown */}
        <div className="pt-3 border-t border-ivory-200 dark:border-charcoal-500/50 flex items-center justify-between">
          {/* Flatmates */}
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden">
              {property.flatmates.map((fm) => (
                <img
                  key={fm.id}
                  src={fm.avatar}
                  alt={fm.name}
                  title={`${fm.name} (${fm.role})`}
                  className="inline-block w-7 h-7 rounded-full ring-2 ring-ivory dark:ring-charcoal-600 object-cover"
                />
              ))}
            </div>
            <span className="text-[11px] text-charcoal-300 dark:text-charcoal-200 ml-2">
              {property.occupiedTenants}/{property.totalTenants} living
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-base font-bold text-charcoal dark:text-ivory font-mono">
              ${property.pricePerMonth}
              <span className="text-xs font-normal text-charcoal-300 dark:text-charcoal-200">/mo</span>
            </div>
            <div className="text-[10px] text-sage font-medium">All utilities inc.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
