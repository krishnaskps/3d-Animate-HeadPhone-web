import React from 'react';
import { Headphones } from 'lucide-react';

export default function LoadingScreen({ progress, total, loadedCount }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#050507] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-700">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[120px] pointer-events-none animate-pulse-glow" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Brand Emblem */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.02] shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <Headphones className="w-9 h-9 text-neutral-200 animate-pulse" />
          </div>
          {/* Circular spinner ring */}
          <svg className="absolute -inset-2 w-24 h-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="white"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * progress) / 100}
              className="transition-all duration-200 ease-out"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-light tracking-[0.3em] uppercase text-white mb-2">
          SONIQ <span className="font-semibold text-neutral-400">ACOUSTICS</span>
        </h1>
        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-8">
          Calibrating 300 Cinema Frames
        </p>

        {/* Percentage Counter */}
        <div className="font-mono text-4xl sm:text-5xl font-light tracking-tight text-white mb-4 tabular-nums">
          {Math.round(progress)}<span className="text-xl text-neutral-500 font-sans">%</span>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-[1px] relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-200 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Frame Tracker */}
        <div className="flex justify-between w-full text-[11px] text-neutral-500 font-mono">
          <span>FRAME {String(loadedCount).padStart(3, '0')}</span>
          <span>300 TOTAL</span>
        </div>

        {/* Cinematic Subtext */}
        <p className="mt-8 text-[11px] text-neutral-600 tracking-wider uppercase animate-pulse">
          Scroll experience engineered for precision
        </p>
      </div>
    </div>
  );
}
