import React, { useState, useEffect, useRef } from 'react';
import { Waves, Disc3, Shield, Radio, Volume2, Sparkles, Play, Pause } from 'lucide-react';

export default function InteractiveAudioExp({ soundEnabled, setSoundEnabled }) {
  const [activeMode, setActiveMode] = useState('spatial');
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const modes = [
    {
      id: 'spatial',
      name: 'Spatial Audio 360°',
      tagline: 'Dynamic Head Tracking',
      description:
        'Recreates a multidimensional cinema soundstage. Acoustic sensors monitor micro-head movements 1,000 times per second, re-anchoring sound sources in 3D acoustic space.',
      icon: Disc3,
      metric: '360° Sphere',
      frequencyType: 'sine-complex'
    },
    {
      id: 'anc',
      name: 'Active Noise Cancellation',
      tagline: '48dB Anti-Phase Isolation',
      description:
        'An array of 8 discrete micro-aperture microphones sample ambient noise at 384kHz, generating inverted anti-phase waveforms that cancel engine roar, office chatter, and wind turbulence.',
      icon: Shield,
      metric: '-48 dB',
      frequencyType: 'flat-anti'
    },
    {
      id: 'transparency',
      name: 'Adaptive Transparency',
      tagline: 'Natural Acoustic Passthrough',
      description:
        'Blends environmental sounds seamlessly with your media. Intelligent voice-enhancement algorithms amplify human dialogue while automatically ducking sudden loud transient spikes.',
      icon: Radio,
      metric: '0.8ms Delay',
      frequencyType: 'pass-through'
    },
    {
      id: 'hires',
      name: 'Lossless Hi-Res Audio',
      tagline: 'Custom 40mm Titanium Drivers',
      description:
        'Delivering pristine studio frequency response from 4Hz to 45kHz. Ultra-stiff, featherweight titanium composite diaphragm minimizes harmonic distortion to under 0.05% THD.',
      icon: Waves,
      metric: '4Hz - 45kHz',
      frequencyType: 'dynamic-peaks'
    }
  ];

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const dpr = window.devicePixelRatio || 1;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const bars = 48;
      const barWidth = (width / bars) * 0.6;
      const spacing = width / bars;

      // Draw frequency visualizer bars
      for (let i = 0; i < bars; i++) {
        const x = i * spacing + (spacing - barWidth) / 2;
        
        let amp = 0.2;
        if (activeMode === 'spatial') {
          amp = 0.3 + 0.4 * Math.sin(phase * 2 + i * 0.25) * Math.cos(phase + i * 0.1);
        } else if (activeMode === 'anc') {
          amp = 0.08 + 0.08 * Math.sin(phase * 4 + i * 0.5); // very muted, flat cancelled
        } else if (activeMode === 'transparency') {
          amp = 0.2 + 0.3 * Math.abs(Math.sin(phase * 1.5 + i * 0.3));
        } else {
          // Hi-Res: dynamic rich peaks
          amp = 0.25 + 0.55 * Math.pow(Math.sin(phase * 2.5 + i * 0.18), 2);
        }

        const barHeight = Math.max(4, amp * (height * 0.7));
        const y = centerY - barHeight / 2;

        // Gradient styling
        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.5, 'rgba(200, 200, 220, 0.6)');
        grad.addColorStop(1, 'rgba(100, 100, 110, 0.2)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();
      }

      phase += 0.035;
      animRef.current = requestAnimationFrame(render);
      ctx.restore();
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeMode]);

  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#040406] text-white overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-mono">
              Sensory Immersion
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase text-white mb-6">
            ACOUSTIC ARCHITECTURE. <br />
            <span className="text-gradient-silver">EXPERIENCE THE STAGE.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            Switch between real-time acoustic profiles to preview how SONIQ PRO reshapes your auditory environment.
          </p>
        </div>

        {/* Live Audio Visualizer Stage */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 max-w-5xl mx-auto mb-16 relative overflow-hidden">
          {/* Top visualizer control bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                DSP REAL-TIME HARMONIC VISUALIZER
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-neutral-400">ACTIVE PROFILE:</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white uppercase font-semibold">
                {modes.find(m => m.id === activeMode)?.name}
              </span>
            </div>
          </div>

          {/* Canvas Waveform Display */}
          <div className="py-12 sm:py-16 relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-32 sm:h-40 object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040406]/60 via-transparent to-[#040406]/60 pointer-events-none" />
          </div>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 relative ${
                    isActive
                      ? 'glass-pill bg-white/15 border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-white'
                      : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl border ${
                      isActive ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 text-neutral-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-300">{mode.metric}</span>
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-1 text-white">{mode.name}</h4>
                  <p className="text-xs text-neutral-400 font-light line-clamp-2">{mode.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Mode Detail Text */}
          <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              <strong className="text-white font-medium uppercase tracking-wide mr-2">
                {modes.find(m => m.id === activeMode)?.name}:
              </strong>
              {modes.find(m => m.id === activeMode)?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
