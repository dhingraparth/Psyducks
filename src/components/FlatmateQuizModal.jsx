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
import SmartImage from './SmartImage';

export default function FlatmateQuizModal({
  isOpen,
  onClose,
  properties,
  onSelectProperty,
  isFullPage = false
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen && !isFullPage) return null;

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
    let score = 90;
    if (answers.sleep === 'early_bird') score += 4;
    if (answers.cleanliness === 'immaculate') score += 3;
    if (answers.work_style === 'hybrid') score += 2;
    return Math.min(score, 99);
  };

  const compatibilityScore = calculateResult();
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

  const content = (
    <div className={`relative w-full ${isFullPage ? 'max-w-4xl mx-auto py-8 px-4 sm:px-6' : 'max-w-3xl my-auto'} bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-2xl overflow-hidden border border-ivory-300 dark:border-charcoal-500 p-6 sm:p-10`}>
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-ivory-300 dark:border-charcoal-500">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
              CoHaven VibeMatch™ Compatibility Engine
            </h2>
            <span className="text-xs text-charcoal-300 dark:text-charcoal-200">
              Circadian Rhythms • Cleanliness Standards • Work Styles
            </span>
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

      {/* Progress Bar */}
      {!isCompleted && (
        <div className="pt-4 pb-6">
          <div className="flex items-center justify-between text-xs font-mono text-charcoal-300 dark:text-charcoal-200 mb-2">
            <span>QUESTION {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
            <span className="font-semibold text-terracotta">{question.category}</span>
          </div>
          <div className="w-full bg-ivory-300 dark:bg-charcoal-600 h-2 rounded-full overflow-hidden">
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
                      : 'bg-white dark:bg-charcoal-600 border-ivory-300 dark:border-charcoal-500 hover:border-charcoal-300'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-ivory-100 dark:bg-charcoal-500 shadow-2xs shrink-0">
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
          <div className="flex items-center justify-between pt-6 border-t border-ivory-300 dark:border-charcoal-500">
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
            <div className="inline-flex flex-col items-center justify-center p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-4xl sm:text-5xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {compatibilityScore}%
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-charcoal dark:text-ivory mt-1">
                Harmonious Archetype: Mindful Creator
              </span>
              <p className="text-xs text-charcoal-300 dark:text-charcoal-200 max-w-sm mt-1">
                Your circadian rhythm aligns best with early risers who value clean counters and quiet weekday evenings.
              </p>
            </div>
          </div>

          {/* Curated Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-charcoal dark:text-ivory">
                Top Matched Sanctuaries for You in India:
              </h4>
              <button
                onClick={handleReset}
                className="text-xs text-terracotta hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedProperties.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    soundEngine.playClick();
                    if (onClose) onClose();
                    onSelectProperty(p);
                  }}
                  className="rounded-2xl border border-ivory-300 dark:border-charcoal-500 overflow-hidden bg-white dark:bg-charcoal-800 p-3 hover:border-terracotta transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-ivory-200 mb-2.5">
                    <SmartImage src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h5 className="font-bold text-xs text-charcoal dark:text-ivory truncate">{p.title}</h5>
                  <p className="text-[10px] text-charcoal-300">{p.neighborhood}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-ivory-200 dark:border-charcoal-600">
                    <span className="text-xs font-bold text-terracotta font-mono">₹{p.pricePerMonth.toLocaleString('en-IN')}/mo</span>
                    <span className="text-[10px] font-bold text-emerald-600">{p.compatibilityScore}% Match</span>
                  </div>
                </div>
              ))}
            </div>
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
