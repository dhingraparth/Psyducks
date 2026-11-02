import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/audio';

const BEATS = [
  { at: 0, text: 'Crossing the threshold' },
  { at: 18, text: 'Walking the corridor of light' },
  { at: 42, text: 'Stepping into the living room' },
  { at: 68, text: 'The world opens around you' },
  { at: 88, text: 'Welcome home' },
];

export default function IntroSimulationLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setProgress(100);
    window.setTimeout(onComplete, 720);
  };

  useEffect(() => {
    soundEngine.playPortalEnter();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      const t = window.setTimeout(finish, 200);
      return () => window.clearTimeout(t);
    }

    const started = performance.now();
    const duration = 5200;
    let frame;

    const tick = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frame = requestAnimationFrame(tick);

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKey);
    };
    // finish is stable enough for this mount-only sequence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beat = [...BEATS].reverse().find((b) => progress >= b.at) || BEATS[0];
  const z = -280 + progress * 4.6;
  const doorScale = 0.35 + progress / 140;
  const bloom = Math.max(0, (progress - 55) / 45);

  return (
    <div
      className={`world-intro ${exiting ? 'world-intro--exit' : ''}`}
      role="dialog"
      aria-label="Entering CoHaven"
    >
      <div className="world-intro__vignette" />
      <div className="world-intro__dust" />

      <div className="world-intro__stage">
        <div
          className="world-intro__corridor"
          style={{ transform: `translateZ(${z}px)` }}
        >
          <div className="world-intro__wall world-intro__wall--left" />
          <div className="world-intro__wall world-intro__wall--right" />
          <div className="world-intro__floor" />
          <div className="world-intro__ceiling" />

          <div
            className="world-intro__door"
            style={{ transform: `translateZ(-420px) scale(${doorScale})` }}
          >
            <div className="world-intro__door-frame" />
            <div className="world-intro__door-light" />
            <div className="world-intro__room">
              <span className="world-intro__sofa" />
              <span className="world-intro__window" />
              <span className="world-intro__lamp" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="world-intro__bloom"
        style={{ opacity: bloom }}
      />

      <div className="world-intro__hud">
        <div className="world-intro__mark">
          <span>C</span>
        </div>
        <h1>
          Co<span>Haven</span>
        </h1>
        <p className="world-intro__status">{beat.text}</p>
        <div className="world-intro__bar">
          <div style={{ width: `${progress}%` }} />
        </div>
        <button type="button" onClick={finish}>
          Skip intro · Esc
        </button>
      </div>
    </div>
  );
}
