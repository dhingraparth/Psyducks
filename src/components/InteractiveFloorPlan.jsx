import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Sun, 
  Sunset, 
  Moon, 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Maximize2, 
  Layers, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function InteractiveFloorPlan({
  property,
  onBookRoom,
  onSelectProperty
}) {
  const rooms = property?.rooms || [
    { id: "r1", name: "Living Commons & Dining", sqft: 380, status: "Shared", occupant: "All Flatmates", photo: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", acoustic: "24 dB", daylight: "South Facing (All Day)" },
    { id: "r2", name: "Chef's Kitchen & Island", sqft: 190, status: "Shared", occupant: "All Flatmates", photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", acoustic: "28 dB", daylight: "East Facing (Morning Sun)" },
    { id: "r3", name: "Private Bedroom 01", sqft: 240, status: "Occupied", occupant: "Astrid (UX Director)", photo: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80", acoustic: "22 dB", daylight: "South-West Facing" },
    { id: "r4", name: "Available Suite 02", sqft: 220, status: "Vacant", occupant: "Available for You ($1,450/mo)", photo: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", acoustic: "20 dB (Acoustic Foam)", daylight: "South Facing + Balcony" }
  ];

  const [selectedRoomId, setSelectedRoomId] = useState("r4");
  const [daylightFilter, setDaylightFilter] = useState("golden"); // 'morning', 'golden', 'evening'

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  const handleRoomClick = (roomId) => {
    soundEngine.playClick();
    setSelectedRoomId(roomId);
  };

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 sm:p-8 border border-ivory-300 dark:border-charcoal-500 shadow-soft-lg">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ivory-200 dark:border-charcoal-600">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Architectural Layout Navigator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-ivory font-sans">
            Interactive Floor Plan & Acoustic Zones
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-300 dark:text-charcoal-200 mt-0.5">
            Select any room to inspect natural daylight angles, acoustic isolation (dB), and current occupant allocation.
          </p>
        </div>

        {/* Daylight Mode Controls */}
        <div className="flex items-center gap-1.5 bg-ivory-200/80 dark:bg-charcoal-700 p-1 rounded-full border border-ivory-300 dark:border-charcoal-600">
          <button
            onClick={() => {
              soundEngine.playHover();
              setDaylightFilter("morning");
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              daylightFilter === "morning"
                ? "bg-amber-100 text-charcoal shadow-sm"
                : "text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Morning</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playHover();
              setDaylightFilter("golden");
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              daylightFilter === "golden"
                ? "bg-terracotta text-white shadow-sm"
                : "text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal"
            }`}
          >
            <Sunset className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Golden Hour</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playHover();
              setDaylightFilter("evening");
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              daylightFilter === "evening"
                ? "bg-indigo-950 text-white shadow-sm"
                : "text-charcoal-400 dark:text-charcoal-200 hover:text-charcoal"
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden sm:inline">Night Ambient</span>
          </button>
        </div>
      </div>

      {/* Main Floor Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
        {/* Left Interactive SVG Floor Map */}
        <div className="lg:col-span-7 bg-ivory-100 dark:bg-charcoal-700/60 rounded-2xl p-5 border border-ivory-300 dark:border-charcoal-600 relative overflow-hidden">
          {/* Ambient Lighting Overlay according to Daylight mode */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
              daylightFilter === 'morning' ? 'bg-amber-200/10' :
              daylightFilter === 'golden' ? 'bg-terracotta/10' : 'bg-indigo-950/25'
            }`} 
          />

          {/* Interactive Room Grid / Blueprint Blocks */}
          <div className="grid grid-cols-2 gap-3.5 relative z-10">
            {rooms.map((room) => {
              const isSelected = room.id === selectedRoomId;
              const isVacant = room.status === "Vacant";

              return (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRoomClick(room.id)}
                  className={`p-4 rounded-2xl cursor-pointer border-2 transition-all relative overflow-hidden flex flex-col justify-between min-h-[140px] sm:min-h-[160px] ${
                    isSelected
                      ? "border-terracotta bg-white dark:bg-charcoal-600 shadow-soft-md ring-2 ring-terracotta/20"
                      : "border-ivory-300 dark:border-charcoal-500 bg-white/70 dark:bg-charcoal-600/70 hover:border-charcoal-300"
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                      isVacant
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-charcoal/10 text-charcoal dark:bg-white/10 dark:text-ivory"
                    }`}>
                      {room.status}
                    </span>

                    <span className="text-[11px] font-mono font-bold text-charcoal-300 dark:text-charcoal-200">
                      {room.sqft} sq ft
                    </span>
                  </div>

                  {/* Room Name & Acoustic Rating */}
                  <div className="my-2">
                    <h4 className="font-bold text-sm text-charcoal dark:text-ivory font-sans">
                      {room.name}
                    </h4>
                    <p className="text-[11px] text-charcoal-300 dark:text-charcoal-200 line-clamp-1 mt-0.5">
                      {room.occupant}
                    </p>
                  </div>

                  {/* Acoustic & Daylight Tags */}
                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-ivory-200 dark:border-charcoal-500">
                    <span className="text-sage font-semibold">Sound: {room.acoustic}</span>
                    <span className="text-terracotta">{room.daylight.split(' ')[0]}</span>
                  </div>

                  {/* Vacant Highlight Corner Tag */}
                  {isVacant && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-terracotta" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Blueprint Legend */}
          <div className="mt-4 pt-3 border-t border-ivory-200 dark:border-charcoal-600 flex flex-wrap items-center justify-between text-xs text-charcoal-300 dark:text-charcoal-200 font-mono">
            <span>● Click any suite to view photography & acoustic isolation</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Suite 02 is Available</span>
          </div>
        </div>

        {/* Right Selected Room Detail Card */}
        <div className="lg:col-span-5 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRoom.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Photo Preview */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-soft-sm border border-ivory-300 dark:border-charcoal-500 group">
                <img
                  src={selectedRoom.photo}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-white">
                  {selectedRoom.status === 'Vacant' ? 'Available for Move-in' : 'Shared Common Space'}
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-700 border border-ivory-300 dark:border-charcoal-600 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-charcoal dark:text-ivory">{selectedRoom.name}</h4>
                  <span className="font-mono font-bold text-terracotta text-sm">{selectedRoom.sqft} sq ft</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ivory-200 dark:border-charcoal-600">
                  <div>
                    <span className="text-charcoal-300 dark:text-charcoal-200 text-[10px] uppercase font-mono block">Acoustic Rating</span>
                    <strong className="text-charcoal dark:text-ivory">{selectedRoom.acoustic}</strong>
                  </div>
                  <div>
                    <span className="text-charcoal-300 dark:text-charcoal-200 text-[10px] uppercase font-mono block">Natural Daylight</span>
                    <strong className="text-charcoal dark:text-ivory">{selectedRoom.daylight}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-ivory-200 dark:border-charcoal-600">
                  <span className="text-charcoal-300 dark:text-charcoal-200 text-[10px] uppercase font-mono block">Current Resident</span>
                  <span className="text-xs font-semibold text-charcoal dark:text-ivory">{selectedRoom.occupant}</span>
                </div>
              </div>

              {/* Action Button */}
              {selectedRoom.status === 'Vacant' ? (
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    if (onBookRoom) onBookRoom(property);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-soft-sm"
                >
                  <span>Apply & Book Viewing for This Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    if (onSelectProperty) onSelectProperty(property);
                  }}
                  className="w-full py-3 px-4 rounded-2xl border border-ivory-300 dark:border-charcoal-500 hover:bg-ivory-200 text-charcoal dark:text-ivory font-semibold text-xs transition-all text-center"
                >
                  View Full Residence Details & Flatmates
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
