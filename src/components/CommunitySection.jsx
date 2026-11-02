import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  VolumeX, 
  Users, 
  DollarSign, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { COMMUNITY_BLUEPRINTS } from '../data/mockData';
import { soundEngine } from '../utils/audio';

export default function CommunitySection({
  onOpenQuiz
}) {
  const [activeTab, setActiveTab] = useState(COMMUNITY_BLUEPRINTS[0].id);

  const currentBlueprint = COMMUNITY_BLUEPRINTS.find(b => b.id === activeTab) || COMMUNITY_BLUEPRINTS[0];

  return (
    <section id="community" className="py-20 md:py-28 bg-ivory dark:bg-charcoal-700 bg-tactile border-t border-ivory-300 dark:border-charcoal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage dark:text-sage-light">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Shared Living Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
            Clear Agreements. Frictionless Daily Harmony.
          </h2>
          <p className="text-sm sm:text-base text-charcoal-300 dark:text-charcoal-100">
            Great roommate relationships aren't accidental. Every CoHaven resident signs our community blueprint, replacing ambiguity and passive-aggression with explicit, shared dignity.
          </p>
        </div>

        {/* Blueprint Interactive Tab Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Selection */}
          <div className="lg:col-span-4 space-y-2">
            {COMMUNITY_BLUEPRINTS.map((bp) => {
              const active = activeTab === bp.id;
              return (
                <button
                  key={bp.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(bp.id);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between group ${
                    active
                      ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white border-charcoal dark:border-terracotta shadow-soft-md'
                      : 'bg-white/70 dark:bg-charcoal-600/70 border-ivory-300 dark:border-charcoal-500 hover:border-charcoal-300'
                  }`}
                >
                  <div>
                    <h3 className={`font-bold text-sm sm:text-base ${active ? 'text-ivory dark:text-white' : 'text-charcoal dark:text-ivory group-hover:text-terracotta'}`}>
                      {bp.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-1 ${active ? 'text-ivory-200 dark:text-ivory-100' : 'text-charcoal-300 dark:text-charcoal-200'}`}>
                      {bp.summary}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${active ? 'translate-x-1 text-terracotta dark:text-white' : 'text-charcoal-300 opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>

          {/* Tab Detail Blueprint View */}
          <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-3xl border border-ivory-300 dark:border-charcoal-500 shadow-soft-lg space-y-6">
            <div className="border-b border-ivory-300 dark:border-charcoal-400 pb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-terracotta">
                Protocol Guideline
              </span>
              <h3 className="text-2xl font-bold text-charcoal dark:text-ivory font-sans mt-1">
                {currentBlueprint.title}
              </h3>
              <p className="text-sm text-charcoal-300 dark:text-charcoal-100 mt-1">
                {currentBlueprint.summary}
              </p>
            </div>

            {/* Core Points */}
            <div className="space-y-4">
              {currentBlueprint.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-600/60 border border-ivory-300 dark:border-charcoal-500"
                >
                  <div className="w-6 h-6 rounded-full bg-sage/15 text-sage flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal dark:text-ivory leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom pledge prompt */}
            <div className="pt-4 border-t border-ivory-300 dark:border-charcoal-400 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-charcoal-300 dark:text-charcoal-200">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Signed digitally during move-in onboarding.</span>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenQuiz();
                }}
                className="px-5 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-semibold hover:bg-charcoal-600 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-terracotta dark:text-white" />
                <span>Test Your Harmony (Take Quiz)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
