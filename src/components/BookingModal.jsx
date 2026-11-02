import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import SmartImage from './SmartImage';
import { soundEngine } from '../utils/audio';

export default function BookingModal({
  isOpen,
  onClose,
  property,
  onBookingComplete,
  onOpenMessages
}) {
  const [step, setStep] = useState(1);
  const [tourType, setTourType] = useState('video_walkthrough');
  const [selectedDate, setSelectedDate] = useState('2026-11-12');
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [leaseTerm, setLeaseTerm] = useState('11_months');

  const [applicant, setApplicant] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@designstudio.in",
    phone: "+91 98765 43210",
    occupation: "Senior Product Designer",
    moveInDate: "2026-12-01",
    bio: "Hi Ananya and housemates! I'm an early riser working in product design. I love clean kitchen counters, quiet weekday reading, and respectful shared living. Really loved your space layout."
  });

  if (!isOpen || !property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playSuccess();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E07A5F', '#3D5A50', '#F1EEE7', '#BA9873']
      });
    } catch {
      // Fallback
    }

    setStep(4);

    if (onBookingComplete) {
      onBookingComplete({
        id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyId: property.id,
        propertyTitle: property.title,
        location: `${property.neighborhood}, ${property.city}`,
        roomType: property.roomType,
        monthlyRent: property.pricePerMonth,
        appliedDate: new Date().toISOString().split('T')[0],
        tourDate: `${selectedDate} at ${selectedTime}`,
        tourType: tourType === 'video_walkthrough' ? 'Guided Video Walkthrough' : 'In-Person Walkthrough',
        status: 'Viewing Confirmed',
        statusBadge: 'Confirmed',
        statusColor: 'emerald',
        primaryFlatmate: property.flatmates[0]?.name || "Lead Resident",
        flatmateAvatar: property.flatmates[0]?.avatar || ""
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-xl overflow-hidden border border-ivory-300 dark:border-charcoal-400 p-6 sm:p-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-ivory-300 dark:border-charcoal-400">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-ivory-200 dark:bg-charcoal-600 shrink-0">
              <SmartImage
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-terracotta">
                  Viewing & Application
                </span>
                <span className="text-xs text-charcoal-300 dark:text-charcoal-200">•</span>
                <span className="text-xs font-bold text-charcoal dark:text-ivory">₹{property.pricePerMonth.toLocaleString('en-IN')}/mo</span>
              </div>
              <h3 className="font-bold text-sm text-charcoal dark:text-ivory truncate max-w-xs sm:max-w-md">
                {property.title}
              </h3>
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
        {step < 4 && (
          <div className="flex items-center justify-between py-4 text-xs font-mono border-b border-ivory-200 dark:border-charcoal-600 mb-6">
            <span className={`font-semibold ${step >= 1 ? 'text-terracotta' : 'text-charcoal-300'}`}>
              1. Tour Schedule
            </span>
            <span className="text-charcoal-300">→</span>
            <span className={`font-semibold ${step >= 2 ? 'text-terracotta' : 'text-charcoal-300'}`}>
              2. Applicant Bio
            </span>
            <span className="text-charcoal-300">→</span>
            <span className={`font-semibold ${step >= 3 ? 'text-terracotta' : 'text-charcoal-300'}`}>
              3. Review & Submit
            </span>
          </div>
        )}

        {/* Step 1: Tour Type, Date & Time */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h4 className="font-bold text-base text-charcoal dark:text-ivory">
                Choose Your Preferred Viewing Experience
              </h4>
              <p className="text-xs text-charcoal-300 dark:text-charcoal-100 mt-1">
                Meet current housemates in {property.neighborhood} and inspect acoustic tranquility.
              </p>
            </div>

            {/* Tour Type Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setTourType('video_walkthrough');
                }}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  tourType === 'video_walkthrough'
                    ? 'bg-terracotta/10 border-terracotta shadow-sm ring-1 ring-terracotta'
                    : 'bg-ivory-50 dark:bg-charcoal-600 border-ivory-300 dark:border-charcoal-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-terracotta" />
                  <span className="text-[10px] font-mono bg-terracotta text-white px-2 py-0.5 rounded-full font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <h5 className="font-bold text-sm text-charcoal dark:text-ivory">Live Video Walkthrough</h5>
                <p className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-1">
                  15-minute Google Meet walkthrough with Ananya & housemates.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setTourType('in_person');
                }}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  tourType === 'in_person'
                    ? 'bg-terracotta/10 border-terracotta shadow-sm ring-1 ring-terracotta'
                    : 'bg-ivory-50 dark:bg-charcoal-600 border-ivory-300 dark:border-charcoal-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-5 h-5 text-sage" />
                </div>
                <h5 className="font-bold text-sm text-charcoal dark:text-ivory">In-Person Visit</h5>
                <p className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-1">
                  Physical visit at {property.neighborhood}, meet housemates over tea.
                </p>
              </button>
            </div>

            {/* Date and Time Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-terracotta" />
                  <span>Available Date</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sage" />
                  <span>Time Slot (IST)</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none cursor-pointer"
                >
                  <option value="10:00 AM">10:00 AM (Morning Chai / Coffee)</option>
                  <option value="11:30 AM">11:30 AM (Daylight Focus)</option>
                  <option value="02:30 PM">2:30 PM (Afternoon)</option>
                  <option value="05:00 PM">5:00 PM (Sunset Hour)</option>
                  <option value="07:00 PM">7:00 PM (Evening Post-Work)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setStep(2);
                }}
                className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all flex items-center gap-2"
              >
                <span>Continue to Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Applicant Details */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h4 className="font-bold text-base text-charcoal dark:text-ivory">
                Your Shared Living Applicant Profile
              </h4>
              <p className="text-xs text-charcoal-300 dark:text-charcoal-100 mt-1">
                Current housemates review this to ensure mutual rhythm and lifestyle harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-charcoal-400 dark:text-charcoal-200">Full Name</label>
                <input
                  type="text"
                  value={applicant.name}
                  onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal-400 dark:text-charcoal-200">Email Address</label>
                <input
                  type="email"
                  value={applicant.email}
                  onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal-400 dark:text-charcoal-200">Occupation / Role</label>
                <input
                  type="text"
                  value={applicant.occupation}
                  onChange={(e) => setApplicant({ ...applicant, occupation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal-400 dark:text-charcoal-200">Target Move-In Date</label>
                <input
                  type="date"
                  value={applicant.moveInDate}
                  onChange={(e) => setApplicant({ ...applicant, moveInDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none"
                />
              </div>
            </div>

            {/* Lease Term */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Target Agreement Duration (India Standard)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '3_months', label: '3 Months' },
                  { id: '6_months', label: '6 Months' },
                  { id: '11_months', label: '11 Months (Standard)' }
                ].map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setLeaseTerm(term.id);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      leaseTerm === term.id
                        ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-sm'
                        : 'bg-ivory-200 dark:bg-charcoal-600 text-charcoal-400 dark:text-charcoal-200'
                    }`}
                  >
                    {term.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Introduction Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-200">
                Introduction Note to Future Housemates
              </label>
              <textarea
                rows={3}
                value={applicant.bio}
                onChange={(e) => setApplicant({ ...applicant, bio: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none resize-none leading-relaxed"
                placeholder="Share your hobbies, work rhythm, and cleanliness habits..."
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-ivory-300 dark:border-charcoal-400">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setStep(1);
                }}
                className="px-4 py-2 text-xs font-semibold text-charcoal-300 hover:text-charcoal flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setStep(3);
                }}
                className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all flex items-center gap-2"
              >
                <span>Review Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
            <div>
              <h4 className="font-bold text-base text-charcoal dark:text-ivory">
                Review Your Tour & Move-In Application
              </h4>
              <p className="text-xs text-charcoal-300 dark:text-charcoal-100 mt-0.5">
                Zero brokerage fee. Direct connection with verified housemates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-ivory-200 dark:border-charcoal-500">
                <span className="text-charcoal-300 dark:text-charcoal-200">Space:</span>
                <span className="font-bold text-charcoal dark:text-ivory">{property.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ivory-200 dark:border-charcoal-500">
                <span className="text-charcoal-300 dark:text-charcoal-200">Tour Format:</span>
                <span className="font-bold text-terracotta">
                  {tourType === 'video_walkthrough' ? 'Guided Video Walkthrough' : 'In-Person Walkthrough'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-ivory-200 dark:border-charcoal-500">
                <span className="text-charcoal-300 dark:text-charcoal-200">Confirmed Date & Time:</span>
                <span className="font-bold text-charcoal dark:text-ivory">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ivory-200 dark:border-charcoal-500">
                <span className="text-charcoal-300 dark:text-charcoal-200">Monthly Rent:</span>
                <span className="font-bold text-charcoal dark:text-ivory">₹{property.pricePerMonth.toLocaleString('en-IN')}/mo (All inclusive)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-charcoal-300 dark:text-charcoal-200">Lead Resident Contact:</span>
                <span className="font-bold text-charcoal dark:text-ivory">{property.flatmates[0]?.name}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sage/10 text-sage dark:text-sage-light text-xs flex items-center gap-2 border border-sage/20">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>CoHaven Guarantee: 100% Aadhaar verified profiles and zero brokerage fees.</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-ivory-300 dark:border-charcoal-400">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setStep(2);
                }}
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
                <span>Confirm Viewing & Submit Application</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Celebration & Instant Chat Trigger */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-sage bg-sage/10 px-3 py-1 rounded-full">
                Viewing Reserved • REF #COH-{Math.floor(1000 + Math.random() * 9000)}
              </span>
              <h3 className="text-2xl font-bold text-charcoal dark:text-ivory font-sans mt-2">
                You're Scheduled to Meet the Housemates!
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-300 dark:text-charcoal-100 max-w-md mx-auto">
                {property.flatmates[0]?.name} has received your profile and calendar invite for <strong className="text-charcoal dark:text-ivory">{selectedDate} at {selectedTime}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 max-w-sm mx-auto flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-terracotta shrink-0">
                <SmartImage
                  src={property.flatmates[0]?.avatar}
                  alt={property.flatmates[0]?.name}
                  isAvatar={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-charcoal dark:text-ivory">
                  {property.flatmates[0]?.name}
                </div>
                <div className="text-[11px] text-terracotta">"Looking forward to meeting you!"</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                  if (onOpenMessages) onOpenMessages();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold hover:bg-charcoal-600 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Chat with {property.flatmates[0]?.name}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-ivory-300 dark:border-charcoal-400 text-xs font-semibold text-charcoal dark:text-ivory hover:bg-ivory-200 transition-all"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
