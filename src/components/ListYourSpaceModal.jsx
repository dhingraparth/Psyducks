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
  ShieldCheck 
} from 'lucide-react';
import SmartImage from './SmartImage';
import { 
  SVG_LIVING_COMMONS, 
  SVG_MASTER_SUITE, 
  SVG_CHEF_KITCHEN, 
  SVG_ROOFTOP_TERRACE, 
  SVG_AVATAR_AARAV 
} from '../utils/svgImages';
import { soundEngine } from '../utils/audio';

export default function ListYourSpaceModal({
  isOpen,
  onClose,
  onAddProperty,
  onShowToast
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    neighborhood: "",
    city: "Bengaluru, Karnataka",
    pricePerMonth: 22000,
    deposit: 44000,
    roomType: "Private Room",
    sqft: 210,
    availableDate: "2026-12-01",
    amenities: ["1 Gbps JioFiber Wi-Fi", "Daily Cook & Maid", "In-Unit Washing Machine", "Air Conditioner"],
    lifestyleTags: ["Remote Work Friendly", "Plant Lovers", "Early Risers", "Non-Smoking"],
    primaryFlatmateName: "You (Host)",
    primaryFlatmateRole: "Product Designer",
    images: [
      SVG_LIVING_COMMONS,
      SVG_MASTER_SUITE,
      SVG_CHEF_KITCHEN
    ]
  });

  if (!isOpen) return null;

  const handleNext = () => {
    soundEngine.playClick();
    setStep(step + 1);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setStep(step - 1);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    soundEngine.playSuccess();

    const newProperty = {
      id: `coh-in-${Date.now()}`,
      title: formData.title || "The Sunlit Scandinavian Sanctuary",
      subtitle: formData.subtitle || "Architectural residence with natural teakwood & peaceful vibe",
      neighborhood: formData.neighborhood || "Koramangala 4th Block",
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
          avatar: SVG_AVATAR_AARAV,
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
        { id: "r1", name: "Living Commons", sqft: 340, status: "Shared", occupant: "All Flatmates", photo: SVG_LIVING_COMMONS, acoustic: "24 dB", daylight: "Balcony Facing" },
        { id: "r2", name: "Private Room", sqft: Number(formData.sqft), status: "Vacant", occupant: `Available for You (₹${Number(formData.pricePerMonth).toLocaleString('en-IN')}/mo)`, photo: SVG_MASTER_SUITE, acoustic: "20 dB", daylight: "Morning Sun" }
      ]
    };

    onAddProperty(newProperty);
    if (onShowToast) onShowToast("Your space was successfully published to CoHaven India!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-xl overflow-hidden border border-ivory-300 dark:border-charcoal-400 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-ivory-300 dark:border-charcoal-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-charcoal dark:text-ivory font-sans">
                List Your Space on CoHaven (India)
              </h3>
              <p className="text-[11px] text-charcoal-300 dark:text-charcoal-200">
                Connect with Aadhaar-verified and compatible housemates
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-ivory-200 dark:bg-charcoal-600 text-charcoal dark:text-ivory hover:bg-ivory-300 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between py-4 text-xs font-mono border-b border-ivory-200 dark:border-charcoal-600 mb-6">
          <span className={`font-semibold ${step >= 1 ? 'text-terracotta' : 'text-charcoal-300'}`}>
            1. Property & City
          </span>
          <span>→</span>
          <span className={`font-semibold ${step >= 2 ? 'text-terracotta' : 'text-charcoal-300'}`}>
            2. Specs & Rent (₹)
          </span>
          <span>→</span>
          <span className={`font-semibold ${step >= 3 ? 'text-terracotta' : 'text-charcoal-300'}`}>
            3. Photos & Publish
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <option value="Goa (Assagao / Anjuna)">Goa (Assagao / Anjuna)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                  Neighborhood
                </label>
                <input
                  type="text"
                  placeholder="e.g. Indiranagar, Koramangala, Bandra West, Pali Hill"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all flex items-center gap-2"
              >
                <span>Continue to Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Specs & Pricing (INR) */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                  Room Configuration
                </label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none cursor-pointer"
                >
                  <option value="Private Room">Private Room (Shared Washroom)</option>
                  <option value="Master Suite">Master Suite (Attached Washroom)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                  Room Area (Sq Ft)
                </label>
                <input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: Number(e.target.value) })}
                  className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                  Monthly Rent (₹ INR)
                </label>
                <input
                  type="number"
                  value={formData.pricePerMonth}
                  onChange={(e) => setFormData({ ...formData, pricePerMonth: Number(e.target.value) })}
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
                  onChange={(e) => setFormData({ ...formData, deposit: Number(e.target.value) })}
                  className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Earliest Available Move-in Date
              </label>
              <input
                type="date"
                value={formData.availableDate}
                onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-ivory-300 dark:border-charcoal-400">
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-semibold text-charcoal-300 hover:text-charcoal flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all flex items-center gap-2"
              >
                <span>Continue to Photos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Photos & Final Publish */}
        {step === 3 && (
          <form onSubmit={handlePublish} className="space-y-5 animate-fadeIn">
            <div>
              <h4 className="font-bold text-sm text-charcoal dark:text-ivory">
                Curated Architectural Photography Preview
              </h4>
              <p className="text-xs text-charcoal-300 dark:text-charcoal-100 mt-0.5">
                Guaranteed high-resolution rendering with warm architectural illustrations.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {formData.images.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-ivory-300 dark:border-charcoal-500 bg-ivory-200 dark:bg-charcoal-600">
                  <SmartImage src={img} alt={`Space ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 text-xs space-y-1">
              <div className="font-bold text-charcoal dark:text-ivory">Ready to Publish:</div>
              <div className="text-charcoal-300 dark:text-charcoal-200">
                {formData.title || "The Sunlit Scandinavian Sanctuary"} • ₹{Number(formData.pricePerMonth).toLocaleString('en-IN')}/mo • {formData.city}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-ivory-300 dark:border-charcoal-400">
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-semibold text-charcoal-300 hover:text-charcoal flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold transition-all shadow-glow-terracotta flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Space to CoHaven India</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
