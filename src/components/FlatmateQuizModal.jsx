import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  RotateCcw, 
  Check, 
  Home, 
  Heart,
  SunMedium,
  Clock,
  Moon,
  Compass,
  Laptop,
  Building2,
  Briefcase,
  Feather,
  Users,
  Flame,
  BellRing,
  HeartHandshake,
  ShieldCheck,
  Smile,
  Cat,
  Ban
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import SafeImage from './SafeImage';

export default function FlatmateQuizModal({
  isOpen,
  onClose,
  properties,
  onSelectProperty
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const question = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (value) => {
    soundEngine.playClick();
    setAnswers({
      ...answers,
      [question.id]: value
    });
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      soundEngine.playSuccess();
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    soundEngine.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  // Dynamic compatibility calculation based on answers
  const calculateResult = () => {
    let score = 88;
    if (answers.sleep === 'early_bird') score += 4;
    if (answers.cleanliness === 'immaculate') score += 4;
    if (answers.work_style === 'hybrid') score += 2;
    return Math.min(score, 99);
  };

  const compatibilityScore = calculateResult();

  // Curated recommended properties
  const recommendedProperties = properties.slice(0, 3);

  // Icon mapping helper
  const renderIcon = (name) => {
    const props = { className: "w-5 h-5 text-terracotta" };
    switch (name) {
      case "SunMedium": return <SunMedium {...props} />;
      case "Clock": return <Clock {...props} />;
      case "Moon": return <Moon {...props} />;
      case "Compass": return <Compass {...props} />;
      case "Sparkles": return <Sparkles {...props} />;
      case "CheckCircle2": return <CheckCircle2 {...props} />;
      case "Coffee": return <Clock {...props} />;
      case "Laptop": return <Laptop {...props} />;
      case "Building2": return <Building2 {...props} />;
      case "Briefcase": return <Briefcase {...props} />;
      case "Feather": return <Feather {...props} />;
      case "Users": return <Users {...props} />;
      case "Flame": return <Flame {...props} />;
      case "BellRing": return <BellRing {...props} />;
      case "HeartHandshake": return <HeartHandshake {...props} />;
      case "ShieldCheck": return <ShieldCheck {...props} />;
      case "Smile": return <Smile {...props} />;
      case "Cat": return <Cat {...props} />;
      case "Ban": return <Ban {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-xl overflow-hidden border border-ivory-300 dark:border-charcoal-400 p-6 sm:p-10">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-ivory-300 dark:border-charcoal-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
                CoHaven VibeMatch™ Engine
              </h2>
              <span className="text-[11px] text-charcoal-300 dark:text-charcoal-200">
                Algorithmic Flatmate Compatibility
              </span>
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

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="pt-4 pb-6">
            <div className="flex items-center justify-between text-xs font-mono text-charcoal-300 dark:text-charcoal-200 mb-2">
              <span>QUESTION {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
              <span className="font-semibold text-terracotta">{question.category}</span>
            </div>
            <div className="w-full bg-ivory-300 dark:bg-charcoal-600 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-terracotta h-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Question View */}
        {!isCompleted ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-ivory font-sans">
                {question.question}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-300 dark:text-charcoal-100 mt-1">
                {question.subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((opt) => {
                const selected = answers[question.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`p-4 rounded-2xl text-left border transition-all duration-200 flex items-start gap-4 group ${
                      selected
                        ? 'bg-terracotta/10 border-terracotta shadow-soft-sm ring-1 ring-terracotta'
                        : 'bg-ivory-50 dark:bg-charcoal-600/70 border-ivory-300 dark:border-charcoal-500 hover:border-charcoal-300'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-ivory dark:bg-charcoal-500 shadow-sm shrink-0">
                      {renderIcon(opt.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-charcoal dark:text-ivory group-hover:text-terracotta transition-colors">
                          {opt.label}
                        </h4>
                        {selected && <Check className="w-4 h-4 text-terracotta" />}
                      </div>
                      <p className="text-xs text-charcoal-300 dark:text-charcoal-200 mt-0.5 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-ivory-300 dark:border-charcoal-400">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-full text-xs font-semibold text-charcoal-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-charcoal flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!answers[question.id]}
                className="px-6 py-2.5 rounded-full bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-charcoal-600 transition-all flex items-center gap-2 shadow-soft-sm"
              >
                <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Calculate Harmony Score' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Completed Results Screen */
          <div className="space-y-8 animate-fadeIn">
            {/* Score Visualization */}
            <div className="text-center space-y-4 py-4">
              <div className="relative inline-flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-ivory-300 dark:text-charcoal-600"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="#E07A5F"
                    strokeWidth="8"
                    strokeDasharray="364"
                    strokeDashoffset={364 - (364 * compatibilityScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-charcoal dark:text-ivory font-mono">
                    {compatibilityScore}%
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-terracotta">
                    Harmony Index
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-charcoal dark:text-ivory font-sans">
                  Exceptional Shared Living Profile
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-300 dark:text-charcoal-100 max-w-md mx-auto mt-1">
                  Your circadian rhythm and cleanliness standards create a high probability of peaceful co-living.
                </p>
              </div>
            </div>

            {/* Alignment Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
                <div className="text-xs font-bold text-sage mb-1">Rhythm Fit</div>
                <div className="text-xs text-charcoal-400 dark:text-charcoal-100">
                  Optimal acoustic overlap with quiet morning hours.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
                <div className="text-xs font-bold text-terracotta mb-1">Counter Harmony</div>
                <div className="text-xs text-charcoal-400 dark:text-charcoal-100">
                  Shared expectation of zero unwashed dishes in basins.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
                <div className="text-xs font-bold text-emerald-500 mb-1">Social Resonance</div>
                <div className="text-xs text-charcoal-400 dark:text-charcoal-100">
                  Balanced sanctuary preference with occasional shared tea.
                </div>
              </div>
            </div>

            {/* Curated Recommendations */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-charcoal dark:text-ivory flex items-center gap-2">
                <Home className="w-4 h-4 text-terracotta" />
                <span>Highest Compatible Spaces for You</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendedProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      soundEngine.playClick();
                      onClose();
                      onSelectProperty(p);
                    }}
                    className="p-3.5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 hover:border-terracotta cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <SafeImage
                      src={p.images[0]}
                      alt={p.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-terracotta font-mono font-bold">
                        {p.compatibilityScore}% Compatibility
                      </div>
                      <h5 className="font-bold text-xs text-charcoal dark:text-ivory truncate group-hover:text-terracotta">
                        {p.title}
                      </h5>
                      <div className="text-[11px] text-charcoal-300 dark:text-charcoal-200 mt-0.5">
                        ${p.pricePerMonth}/mo • {p.city}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-ivory-300 dark:border-charcoal-400">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-full text-xs font-semibold text-charcoal-300 hover:text-charcoal flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-terracotta text-white text-xs font-bold hover:bg-terracotta-dark transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Browse All Compatible Spaces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
