import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  Calculator, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Calendar 
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function CoreFeaturesShowcase({
  onExploreHomes,
  onOpenQuiz,
  onOpenCalculator,
  onOpenDashboard
}) {
  const features = [
    {
      id: "discovery",
      num: "01",
      title: "Smart Property & Roommate Discovery",
      badge: "Feature 1",
      tagline: "Curated Scandinavian sanctuaries with vetted roommates.",
      desc: "Real-time filters by budget, room configuration, and lifestyle tags. View flatmate profiles, sleep schedules, and acoustic soundproofing ratings before applying.",
      icon: Compass,
      cta: "Explore Residences",
      action: onExploreHomes,
      accent: "from-terracotta/10 to-terracotta/5",
      badgeColor: "bg-terracotta/15 text-terracotta"
    },
    {
      id: "quiz",
      num: "02",
      title: "VibeMatch™ Compatibility Quiz",
      badge: "Feature 2",
      tagline: "Algorithmic harmony to eliminate roommate friction.",
      desc: "A 6-step interactive visual quiz evaluating circadian sleep schedules, counter cleanliness standards, work-from-home styles, and guest boundaries.",
      icon: Sparkles,
      cta: "Take Harmony Quiz",
      action: onOpenQuiz,
      accent: "from-sage/10 to-sage/5",
      badgeColor: "bg-sage/15 text-sage"
    },
    {
      id: "calculator",
      num: "03",
      title: "Smart Fair-Share Rent Calculator",
      badge: "Feature 3",
      tagline: "Mathematically fair rent & communal utility splitting.",
      desc: "Calculates equitable shares weighted by bedroom square footage, private bathrooms (+18%), and balconies (+8%), combined with an equal shared utility pool.",
      icon: Calculator,
      cta: "Calculate Fair Split",
      action: onOpenCalculator,
      accent: "from-amber-500/10 to-amber-500/5",
      badgeColor: "bg-amber-600/15 text-amber-700 dark:text-amber-400"
    },
    {
      id: "booking_chat",
      num: "04",
      title: "Tour Booking & Direct Flatmate Chat",
      badge: "Feature 4",
      tagline: "Reserve viewings & connect with housemates instantly.",
      desc: "Multi-step booking for virtual or in-person walk-throughs, accompanied by direct resident chat to ask questions and align on shared living rhythms.",
      icon: MessageSquare,
      cta: "Open Resident Hub",
      action: () => onOpenDashboard('messages'),
      accent: "from-indigo-500/10 to-indigo-500/5",
      badgeColor: "bg-indigo-600/15 text-indigo-700 dark:text-indigo-400"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-ivory-100 dark:bg-charcoal-800 border-t border-ivory-300 dark:border-charcoal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Four Core Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
            Engineered for Modern Shared Living
          </h2>
          <p className="text-sm sm:text-base text-charcoal-300 dark:text-charcoal-200">
            CoHaven solves the core friction points of shared living through four interconnected, fully functional systems.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 rounded-3xl border border-ivory-300 dark:border-charcoal-500 flex flex-col justify-between hover:shadow-soft-lg transition-all"
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-charcoal-300 dark:text-charcoal-400">
                      {feat.num}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-ivory dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 flex items-center justify-center text-charcoal dark:text-ivory shadow-soft-sm">
                    <Icon className="w-6 h-6 text-terracotta" />
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-bold text-lg text-charcoal dark:text-ivory font-sans">
                      {feat.title}
                    </h3>
                    <p className="text-xs font-medium text-terracotta mt-1">
                      {feat.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-charcoal-300 dark:text-charcoal-200 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Button Action */}
                <div className="pt-6 mt-4 border-t border-ivory-200 dark:border-charcoal-600">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      feat.action();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-charcoal text-ivory dark:bg-charcoal-600 dark:text-ivory hover:bg-terracotta dark:hover:bg-terracotta transition-all text-xs font-semibold flex items-center justify-center gap-2 group"
                  >
                    <span>{feat.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
