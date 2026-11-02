import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  X, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  Compass,
  DollarSign,
  Check,
  CheckSquare,
  Square,
  Plus,
  Layers,
  CircleDot,
  QrCode,
  Download,
  Phone,
  Video,
  LogOut,
  Maximize2
} from 'lucide-react';
import SmartImage from './SmartImage';
import { DASHBOARD_BANNER, AVATAR_IMAGES } from '../utils/images';
import { INITIAL_CHORES, INITIAL_EXPENSES } from '../data/mockData';
import { soundEngine } from '../utils/audio';

export default function UserDashboard({
  isOpen,
  onClose,
  initialTab = 'overview',
  user,
  favorites,
  properties,
  applications,
  messages,
  onSendMessage,
  onSelectProperty,
  onRemoveFavorite,
  onOpenCalculator,
  onOpenQuiz,
  onShowToast,
  isFullPage = false,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeThreadId, setActiveThreadId] = useState(messages[0]?.id || null);
  const [replyText, setReplyText] = useState('');
  const [chores, setChores] = useState(INITIAL_CHORES);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [upiModalExpense, setUpiModalExpense] = useState(null);

  if (!isOpen && !isFullPage) return null;

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));
  const activeThread = messages.find(m => m.id === activeThreadId) || messages[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    soundEngine.playSuccess();

    if (onSendMessage) {
      onSendMessage(activeThread?.id || 'msg-thread-1', replyText);
    }
    setReplyText('');
    if (onShowToast) onShowToast("Message sent to flatmates!");
  };

  const toggleChore = (choreId) => {
    soundEngine.playClick();
    setChores(chores.map(c => {
      if (c.id === choreId) {
        const nextStatus = c.status === 'Completed' ? 'Pending' : 'Completed';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handlePayUPI = (expense) => {
    soundEngine.playSuccess();
    setExpenses(expenses.map(exp => exp.id === expense.id ? { ...exp, status: 'Paid via UPI' } : exp));
    setUpiModalExpense(null);
    if (onShowToast) onShowToast(`₹${expense.myShare.toFixed(2)} paid instantly via UPI to CoHaven Escrow!`);
  };

  const navTabs = [
    { id: 'overview', label: 'Central Hub', icon: Compass, count: null },
    { id: 'favorites', label: 'Saved Spaces', icon: Heart, count: favorites.length },
    { id: 'applications', label: 'Move-in & Tours', icon: FileText, count: applications.length },
    { id: 'messages', label: 'Flatmate Chat', icon: MessageSquare, count: 1, isPulse: true },
    { id: 'chores', label: 'Household Chores', icon: CheckSquare, count: chores.filter(c => c.status === 'Pending').length },
    { id: 'expenses', label: 'Shared Expenses (UPI)', icon: DollarSign, count: null },
    { id: 'profile', label: 'Living Passport', icon: User, count: null }
  ];

  const content = (
    <div className={`relative w-full ${isFullPage ? 'max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6' : 'max-w-6xl'} bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-2xl overflow-hidden border border-ivory-300 dark:border-charcoal-500 flex flex-col md:flex-row ${isFullPage ? 'min-h-[85vh]' : 'h-[90vh]'}`}>
      
      {/* Left Systematic Sidebar */}
      <div className="w-full md:w-64 bg-ivory-200/80 dark:bg-charcoal-800 p-5 border-b md:border-b-0 md:border-r border-ivory-300 dark:border-charcoal-600 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* User Mini Profile Badge with SmartImage */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 dark:bg-charcoal-700 border border-ivory-300 dark:border-charcoal-600 shadow-soft-sm">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-terracotta shrink-0">
              <SmartImage
                src={user?.avatar || AVATAR_IMAGES.aarav}
                alt={user?.name || "Resident"}
                isAvatar={true}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-charcoal dark:text-ivory truncate flex items-center gap-1">
                <span>{user?.name || "Aarav Sharma"}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-sage fill-sage/20 shrink-0" />
              </h4>
              <p className="text-[10px] text-terracotta truncate">{user?.occupation || user?.role || "Resident Lead"}</p>
              <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold block">● Aadhaar Verified</span>
            </div>
          </div>

          {/* Systematic Tab Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-300 dark:text-charcoal-400 font-bold px-3 block mb-1.5">
              Resident OS Modules
            </span>
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-soft-sm'
                      : 'text-charcoal-400 dark:text-charcoal-200 hover:bg-ivory-300 dark:hover:bg-charcoal-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== null && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-ivory-300 dark:bg-charcoal-600 text-charcoal-400 dark:text-charcoal-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {tab.isPulse && !active && (
                    <span className="w-2 h-2 rounded-full bg-terracotta animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Helper Tools */}
        <div className="pt-4 border-t border-ivory-300 dark:border-charcoal-600 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-300 dark:text-charcoal-400 font-bold block">
            Tools & Settings
          </span>
          {onOpenCalculator && (
            <button
              onClick={() => {
                if (onClose) onClose();
                onOpenCalculator();
              }}
              className="w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-medium text-charcoal-400 hover:text-charcoal dark:text-charcoal-200 flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5 text-sage" />
              <span>Rent Split Calculator</span>
            </button>
          )}
          {onOpenQuiz && (
            <button
              onClick={() => {
                if (onClose) onClose();
                onOpenQuiz();
              }}
              className="w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-medium text-charcoal-400 hover:text-charcoal dark:text-charcoal-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>VibeMatch Quiz</span>
            </button>
          )}
          {onLogout && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onLogout();
              }}
              className="w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out / Switch</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Systematic Workspace Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-ivory dark:bg-charcoal-700">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-ivory-300 dark:border-charcoal-500 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold">
                CoHaven Resident OS
              </span>
              <span className="text-charcoal-300 dark:text-charcoal-400">•</span>
              <span className="text-xs text-charcoal-300 dark:text-charcoal-200">
                Bengaluru, Mumbai, Delhi, Hyderabad, Pune
              </span>
            </div>
            <h3 className="font-bold text-lg sm:text-2xl text-charcoal dark:text-ivory capitalize font-sans mt-0.5">
              {activeTab === 'overview' && 'Resident Central Hub'}
              {activeTab === 'favorites' && 'Saved Residences & Comparables'}
              {activeTab === 'applications' && 'Move-in Applications & Viewing Status'}
              {activeTab === 'messages' && 'Direct Flatmate Group & DM Chat'}
              {activeTab === 'chores' && 'Household Harmony & Chore Schedule'}
              {activeTab === 'expenses' && 'Communal Expenses & UPI Settlement Ledger'}
              {activeTab === 'profile' && 'Circadian Rhythm & Living Passport'}
            </h3>
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

        {/* Dynamic Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Luxury Cover Photo Banner with Greeting */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft-md border border-ivory-300 dark:border-charcoal-500 bg-charcoal">
                <div className="aspect-[21/9] sm:aspect-[24/7] w-full">
                  <SmartImage
                    src={DASHBOARD_BANNER}
                    alt="CoHaven Residence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent p-5 sm:p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta bg-terracotta/20 px-2.5 py-0.5 rounded-full inline-block w-fit mb-1 border border-terracotta/40">
                    Active Resident • Indiranagar Hub
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans">
                    Welcome home, {user?.name || "Aarav"}!
                  </h3>
                  <p className="text-xs text-ivory-200 max-w-lg mt-0.5">
                    Your quiet hours begin at 11:00 PM. Housemates Ananya and Rohan are home.
                  </p>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500">
                  <span className="text-xs text-charcoal-300 dark:text-charcoal-200">Saved Spaces</span>
                  <div className="text-2xl font-bold text-charcoal dark:text-ivory font-mono mt-1">
                    {favorites.length} Homes
                  </div>
                </div>
                <div className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500">
                  <span className="text-xs text-charcoal-300 dark:text-charcoal-200">Applications</span>
                  <div className="text-2xl font-bold text-terracotta font-mono mt-1">
                    {applications.length} Active
                  </div>
                </div>
                <div className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500">
                  <span className="text-xs text-charcoal-300 dark:text-charcoal-200">Pending Chores</span>
                  <div className="text-2xl font-bold text-sage font-mono mt-1">
                    {chores.filter(c => c.status === 'Pending').length} Due
                  </div>
                </div>
                <div className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500">
                  <span className="text-xs text-charcoal-300 dark:text-charcoal-200">Compatibility</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                    98% Harmony
                  </div>
                </div>
              </div>

              {/* Upcoming Viewing Card with Property Photo */}
              {applications[0] && (
                <div className="p-5 rounded-2xl bg-charcoal text-ivory dark:bg-charcoal-800 border border-charcoal-500 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
                      <SmartImage
                        src={applications[0].propertyPhoto || properties[0]?.images?.[0]}
                        alt="Property Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold">
                          Next Tour Appointment
                        </span>
                        <span className="text-xs text-emerald-400 font-semibold font-mono">
                          ● {applications[0].status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-sans mt-0.5">{applications[0].propertyTitle}</h4>
                      <p className="text-xs text-ivory-300">
                        {applications[0].tourDate} • {applications[0].tourType}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-all shrink-0"
                  >
                    Open Tour Details
                  </button>
                </div>
              )}

              {/* Dual Previews: Chores & Active Flatmate Chat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Chores Quick View */}
                <div className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-charcoal dark:text-ivory flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-sage" />
                      <span>Chore Rotation (Week 44)</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('chores')}
                      className="text-xs text-terracotta hover:underline font-semibold"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {chores.slice(0, 3).map((chore) => (
                      <div
                        key={chore.id}
                        onClick={() => toggleChore(chore.id)}
                        className="p-2.5 rounded-xl bg-white dark:bg-charcoal-600 flex items-center justify-between text-xs cursor-pointer hover:bg-ivory-200 transition-colors border border-ivory-200 dark:border-charcoal-500"
                      >
                        <div className="flex items-center gap-2">
                          {chore.status === 'Completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Square className="w-4 h-4 text-charcoal-300" />
                          )}
                          <span className={chore.status === 'Completed' ? 'line-through text-charcoal-300' : 'font-medium text-charcoal dark:text-ivory'}>
                            {chore.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-charcoal-300">{chore.due}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Messages Quick Preview */}
                <div className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-charcoal dark:text-ivory flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-terracotta" />
                      <span>Active Flatmate Chat</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-terracotta hover:underline font-semibold"
                    >
                      Open chat →
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-charcoal-600 space-y-2 border border-ivory-200 dark:border-charcoal-500">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-terracotta shrink-0">
                        <SmartImage
                          src={messages[0]?.flatmateAvatar || AVATAR_IMAGES.ananya}
                          alt={messages[0]?.flatmateName || "Flatmate"}
                          isAvatar={true}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-charcoal dark:text-ivory">
                          {messages[0]?.flatmateName || "Ananya Deshmukh"}
                        </div>
                        <div className="text-[10px] text-terracotta">{messages[0]?.propertyTitle || "The Kanso Nordic Atelier"}</div>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-300 dark:text-charcoal-200 italic line-clamp-2">
                      "{messages[0]?.lastMessage || "Looking forward to showing you around the residence!"}"
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. FAVORITES TAB with Rich Image Cards */}
          {activeTab === 'favorites' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-bold">
                  {favoriteProperties.length} Saved Sanctuaries
                </span>
              </div>

              {favoriteProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {favoriteProperties.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 overflow-hidden flex flex-col justify-between group bg-white dark:bg-charcoal-800 shadow-soft-sm"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200 dark:bg-charcoal-600">
                        <SmartImage 
                          src={p.images[0]} 
                          alt={p.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveFavorite(p.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-rose-400 transition-colors z-10"
                          title="Remove favorite"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono">
                          {p.neighborhood}
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <h4 className="font-bold text-sm text-charcoal dark:text-ivory group-hover:text-terracotta transition-colors line-clamp-1">
                            {p.title}
                          </h4>
                          <span className="text-xs text-terracotta font-mono font-bold block mt-0.5">
                            ₹{p.pricePerMonth.toLocaleString('en-IN')}/month • All inc.
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-ivory-200 dark:border-charcoal-600">
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                            {p.compatibilityScore}% Match
                          </span>
                          <button
                            onClick={() => {
                              soundEngine.playClick();
                              if (onClose) onClose();
                              onSelectProperty(p);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-semibold hover:bg-charcoal-600 transition-all text-center flex items-center gap-1"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <Heart className="w-12 h-12 text-charcoal-300 mx-auto" />
                  <h4 className="font-bold text-base text-charcoal dark:text-ivory">No saved spaces yet</h4>
                  <p className="text-xs text-charcoal-300 dark:text-charcoal-200 max-w-sm mx-auto">
                    Browse curated residences across Bengaluru, Mumbai, Delhi, and click the heart to save them.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3. APPLICATIONS TAB with Rich Photo Cards */}
          {activeTab === 'applications' && (
            <div className="space-y-4 animate-fadeIn">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-charcoal-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-ivory-300 dark:border-charcoal-500 shadow-soft-xs">
                      <SmartImage
                        src={app.propertyPhoto || properties[0]?.images?.[0]}
                        alt={app.propertyTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                          App: {app.id}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          ● {app.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-charcoal dark:text-ivory mt-0.5">
                        {app.propertyTitle}
                      </h4>
                      <p className="text-xs text-charcoal-300 dark:text-charcoal-200">
                        {app.roomType} • ₹{app.monthlyRent.toLocaleString('en-IN')}/month • {app.tourType}
                      </p>
                      <div className="text-xs text-charcoal-400 dark:text-charcoal-100 font-medium">
                        Scheduled for: <strong className="text-charcoal dark:text-ivory">{app.tourDate}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveTab('messages');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-semibold hover:bg-charcoal-600 transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat Flatmates</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. MESSAGES TAB (Full Live Flatmate Chat) */}
          {activeTab === 'messages' && (
            <div className="flex flex-col h-[520px] rounded-2xl border border-ivory-300 dark:border-charcoal-500 overflow-hidden bg-white dark:bg-charcoal-800 animate-fadeIn">
              
              {/* Active Chat Header */}
              <div className="p-4 bg-ivory-100 dark:bg-charcoal-700 border-b border-ivory-300 dark:border-charcoal-600 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-terracotta">
                    <SmartImage
                      src={activeThread?.flatmateAvatar || AVATAR_IMAGES.ananya}
                      alt={activeThread?.flatmateName || "Flatmate"}
                      isAvatar={true}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-charcoal dark:text-ivory">
                      {activeThread?.flatmateName || "Ananya Deshmukh"} ({activeThread?.flatmateRole || "Spatial UX Lead"})
                    </h5>
                    <p className="text-[11px] text-terracotta">
                      {activeThread?.propertyTitle || "The Kanso Nordic Atelier"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      soundEngine.playClick();
                      if (onShowToast) onShowToast("Connecting video walkthrough room...");
                    }}
                    className="p-2 rounded-lg bg-ivory-200 dark:bg-charcoal-600 text-charcoal dark:text-ivory hover:text-terracotta" 
                    title="Start Guided Video Walkthrough"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full hidden sm:inline">
                    Online Now
                  </span>
                </div>
              </div>

              {/* Message Log */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4 bg-ivory-50/50 dark:bg-charcoal-800">
                {activeThread?.history?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white rounded-br-sm shadow-soft-xs'
                          : 'bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory rounded-bl-sm border border-ivory-300 dark:border-charcoal-500 shadow-soft-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-charcoal-300 dark:text-charcoal-200 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Send Input */}
              <form onSubmit={handleSendReply} className="p-3 bg-white dark:bg-charcoal-700 border-t border-ivory-300 dark:border-charcoal-600 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message to future flatmates in Indiranagar / Bandra..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-ivory-50 dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
                <button
                  type="submit"
                  className="p-3 rounded-xl bg-terracotta text-white hover:bg-terracotta-dark transition-all shrink-0 shadow-soft-xs"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* 5. HOUSEHOLD CHORES TAB */}
          {activeTab === 'chores' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-sage/10 border border-sage/20 text-xs text-sage dark:text-sage-light flex items-center justify-between">
                <span>Weekly automated rotation resets every Sunday at 8:00 PM.</span>
                <span className="font-mono font-bold">100% On-Time Record</span>
              </div>

              <div className="space-y-2.5">
                {chores.map((chore) => (
                  <div
                    key={chore.id}
                    onClick={() => toggleChore(chore.id)}
                    className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 flex items-center justify-between cursor-pointer hover:border-terracotta transition-all bg-white dark:bg-charcoal-800"
                  >
                    <div className="flex items-center gap-3">
                      {chore.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-charcoal-300 shrink-0" />
                      )}
                      <div>
                        <h5 className={`font-bold text-xs sm:text-sm ${chore.status === 'Completed' ? 'line-through text-charcoal-300' : 'text-charcoal dark:text-ivory'}`}>
                          {chore.title}
                        </h5>
                        <span className="text-[10px] text-terracotta font-mono">
                          Assigned to: {chore.assignee} • {chore.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        chore.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'
                      }`}>
                        {chore.status}
                      </span>
                      <div className="text-[10px] text-charcoal-300 mt-1">Due: {chore.due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. SHARED EXPENSES TAB (in INR & Simulated UPI Settlement) */}
          {activeTab === 'expenses' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs text-charcoal-300">
                  Shared expenses are protected with automated receipt ledger and UPI pooling.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {expenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-3 bg-white dark:bg-charcoal-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-300">{exp.splitWith}</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{exp.status}</span>
                      </div>
                      <h4 className="font-bold text-sm text-charcoal dark:text-ivory mt-1">{exp.description}</h4>
                      <p className="text-xs text-charcoal-300 mt-0.5">Total bill: ₹{exp.amount.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="pt-3 border-t border-ivory-200 dark:border-charcoal-600 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-charcoal-300 block">Your Share:</span>
                        <strong className="text-base text-terracotta font-mono font-bold">₹{exp.myShare.toFixed(2)}</strong>
                      </div>

                      <button
                        onClick={() => setUpiModalExpense(exp)}
                        className="px-3 py-1.5 rounded-xl bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-semibold hover:bg-charcoal-600 transition-all flex items-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Settle UPI</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. PROFILE & LIVING PASSPORT TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Identity Header */}
              <div className="p-6 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-800 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-terracotta shrink-0">
                  <SmartImage
                    src={user?.avatar || AVATAR_IMAGES.aarav}
                    alt={user?.name}
                    isAvatar={true}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-xl font-bold text-charcoal dark:text-ivory flex items-center justify-center sm:justify-start gap-2">
                    <span>{user?.name || "Aarav Sharma"}</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </h3>
                  <p className="text-xs text-terracotta font-medium">{user?.occupation || "Senior Product Designer"} • Bengaluru</p>
                  <p className="text-xs text-charcoal-300 dark:text-charcoal-200 max-w-lg">
                    {user?.bio || "Product designer in Indiranagar who loves quiet mornings, clean architectural spaces, and exploring neighborhood bakeries."}
                  </p>
                </div>
              </div>

              {/* Lifestyle Radar Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-white dark:bg-charcoal-600 border border-ivory-200 dark:border-charcoal-500">
                  <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                    Sleep Rhythm
                  </span>
                  <span className="font-bold text-charcoal dark:text-ivory text-sm">
                    {user?.lifestyle?.sleep || "Early Bird (6:30 AM - 10:30 PM)"}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-charcoal-600 border border-ivory-200 dark:border-charcoal-500">
                  <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                    Cleanliness Standard
                  </span>
                  <span className="font-bold text-charcoal dark:text-ivory text-sm">
                    {user?.lifestyle?.cleanliness || "Immaculate (Clean-as-you-go)"}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-charcoal-600 border border-ivory-200 dark:border-charcoal-500">
                  <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                    Work Arrangement
                  </span>
                  <span className="font-bold text-charcoal dark:text-ivory text-sm">
                    {user?.lifestyle?.workStyle || "Hybrid Product Designer"}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-charcoal-600 border border-ivory-200 dark:border-charcoal-500">
                  <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                    Guest Etiquette
                  </span>
                  <span className="font-bold text-charcoal dark:text-ivory text-sm">
                    {user?.lifestyle?.guests || "Occasional weekend dinners (24h heads-up)"}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Simulated UPI QR Code Payment Modal */}
      {upiModalExpense && (
        <div className="fixed inset-0 z-60 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-charcoal-700 rounded-3xl p-6 max-w-sm w-full space-y-4 border border-ivory-300 dark:border-charcoal-500 text-center shadow-soft-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-terracotta uppercase">CoHaven UPI Escrow</span>
              <button onClick={() => setUpiModalExpense(null)} className="p-1 rounded-full text-charcoal-400 hover:text-charcoal">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-ivory-100 dark:bg-charcoal-600 rounded-2xl border border-ivory-300 dark:border-charcoal-500 inline-block mx-auto">
              {/* QR Code representation */}
              <div className="w-40 h-40 bg-white p-2 rounded-xl flex items-center justify-center shadow-inner mx-auto">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className={`rounded-xs ${i % 2 === 0 || i % 7 === 0 ? 'bg-charcoal' : 'bg-ivory-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-charcoal dark:text-ivory">{upiModalExpense.description}</h4>
              <p className="text-xl font-bold font-mono text-terracotta mt-1">₹{upiModalExpense.myShare.toFixed(2)}</p>
              <p className="text-[10px] text-charcoal-300 mt-0.5">Scan with Google Pay, PhonePe, or Paytm</p>
            </div>

            <button
              onClick={() => handlePayUPI(upiModalExpense)}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-soft-sm"
            >
              Simulate Instant UPI Payment (₹{upiModalExpense.myShare.toFixed(2)})
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      {content}
    </div>
  );
}
