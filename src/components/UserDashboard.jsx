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
  Compass
} from 'lucide-react';
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
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeThreadId, setActiveThreadId] = useState(messages[0]?.id || null);
  const [replyText, setReplyText] = useState('');

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
    if (onShowToast) onShowToast("Message sent to housemates!");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-ivory dark:bg-charcoal-700 rounded-3xl shadow-soft-xl overflow-hidden border border-ivory-300 dark:border-charcoal-400 flex flex-col md:flex-row h-[88vh]">
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-64 bg-ivory-200/70 dark:bg-charcoal-800 p-5 border-b md:border-b-0 md:border-r border-ivory-300 dark:border-charcoal-500 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* User Mini Card */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-terracotta">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-charcoal dark:text-ivory truncate flex items-center gap-1">
                  <span>{user.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage fill-sage/20 shrink-0" />
                </h4>
                <p className="text-[11px] text-terracotta truncate">{user.occupation}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: Compass },
                { id: 'favorites', label: `Saved Spaces (${favorites.length})`, icon: Heart },
                { id: 'applications', label: `Applications (${applications.length})`, icon: FileText },
                { id: 'viewings', label: 'Upcoming Tours', icon: Calendar },
                { id: 'messages', label: 'Flatmate Chat', icon: MessageSquare, badge: 1 },
                { id: 'profile', label: 'Vibe & Rhythm Profile', icon: User }
              ].map((tab) => {
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
                    {tab.badge && (
                      <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-ivory-300 dark:border-charcoal-500 hidden md:block">
            <span className="text-[10px] font-mono uppercase text-charcoal-300 dark:text-charcoal-200">
              CoHaven Resident Hub v2.4
            </span>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-ivory dark:bg-charcoal-700">
          {/* Top Bar */}
          <div className="p-4 sm:p-6 border-b border-ivory-300 dark:border-charcoal-400 flex items-center justify-between">
            <h3 className="font-bold text-lg text-charcoal dark:text-ivory capitalize font-sans">
              {activeTab === 'overview' && 'Resident Dashboard & Summary'}
              {activeTab === 'favorites' && 'Your Saved Architectural Residences'}
              {activeTab === 'applications' && 'Move-in Applications Status'}
              {activeTab === 'viewings' && 'Scheduled 3D & In-Person Viewings'}
              {activeTab === 'messages' && 'Direct Flatmate Threads'}
              {activeTab === 'profile' && 'Your Circadian & Lifestyle Passport'}
            </h3>

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

          {/* Dynamic Tab Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Highlights Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500">
                    <span className="text-xs text-charcoal-300 dark:text-charcoal-200">Saved Spaces</span>
                    <div className="text-2xl font-bold text-charcoal dark:text-ivory font-mono mt-1">
                      {favorites.length} Homes
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500">
                    <span className="text-xs text-charcoal-300 dark:text-charcoal-200">Active Applications</span>
                    <div className="text-2xl font-bold text-terracotta font-mono mt-1">
                      {applications.length} In Progress
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500">
                    <span className="text-xs text-charcoal-300 dark:text-charcoal-200">VibeMatch Compatibility</span>
                    <div className="text-2xl font-bold text-sage font-mono mt-1">
                      98% Harmony
                    </div>
                  </div>
                </div>

                {/* Next Viewing Banner */}
                {applications[0] && (
                  <div className="p-5 rounded-2xl bg-charcoal text-ivory dark:bg-charcoal-600 border border-charcoal-500 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold">
                        Upcoming Appointment
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">
                        {applications[0].status}
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

                {/* Quick Favorites Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-charcoal dark:text-ivory">Saved Spaces</h4>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className="text-xs text-terracotta font-semibold hover:underline"
                    >
                      View all ({favorites.length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {favoriteProperties.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          soundEngine.playClick();
                          onClose();
                          onSelectProperty(p);
                        }}
                        className="p-3 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 hover:border-terracotta cursor-pointer transition-all flex items-center gap-3"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-charcoal dark:text-ivory truncate">{p.title}</h5>
                          <span className="text-[11px] text-terracotta font-mono font-bold">${p.pricePerMonth}/mo</span>
                        </div>
                      </div>
                    ))}
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

            {/* 4. UPCOMING VIEWINGS TAB */}
            {activeTab === 'viewings' && (
              <div className="space-y-4 animate-fadeIn">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-terracotta">{app.tourType}</span>
                      <span className="text-xs text-sage font-semibold font-mono">Confirmed</span>
                    </div>
                    <h4 className="font-bold text-base text-charcoal dark:text-ivory">{app.propertyTitle}</h4>
                    <p className="text-xs text-charcoal-300 dark:text-charcoal-200">{app.location}</p>
                    <div className="p-3 rounded-xl bg-ivory-200 dark:bg-charcoal-700 text-xs text-charcoal dark:text-ivory flex items-center justify-between">
                      <span>Date & Time: <strong>{app.tourDate}</strong></span>
                      <button
                        onClick={() => {
                          soundEngine.playSuccess();
                          if (onShowToast) onShowToast("Calendar invite sent to your email!");
                        }}
                        className="text-xs text-terracotta font-semibold hover:underline"
                      >
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. MESSAGES TAB (Interactive simulated real-time flatmate chat) */}
            {activeTab === 'messages' && (
              <div className="flex flex-col h-full space-y-3 animate-fadeIn">
                {/* Active Chat Header */}
                <div className="p-3.5 rounded-2xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500 flex items-center gap-3">
                  <img
                    src={activeThread.flatmateAvatar}
                    alt={activeThread.flatmateName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-terracotta"
                  />
                  <div>
                    <h5 className="font-bold text-xs text-charcoal dark:text-ivory">
                      {activeThread.flatmateName} ({activeThread.flatmateRole})
                    </h5>
                    <p className="text-[11px] text-charcoal-300 dark:text-charcoal-200">
                      {activeThread.propertyTitle}
                    </p>
                  </div>
                </div>

                {/* Message Log */}
                <div className="flex-1 space-y-3 overflow-y-auto p-2">
                  {activeThread.history.map((msg, i) => (
                    <div
                      key={i}
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

            {/* 6. PROFILE & LIFESTYLE TAB */}
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
                    <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                        Sleep Rhythm
                      </span>
                      <span className="font-bold text-charcoal dark:text-ivory text-sm">
                        {user.lifestyle.sleep}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                        Cleanliness Standard
                      </span>
                      <span className="font-bold text-charcoal dark:text-ivory text-sm">
                        {user.lifestyle.cleanliness}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
                      <span className="text-charcoal-300 dark:text-charcoal-200 block text-[10px] uppercase font-mono">
                        Work Arrangement
                      </span>
                      <span className="font-bold text-charcoal dark:text-ivory text-sm">
                        {user.lifestyle.workStyle}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600">
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
