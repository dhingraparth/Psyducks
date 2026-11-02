import React, { useState } from 'react';
import { ArrowRight, Sparkles, Mail, Heart, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function Footer({
  onShowToast,
  onOpenQuiz,
  onOpenCalculator,
  onOpenFloorPlan,
  onEnterSimulation
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleFloorPlan = onOpenFloorPlan || onEnterSimulation;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    soundEngine.playSuccess();
    setSubscribed(true);
    if (onShowToast) onShowToast("Subscribed to CoHaven Editorial dispatch!");
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-charcoal text-ivory dark:bg-charcoal-900 border-t border-charcoal-500/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Newsletter & Brand Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-charcoal-500/60">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-terracotta font-semibold">
              The CoHaven Dispatch
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans">
              Architectural homes and cultural essays on modern communal living.
            </h3>
            <p className="text-xs text-charcoal-100 max-w-lg leading-relaxed">
              Bi-weekly digest exploring the future of domestic architecture, intentional communities, and urban shared living.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-charcoal-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs py-3 pl-10 pr-4 rounded-full bg-charcoal-700 border border-charcoal-400 text-ivory placeholder-charcoal-300 focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <span>Join</span>}
                {!subscribed && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ivory font-mono uppercase tracking-wider">
              Explore Cities
            </h4>
            <ul className="space-y-2 text-charcoal-200">
              <li className="hover:text-terracotta cursor-pointer transition-colors">Indiranagar & Koramangala, Bengaluru</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Bandra & Pali Hill, Mumbai</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Hauz Khas & Cyber City, Delhi NCR</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Jubilee Hills & Hitec City, Hyderabad</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Koregaon Park, Pune</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Anjuna & Assagao, Goa</li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ivory font-mono uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-charcoal-200">
              <li>
                <button onClick={handleFloorPlan} className="hover:text-terracotta transition-colors text-left">
                  Architectural Floor Plan & Acoustics
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-terracotta transition-colors text-left">
                  VibeMatch Compatibility Quiz
                </button>
              </li>
              <li>
                <button onClick={onOpenCalculator} className="hover:text-terracotta transition-colors text-left">
                  Fair-Share INR Rent Calculator
                </button>
              </li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Acoustic Testing Standards (&lt;32 dB)</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Aadhaar & Work Verified Vetting</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ivory font-mono uppercase tracking-wider">
              Community
            </h4>
            <ul className="space-y-2 text-charcoal-200">
              <li className="hover:text-terracotta cursor-pointer transition-colors">The Clean Counter Pledge</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Acoustic Quiet Hours</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Guest & Partner Protocol</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Sunday Supper Collective</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Frictionless Expense Pool</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ivory font-mono uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-charcoal-200">
              <li className="hover:text-terracotta cursor-pointer transition-colors">Design Manifesto</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Architectural Partners</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Resident Safety & Escrow</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Careers (We're Hiring)</li>
              <li className="hover:text-terracotta cursor-pointer transition-colors">Press & Awards</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-500/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ivory">CoHaven Collective</span>
            <span>© 2026. Designed for Intentional Living.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-ivory cursor-pointer">Privacy Charter</span>
            <span className="hover:text-ivory cursor-pointer">Terms of Shared Tenancy</span>
            <span className="hover:text-ivory cursor-pointer">Security Escrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
