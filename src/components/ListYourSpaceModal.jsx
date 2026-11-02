import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Home, 
  Users, 
  Camera, 
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import SmartImage from './SmartImage';
import { PROPERTY_IMAGES, AVATAR_IMAGES } from '../utils/images';
import { soundEngine } from '../utils/audio';

export default function ListYourSpaceModal({
  isOpen,
  onClose,
  onAddProperty,
  onShowToast,
  isFullPage = false
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    neighborhood: "Indiranagar, 12th Main",
    city: "Bengaluru, Karnataka",
    pricePerMonth: 22000,
    deposit: 44000,
    roomType: "Private Room",
    sqft: 220,
    availableDate: "2026-12-01",
    amenities: ["1 Gbps JioFiber Wi-Fi", "Daily Cook & Maid", "In-Unit Washing Machine", "Air Conditioner", "Balcony"],
    lifestyleTags: ["Remote Work Friendly", "Plant Lovers", "Early Risers", "Non-Smoking"],
    primaryFlatmateName: "You (Host)",
    primaryFlatmateRole: "Lead Resident",
    selectedGalleryPreset: 'coh-01',
    customImageUrl: '',
    images: PROPERTY_IMAGES['coh-01']
  });

  if (!isOpen && !isFullPage) return null;

  const handleNext = () => {
    soundEngine.playClick();
    setStep(step + 1);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setStep(step - 1);
  };

  const handlePresetSelect = (presetKey) => {
    soundEngine.playClick();
    setFormData({
      ...formData,
      selectedGalleryPreset: presetKey,
      images: PROPERTY_IMAGES[presetKey] || PROPERTY_IMAGES['coh-01']
    });
  };

  const handleAddCustomImage = () => {
    if (!formData.customImageUrl.trim()) return;
    soundEngine.playClick();
    setFormData({
      ...formData,
      images: [formData.customImageUrl.trim(), ...formData.images],
      customImageUrl: ''
    });
  };

  const handlePublish = (e) => {
    e.preventDefault();
    soundEngine.playSuccess();

    const newProperty = {
      id: `coh-in-${Date.now()}`,
      title: formData.title || "The Sunlit Scandinavian Sanctuary",
      subtitle: formData.subtitle || "Architectural residence with natural teakwood & peaceful vibe",
      neighborhood: formData.neighborhood || "Indiranagar, 12th Main",
      city: formData.city,
      pricePerMonth: Number(formData.pricePerMonth),
      deposit: Number(formData.deposit),
      roomType: formData.roomType,
      sqft: Number(formData.sqft),
      totalTenants: 3,
      occupiedTenants: 2,
      availableDate: formData.availableDate,
      rating: 5.0,
      reviewsCount: 1,
      verifiedStatus: true,
      compatibilityScore: 97,
      featured: true,
      images: formData.images,
      amenities: formData.amenities,
      lifestyleTags: formData.lifestyleTags,
      utilitiesIncluded: ["Airtel/Jio Fiber", "Water", "Housekeeper", "Maintenance"],
      estimatedUtilitiesCost: 1600,
      description: "A brand new, carefully designed shared living space with generous natural light, acoustic isolation, and dedicated communal areas for tech and creative professionals.",
      flatmates: [
        {
          id: `fm-${Date.now()}`,
          name: formData.primaryFlatmateName,
          age: 29,
          role: formData.primaryFlatmateRole,
          avatar: AVATAR_IMAGES.aarav,
          bio: "Looking forward to sharing our space with someone mindful, clean, and respectful of focus hours.",
          sleepSchedule: "Balanced",
          cleanliness: "Immaculate",
          workStyle: "Hybrid",
          vibe: "Thoughtful & Warm"
        }
      ],
      houseRules: [
        { rule: "Clean Counters", desc: "Keep kitchen surfaces clean and clear after meals." },
        { rule: "Quiet Hours", desc: "11:00 PM to 7:30 AM peaceful hours." }
      ],
      neighborhoodScores: {
        transit: 95,
        walkability: 96,
        cafes: 94,
        noiseLevel: "Quiet residential lane"
      },
      rooms: [
        { id: "r1", name: "Living Commons", sqft: 340, status: "Shared", occupant: "All Flatmates", photo: formData.images[0], acoustic: "24 dB", daylight: "Balcony Facing" },
        { id: "r2", name: "Private Room", sqft: Number(formData.sqft), status: "Vacant", occupant: `Available for You (₹${Number(formData.pricePerMonth).toLocaleString('en-IN')}/mo)`, photo: formData.images[1] || formData.images[0], acoustic: "20 dB", daylight: "Morning Sun" }
      ]
    };

    onAddProperty(newProperty);
    if (onShowToast) onShowToast("Your space was successfully listed on CoHaven!");
    if (onClose) onClose();
  };

  const content = (
    <div className={`relative w-full ${isFullPage ? 'max-w-4xl mx-auto py-8 px-4 sm:px-6' : 'max-w-2xl my-auto'} bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-2xl overflow-hidden border border-ivory-300 dark:border-charcoal-500 p-6 sm:p-8`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-ivory-300 dark:border-charcoal-500">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg sm:text-xl text-charcoal dark:text-ivory font-sans">
              List Your Co-Living Space on CoHaven
            </h3>
            <p className="text-xs text-charcoal-300 dark:text-charcoal-200">
              Connect with Aadhaar-verified, compatible housemates across India
            </p>
          </div>
        </div>

        {!isFullPage && onClose && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-ivory-200 dark:bg-charcoal-600 text-charcoal dark:text-ivory hover:bg-ivory-300 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between py-4 text-xs font-mono border-b border-ivory-200 dark:border-charcoal-600 mb-6">
        <span className={`font-semibold ${step >= 1 ? 'text-terracotta' : 'text-charcoal-300'}`}>
          1. Location & Identity
        </span>
        <span>→</span>
        <span className={`font-semibold ${step >= 2 ? 'text-terracotta' : 'text-charcoal-300'}`}>
          2. Rent (₹) & Amenities
        </span>
        <span>→</span>
        <span className={`font-semibold ${step >= 3 ? 'text-terracotta' : 'text-charcoal-300'}`}>
          3. Photography & Publish
        </span>
      </div>

      {/* Step 1: Location & Details */}
      {step === 1 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
              Listing Title
            </label>
            <input
              type="text"
              placeholder="e.g. The Sunlit Indiranagar Loft & Terrace"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
              One-Sentence Subtitle / Character
            </label>
            <input
              type="text"
              placeholder="e.g. Minimalist flat with high ceilings, teak furnishings and quiet balcony"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                City
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none cursor-pointer"
              >
                <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                <option value="New Delhi, Delhi NCR">New Delhi, Delhi NCR</option>
                <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                <option value="Pune, Maharashtra">Pune, Maharashtra</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Neighborhood / Area
              </label>
              <input
                type="text"
                placeholder="e.g. Indiranagar, Koramangala, Bandra..."
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all flex items-center gap-1.5 shadow-soft-sm"
            >
              <span>Continue to Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Specs & Pricing */}
      {step === 2 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Monthly Rent (₹ INR)
              </label>
              <input
                type="number"
                value={formData.pricePerMonth}
                onChange={(e) => setFormData({ ...formData, pricePerMonth: e.target.value, deposit: Number(e.target.value) * 2 })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Security Deposit (₹ INR)
              </label>
              <input
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Room Configuration
              </label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none cursor-pointer"
              >
                <option value="Private Room">Private Bedroom (Shared Bath)</option>
                <option value="Master Suite">Master Suite (Attached En-Suite)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Private Room Size (sq ft)
              </label>
              <input
                type="number"
                value={formData.sqft}
                onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-full border border-ivory-300 dark:border-charcoal-500 text-xs font-semibold text-charcoal dark:text-ivory flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all flex items-center gap-1.5 shadow-soft-sm"
            >
              <span>Continue to Photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Photos & Publish */}
      {step === 3 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <label className="block text-xs font-semibold text-charcoal-400 dark:text-charcoal-200 mb-2">
              Select Architectural Style Gallery:
            </label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['coh-01', 'coh-02', 'coh-03', 'coh-05'].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePresetSelect(key)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 relative transition-all ${
                    formData.selectedGalleryPreset === key ? 'border-terracotta shadow-md scale-102 ring-2 ring-terracotta/30' : 'border-transparent opacity-75'
                  }`}
                >
                  <SmartImage src={PROPERTY_IMAGES[key][0]} alt="Preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Custom Image URL Option */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or paste an image URL (e.g. Unsplash / Pexels)..."
                value={formData.customImageUrl}
                onChange={(e) => setFormData({ ...formData, customImageUrl: e.target.value })}
                className="flex-1 text-xs p-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomImage}
                className="px-4 py-2.5 rounded-xl bg-ivory-200 dark:bg-charcoal-600 text-xs font-semibold text-charcoal dark:text-ivory hover:bg-ivory-300"
              >
                Add Photo
              </button>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-ivory-300 dark:border-charcoal-500 flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-ivory-200 shrink-0">
              <SmartImage src={formData.images[0]} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-terracotta uppercase font-bold">Live Preview</span>
              <h4 className="font-bold text-sm text-charcoal dark:text-ivory">{formData.title || "The Sunlit Scandinavian Sanctuary"}</h4>
              <p className="text-xs text-charcoal-300">{formData.neighborhood}, {formData.city}</p>
              <span className="text-xs font-bold text-terracotta font-mono">₹{Number(formData.pricePerMonth).toLocaleString('en-IN')}/month</span>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-full border border-ivory-300 dark:border-charcoal-500 text-xs font-semibold text-charcoal dark:text-ivory flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handlePublish}
              className="px-7 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold transition-all flex items-center gap-2 shadow-soft-md"
            >
              <span>Publish Space to CoHaven</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );

  if (isFullPage) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-ivory-100 dark:bg-charcoal-800">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {content}
    </div>
  );
}
