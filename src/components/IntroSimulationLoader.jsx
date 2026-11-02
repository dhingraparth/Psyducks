import React, { useState, useEffect } from 'react';
import { Sparkles, Box, Compass } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function IntroSimulationLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [telemetryText, setTelemetryText] = useState('BOOTING SPATIAL ENGINE...');

  useEffect(() => {
    soundEngine.playPortalEnter();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18 + 8);
        if (next > 30 && next < 60) {
          setTelemetryText('CALIBRATING ACOUSTIC RESONANCE...');
        } else if (next >= 60 && next < 85) {
          setTelemetryText('SYNCHRONIZING CIRCADIAN LIGHT MAP...');
        } else if (next >= 85) {
          setTelemetryText('ENTERING COHAVEN UNIVERSE...');
        }
        return Math.min(next, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-charcoal text-ivory flex flex-col items-center justify-center p-6 select-none animate-fadeIn">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-tactile opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-charcoal/80 to-charcoal pointer-events-none" />

      {/* Center Cinematic Geometry */}
      <div className="relative flex flex-col items-center space-y-8 z-10 max-w-sm w-full text-center">
        {/* Animated Brand Monogram & Portal Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Rotating outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-terracotta/40 animate-spin-slow" />
          {/* Inner ring */}
          <div className="absolute inset-2 rounded-full border border-sage/60 animate-pulse-subtle" />
          {/* Center Brand Icon */}
          <div className="w-14 h-14 rounded-2xl bg-charcoal-700 border border-white/20 flex items-center justify-center shadow-glow-terracotta">
            <span className="font-bold text-2xl text-terracotta font-sans">C</span>
          </div>
        </div>

        {/* Brand Headline */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight font-sans">
            Co<span className="text-terracotta">Haven</span>
          </h1>
          <p className="text-xs text-charcoal-200 uppercase tracking-widest font-mono">
            Shared Living & Spatial Sanctuary
          </p>
        </div>

        {/* Telemetry Log */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-terracotta">
            <span>{telemetryText}</span>
            <span className="font-bold">{progress}%</span>
          </div>
          {/* Loading Progress Bar */}
          <div className="w-full bg-charcoal-600 h-1 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-terracotta to-sage h-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          className="text-[11px] text-charcoal-300 hover:text-white transition-colors underline font-mono"
        >
          Skip Intro [ESC]
        </button>
      </div>
    </div>
  );
}
