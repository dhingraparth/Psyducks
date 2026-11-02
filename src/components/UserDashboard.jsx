import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CircleDot
} from 'lucide-react';
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
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeThreadId, setActiveThreadId] = useState(messages[0]?.id || null);
  const [replyText, setReplyText] = useState('');
  const [chores, setChores] = useState(INITIAL_CHORES);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  if (!isOpen) return null;

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));
  const activeThread = messages.find(m => m.id === activeThreadId) || messages[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    soundEngine.playSuccess();

    if (onSendMessage) {
      onSendMessage(activeThread.id, replyText);
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

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: Compass, count: null },
    { id: 'favorites', label: 'Saved Spaces', icon: Heart, count: favorites.length },
    { id: 'applications', label: 'Applications', icon: FileText, count: applications.length },
    { id: 'messages', label: 'Flatmate Chat', icon: MessageSquare, count: 1, isPulse: true },
    { id: 'chores', label: 'Household Chores', icon: CheckSquare, count: chores.filter(c => c.status === 'Pending').length },
    { id: 'expenses', label: 'Shared Expenses', icon: DollarSign, count: null },
    { id: 'profile', label: 'Living Passport', icon: User, count: null }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-xl overflow-hidden border border-ivory-300 dark:border-charcoal-500 flex flex-col md:flex-row h-[90vh]">
        {/* Left Systematic Sidebar */}
        <div className="w-full md:w-64 bg-ivory-200/80 dark:bg-charcoal-800 p-5 border-b md:border-b-0 md:border-r border-ivory-300 dark:border-charcoal-600 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* User Mini Profile Badge */}
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/70 dark:bg-charcoal-700 border border-ivory-300 dark:border-charcoal-600 shadow-soft-sm">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-terracotta shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-charcoal dark:text-ivory truncate flex items-center gap-1">
                  <span>{user.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage fill-sage/20 shrink-0" />
                </h4>
                <p className="text-[10px] text-terracotta truncate">{user.occupation}</p>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">● Resident Verified</span>
              </div>
            </div>

            {/* Systematic Tab Links */}
            <nav className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-300 dark:text-charcoal-400 font-bold px-3 block mb-1.5">
                Dashboard Modules
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
          <div className="pt-4 border-t border-ivory-300 dark:border-charcoal-600 space-y-2 hidden md:block">
            <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-300 dark:text-charcoal-400 font-bold block">
              Quick Shortcuts
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenCalculator();
              }}
              className="w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-medium text-charcoal-400 hover:text-charcoal dark:text-charcoal-200 flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5 text-sage" />
              <span>Rent Split Calculator</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuiz();
              }}
              className="w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-medium text-charcoal-400 hover:text-charcoal dark:text-charcoal-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>VibeMatch Quiz</span>
            </button>
          </div>
        </div>

        {/* Right Systematic Workspace Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-ivory dark:bg-charcoal-700">
          {/* Top Bar with Systematic Status */}
          <div className="p-4 sm:p-6 border-b border-ivory-300 dark:border-charcoal-500 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold">
                  CoHaven Resident OS
                </span>
                <span className="text-charcoal-300 dark:text-charcoal-400">•</span>
                <span className="text-xs text-charcoal-300 dark:text-charcoal-200">
                  Brooklyn & Global Network
                </span>
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-charcoal dark:text-ivory capitalize font-sans mt-0.5">
                {activeTab === 'overview' && 'Resident Central Hub'}
                {activeTab === 'favorites' && 'Saved Residences & Comparables'}
                {activeTab === 'applications' && 'Move-in Applications & Viewing Status'}
                {activeTab === 'messages' && 'Direct Flatmate Group & DM Chat'}
                {activeTab === 'chores' && 'Household Harmony & Chore Schedule'}
                {activeTab === 'expenses' && 'Communal Expenses & Utility Split Ledger'}
                {activeTab === 'profile' && 'Circadian Rhythm & Living Passport'}
              </h3>
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

          {/* Dynamic Content Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

                {/* Next Viewing Banner */}
                {applications[0] && (
                  <div className="p-5 rounded-2xl bg-charcoal text-ivory dark:bg-charcoal-600 border border-charcoal-500 space-y-3 shadow-soft-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold">
                        Upcoming Appointment
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold font-mono">
                        ● {applications[0].status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold">{applications[0].propertyTitle}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-ivory-200">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-terracotta" />
                        <span>{applications[0].tourDate}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sage" />
                        <span>{applications[0].tourType}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Dual Module Previews: Chores & Active Chat */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Chores Quick View */}
                  <div className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-charcoal dark:text-ivory flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-sage" />
                        <span>Chore Rotation</span>
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
                          className="p-2.5 rounded-xl bg-ivory-50 dark:bg-charcoal-600 flex items-center justify-between text-xs cursor-pointer hover:bg-ivory-200 transition-colors"
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
                        <span>Flatmate Chat</span>
                      </h4>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-xs text-terracotta hover:underline font-semibold"
                      >
                        Open chat →
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-ivory-50 dark:bg-charcoal-600 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={messages[0].flatmateAvatar}
                          alt={messages[0].flatmateName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-terracotta"
                        />
                        <div>
                          <div className="font-bold text-xs text-charcoal dark:text-ivory">{messages[0].flatmateName}</div>
                          <div className="text-[10px] text-terracotta">{messages[0].propertyTitle}</div>
                        </div>
                      </div>
                      <p className="text-xs text-charcoal-300 dark:text-charcoal-200 italic line-clamp-2">
                        "{messages[0].lastMessage}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. FAVORITES TAB */}
            {activeTab === 'favorites' && (
              <div className="space-y-4 animate-fadeIn">
                {favoriteProperties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteProperties.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-3"
                      >
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => onRemoveFavorite(p.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-rose-400 transition-colors"
                            title="Remove favorite"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-charcoal dark:text-ivory">{p.title}</h4>
                          <span className="text-xs text-terracotta font-mono font-bold">${p.pricePerMonth}/month</span>
                        </div>
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            onClose();
                            onSelectProperty(p);
                          }}
                          className="w-full py-2 rounded-xl bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-semibold hover:bg-charcoal-600 transition-all text-center"
                        >
                          View Space Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 space-y-3">
                    <Heart className="w-10 h-10 text-charcoal-300 mx-auto" />
                    <h4 className="font-bold text-base text-charcoal dark:text-ivory">No saved spaces yet</h4>
                    <p className="text-xs text-charcoal-300 dark:text-charcoal-200">
                      Browse through curated residences and click the heart icon to save your favorites.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 3. APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              <div className="space-y-4 animate-fadeIn">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                          ID: {app.id}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          ● {app.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-charcoal dark:text-ivory mt-1">
                        {app.propertyTitle}
                      </h4>
                      <p className="text-xs text-charcoal-300 dark:text-charcoal-200">
                        {app.roomType} • ${app.monthlyRent}/month • {app.tourType}
                      </p>
                      <div className="text-xs text-charcoal-400 dark:text-charcoal-100 pt-1 font-medium">
                        Scheduled for: <strong className="text-charcoal dark:text-ivory">{app.tourDate}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          setActiveTab('messages');
                        }}
                        className="px-4 py-2 rounded-xl bg-charcoal text-ivory dark:bg-terracotta dark:text-white text-xs font-semibold hover:bg-charcoal-600 transition-all flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Flatmates</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. MESSAGES TAB (Systematic full-width flatmate chat) */}
            {activeTab === 'messages' && (
              <div className="flex flex-col h-full space-y-3 animate-fadeIn">
                {/* Active Chat Header */}
                <div className="p-3.5 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={activeThread.flatmateAvatar}
                        alt={activeThread.flatmateName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-terracotta"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-charcoal dark:text-ivory">
                        {activeThread.flatmateName} ({activeThread.flatmateRole})
                      </h5>
                      <p className="text-[11px] text-terracotta">
                        {activeThread.propertyTitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    Active Resident
                  </div>
                </div>

                {/* Message Log */}
                <div className="flex-1 space-y-3 overflow-y-auto p-2">
                  {activeThread.history.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'me'
                            ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white rounded-br-sm'
                            : 'bg-ivory-200 dark:bg-charcoal-600 text-charcoal dark:text-ivory rounded-bl-sm'
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
                <form onSubmit={handleSendReply} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Type a message to future housemates..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 text-xs p-3 rounded-xl border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                  <button
                    type="submit"
                    className="p-3 rounded-xl bg-terracotta text-white hover:bg-terracotta-dark transition-all shrink-0"
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
                  <span>Weekly rotation resets every Sunday at 8:00 PM.</span>
                  <span className="font-mono font-bold">100% On-Time Record</span>
                </div>

                <div className="space-y-2.5">
                  {chores.map((chore) => (
                    <div
                      key={chore.id}
                      onClick={() => toggleChore(chore.id)}
                      className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 flex items-center justify-between cursor-pointer hover:border-terracotta transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {chore.status === 'Completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-charcoal-300 shrink-0" />
                        )}
                        <div>
                          <h5 className={`font-bold text-xs ${chore.status === 'Completed' ? 'line-through text-charcoal-300' : 'text-charcoal dark:text-ivory'}`}>
                            {chore.title}
                          </h5>
                          <span className="text-[10px] text-terracotta font-mono">Assigned to: {chore.assignee}</span>
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

            {/* 6. SHARED EXPENSES TAB */}
            {activeTab === 'expenses' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {expenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-2"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-300">{exp.splitWith}</span>
                      <h4 className="font-bold text-xs text-charcoal dark:text-ivory">{exp.description}</h4>
                      <div className="pt-2 border-t border-ivory-200 dark:border-charcoal-600 flex items-center justify-between text-xs">
                        <span className="text-charcoal-300">Your Share:</span>
                        <strong className="text-terracotta font-mono font-bold">${exp.myShare.toFixed(2)}</strong>
                      </div>
                      <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{exp.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PROFILE & LIVING PASSPORT TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-charcoal dark:text-ivory">
                      Circadian & Shared Living Standards
                    </h4>
                    <span className="text-xs text-sage font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Profile</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                        Sleep Rhythm
                      </span>
                      <span className="font-bold text-charcoal dark:text-ivory text-sm">
                        {user.lifestyle.sleep}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                        Cleanliness Standard
                      </span>
                      <span className="font-bold text-charcoal dark:text-ivory text-sm">
                        {user.lifestyle.cleanliness}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                        Work Arrangement
                      </span>
                      <span className="font-bold text-charcoal dark:text-ivory text-sm">
                        {user.lifestyle.workStyle}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                        Guest Etiquette
                      </span>
                      <span className="font-bold text-charcoal dark:text-ivory text-sm">
                        {user.lifestyle.guests}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
