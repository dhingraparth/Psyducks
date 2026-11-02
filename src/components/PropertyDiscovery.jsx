import React, { useState, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  Sparkles, 
  Compass, 
  MapPin, 
  RefreshCw,
  ArrowUpDown
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function PropertyDiscovery({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onOpenFloorPlan,
  initialFilters = {}
}) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.city || '');
  const [selectedRoomType, setSelectedRoomType] = useState(initialFilters.roomType || 'All');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 2500);
  const [selectedLifestyleTags, setSelectedLifestyleTags] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const ALL_LIFESTYLE_TAGS = [
    "Remote Work Friendly",
    "Early Risers",
    "Plant Lovers",
    "Pet-Friendly",
    "LGBTQ+ Friendly",
    "Non-Smoking",
    "Quiet Evenings",
    "Creative Community"
  ];

  const handleToggleTag = (tag) => {
    soundEngine.playClick();
    if (selectedLifestyleTags.includes(tag)) {
      setSelectedLifestyleTags(selectedLifestyleTags.filter(t => t !== tag));
    } else {
      setSelectedLifestyleTags([...selectedLifestyleTags, tag]);
    }
  };

  const clearAllFilters = () => {
    soundEngine.playClick();
    setSearchTerm('');
    setSelectedRoomType('All');
    setMaxPrice(2500);
    setSelectedLifestyleTags([]);
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesCity = prop.city.toLowerCase().includes(query);
        const matchesNeigh = prop.neighborhood.toLowerCase().includes(query);
        const matchesTitle = prop.title.toLowerCase().includes(query);
        if (!matchesCity && !matchesNeigh && !matchesTitle) return false;
      }

      if (selectedRoomType !== 'All' && prop.roomType !== selectedRoomType) {
        return false;
      }

      if (prop.pricePerMonth > maxPrice) {
        return false;
      }

      if (selectedLifestyleTags.length > 0) {
        const hasTag = selectedLifestyleTags.some(tag => 
          prop.lifestyleTags.some(pt => pt.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerMonth - b.pricePerMonth;
      if (sortBy === 'price-desc') return b.pricePerMonth - a.pricePerMonth;
      if (sortBy === 'compatibility') return b.compatibilityScore - a.compatibilityScore;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, searchTerm, selectedRoomType, maxPrice, selectedLifestyleTags, sortBy]);

  const activeFiltersCount = 
    (searchTerm ? 1 : 0) + 
    (selectedRoomType !== 'All' ? 1 : 0) + 
    (maxPrice < 2500 ? 1 : 0) + 
    selectedLifestyleTags.length;

  return (
    <section id="discovery" className="py-16 md:py-24 bg-ivory-100 dark:bg-charcoal-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-ivory-300 dark:border-charcoal-500">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage dark:text-sage-light mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Shared Residences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
              Discover Architecturally Considered Homes
            </h2>
            <p className="text-sm text-charcoal-300 dark:text-charcoal-200 mt-2 max-w-xl">
              Every home is acoustically rated and paired with vetted, compatible housemates sharing your daily rhythm.
            </p>
          </div>

          {/* Quick Counter & Sort */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-charcoal-300 dark:text-charcoal-200">
              Showing <span className="font-bold text-charcoal dark:text-ivory">{filteredProperties.length}</span> of {properties.length} homes
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  soundEngine.playClick();
                  setSortBy(e.target.value);
                }}
                className="text-xs font-semibold py-2 pl-3 pr-8 rounded-full border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-700 text-charcoal dark:text-ivory cursor-pointer focus:outline-none shadow-soft-sm"
              >
                <option value="featured">Featured First</option>
                <option value="compatibility">Highest Match Score</option>
                <option value="price-asc">Rent: Low to High</option>
                <option value="price-desc">Rent: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar Controls */}
        <div className="bg-white/90 dark:bg-charcoal-700/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 mb-8 shadow-soft-sm border border-ivory-300 dark:border-charcoal-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-charcoal-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search city, neighborhood, or keywords (e.g. Brooklyn, Jordaan)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs font-medium py-2.5 pl-10 pr-4 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-ivory-50 dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-300 hover:text-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Room Type Pills */}
            <div className="md:col-span-4 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {['All', 'Private Room', 'Master Suite'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedRoomType(type);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedRoomType === type
                      ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-sm'
                      : 'bg-ivory-200 dark:bg-charcoal-600 text-charcoal-400 dark:text-charcoal-200 hover:bg-ivory-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Price Slider Quick View */}
            <div className="md:col-span-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-[11px] font-mono text-charcoal-300 dark:text-charcoal-200 mb-1">
                  <span>Max Budget</span>
                  <span className="font-bold text-terracotta">${maxPrice}/mo</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer h-1.5 bg-ivory-300 dark:bg-charcoal-500 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Tags Row */}
          <div className="mt-4 pt-3 border-t border-ivory-200 dark:border-charcoal-600 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-300 dark:text-charcoal-200 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-terracotta" />
              <span>Lifestyle Filters:</span>
            </span>
            {ALL_LIFESTYLE_TAGS.map((tag) => {
              const active = selectedLifestyleTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleToggleTag(tag)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    active
                      ? 'bg-terracotta/15 border-terracotta text-terracotta font-semibold'
                      : 'bg-ivory-100 dark:bg-charcoal-600 border-ivory-300 dark:border-charcoal-500 text-charcoal-400 dark:text-charcoal-200 hover:border-charcoal-300'
                  }`}
                >
                  {tag}
                </button>
              );
            })}

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-terracotta hover:underline font-semibold ml-auto flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset All ({activeFiltersCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Property Editorial Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
                onOpenFloorPlan={onOpenFloorPlan}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center glass-card rounded-3xl p-8 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta mx-auto flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-charcoal dark:text-ivory">
              No shared residences matched your criteria
            </h3>
            <p className="text-sm text-charcoal-300 dark:text-charcoal-200">
              Try adjusting your max budget slider, clearing lifestyle tags, or searching for a different city.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-semibold hover:bg-charcoal-600 transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear All Active Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
