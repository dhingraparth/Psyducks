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
  ArrowUpDown,
  LayoutGrid,
  List,
  ShieldCheck,
  Check
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
  const [selectedCity, setSelectedCity] = useState(initialFilters.city || 'All');
  const [selectedRoomType, setSelectedRoomType] = useState(initialFilters.roomType || 'All');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 50000);
  const [selectedLifestyleTags, setSelectedLifestyleTags] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const CITIES = ['All', 'Bengaluru', 'Mumbai', 'New Delhi', 'Hyderabad', 'Pune'];

  const ALL_LIFESTYLE_TAGS = [
    "Remote Work Friendly",
    "Early Risers",
    "Plant Lovers",
    "Dog Friendly",
    "Cat Friendly",
    "LGBTQ+ Friendly",
    "Non-Smoking",
    "Quiet Evenings",
    "Creative Community",
    "Cooks Together"
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
    setSelectedCity('All');
    setSelectedRoomType('All');
    setMaxPrice(50000);
    setSelectedLifestyleTags([]);
    setSortBy('featured');
  };

  // Filter & Sort Logic (100% INR aware)
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Text Search Query
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesCity = prop.city.toLowerCase().includes(query);
        const matchesNeigh = prop.neighborhood.toLowerCase().includes(query);
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesSubtitle = prop.subtitle?.toLowerCase().includes(query);
        if (!matchesCity && !matchesNeigh && !matchesTitle && !matchesSubtitle) return false;
      }

      // 2. City Pill Filter
      if (selectedCity !== 'All') {
        if (!prop.city.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      // 3. Room Type Filter
      if (selectedRoomType !== 'All' && prop.roomType !== selectedRoomType) {
        return false;
      }

      // 4. Max Monthly Rent Filter (INR)
      if (prop.pricePerMonth > maxPrice) {
        return false;
      }

      // 5. Lifestyle Tags Filter
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
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, searchTerm, selectedCity, selectedRoomType, maxPrice, selectedLifestyleTags, sortBy]);

  const activeFiltersCount = 
    (searchTerm ? 1 : 0) + 
    (selectedCity !== 'All' ? 1 : 0) + 
    (selectedRoomType !== 'All' ? 1 : 0) + 
    (maxPrice < 50000 ? 1 : 0) + 
    selectedLifestyleTags.length;

  return (
    <section id="discovery" className="py-12 md:py-20 bg-ivory-100 dark:bg-charcoal-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-ivory-300 dark:border-charcoal-600">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Indian Hubs • 100% Verified</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
              Discover Architecturally Considered Spaces
            </h2>
            <p className="text-sm text-charcoal-300 dark:text-charcoal-200 mt-1 max-w-xl">
              Every home is verified with acoustic isolation metrics, vetted flatmates, and clear all-inclusive rent splits.
            </p>
          </div>

          {/* Quick Counter, View Switch & Sort */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-ivory-200 dark:bg-charcoal-700 border border-ivory-300 dark:border-charcoal-600">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('grid');
                }}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory shadow-xs'
                    : 'text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('list');
                }}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory shadow-xs'
                    : 'text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs font-mono font-medium text-charcoal-300 dark:text-charcoal-200 hidden sm:inline">
              Showing <span className="font-bold text-charcoal dark:text-ivory">{filteredProperties.length}</span> of {properties.length}
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
                <option value="compatibility">Highest Harmony Match</option>
                <option value="rating">Top Rated (4.9+)</option>
                <option value="price-asc">Rent: Low to High</option>
                <option value="price-desc">Rent: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-4">
          <span className="text-xs font-bold text-charcoal-400 dark:text-charcoal-200 mr-1 flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            <span>Hub:</span>
          </span>
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCity(city);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCity === city
                  ? 'bg-terracotta text-white shadow-soft-sm'
                  : 'bg-white dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-200 border border-ivory-300 dark:border-charcoal-600 hover:border-terracotta'
              }`}
            >
              {city === 'All' ? 'All Indian Hubs' : city}
            </button>
          ))}
        </div>

        {/* Main Search & Filter Bar */}
        <div className="bg-white/90 dark:bg-charcoal-700/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 mb-8 shadow-soft-sm border border-ivory-300 dark:border-charcoal-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-charcoal-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search neighborhood (e.g. Indiranagar, Pali Hill, Hauz Khas)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs font-medium py-2.5 pl-10 pr-8 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-ivory-50 dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none focus:ring-1 focus:ring-terracotta"
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
            <div className="md:col-span-4 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
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

            {/* Price Slider in INR */}
            <div className="md:col-span-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-[11px] font-mono text-charcoal-300 dark:text-charcoal-200 mb-1">
                  <span>Max Budget:</span>
                  <span className="font-bold text-terracotta">₹{maxPrice.toLocaleString('en-IN')}/mo</span>
                </div>
                <input
                  type="range"
                  min="12000"
                  max="50000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer h-1.5 bg-ivory-300 dark:bg-charcoal-500 rounded-lg"
                />
              </div>

              {/* Drawer Toggle */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowFilterDrawer(!showFilterDrawer);
                }}
                className={`p-2.5 rounded-xl border transition-all relative ${
                  showFilterDrawer || activeFiltersCount > 0
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-ivory-300 dark:border-charcoal-500 text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal'
                }`}
                title="Toggle More Filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Collapsible Lifestyle Tag Filter Bar */}
          {showFilterDrawer && (
            <div className="mt-4 pt-4 border-t border-ivory-200 dark:border-charcoal-600 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-200">
                  Filter by Housemate Lifestyle & Vibe:
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-terracotta hover:underline font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset All Filters</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {ALL_LIFESTYLE_TAGS.map((tag) => {
                  const active = selectedLifestyleTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-2xs'
                          : 'bg-ivory-100 dark:bg-charcoal-600 text-charcoal-400 dark:text-charcoal-200 border border-ivory-300 dark:border-charcoal-500 hover:border-terracotta'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Results Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              : 'space-y-6 max-w-4xl mx-auto'
          }>
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
          <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-charcoal-700 border border-ivory-300 dark:border-charcoal-500 max-w-lg mx-auto space-y-4 shadow-soft-sm">
            <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-ivory">
              No spaces match your current filters
            </h3>
            <p className="text-xs text-charcoal-300 dark:text-charcoal-200">
              Try adjusting your maximum monthly budget or relaxing lifestyle tag criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all shadow-soft-sm inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
