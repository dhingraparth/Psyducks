import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Building2, 
  Compass, 
  KeyRound,
  LogIn,
  UserPlus,
  HelpCircle,
  Zap
} from 'lucide-react';
import SmartImage from './SmartImage';
import { AUTH_HERO_IMAGE, AVATAR_IMAGES } from '../utils/images';
import { DEMO_USERS, authApi } from '../services/api';
import { soundEngine } from '../utils/audio';

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'signin',
  onShowToast
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [role, setRole] = useState('Resident');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    soundEngine.playClick();

    try {
      if (mode === 'signin') {
        if (!email.trim()) {
          setError('Please provide your email address.');
          setLoading(false);
          return;
        }
        const user = await authApi.login(email, password || 'password123');
        soundEngine.playSuccess();
        if (onShowToast) onShowToast(`Welcome back, ${user.name}!`);
        onAuthSuccess(user);
        onClose();
      } else {
        if (!name.trim() || !email.trim()) {
          setError('Please fill in your name and email.');
          setLoading(false);
          return;
        }
        const user = await authApi.register({ name, email, role, city });
        soundEngine.playSuccess();
        if (onShowToast) onShowToast(`Account created! Welcome to CoHaven, ${user.name}!`);
        onAuthSuccess(user);
        onClose();
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = async (demoUser) => {
    soundEngine.playClick();
    setLoading(true);
    setError('');
    try {
      const user = await authApi.demoLogin(demoUser.id);
      soundEngine.playSuccess();
      if (onShowToast) onShowToast(`Logged in as ${user.name} (${user.role})`);
      onAuthSuccess(user);
      onClose();
    } catch {
      setError('Unable to load demo profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    soundEngine.playClick();
    setLoading(true);
    setTimeout(async () => {
      const user = await authApi.demoLogin('user-aarav');
      soundEngine.playSuccess();
      if (onShowToast) onShowToast(`Authenticated securely via ${provider}`);
      onAuthSuccess(user);
      onClose();
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-charcoal-700 rounded-3xl shadow-soft-2xl border border-ivory-300 dark:border-charcoal-500 overflow-hidden flex flex-col md:flex-row my-auto">
        
        {/* Left Side: Architectural Editorial Billboard */}
        <div className="hidden md:flex md:w-5/12 relative flex-col justify-between p-8 text-white overflow-hidden bg-charcoal">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <SmartImage
              src={AUTH_HERO_IMAGE}
              alt="CoHaven Architecture"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-black/30" />
          </div>

          {/* Top Brand Tag */}
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-terracotta flex items-center justify-center font-bold text-base shadow-sm">
                C
              </div>
              <span className="font-bold text-xl tracking-tight">Co<span className="text-terracotta">Haven</span></span>
            </div>
            <p className="text-[11px] text-ivory-200 tracking-wider uppercase font-medium">Shared Living & Community</p>
          </div>

          {/* Mid Value Props */}
          <div className="relative z-10 space-y-4 my-8">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-terracotta/90 text-white">
                <Sparkles className="w-3 h-3" />
                <span>Verified Match Engine</span>
              </span>
              <h3 className="text-2xl font-bold font-sans leading-tight">
                Live with people who match your rhythm.
              </h3>
            </div>

            <div className="space-y-2.5 pt-2 text-xs text-ivory-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Aadhaar & Background Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Brokerage & Transparent Deposits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acoustic Zones & High-Speed Fiber</span>
              </div>
            </div>
          </div>

          {/* Bottom Testimonial */}
          <div className="relative z-10 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/50 shrink-0">
                <SmartImage
                  src={AVATAR_IMAGES.ananya}
                  alt="Ananya"
                  isAvatar={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">Ananya Deshmukh</p>
                <p className="text-[10px] text-ivory-200">Indiranagar, Bengaluru</p>
              </div>
            </div>
            <p className="text-[11px] text-ivory-100 italic leading-snug">
              "Found a sunlit Nordic home and two flatmates who value clean counters and quiet focus as much as I do."
            </p>
          </div>
        </div>

        {/* Right Side: Auth Interactive Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between relative bg-ivory-50 dark:bg-charcoal-700">
          {/* Close Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full text-charcoal-400 hover:text-charcoal dark:text-charcoal-200 dark:hover:text-white bg-ivory-200 dark:bg-charcoal-600 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div>
            {/* Header / Tabs */}
            <div className="mb-6">
              <div className="flex items-center gap-2 p-1 bg-ivory-200/80 dark:bg-charcoal-600 rounded-2xl max-w-xs mb-4">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setMode('signin');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'signin'
                      ? 'bg-white dark:bg-charcoal-700 text-charcoal dark:text-ivory shadow-soft-sm'
                      : 'text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setMode('signup');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'signup'
                      ? 'bg-white dark:bg-charcoal-700 text-charcoal dark:text-ivory shadow-soft-sm'
                      : 'text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>New Resident</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory tracking-tight font-sans">
                {mode === 'signin' ? 'Welcome Back to CoHaven' : 'Create Your Resident Passport'}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-300 dark:text-charcoal-200 mt-1">
                {mode === 'signin'
                  ? 'Access your saved homes, active applications, and flatmate chat.'
                  : 'Join 2,400+ verified professionals enjoying mindful shared living.'}
              </p>
            </div>

            {/* Quick 1-Click Demo Profiles (Ultra Convenient) */}
            <div className="mb-6 p-3.5 rounded-2xl bg-ivory-200/60 dark:bg-charcoal-800/80 border border-ivory-300 dark:border-charcoal-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>1-Click Instant Demo Login:</span>
                </span>
                <span className="text-[10px] text-terracotta font-semibold">No password needed</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DEMO_USERS.map((demo) => (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => handleDemoSelect(demo)}
                    className="p-2 rounded-xl bg-white dark:bg-charcoal-700 border border-ivory-300 dark:border-charcoal-600 hover:border-terracotta dark:hover:border-terracotta text-left transition-all group shadow-2xs hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-terracotta/40 shrink-0">
                        <SmartImage
                          src={demo.avatar}
                          alt={demo.name}
                          isAvatar={true}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-charcoal dark:text-ivory truncate group-hover:text-terracotta">
                        {demo.name.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-[9px] text-charcoal-300 dark:text-charcoal-200 truncate">
                      {demo.city} • {demo.type}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                {error}
              </div>
            )}

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-semibold text-charcoal-400 dark:text-charcoal-200 uppercase tracking-wider mb-1">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-charcoal-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-semibold text-charcoal-400 dark:text-charcoal-200 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-charcoal-400 dark:text-charcoal-200 uppercase tracking-wider">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        if (onShowToast) onShowToast("Password reset link sent to your email!");
                      }}
                      className="text-[11px] text-terracotta hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-charcoal-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-300 hover:text-charcoal dark:hover:text-ivory"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sign Up Specifics (City & Role) */}
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-400 dark:text-charcoal-200 uppercase tracking-wider mb-1">
                      Target City
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-400 dark:text-charcoal-200 uppercase tracking-wider mb-1">
                      Account Type
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="Resident">Resident Member</option>
                      <option value="Host">Space Host / Owner</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-400 dark:text-charcoal-200">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-terracotta rounded"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-charcoal text-ivory dark:bg-terracotta dark:text-white font-bold text-xs sm:text-sm hover:bg-charcoal-600 dark:hover:bg-terracotta-dark transition-all shadow-soft-sm flex items-center justify-center gap-2 group mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Sign In to CoHaven' : 'Create Resident Account'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Social Auth Simulation */}
            <div className="mt-5 pt-4 border-t border-ivory-300 dark:border-charcoal-600">
              <div className="text-center mb-3">
                <span className="text-[10px] uppercase tracking-wider text-charcoal-300 dark:text-charcoal-300 font-semibold">
                  Or continue with verified identity
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="py-2.5 px-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 hover:bg-ivory-100 dark:hover:bg-charcoal-500 transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-charcoal dark:text-ivory shadow-2xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="py-2.5 px-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 hover:bg-ivory-100 dark:hover:bg-charcoal-500 transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-charcoal dark:text-ivory shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.83.93-2.9-.9.04-2 .6-2.65 1.36-.57.65-1.07 1.73-.93 2.78 1.01.08 2.03-.49 2.65-1.24z"/>
                  </svg>
                  <span>Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('GitHub')}
                  className="py-2.5 px-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 hover:bg-ivory-100 dark:hover:bg-charcoal-500 transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-charcoal dark:text-ivory shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 text-center">
            <p className="text-[10px] text-charcoal-300 dark:text-charcoal-300 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span>Aadhaar KYC encrypted • Zero hidden broker fees • RBI compliant escrow</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
