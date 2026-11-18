import React from 'react';
import { ArrowRight, Shield, Truck, RotateCcw, Sparkles } from 'lucide-react';

export default function FinalCTA({ onOpenExplore }) {
  return (
    <section className="relative py-28 sm:py-36 bg-[#040406] text-white overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-white/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 text-center">
        {/* Cinematic Headphone Showcase (Frame 300) */}
        <div className="relative max-w-2xl mx-auto mb-12 sm:mb-16 group">
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <img
              src="/frames/ezgif-frame-300.jpg"
              alt="SONIQ Headphone Final Reveal"
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle atmospheric gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 inset-x-0 flex justify-center items-center">
              <span className="glass-pill px-4 py-1 text-xs font-mono text-neutral-300 border border-white/15">
                SONIQ PRO // TIMELESS MATTE BLACK
              </span>
            </div>
          </div>
        </div>

        {/* Headlines */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-mono">
              The Flagship Experience
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-white mb-6 text-glow leading-tight">
            YOUR WORLD. <br />
            <span className="text-gradient-silver">YOUR SOUND.</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-xl mx-auto">
            Discover a new way to experience audio.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenExplore}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] active:scale-95 flex items-center justify-center space-x-3 group"
          >
            <span>EXPLORE NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#hero"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white font-semibold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center"
          >
            Replay Scroll Journey
          </a>
        </div>

        {/* Luxury Guarantees Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-10 border-t border-white/10 text-neutral-400 text-xs font-mono">
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl glass-pill">
            <Truck className="w-4 h-4 text-white shrink-0" />
            <span>Complimentary Global Priority Shipping</span>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl glass-pill">
            <RotateCcw className="w-4 h-4 text-white shrink-0" />
            <span>30-Day Risk-Free Auditory Trial</span>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl glass-pill">
            <Shield className="w-4 h-4 text-white shrink-0" />
            <span>2-Year Comprehensive SONIQ Care</span>
          </div>
        </div>
      </div>
    </section>
  );
}
